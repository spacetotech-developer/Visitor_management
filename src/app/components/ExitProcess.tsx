// import React, { useState } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import { Badge } from "./ui/badge";
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "./ui/avatar";
// import { Alert, AlertDescription } from "./ui/alert";
// import {
//   LogOut,
//   Clock,
//   User,
//   CheckCircle,
//   XCircle,
//   Smartphone,
//   Users,
// } from "lucide-react";
// interface Visitor {
//   _id: string;
//   name: string;
//   photo?: string;
//   email: string;
//   mobileNo: string;
//   meetWith: string;
//   entryTime: Date;
//   exitTime?: string;
//   status: string;
//   electronicItems: {
//     id: string;
//     name: string;
//     photo?: string;
//     serialNumber: string;
//   }[];
//   uniqueCode?: string;
// };

// interface ApiResponse {
//   data: any;
//   visitors: Visitor[];
// }

// interface ExitProcessProps {
//   visitorsdetails: Visitor[];
//   onExit: (visitorId: string, exitCode: string) => boolean;
//   selectedVisitor: Visitor | null;
//   onSelectVisitor: (visitor: Visitor | null) => void;
// }

// export function ExitProcess({ visitorsdetails }: ExitProcessProps) {
//   const [exitCode, setExitCode] = useState("");
//   const [exitStatus, setExitStatus] = useState<
//     "idle" | "success" | "error"
//   >("idle");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [visitors, setVisitors] = React.useState<Visitor[]>([]);

//   // useEffect(() => {
//   //     // Fetch visitors data from API or state management
//   //     // This is a placeholder for the actual data fetching logic
//   //     const fetchVisitors = async () => {
//   //       try {
//   //         const {data,error} = await callApi('/visitor/getAllVisitors', 
//   //           { 
//   //             method: 'GET' 
//   //           });
//   //         setVisitors(Array.isArray(data?.data?.visitors) ? data?.data?.visitors : []);
//   //         console.log('Visitors fetched successfully:', data?.data?.visitors);
//   //       } catch (error) {
//   //         console.error('Error fetching visitors:', error);
//   //       }
//   //     };
//   //     fetchVisitors();
//   //     // Log the fetching action
//   //     // This is just for demonstration; in a real app, you would handle this in a
//   //     console.log('Fetching visitors data...');
//   //   }, []); 
  
  
//   // const handleExit = () => {
//   //   if (!selectedVisitor) return;

//   //   const success = onExit(
//   //     selectedVisitor._id,
//   //     exitCode.toUpperCase(),
//   //   );

//   //   if (success) {
//   //     setExitStatus("success");
//   //     setExitCode("");
//   //     setTimeout(() => {
//   //       setExitStatus("idle");
//   //       onSelectVisitor(null);
//   //     }, 2000);
//   //   } else {
//   //     setExitStatus("error");
//   //     setErrorMessage(
//   //       "Invalid exit code. Please check the code sent to your phone.",
//   //     );
//   //     setTimeout(() => {
//   //       setExitStatus("idle");
//   //       setErrorMessage("");
//   //     }, 3000);
//   //   }
//   // };

//   const formatTime = (date: Date) => {
//     return date.toLocaleTimeString("en-IN", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//       },
//     },
//   };

