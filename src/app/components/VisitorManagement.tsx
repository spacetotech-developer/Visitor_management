// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence,anticipate } from 'motion/react';
// import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
// import { Button } from './ui/button';
// import { Badge } from './ui/badge';
// import { Clock, User, Phone, Mail, Monitor, LogOut, Sparkles, TrendingUp, UserCheck } from 'lucide-react';
// // import { OfficeSelector } from './OfficeSelector';
// import { OfficeSelector } from '../office-selector/page';
// import { VisitorForm } from './VisitorForm';
// import { VisitorTable } from './VisitorTable';
// import { ExitProcess } from './ExitProcess';
// import { useApi } from '../hooks/useApi';
// export interface ElectronicItem {
//   id: string;
//   name: string;
//   serialNumber: string;
//   photo?: string;
// }

// export interface Visitor {
//   name: string;
//   email: string;
//   phone: string;
//   photo?: string;
//   meetWith: string;
//   electronicItems: ElectronicItem[];
//   entryTime: Date;
//   exitTime?: Date;
//   exitCode?: string;
//   officeId: string;
// }

// interface VisitorManagementProps {
//   user?: { username: string } | null;
//   onLogout?: () => void;
// }
// interface ApiResponse {
//   data: Array<Visitor>,
//   message: string,
//   status: string,
//   error?: string,
// };

// export function VisitorManagement({ user, onLogout }: VisitorManagementProps) {
//   const [selectedOffice, setSelectedOffice] = useState<string>('');
//   const [currentView, setCurrentView] = useState<'entry' | 'dashboard' | 'exit'>('entry');
//   const [visitors, setVisitors] = useState<Visitor[]>([]);
//   const { callApi, loading } = useApi<ApiResponse>();
//   const [selectedVisitorForExit, setSelectedVisitorForExit] = useState<Visitor | null>(null);

//   // Mock offices data
//   const offices = [
//     { id: 'office-1', name: 'Main Office - Mumbai', address: 'Bandra Kurla Complex' },
//     { id: 'office-2', name: 'Branch Office - Delhi', address: 'Connaught Place' },
//     { id: 'office-3', name: 'Tech Hub - Bangalore', address: 'Electronic City' },
//   ];

//   const generateExitCode = () => {
//     return Math.random().toString(36).substring(2, 8).toUpperCase();
//   };

//   const addVisitor = async (visitorData: Omit<Visitor, 'id' | 'entryTime' | 'status' | 'exitCode' | 'officeId'>) => {
//    alert('Visitor added successfully!');
//     const newVisitor: Visitor = {
//       ...visitorData,
//       entryTime: new Date(),
//       exitCode: generateExitCode(),
//       officeId: selectedOffice,
//     };
//     const payload = {
//     "name": newVisitor.name,
//     "photo": newVisitor.photo,
//     "mobileNo": newVisitor.phone,
//     "email": newVisitor.email,
//     "meetWith": newVisitor.meetWith,
//     "electronicItems": newVisitor.electronicItems.map(({ id, ...rest }) => rest),
//     "entryTime": newVisitor.entryTime.toISOString(),
//     }
//     const {data,error} = await callApi(`/visitor/createVisitor`,{
//       method: 'POST',
//       body:payload,
//     });
//     if(data) {
//       setVisitors(data.data);
//     }
//     if (error) {
//       console.error('Error adding visitor:', error);
//       return;
//     }
//     // Simulate sending WhatsApp message with exit code
//     console.log(`WhatsApp message sent to ${newVisitor.phone}: Your exit code is ${newVisitor.exitCode}`);
//   };

//   // const exitVisitor = (visitorId: string, enteredCode: string) => {
//   //   const visitor = visitors.find(v => v.id === visitorId);
//   //   if (visitor && visitor.exitCode === enteredCode) {
//   //     setVisitors(prev => prev.map(v => 
//   //       v.id === visitorId 
//   //         ? { ...v, exitTime: new Date(), status: 'left-office' as const }
//   //         : v
//   //     ));
//   //     setSelectedVisitorForExit(null);
//   //     return true;
//   //   }
//   //   return false;
//   // };

