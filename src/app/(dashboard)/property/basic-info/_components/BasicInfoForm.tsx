"use client";

import { FormInput } from "@/components/ui/forminput";
import { Label } from "@/components/ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/supabaseClient";
import Image from "next/image";
import { getHotelDataById, updateHotelBasicInformation } from "../action/basicInfoForm.action";
// import { getHotels } from "../actions/onboarding";

export interface IHotelBasicInfo {
  id?: string;
  propertyName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  description: string;
  contact_number: string;
  facebook_link: string;
  youtube_link: string;
  instagram_link: string;
  checkInTime: string;
  checkOutTime: string;
  logo: string;
}

const BasicInfoForm = () => {
  const [logoFile, setLogoFile] = useState<(File & { preview: string }) | undefined>();
  const initialValue: IHotelBasicInfo = {
    propertyName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    description: "",
    contact_number: "",
    facebook_link: "",
    youtube_link: "",
    instagram_link: "",
    checkInTime: "",
    checkOutTime: "",
    logo: "",
  };

  const validationSchema = yup.object().shape({
    propertyName: yup.string().required("Property Name is required"),
    address: yup.string().required("Address Name is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    country: yup.string().required("Country is required"),
    postalCode: yup.string().required("Postal Code is required"),
    description: yup.string().required("Description is required"),
    contact_number: yup.string().required("Contact Number is required"),
    facebook_link: yup.string().url("Enter a valid URL").required("Facebook Link is required"),
    youtube_link: yup.string().url("Enter a valid URL").required("Youtube Link is required"),
    instagram_link: yup.string().url("Enter a valid URL").required("Instagram Link is required"),
    checkInTime: yup.string().required("Check-in Time is required"),
    checkOutTime: yup.string().required("Check-out Time is required"),
    logo: yup.string().required("Logo is required"),
  });

  const form = useForm<IHotelBasicInfo>({
    defaultValues: initialValue,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const { control, handleSubmit, setValue, watch, reset } = form;
  const logo = watch("logo");

  useEffect(() => {
    getHotelData();
  }, []);

  const getHotelData = async () => {
    const { data } = await getHotelDataById("6a2d7d10-7482-429f-a068-d412dbc64fc5");
    const hotel = data?.[0];
    // console.log("hotel:", hotel);
    reset({
      propertyName: hotel.name,
      address: hotel.address,
      city: hotel.geo_city.name,
      state: hotel.geo_state.name,
      country: hotel.geo_country.name,
      postalCode: hotel.postal_code,
      description: hotel.description,
      contact_number: hotel.contact_number,
      facebook_link: hotel.facebook_link,
      youtube_link: hotel.youtube_link,
      instagram_link: hotel.instagram_link,
      checkInTime: hotel.checkin_from,
      checkOutTime: hotel.checkout_until,
      logo: hotel.logo,
    });
  };

  const setPoster = async () => {
    const supabase = createClient();
    if (logoFile) {
      const path = `hotel_images/${Math.floor(Math.random() * 1000)}${logoFile.name}`;
      const { data, error } = await supabase.storage
        .from(process.env.NEXT_PUBLIC_S3_BUCKET!)
        .upload(path, logoFile);
      error && console.error("error:", error);
      if (data) {
        const fileUrl = await supabase.storage
          .from(process.env.NEXT_PUBLIC_S3_BUCKET!)
          .createSignedUrl(data.path, 60 * 60 * 24 * 365 * 10);
        return fileUrl.data?.signedUrl!;
      }
    }
  };

  const updateBasicInformation = async (values: IHotelBasicInfo) => {
    const logo = await setPoster();
    await updateHotelBasicInformation({
      ...values,
      id: "6a2d7d10-7482-429f-a068-d412dbc64fc5",
      logo: logo!,
    });
  };

  return (
    <div className="relative h-svh">
      <div className="container mx-auto p-4 max-h-[calc(100vh-5rem)] overflow-auto">
        <h1 className="text-3xl font-bold mb-4">Hotel Basic Info</h1>
        <div className="mb-4">
          <Label htmlFor="propertyName" className="block text-gray-700 text-sm font-bold mb-2">
            Property Name
          </Label>
          <FormInput
            control={control}
            id="propertyName"
            name="propertyName"
            type="text"
            placeholder="Enter property name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
            Address
          </label>
          <FormInput
            control={control}
            type="text"
            id="address"
            name="address"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Start typing your address"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
            City
          </Label>
          {/* add combobox here */}
          {/* <select
            id="city"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="surat">Surat</option>
          </select> */}
          <FormInput
            name="city"
            control={control}
            type="city"
            id="city"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your city"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">
            State
          </Label>
          {/* add combobox here */}
          {/* <select
            id="state"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="gujarat">Gujarat</option>
          </select> */}
          <FormInput
            name="state"
            control={control}
            type="state"
            id="state"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your state"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">
            Country/region
          </Label>
          {/* add combobox here */}
          {/* <select
            id="country"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="India">India</option>
          </select> */}
          <FormInput
            name="country"
            control={control}
            type="country"
            id="country"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your country"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode" className="block text-gray-700 text-sm font-bold mb-2">
            postal code
          </label>
          <FormInput
            control={control}
            type="text"
            id="postalCode"
            name="postalCode"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter postal code"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </Label>
          <FormInput
            control={control}
            id="description"
            name="description"
            type="text"
            placeholder="Enter hotel description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="contact_number" className="block text-gray-700 text-sm font-bold mb-2">
            Contact Number
          </Label>
          <FormInput
            control={control}
            id="contact_number"
            name="contact_number"
            type="text"
            placeholder="Enter Contact Number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="facebook_link" className="block text-gray-700 text-sm font-bold mb-2">
            Facebook Link
          </Label>
          <FormInput
            control={control}
            id="facebook_link"
            name="facebook_link"
            type="text"
            placeholder="Enter your hotel account facebook link"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="youtube_link" className="block text-gray-700 text-sm font-bold mb-2">
            Youtube Link
          </Label>
          <FormInput
            control={control}
            id="youtube_link"
            name="youtube_link"
            type="text"
            placeholder="Enter your hotel youTube channel link"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="instagram_link" className="block text-gray-700 text-sm font-bold mb-2">
            Instagram Link
          </Label>
          <FormInput
            control={control}
            id="instagram_link"
            name="instagram_link"
            type="text"
            placeholder="Enter your hotel account instagram link"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkInTime">
            Check-in Time
          </Label>
          <FormInput
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="time"
            control={control}
            id="checkInTime"
            name="checkInTime"
            required
          />
        </div>
        <div className="mb-4">
          <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkOutTime">
            Check-out Time
          </Label>
          <FormInput
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="time"
            id="checkOutTime"
            name="checkOutTime"
            control={control}
            required
          />
        </div>
        <Dropzone
          accept={{
            "image/jpeg": [".jpeg", ".png", ".jpg"],
          }}
          maxSize={1000000} // 1MB
          multiple={false}
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
          onDrop={(acceptedFiles) => {
            if (acceptedFiles[0]) {
              const file = Object.assign(acceptedFiles[0], {
                preview: URL.createObjectURL(acceptedFiles[0]),
              });
              setLogoFile(file);
              setValue("logo", file.preview);
              form.clearErrors("logo");
            }
          }}
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

                  {logo || logoFile ? (
                    <div className="flex w-full content-center justify-center">
                      <Image
                        src={logoFile?.preview || logo || ""}
                        alt={"logo"}
                        height={70}
                        width={100}
                      />
                    </div>
                  ) : (
                    <div className="flex w-full content-center justify-center h-[104px]">
                      <p className="flex justify-center items-center">
                        Drag & drop hotel logo here, or click to select file
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          )}
        </Dropzone>
        <div
          className={`absolute bottom-0 right-0 w-full p-4 bg-white shadow-md transition-opacity duration-300 flex justify-end opacity-100`}
        >
          <button
            className={`w-fit py-2 px-4 rounded-lg font-semibold bg-blue-500 text-white`}
            onClick={handleSubmit(updateBasicInformation)}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm;