//   return (
//     <motion.div
//       className="space-y-6"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {/* Visitor Selection */}
//       <motion.div variants={itemVariants}>
//         <Card className="bg-white shadow-lg border border-gray-200">
//           <CardHeader className="bg-blue-600 rounded-t-lg">
//             <CardTitle className="flex items-center gap-3 text-white text-xl">
//               <motion.div
//                 whileHover={{ rotate: 360 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <Users className="h-6 w-6" />
//               </motion.div>
//               Select Visitor for Exit
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-8">
//             {visitors.length === 0 ? (
//               <motion.div
//                 className="text-center py-12"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.5 }}
//               >
//                 <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-600 text-lg">
//                   No visitors currently in the office.
//                 </p>
//               </motion.div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {visitorsdetails.map((visitor, index) => (
//                   <motion.div
//                     key={visitor._id}
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: index * 0.1 }}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     <Card
//                       className={`cursor-pointer transition-all duration-300 border-2 bg-white hover:shadow-lg ${
//                         selectedVisitor?._id === visitor._id
//                           ? "border-blue-400 bg-blue-50 shadow-lg scale-105"
//                           : "border-gray-200 hover:border-gray-300"
//                       }`}
//                       onClick={() => onSelectVisitor(visitor)}
//                     >
//                       <CardContent className="p-6">
//                         <div className="flex items-center gap-3">
//                           <motion.div
//                             whileHover={{ scale: 1.1 }}
//                             transition={{
//                               type: "spring",
//                               stiffness: 300,
//                             }}
//                           >
//                             <Avatar className="h-12 w-12 ring-2 ring-gray-200">
//                               <AvatarImage
//                                 src={visitor.photo}
//                               />
//                               <AvatarFallback className="bg-blue-600 text-white">
//                                 {visitor.name
//                                   .split(" ")
//                                   .map((n) => n[0])
//                                   .join("")
//                                   .toUpperCase()}
//                               </AvatarFallback>
//                             </Avatar>
//                           </motion.div>
//                           <div className="flex-1">
//                             <p className="font-medium text-gray-900">
//                               {visitor.name}
//                             </p>
//                             <p className="text-sm text-gray-600">
//                               Meeting: {visitor.meetWith}
//                             </p>
//                             <div className="flex items-center gap-1 text-sm text-gray-500">
//                               <Clock className="h-3 w-3" />
//                               Entry:{" "}
//                               {formatTime(visitor.entryTime)}
//                             </div>
//                           </div>
//                           {selectedVisitor?._id ===
//                             visitor._id && (
//                             <motion.div
//                               initial={{ scale: 0 }}
//                               animate={{ scale: 1 }}
//                               transition={{
//                                 type: "spring",
//                                 stiffness: 300,
//                               }}
//                             >
//                               <CheckCircle className="h-6 w-6 text-blue-600" />
//                             </motion.div>
//                           )}
//                         </div>
//                         {visitor.electronicItems.length > 0 && (
//                           <div className="mt-3 pt-3 border-t border-gray-200">
//                             <p className="text-xs text-gray-500">
//                               Electronics:{" "}
//                               {visitor.electronicItems
//                                 .map((item) => item.name)
//                                 .join(", ")}
//                             </p>
//                           </div>
//                         )}
//                       </CardContent>
//                     </Card>
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* Exit Code Entry */}
//       <AnimatePresence>
//         {selectedVisitor && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Card className="bg-white shadow-lg border border-gray-200">
//               <CardHeader className="bg-gray-700 rounded-t-lg">
//                 <CardTitle className="flex items-center gap-3 text-white text-xl">
//                   <motion.div
//                     whileHover={{ rotate: 360 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     <LogOut className="h-6 w-6" />
//                   </motion.div>
//                   Exit Verification
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-8 space-y-6">
//                 <motion.div
//                   className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2 }}
//                 >
//                   <motion.div
//                     whileHover={{ scale: 1.1 }}
//                     transition={{
//                       type: "spring",
//                       stiffness: 300,
//                     }}
//                   >
//                     <Avatar className="h-16 w-16 ring-2 ring-gray-200">
//                       <AvatarImage
//                         src={selectedVisitor.photo}
//                       />
//                       <AvatarFallback className="bg-blue-600 text-white text-lg">
//                         {selectedVisitor.name
//                           .split(" ")
//                           .map((n) => n[0])
//                           .join("")
//                           .toUpperCase()}
//                       </AvatarFallback>
//                     </Avatar>
//                   </motion.div>
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-xl text-gray-900">
//                       {selectedVisitor.name}
//                     </h3>
//                     <p className="text-gray-600">
//                       Meeting with: {selectedVisitor.meetWith}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       Phone: {selectedVisitor.mobileNo}
//                     </p>
//                   </div>
//                   <motion.div
//                     whileHover={{ scale: 1.05 }}
//                     transition={{
//                       type: "spring",
//                       stiffness: 300,
//                     }}
//                   >
//                     <Badge className="bg-success shadow-md text-lg px-4 py-2">
//                       Exit Code: {selectedVisitor.uniqueCode || "N/A"}
//                     </Badge>
//                   </motion.div>
//                 </motion.div>

