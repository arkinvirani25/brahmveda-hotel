"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Dropzone from "react-dropzone";

const AddRoomForm = (props: any) => {
  const images = [
    "https://images.unsplash.com/photo-1615874694520-474822394e73?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1700131054691-bb8bbf4525e3?q=80&w=2063&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1649770638916-f55225f9ffd0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1680095194107-27e9b94f95b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  const amenities = [
    {
      category: "Room Amenities",
      items: ["Air Conditioning", "Free Wi-Fi", "Television"],
    },
    {
      category: "Bathroom Amenities",
      items: ["Shower", "Hair Dryer", "Towels"],
    },
    {
      category: "Hotel Services",
      items: ["24-hour Front Desk", "Laundry Service", "Concierge"],
    },
  ];

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent className="max-w-[calc(100vw-10rem)] w-fit min-w-[40rem]">
        <DialogHeader>
          <DialogTitle>Add Room</DialogTitle>
        </DialogHeader>
        <div className="max-h-[calc(100vh-10rem)] overflow-auto">
          <div className="container mx-auto p-4">
            {/* <h1 className="text-3xl font-bold mb-4"></h1> */}
            <div className="mb-4">
              <Label htmlFor="name" className="block text-gray-700 text-base font-bold mb-2">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter room name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="description" className="block text-gray-700 text-base font-bold mb-2">
                Description
              </Label>
              <Input
                id="description"
                type="text"
                placeholder="Enter room description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="peopleCount" className="block text-gray-700 text-base font-bold mb-2">
                How many peoples allowed?
              </Label>
              <Input
                id="peopleCount"
                type="text"
                placeholder="Enter capacity of room"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="roomSize" className="block text-gray-700 text-base font-bold mb-2">
                Room size
              </Label>
              <Input
                id="roomSize"
                type="text"
                placeholder="Enter room size in square meters "
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="basePrice" className="block text-gray-700 text-base font-bold mb-2">
                Base Price
              </Label>
              <Input
                id="basePrice"
                type="text"
                placeholder="Enter base price of room"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor="payablePrice"
                className="block text-gray-700 text-base font-bold mb-2"
              >
                Payable Price
              </Label>
              <Input
                id="payablePrice"
                type="text"
                placeholder="Enter payable price of room"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <Label className="block text-gray-700 text-base font-bold mb-2">Room Photos</Label>
            <Dropzone
              accept={{
                "image/jpeg": [".jpeg", ".png", ".jpg"],
              }}
              maxSize={1000000} // 1MB
              multiple={true}
              // onDropRejected={(rejectedFiles) => {
              //   rejectedFiles.forEach((file) => {
              //     const rejectedFile = file.file as File;
              //     if (rejectedFile.size > 1000000) {
              //       Toast(ORGANIZATION_MSG.LARGE_FILE_SIZE, "error");
              //     } else {
              //       Toast(ORGANIZATION_MSG.FILE_TYPE_NOT_SUPPORTED, "error");
              //     }
              //   });
              // }}
              // onDrop={(acceptedFiles) => {
              //   if (acceptedFiles[0]) {
              //     const file = Object.assign(acceptedFiles[0], {
              //       preview: URL.createObjectURL(acceptedFiles[0]),
              //     });
              //     setPosterFile(file);
              //     setValue("poster", file.preview);
              //     form.clearErrors("poster");
              //   }
              // }}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="border-2 border-dashed border-gray-400 rounded">
                  <section>
                    <div
                      {...getRootProps({
                        className:
                          "p-1 text-neutral-500 text-base font-medium file:border-0 file:bg-transparent file:text-base file:font-medium file:placeholder-text-neutral-500 file:focus-visible:outline-none file:focus-visible:ring-2 file:focus-visible:ring-neutral-950 file:focus-visible:ring-offset-2 ",
                      })}
                    >
                      <input {...getInputProps()} />
                      <div className="flex w-full content-center justify-center h-[150px]">
                        <p className="flex justify-center items-center">
                          Drag 'n' drop a room images here, or click to select a file
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              )}
            </Dropzone>
            <div className="flex flex-wrap justify-center p-4">
              {images.map((src, index) => (
                <div key={index} className="relative m-2 w-72 h-72">
                  <Image
                    src={src}
                    alt={`Image ${index}`}
                    className="w-full h-full object-cover rounded-md"
                    width={300}
                    height={300}
                  />
                  <button
                    className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                    onClick={() => alert(`Close button clicked for image ${index + 1}`)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <Label htmlFor="amenities" className="block text-gray-700 text-lg font-bold mb-2">
                Room Amenities
              </Label>
            </div>
            <div className="container mx-auto p-4">
              {amenities.map((category, index) => (
                <div key={index} className="mb-6">
                  <h2 className="text-base font-semibold mb-2">{category.category}</h2>
                  <ul className="list-none pl-0 space-y-2">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <input
                          type="checkbox"
                          id={`${category.category}-${item}`}
                          className="mr-2 w-4 h-4"
                        />
                        <label htmlFor={`${category.category}-${item}`}>{item}</label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <button className={`w-fit py-2 px-4 rounded-lg font-semibold bg-blue-500 text-white`}>
            Continue
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoomForm;