//   // const currentOfficeVisitors = visitors.filter(v => v.officeId === selectedOffice);
//   // const activeVisitors = currentOfficeVisitors.filter(v => v.status === 'In');

//   if (!selectedOffice) {
//     return (
//       <OfficeSelector 
//         offices={offices} 
//         onSelectOffice={setSelectedOffice} 
//         user={user}
//         onLogout={onLogout}
//       />
//     );
//   }

//   const selectedOfficeInfo = offices.find(o => o.id === selectedOffice);

//   const pageVariants = {
//     initial: { opacity: 0, y: 20 },
//     in: { opacity: 1, y: 0 },
//     out: { opacity: 0, y: -20 }
//   };

//   const pageTransition = {
//     ease: anticipate,
//     duration: 0.5
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="relative z-10 min-h-screen p-4">
//         <div className="mx-auto max-w-7xl">
//           {/* Header */}
//           <motion.div 
//             className="mb-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <motion.h1 
//                   className="text-3xl font-semibold text-gray-900 mb-2"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.2 }}
//                 >
//                   Visitor Management System
//                 </motion.h1>
//                 <motion.p 
//                   className="text-gray-600 text-lg"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                 >
//                   {selectedOfficeInfo?.name} - {selectedOfficeInfo?.address}
//                 </motion.p>
//               </div>
//               <div className="flex items-center gap-4">
//                  {user && (
//                   <motion.div
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <Badge 
//                       className="px-4 py-2 text-sm bg-blue-600 border-0 shadow-md"
//                     >
//                       <UserCheck className="mr-2 h-4 w-4" />
//                       {user.username}
//                     </Badge>
//                   </motion.div>
//                 )}
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Badge 
//                     className="px-4 py-2 text-sm bg-success border-0 shadow-md"
//                   >
//                     <User className="mr-2 h-4 w-4" />
//                     {/* {activeVisitors.length} Active Visitors */}
//                     {0} Active Visitors
//                   </Badge>
//                 </motion.div>
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Button 
//                     variant="outline" 
//                     onClick={() => setSelectedOffice('')}
//                     className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
//                   >
//                     <LogOut className="h-4 w-4" />
//                     Change Office
//                   </Button>
//                 </motion.div>
//                   {onLogout && (
//                   <motion.div
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <Button 
//                       variant="outline" 
//                       onClick={onLogout}
//                       className="flex items-center gap-2 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
//                     >
//                       <LogOut className="h-4 w-4" />
//                       Logout
//                     </Button>
//                   </motion.div>
//                 )}
//               </div>
//             </div>
//           </motion.div>

//           {/* Navigation */}
//           <motion.div 
//             className="mb-8 flex gap-2 justify-center"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             {[
//               { key: 'entry', label: 'New Entry', icon: User },
//               { key: 'dashboard', label: 'Dashboard', icon: TrendingUp },
//               { key: 'exit', label: 'Exit Process', icon: LogOut }
//             ].map(({ key, label, icon: Icon }) => (
//               <motion.div
//                 key={key}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <Button 
//                   variant={currentView === key ? 'default' : 'outline'}
//                   onClick={() => setCurrentView(key as any)}
//                   className={`px-6 py-3 text-base flex items-center gap-2 transition-all duration-300 ${
//                     currentView === key 
//                       ? 'bg-blue-600 hover:bg-blue-700 shadow-md' 
//                       : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
//                   }`}
//                 >
//                   <Icon className="h-4 w-4" />
//                   {label}
//                 </Button>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Main Content */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentView}
//               initial="initial"
//               animate="in"
//               exit="out"
//               variants={pageVariants}
//               transition={pageTransition}
//             >
//               {currentView === 'entry' && (
//                 <VisitorForm onSubmit={addVisitor} />
//               )}

