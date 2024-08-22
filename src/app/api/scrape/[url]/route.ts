import { getRoomDescription } from "@/app/add-hotel/actions/addhotel.action";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req: NextRequest, { params }: { params: { url: string } }) {
  console.log("params => ", params);

  const url = params.url;
  console.log("url => ", url);

  try {
    if (!url) {
      return NextResponse.json({ message: "URL is required" }, { status: 400 });
    }
    const browser = await puppeteer.launch({ headless: false, args: ["--start-maximized"] });
    const page = await browser.newPage();

    const { width, height } = await page.evaluate(() => {
      return {
        width: window.screen.width,
        height: window.screen.height,
      };
    });

    await page.setViewport({ width, height });
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });

    const roomDetails = [];
    const roomElementsSelector = ".dba1b3bddf.d371fb5186.b72e42bcff";

    await page.waitForSelector(roomElementsSelector);

    const roomElements = await page.$$(roomElementsSelector);
    console.log(`Found ${roomElements.length} room elements.`);

    for (let index = 0; index < roomElements.length; index++) {
      const newPage = await browser.newPage();
      await newPage.goto(url, {
        waitUntil: "domcontentloaded",
      });
      const roomElements = await newPage.$$(roomElementsSelector);
      const roomElement = roomElements[index];

      if (!roomElement) continue;

      try {
        await roomElement.evaluate((el) => el.scrollIntoView());
        await roomElement.click();
        await newPage.waitForSelector(".rt-lightbox-title");

        const room = await newPage.evaluate(() => {
          let roomData = { name: "", description: "" };
          //for scrapping title
          const titleElement = document.querySelector(".rt-lightbox-title");
          roomData["name"] = titleElement ? titleElement.innerHTML : "No data found";

          //for scrapping description and size
          const rightContainerElement = document.querySelector(".hprt-lightbox-right-container");
          const segment = rightContainerElement ? rightContainerElement.innerHTML : null;
          const f_filter = segment && segment.split("roomsize")[1];
          const s_filter = f_filter && f_filter.split("more-facilities-space")[0];

          roomData["description"] = s_filter || "";
          return roomData;
        });

        const facilities = await newPage.$$eval(".bui-badge", (elements) =>
          elements.map((el) => el?.textContent?.trim())
        );

        const otherFacilities = await newPage.$$eval(
          ".hprt-lightbox-list__item.js-lightbox-facility",
          (elements) => elements.map((el) => el?.textContent?.trim())
        );
        const imageURLs = await newPage.$$eval(
          ".js-hotel-thumb.hotel_thumbs_sprite.change_large_image_on_hover",
          (elements) => elements.map((el) => el?.children[0]?.attributes[0]?.nodeValue)
        );

        const description_n_size =
          room?.description && (await getRoomDescription(room?.description));

        roomDetails.push({
          ...room,
          description: (description_n_size && JSON.parse(description_n_size).description) || "",
          size: (description_n_size && JSON.parse(description_n_size).size) || "",
          facilities: [...facilities, ...otherFacilities] || [],
          imageURLs: imageURLs || [],
        });

        await newPage.evaluate(() => {
          return new Promise((resolve) => {
            setTimeout(resolve, 4000);
          });
        });

        await newPage.close();
      } catch (error: any) {
        console.log(`An error occurred for room index ${index}: ${error.message}`);
        continue;
      }
    }

    await browser.close();

    return NextResponse.json({
      data: roomDetails,
      message: "Hotel found successfully",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
