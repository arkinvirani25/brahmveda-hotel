"use client";

import Image from "next/image";
import AddRoomForm from "./AddRoomForm";
import { useState } from "react";

const RoomList = () => {
  const rooms = [
    {
      id: "1",
      name: "Deluxe Room",
      image:
        "https://plus.unsplash.com/premium_photo-1678297270385-ad5067126607?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "2",
      name: "Superior Room",
      image:
        "https://images.unsplash.com/photo-1549638441-b787d2e11f14?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "3",
      name: "Standard Room",
      image:
        "https://images.unsplash.com/photo-1590675560125-0d832b9d719e?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "4",
      name: "Suite Room",
      image:
        "https://images.unsplash.com/photo-1515510621228-30de609bbd60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "5",
      name: "Single Room",
      image:
        "https://plus.unsplash.com/premium_photo-1676321688630-9558e7d2be10?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "6",
      name: "Double Room",
      image:
        "https://images.unsplash.com/photo-1660731513683-4cb0c9ac09b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];
  // const handleDelete = (roomId: string) => {
  //   // console.log("handleDelete roomId:", roomId);
  // };

  // const handleEdit = (roomId: string) => {
  //   setOpen(true);
  //   // console.log("handleEdit roomId:", roomId);
  // };
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <div className="relative h-svh">
          <div className="p-6 max-h-[calc(100vh-5rem)] overflow-auto">
            <div className="mb-6 flex justify-between">
              <h1 className="text-3xl font-bold ">Room List</h1>
              <button
                className="w-fit py-2 px-4 rounded-lg font-semibold bg-blue-500 text-white"
                onClick={() => setOpen(true)}
              >
                ADD Room
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className={`relative block border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer`}
                >
                  <Image
                    src={room.image}
                    alt={room.name}
                    width={400}
                    height={250}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{room.name}</h2>
                  </div>
                  <div className="absolute top-2 right-2 flex space-x-2">
                    {/* <button
                      onClick={(e) => {
                        // e.stopPropagation();
                        handleEdit(room.id);
                      }}
                      className="bg-blue-500 text-white p-1 rounded"
                    >
                      Edit
                    </button> */}
                    {/* <button
                      onClick={(e) => {
                        // e.stopPropagation();
                        handleDelete(room.id);
                      }}
                      className="bg-red-500 text-white p-1 rounded"
                    >
                      Delete
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
            <div
              className={`absolute bottom-0 right-0 w-full p-4 bg-white shadow-md transition-opacity duration-300 flex justify-end opacity-100`}
            >
              <button className={`w-fit py-2 px-4 rounded-lg font-semibold bg-blue-500 text-white`}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddRoomForm open={open} setOpen={setOpen}></AddRoomForm>
    </>
  );
};

export default RoomList;