//               {currentView === 'dashboard' && (
//                 <VisitorTable />
//               )}

//               {currentView === 'exit' && (
//                 // <ExitProcess 
//                 //   visitors={activeVisitors}
//                 //   onExit={exitVisitor}
//                 //   selectedVisitor={selectedVisitorForExit}
//                 //   onSelectVisitor={setSelectedVisitorForExit}
//                 // />
//                   <ExitProcess />
//               )}
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, anticipate } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { User, LogOut, TrendingUp, UserCheck } from "lucide-react";
import { VisitorForm } from "./VisitorForm";
import { VisitorTable } from "./VisitorTable";
import { ExitProcess } from "./ExitProcess";
import { useApi } from "../hooks/useApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
export interface ElectronicItem {
  id: string;
  name: string;
  serialNumber: string;
  photo?: string;
  photoUrl?: string;
}

export interface Visitor {
  name: string;
  email: string;
  phone: string;
  photo?: string;
  meetWith: string;
  electronicItems: ElectronicItem[];
  entryTime: Date;
  exitTime?: Date;
  exitCode?: string;
  officeId: string;
}

interface VisitorState {
  totalVisitors: number;
  totalVisitorsIn: number;
  totalVisitorsOut: number;
  totalElectronicItems: number;
}

interface VisitorManagementProps {
  user?: { username: string } | null;
  onLogout?: () => void;
  selectedOfficeFromUrl: string;
}

interface ApiResponse {
  data: any;
  total:number;
}