//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                 >
//                   <Alert className="bg-blue-50 border-blue-200">
//                     <Smartphone className="h-4 w-4 text-blue-600" />
//                     <AlertDescription className="text-gray-700">
//                       The exit code has been sent to the
//                       visitor's phone via WhatsApp:{" "}
//                       <strong className="text-gray-900">
//                         {selectedVisitor.mobileNo}
//                       </strong>
//                     </AlertDescription>
//                   </Alert>
//                 </motion.div>

//                 <motion.div
//                   className="space-y-4"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.4 }}
//                 >
//                   <Label
//                     htmlFor="exitCode"
//                     className="text-gray-700 text-lg"
//                   >
//                     Enter Exit Code
//                   </Label>
//                   <div className="flex gap-4">
//                     <motion.div
//                       className="flex-1"
//                       whileHover={{ scale: 1.01 }}
//                       transition={{
//                         type: "spring",
//                         stiffness: 300,
//                       }}
//                     >
//                       <Input
//                         id="exitCode"
//                         value={exitCode}
//                         onChange={(e) =>
//                           setExitCode(
//                             e.target.value.toUpperCase(),
//                           )
//                         }
//                         placeholder="Enter 6-digit code"
//                         className="font-mono text-xl text-center bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 h-14"
//                         maxLength={6}
//                       />
//                     </motion.div>
//                     <motion.div
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       <Button
//                         onClick={handleExit}
//                         disabled={
//                           exitCode.length !== 6 ||
//                           exitStatus === "success"
//                         }
//                         className={`px-8 h-14 text-lg ${
//                           exitStatus === "success"
//                             ? "bg-success"
//                             : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
//                         }`}
//                       >
//                         {exitStatus === "success" ? (
//                           <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             className="flex items-center gap-2"
//                           >
//                             <CheckCircle className="h-5 w-5" />
//                             Success
//                           </motion.div>
//                         ) : (
//                           "Process Exit"
//                         )}
//                       </Button>
//                     </motion.div>
//                   </div>
//                 </motion.div>

//                 <AnimatePresence>
//                   {exitStatus === "success" && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -20 }}
//                     >
//                       <Alert className="bg-green-50 border-green-200">
//                         <CheckCircle className="h-4 w-4 text-green-600" />
//                         <AlertDescription className="text-green-700">
//                           Visitor exit processed successfully!{" "}
//                           {selectedVisitor.name} has been
//                           checked out.
//                         </AlertDescription>
//                       </Alert>
//                     </motion.div>
//                   )}

//                   {exitStatus === "error" && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -20 }}
//                     >
//                       <Alert className="bg-red-50 border-red-200">
//                         <XCircle className="h-4 w-4 text-red-600" />
//                         <AlertDescription className="text-red-700">
//                           {errorMessage}
//                         </AlertDescription>
//                       </Alert>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {selectedVisitor.electronicItems.length > 0 && (
//                   <motion.div
//                     className="space-y-3"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.5 }}
//                   >
//                     <Label className="text-gray-700 text-lg">
//                       Electronic Items to Return:
//                     </Label>
//                     <div className="space-y-3">
//                       {selectedVisitor.electronicItems.map(
//                         (item, index) => (
//                           <motion.div
//                             key={item.id}
//                             className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{
//                               delay: 0.6 + index * 0.1,
//                             }}
//                             whileHover={{ scale: 1.01 }}
//                           >
//                             {item.photo && (
//                               <motion.img
//                                 src={item.photo}
//                                 alt={item.name}
//                                 className="w-12 h-12 object-cover rounded-lg"
//                                 whileHover={{ scale: 1.1 }}
//                               />
//                             )}
//                             <div>
//                               <p className="font-medium text-gray-900">
//                                 {item.name}
//                               </p>
//                               <p className="text-sm text-gray-600">
//                                 Serial: {item.serialNumber}
//                               </p>
//                             </div>
//                           </motion.div>
//                         ),
//                       )}
//                     </div>
//                   </motion.div>
//                 )}
//               </CardContent>
//             </Card>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { Alert, AlertDescription } from "./ui/alert";
import {
  LogOut,
  Clock,
  User,
  CheckCircle,
  XCircle,
  Camera,
  Users,
  Copy
} from "lucide-react";
import { useApi } from "../hooks/useApi";

