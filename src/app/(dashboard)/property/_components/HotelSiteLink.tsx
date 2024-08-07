// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { toast } from "@/components/ui/use-toast";
// import { useEffect, useState } from "react";
// // import { fetchHotelData } from "../actions/onboarding";
// // import { Separator } from "@/components/ui/separator";
// // import { ArrowLeftIcon } from "lucide-react";

// const HotelSiteLink = () => {
//   const [url, setUrl] = useState("");
//   const hotelLink = (value: string) => {
//     setUrl(value);
//   };

//   const getHotelData = async () => {
//     // const data = await fetchHotelData(url);
//     // toast({
//     //   title: data?.message,
//     // });
//   };

//   useEffect(() => {
//     const fetchIpAddress = async () => {
//       try {
//         const response = await fetch("/api/IPAddress", {
//           method: "GET",
//         });
//         console.log("response:", response);
//         if (!response.ok) {
//           throw new Error("Failed to fetch IP address");
//         }
//         const data = await response.json();
//         console.log("data:", data);
//       } catch (error) {
//         console.log("Error fetching IP:", error);
//       }
//     };

//     fetchIpAddress();
//   }, []);

//   return (
//     <div className="flex flex-col items-start p-8 space-y-8">
//       <h1 className="text-3xl font-bold">Where else is your property listed?</h1>
//       <Card className="w-full max-w-md">
//         <CardContent className="my-4">
//           <div className="text-sm text-muted-foreground">
//             If your property is listed on Booking.com, you can speed up registration process by
//             importing it directly.
//           </div>
//           {/* <Separator className="my-4" /> */}
//           <div className="font-bold my-6">Import property details from Booking.com</div>

//           <div className="my-2">
//             <div className="text-sm my-1">Paste the link to your booking.com listing</div>
//             <div className="flex">
//               <Input
//                 type="text"
//                 className="mr-2"
//                 placeholder="https://www.booking.com/hotel/in/*******"
//                 onChange={(e) => hotelLink(e.target.value)}
//               />
//               <Button onClick={getHotelData}>Apply</Button>
//             </div>
//           </div>
//           <div className="my-2">
//             <div className="text-sm text-muted-foreground">Example link:</div>
//             <div className="text-sm text-muted-foreground">
//               https://www.booking.com/hotel/in/*******
//             </div>
//           </div>
//           <div className="text-sm flex">
//             <div className="font-bold">NOTE:-&nbsp;</div>
//             <div className="text-muted-foreground">&quot;in&quot; indicates the country</div>
//           </div>
//         </CardContent>
//       </Card>
//       <div className="flex items-center">
//         <Button className="flex-1">Continue</Button>
//       </div>
//     </div>
//   );
// };

// export default HotelSiteLink;