export function VisitorManagement({
  user,
  onLogout,
  selectedOfficeFromUrl,
}: VisitorManagementProps) {
  const searchParams = useSearchParams();
  const officeId = searchParams.get("office");
  const selectedOffice = selectedOfficeFromUrl;
  const [currentView, setCurrentView] = useState<"entry" | "dashboard" | "exit">("entry");
  const [visitorState, setVisitorState] = useState<VisitorState | undefined>(undefined);
  const [visitors, setVisitors] = useState(false);
  const { callApi } = useApi<ApiResponse>();
  const router = useRouter();
  const { offices,userInfo } = useContext(DataContext)!;

   useEffect(() => {
      // Fetch visitors data from API or state management
      const fetchVisitors = async () => {
        try {
          const {data,error} = await callApi(`visitor/getVisitorStats?officeId=${officeId}`, 
            { 
              method: 'GET' 
            });
          if (data && data.data && data.data.total) {
            setVisitorState({
              totalVisitors: data.data.total.totalVisitors,
              totalVisitorsIn: data.data.total.totalVisitorsIn,
              totalVisitorsOut: data.data.total.totalVisitorsOut,
              totalElectronicItems: data.data.dayStats.electronicCount,
            });
          } else {
            console.error("Invalid data format:", data);
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
      // Log the fetching action
      console.log('Fetching visitors data...');
    }, [visitors]);

  // Safe find
  const selectedOfficeInfo = offices.find(
    (o) => o._id === selectedOffice
  ) || null;

  const generateExitCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const addVisitor = async (
    visitorData: Omit<Visitor, "id" | "entryTime" | "status" | "exitCode" | "officeId">
  ) => {
    const newVisitor: Visitor = {
      ...visitorData,
      entryTime: new Date(),
      exitCode: generateExitCode(),
      officeId: selectedOffice,
    };
    const payload = {
      name: newVisitor.name,
      photo: newVisitor.photo,
      mobileNo: newVisitor.phone,
      email: newVisitor.email,
      meetWith: newVisitor.meetWith,
      electronicItems: newVisitor.electronicItems.map(({ id, ...rest }) => rest),
      // entryTime: newVisitor.entryTime.toISOString(),
      officeId: officeId,
    };
    const { data, error } = await callApi(`/visitor/createVisitor`, {
      method: "POST",
      body: payload,
    });
    if (data) {
      // Optionally update local state or refetch visitors
      console.log("Visitor added:", data);
      setVisitors(true);
      // You might want to refetch the visitor stats here
    }
   
    if (error) {
      console.error("Error adding visitor:", error);
      return;
    }
    console.log(
      `WhatsApp message sent to ${newVisitor.phone}: Your exit code is ${newVisitor.exitCode}`
    );
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    ease: anticipate,
    duration: 0.5,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative z-10 min-h-screen p-4">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          {/* <motion.div
            className="mb-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <motion.h1
                  className="text-3xl font-semibold text-gray-900 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Visitor Management System
                </motion.h1>
                <motion.p
                  className="text-gray-600 text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedOfficeInfo?.officeName} - {selectedOfficeInfo?.officeAddress}
                </motion.p>
              </div>
              <div className="flex items-center gap-4">
                {user && (
                  <Badge className="px-4 py-2 text-sm bg-blue-600 border-0 shadow-md flex items-center">
                    <UserCheck className="mr-2 h-4 w-4" />
                    {userInfo?.username}
                  </Badge>
                )}
                <Badge className="px-4 py-2 text-sm bg-green-600 border-0 shadow-md flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  {visitorState ? visitorState.totalVisitorsIn : 0} Active Visitors
                </Badge>
                <Button
                  variant="outline"
                  onClick={() => router.push("/office")}
                  className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <LogOut className="h-4 w-4" />
                  Change Office
                </Button>
                  <Button
                    variant="outline"
                    onClick={onLogout}
                    className="flex items-center gap-2 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
              </div>
            </div>
          </motion.div> */}
          <motion.div
            className="mb-8 bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
              {/* Left: Title */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <motion.h1
                  className="text-2xl sm:text-3xl font-semibold text-gray-900"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Visitor Management System
                </motion.h1>
                <motion.p
                  className="text-gray-600 text-sm sm:text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedOfficeInfo?.officeName} - {selectedOfficeInfo?.officeAddress}
                </motion.p>
              </div>

              {/* Right: Badges and Buttons split */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full sm:w-auto justify-between">
                {/* Left badges */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4 mb-2 sm:mb-0">
                  {user && (
                    <Badge className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm bg-blue-600 border-0 shadow-md flex items-center whitespace-nowrap">
                      <UserCheck className="mr-1 sm:mr-2 h-4 w-4" />
                      {userInfo?.username}
                    </Badge>
                  )}
                  <Badge className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm bg-green-600 border-0 shadow-md flex items-center whitespace-nowrap">
                    <User className="mr-1 sm:mr-2 h-4 w-4" />
                    {visitorState ? visitorState.totalVisitorsIn : 0} Active
                  </Badge>
                </div>

                {/* Right buttons */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4">
                  <Button
                    variant="outline"
                    onClick={() => router.push("/office")}
                    className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm border-gray-300 text-gray-700 hover:bg-gray-50 whitespace-nowrap"
                  >
                    <LogOut className="h-4 w-4" />
                    Change Office
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onLogout}
                    className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 whitespace-nowrap"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="mb-8 flex gap-2 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { key: "entry", label: "New Entry", icon: User },
              { key: "dashboard", label: "Dashboard", icon: TrendingUp },
              { key: "exit", label: "Exit Process", icon: LogOut },
            ].map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={currentView === key ? "default" : "outline"}
                onClick={() => setCurrentView(key as any)}
                className={`px-6 py-3 text-base flex items-center gap-2 transition-all duration-300 ${
                  currentView === key
                    ? "bg-blue-600 hover:bg-blue-700 shadow-md"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Button>
            ))}
          </motion.div>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              {currentView === "entry" && <VisitorForm onSubmit={addVisitor} />}
              {currentView === "dashboard" && <VisitorTable officeId={officeId} visitorState={visitorState}/>}
              {currentView === "exit" && <ExitProcess officeId={officeId} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
