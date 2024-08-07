// "use client";

// import { useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// // import HotelNameForm from "./HotelNameForm";
// import HotelAddressForm from "./HotelAddressForm";
// import HotelPhotosForm from "../photos/_components/PhotosForm";

// const HotelForm = () => {
//   const [activeTab, setActiveTab] = useState("basicInfo");
//   const [basicInfoTab, setBasicInfoTab] = useState("title");
//   const [propertySetupTab, setPropertySetupTab] = useState("tabOne");
//   const [photoTab, setPhotosTab] = useState("frames");

//   const TABS_DATA = [
//     {
//       tabName: "Basic Information",
//       tabValue: "basicInfo",
//       value: basicInfoTab,
//       onValueChange: setBasicInfoTab,
//       subTabs: [
//         {
//           subTabName: "Title",
//           subTabValue: "title",
//           // content: <HotelNameForm />,
//           nextButtonFn: () => {
//             setBasicInfoTab("addressDetails");
//           },
//         },
//         {
//           subTabName: "Address Details",
//           subTabValue: "addressDetails",
//           // content: <HotelAddressForm />,
//           backButtonFn: () => {
//             setBasicInfoTab("title");
//           },
//           nextButtonFn: () => {
//             setActiveTab("propertySetup");
//             setPropertySetupTab("tabOne");
//           },
//         },
//       ],
//     },
//     {
//       tabName: "Property Setup",
//       tabValue: "propertySetup",
//       value: propertySetupTab,
//       onValueChange: setPropertySetupTab,
//       subTabs: [
//         {
//           subTabName: "Tab One",
//           subTabValue: "tabOne",
//           content: <>TabOne</>,
//           backButtonFn: () => {
//             setActiveTab("basicInfo");
//             setBasicInfoTab("addressDetails");
//           },
//           nextButtonFn: () => {
//             setPropertySetupTab("tabTwo");
//           },
//         },
//         {
//           subTabName: "Tab Two",
//           subTabValue: "tabTwo",
//           content: <>TabTwo</>,
//           backButtonFn: () => {
//             setPropertySetupTab("tabOne");
//           },
//           nextButtonFn: () => {
//             setActiveTab("photos");
//             setPhotosTab("frames");
//           },
//         },
//       ],
//     },
//     {
//       tabName: "Photos",
//       tabValue: "photos",
//       value: photoTab,
//       onValueChange: setPhotosTab,
//       subTabs: [
//         {
//           subTabName: "Frames",
//           subTabValue: "frames",
//           // content: <HotelPhotosForm></HotelPhotosForm>,
//           backButtonFn: () => {
//             setActiveTab("propertySetup");
//             setBasicInfoTab("tabTwo");
//           },
//           // nextButtonFn: () => {
//           //   setPropertySetupTab("tabTwo");
//           // },
//         },
//       ],
//     },
//   ];

//   return (
//     <Tabs value={activeTab} onValueChange={setActiveTab}>
//       <TabsList>
//         {TABS_DATA.map((tabs) => (
//           <TabsTrigger key={tabs.tabValue} value={tabs.tabValue}>
//             {tabs.tabName}
//           </TabsTrigger>
//         ))}
//       </TabsList>
//       {TABS_DATA.map((tabs) => (
//         <TabsContent key={tabs.tabValue} value={tabs.tabValue}>
//           <Tabs value={tabs.value} onValueChange={tabs.onValueChange}>
//             <TabsList>
//               {tabs.subTabs.map((subTabs) => (
//                 <TabsTrigger key={subTabs.subTabValue} value={subTabs.subTabValue}>
//                   {subTabs.subTabName}
//                 </TabsTrigger>
//               ))}
//             </TabsList>
//             {tabs.subTabs.map((subTabs: any) => (
//               <TabsContent key={subTabs.subTabValue} value={subTabs.subTabValue}>
//                 {subTabs.content}
//                 <div className="flex items-center justify-between">
//                   {subTabs.backButtonFn && (
//                     <Button
//                       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                       onClick={subTabs.backButtonFn}
//                     >
//                       Back
//                     </Button>
//                   )}
//                   {subTabs.nextButtonFn && (
//                     <Button
//                       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                       onClick={subTabs.nextButtonFn}
//                     >
//                       Continue
//                     </Button>
//                   )}
//                 </div>
//               </TabsContent>
//             ))}
//           </Tabs>
//         </TabsContent>
//       ))}
//     </Tabs>
//   );
// };

// export default HotelForm;