interface Visitor {
  _id: string;
  name: string;
  photo?: string;
  email: string;
  mobileNo: string;
  meetWith: string;
  entryTime: Date;
  exitTime?: string;
  status: string;
  electronicItems: {
    _id: string;
    name: string;
    photo?: string;
    serialNumber: string;
  }[];
  uniqueCode?: string;
};
interface ApiResponse {
  data: any;
  visitors: Visitor[];
}

interface ExistProcessProps {
  officeId: string | null;
}

export function ExitProcess({ officeId}: ExistProcessProps) {
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [exitCode, setExitCode] = useState("");
  const [exitStatus, setExitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const { callApi, loading } = useApi<ApiResponse>();
  const [visitors, setVisitors] = React.useState<Visitor[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);  
  const [copied, setCopied] = useState(false);
  const pageSize = 30;

  const formatTime = (date: Date) =>
    new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // fetch visitors data
     useEffect(() => {
        // Fetch visitors data from API or state management
        const fetchVisitors = async () => {
          try {
            const {data,error} = await callApi(`/visitor/getAllVisitors?page=${currentPage}&limit=${pageSize}&search&status&officeId=${officeId}`, 
              { 
                method: 'GET' 
              });
            if (data && data.data && Array.isArray(data.data.visitors)) {
              setVisitors(data?.data?.visitors || []);
              setTotalPages(data?.data?.total || 0);
              console.log('Visitors fetched successfully:', data?.data?.visitors);
            } else {
              console.error('Invalid data format:', data);
            }
            // Handle error if any      
            if (error) {
              console.error('Error fetching visitors:', error);
              return; 
            } 
          } catch (error) {
            console.error('Error fetching visitors:', error);
          }
        };
        fetchVisitors();
      }, [currentPage,exitStatus]);

  const handleExit = async() => {
    if (!selectedVisitor) return;
    const exitTime = new Date().toISOString();
    const payload = {
       "code": exitCode.toUpperCase(),
      //  "existTime": exitTime
    }
    const {data,error} = await callApi(`/visitor/checkOutVisitor`, 
          { 
            method: 'PUT',
            body:payload 
          });
    if (data) {
      setExitStatus("success");
      setTimeout(() => {
        setExitStatus("idle");
        setSelectedVisitor(null);
        setExitCode("");
      }, 2000);
    } else {
      setExitStatus(error);
      setErrorMessage("Invalid exit code!");
    }
  };

  const inVisitors = Array.isArray(visitors)
    ? visitors.filter(visitor => visitor.status === "In")
    : [];

  console.log('In visitors:', inVisitors);
 // Function to handle camera access
  const handleOpenCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    // Do something with the stream, e.g., show in a video element
    const video = document.createElement("video");
    video.srcObject = stream;
    video.autoplay = true;
    video.style.width = "100%";
    video.style.height = "auto";
    // document.body.appendChild(video); // or append to a modal/container
  } catch (err) {
    console.error("Error accessing camera:", err);
    alert("Unable to access camera.");
  }
};

  return (
    <motion.div className="space-y-6">
      {/* Visitor Selection */}
      <Card className="bg-white shadow-lg border border-gray-200">
        <CardHeader className="bg-blue-600 rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-white text-xl">
            <Users className="h-6 w-6" />
            Select Visitor for Exit
          </CardTitle>
        </CardHeader>
        {/* <CardContent className="p-8">
          {visitorsdetails.filter(visitor => visitor.status != "In")? (
            <div className="text-center py-12">
              <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                No visitors currently in the office.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {visitorsdetails.map((visitor) => (
                <Card
                  key={visitor._id}
                  className={`cursor-pointer transition-all duration-300 border-2 ${
                    selectedVisitor?._id === visitor._id
                      ? "border-blue-400 bg-blue-50 shadow-lg scale-105"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedVisitor(visitor)}
                >
                  <CardContent className="p-6 flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-gray-200">
                      <AvatarImage src={visitor.photo} />
                      <AvatarFallback className="bg-blue-600 text-white">
                        {visitor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{visitor.name}</p>
                      <p className="text-sm text-gray-600">
                        Meeting: {visitor.meetWith}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-3 w-3" />
                        Entry: {formatTime(visitor.entryTime)}
                      </div>
                    </div>
                    {selectedVisitor?._id === visitor._id && (
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent> */}
        <CardContent className="p-8">
          {visitors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {visitors
                .filter(visitor => visitor.status === "In")
                .map((visitor) => (
                  <Card
                    key={visitor._id}
                    className={`cursor-pointer transition-all duration-300 border-2 ${
                      selectedVisitor?._id === visitor._id
                        ? "border-blue-400 bg-blue-50 shadow-lg scale-105"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    // onClick={() => setSelectedVisitor(visitor)}
                    onClick={() => 
                        setSelectedVisitor(prev => {
                          if(prev?._id === visitor._id) {
                            setExitCode(""); // clear exit code
                            return null;    // unselect
                          }
                          return visitor;   // select new
                        })
                      }
                  >
                    <CardContent className="p-6 flex items-center gap-3">
                      <Avatar className="h-12 w-12 ring-2 ring-gray-200">
                        <AvatarImage src={visitor.photo} />
                        <AvatarFallback className="bg-blue-600 text-white">
                          {visitor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{visitor.name}</p>
                        <p className="text-sm text-gray-600">
                          Meeting: {visitor.meetWith}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="h-3 w-3" />
                          Entry: {formatTime(visitor.entryTime)}
                        </div>
                      </div>
                      {selectedVisitor?._id === visitor._id && (
                        <CheckCircle className="h-6 w-6 text-blue-600" />
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>) : (
            <div className="text-center py-12">
              <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                No visitors currently in the office.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Exit Code Entry */}
      <AnimatePresence>
        {selectedVisitor && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white shadow-lg border border-gray-200">
              <CardHeader className="bg-gray-700 rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-white text-xl">
                  <LogOut className="h-6 w-6" />
                  Exit Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <Avatar className="h-16 w-16 ring-2 ring-gray-200">
                    <AvatarImage src={selectedVisitor.photo} />
                    <AvatarFallback className="bg-blue-600 text-white text-lg">
                      {selectedVisitor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-gray-900">
                      {selectedVisitor.name}
                    </h3>
                    <p className="text-gray-600">
                      Meeting with: {selectedVisitor.meetWith}
                    </p>
                    <p className="text-sm text-gray-500">
                      Phone: {selectedVisitor.mobileNo}
                    </p>
                  </div>
                  {/* <Badge className="bg-success shadow-md text-lg px-4 py-2">
                    Exit Code: {selectedVisitor.uniqueCode || "N/A"}
                  </Badge> */}
                  <Badge
                    className="bg-success shadow-md text-lg px-4 py-2 cursor-pointer select-none"
                    onClick={() => {
                      const code = selectedVisitor.uniqueCode || "";
                      if (!code) return;
                      navigator.clipboard.writeText(code);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    }}
                    title="Click to copy"
                  >
                    Exit Code: {selectedVisitor.uniqueCode || "N/A"} {copied && "✅"}
                  </Badge>
                </div>

                <Label htmlFor="exitCode" className="text-gray-700 text-lg">
                  Enter Exit Code
                </Label>
                <div className="flex gap-4">
                  <Input
                    id="exitCode"
                    value={exitCode}
                    onChange={(e) => setExitCode(e.target.value.toUpperCase())}
                    placeholder="Enter 8-digit code"
                    maxLength={8}
                    className="flex-1 font-mono text-xl text-center bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 h-14"
                  />
                  
                   {/* Camera button */}
                  <Button
                    onClick={handleOpenCamera}
                    variant="outline"
                    className="h-14 w-14 flex items-center justify-center p-2"
                  >
                    <Camera className="h-6 w-6 text-gray-700" />
                  </Button>
                  <Button
                    onClick={handleExit}
                    disabled={exitCode.length !== 8 || exitStatus === "success"}
                    className={`px-8 h-14 text-lg ${
                      exitStatus === "success"
                        ? "bg-success"
                        : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
                    }`}
                  >
                    {exitStatus === "success" ? "Success" : "Process Exit"}
                  </Button>
                </div>

                <AnimatePresence>
                  {exitStatus === "success" && (
                    <Alert className="bg-green-50 border-green-200 mt-4">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-700">
                        Visitor exit processed successfully!{" "}
                        {selectedVisitor.name} has been checked out.
                      </AlertDescription>
                    </Alert>
                  )}
                  {exitStatus === "error" && (
                    <Alert className="bg-red-50 border-red-200 mt-4">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-700">
                        {errorMessage}
                      </AlertDescription>
                    </Alert>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
