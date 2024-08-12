"use client";

import Image from "next/image";
import Dropzone from "react-dropzone";

const PhotosForm = () => {
  const images = [
    "https://images.unsplash.com/photo-1615874694520-474822394e73?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1700131054691-bb8bbf4525e3?q=80&w=2063&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1649770638916-f55225f9ffd0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1680095194107-27e9b94f95b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  return (
    <div className="relative h-svh">
      <div className="container mx-auto p-4 max-h-[calc(100vh-5rem)] overflow-auto">
        <h1 className="text-3xl font-bold mb-4">Hotel Photos</h1>
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
                      "p-1 text-neutral-500 text-sm font-medium file:border-0 file:bg-transparent file:text-sm file:font-medium file:placeholder-text-neutral-500 file:focus-visible:outline-none file:focus-visible:ring-2 file:focus-visible:ring-neutral-950 file:focus-visible:ring-offset-2 ",
                  })}
                >
                  <input {...getInputProps()} />
                  <div className="flex w-full content-center justify-center h-[150px]">
                    <p className="flex justify-center items-center">
                      Drag &apos;n&apos; drop a hotel images here, or click to select a file
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
        <div
          className={`absolute bottom-0 right-0 w-full p-4 bg-white shadow-md transition-opacity duration-300 flex justify-end opacity-100`}
        >
          <button className={`w-fit py-2 px-4 rounded-lg font-semibold bg-blue-500 text-white`}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotosForm;
