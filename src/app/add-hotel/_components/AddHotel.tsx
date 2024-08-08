"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { fetchHotelData, insertRoomDetails, updateHotel } from "../actions/addhotel.action";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/supabaseClient";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { testHotelData } from "@/constants";
import { Copy } from "lucide-react";

const AddHotel = () => {
  const [previewLink, setPreviewLink] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const params = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopyClick = () => {
    if (inputRef.current) {
      inputRef.current?.select();
      document.execCommand("copy");
    }
  };

  const hotelLink = (value: string) => {
    setUrl(value);
  };

  const uploadImages = async (imageUrl: string, room_id?: string) => {
    // Download the image
    const response = await axios.get(imageUrl, { responseType: "blob" });
    const imageBlob = response.data;
    const imageName = imageUrl.split("?")[0].split("/").slice(-1)[0]; // Extract image name from URL

    if (imageBlob.size > 0) {
      // Upload the image to Supabase
      const path = `${room_id ? "room_images" : "hotel_images"}/${Math.floor(
        Math.random() * 1000
      )}${imageName}`;
      const { data, error } = await supabase.storage
        .from(process.env.NEXT_PUBLIC_S3_BUCKET!)
        .upload(path, imageBlob);
      error && console.error("error:", error.message);

      // Get the public URL of the uploaded image
      if (data) {
        const fileUrl = await supabase.storage
          .from(process.env.NEXT_PUBLIC_S3_BUCKET!)
          .createSignedUrl(data.path, 60 * 60 * 24 * 365 * 10);

        const imagePayload: any = {
          link: fileUrl.data?.signedUrl!,
          hotel_id: params.get("hotel_id"),
          name: imageName,
        };

        const payload = room_id ? { ...imagePayload, room_id: room_id || "" } : imagePayload;
        const { error } = await supabase
          .from(`${room_id ? "hotel_room_media" : "hotel_media"}`)
          .insert(payload);
        console.log("error =>", error);
      }
    }
  };

  const updateHotelData = async () => {
    setLoading(true);
    const data = await fetchHotelData(url);
    // const data = testHotelData;
    console.log("data:", data);
    if (data) {
      const { data: updatedHotelData, message } = await updateHotel({
        ...data.data,
        hotel_id: params.get("hotel_id"),
      });
      // if (data.data.hotel_media) {
      //   const imageUrls = data.data.hotel_media;
      //   for (const imageUrl of imageUrls) {
      //     // Download the image
      //     await uploadImages(imageUrl);
      //   }
      // }
      if (data.data.rooms) {
        const rooms = data.data.rooms;
        for (const room of rooms) {
          const { data: roomDetails } = await insertRoomDetails({
            ...room,
            hotel_id: params.get("hotel_id"),
          });
          // if (room.image_urls && roomDetails) {
          //   for (const url of room.image_urls) {
          //     url && uploadImages(url, roomDetails[0]?.id);
          //   }
          // }
        }
      }
      console.log("updatedHotelData => ", updatedHotelData);
      if (updatedHotelData) {
        setLoading(false);
        setPreviewLink(`http://localhost:3000/${updatedHotelData[0]?.slug}`);
        toast({
          title: message,
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-8 space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center">
        Where else is your property listed?
      </h1>
      <Card className="w-full max-w-sm sm:max-w-md">
        <CardContent className="my-4">
          <div className="text-sm text-muted-foreground text-center sm:text-left">
            If your property is listed on Booking.com, you can speed up the registration process by
            importing it directly.
          </div>
          <div className="font-bold my-6 text-center sm:text-left">
            Import property details from Booking.com
          </div>
          <div className="my-2">
            <div className="text-sm my-1 text-center sm:text-left">
              Paste the link to your booking.com listing
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <Input
                type="text"
                className="mr-0 sm:mr-2 mb-2 sm:mb-0"
                placeholder="https://www.booking.com/hotel/in/*******"
                onChange={(e: any) => hotelLink(e.target.value)}
              />
              {loading ? (
                <div className="balls">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                <Button onClick={updateHotelData}>Apply</Button>
              )}
            </div>
          </div>
          <div className="my-2 text-center sm:text-left">
            <div className="text-sm text-muted-foreground">Example link:</div>
            <div className="text-sm text-muted-foreground">
              https://www.booking.com/hotel/in/*******
            </div>
          </div>
          <div className="text-sm flex flex-col sm:flex-row sm:items-center">
            <div className="font-bold">NOTE:-&nbsp;</div>
            <div className="text-muted-foreground">&quot;in&quot; indicates the country</div>
          </div>
        </CardContent>
      </Card>
      {previewLink && (
        <div className="flex items-center w-full max-w-sm sm:max-w-md">
          <input
            ref={inputRef}
            type="text"
            value={previewLink}
            placeholder="Enter a preview link"
            className="flex-grow p-2 border-none outline-none border border-black"
          />
          <Copy onClick={handleCopyClick} />
          <Button
            onClick={() => {
              window.open(previewLink, "_blank");
            }}
          >
            Preview
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddHotel;
