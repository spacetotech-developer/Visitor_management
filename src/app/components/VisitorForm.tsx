// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'motion/react';
// import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { Label } from './ui/label';
// import { Badge } from './ui/badge';
// import { Plus, X, Camera, User, CheckCircle, Mail, Phone, Building } from 'lucide-react';
// import { ElectronicItem, Visitor } from './VisitorManagement';

// interface VisitorFormProps {
//   onSubmit: (visitor: Omit<Visitor, '_id' | 'entryTime' | 'status' | 'exitCode' | "officeId" >) => void;
// }

// export function VisitorForm({ onSubmit }: VisitorFormProps) {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     meetWith: '',
//     photo: '',
//   });
  
//   const [electronicItems, setElectronicItems] = useState<ElectronicItem[]>([]);
//   const [newItem, setNewItem] = useState({
//     name: '',
//     serialNumber: '',
//     photo: '',
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const addElectronicItem = () => {
//     if (newItem.name && newItem.serialNumber) {
//       const item: ElectronicItem = {
//         id: `item-${Date.now()}`,
//         ...newItem,
//       };
//       setElectronicItems(prev => [...prev, item]);
//       setNewItem({ name: '', serialNumber: '', photo: '' });
//     }
//   };

//   const removeElectronicItem = (id: string) => {
//     setElectronicItems(prev => prev.filter(item => item.id !== id));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     onSubmit({
//       ...formData,
//       electronicItems,
//     });
    
//     // Reset form
//     setFormData({
//       name: '',
//       email: '',
//       phone: '',
//       meetWith: '',
//       photo: '',
//     });
//     setElectronicItems([]);
//     setIsSubmitting(false);
//   };

//   const isFormValid = formData.name && formData.email && formData.phone && formData.meetWith;

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: {
//         duration: 0.5
//       }
//     }
//   };

//   return (
//     <motion.div 
//       className="space-y-6"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {/* Visitor Information Card */}
//       <motion.div variants={itemVariants}>
//         <Card className="bg-white shadow-lg border border-gray-200">
//           <CardHeader className="bg-blue-600 rounded-t-lg">
//             <CardTitle className="flex items-center gap-3 text-white text-xl">
//               <motion.div
//                 whileHover={{ rotate: 360 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <User className="h-6 w-6" />
//               </motion.div>
//               Visitor Information
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-8">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <motion.div 
//                   className="space-y-2"
//                   whileHover={{ scale: 1.01 }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <Label htmlFor="name" className="flex items-center gap-2 text-gray-700">
//                     <User className="h-4 w-4" />
//                     Visitor Name *
//                   </Label>
//                   <Input
//                     id="name"
//                     value={formData.name}
//                     onChange={(e) => handleInputChange('name', e.target.value)}
//                     placeholder="Enter visitor's full name"
//                     className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
//                     required
//                   />
//                 </motion.div>
                
//                 <motion.div 
//                   className="space-y-2"
//                   whileHover={{ scale: 1.01 }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <Label htmlFor="email" className="flex items-center gap-2 text-gray-700">
//                     <Mail className="h-4 w-4" />
//                     Email Address *
//                   </Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => handleInputChange('email', e.target.value)}
//                     placeholder="visitor@example.com"
//                     className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
//                     required
//                   />
//                 </motion.div>
                
//                 <motion.div 
//                   className="space-y-2"
//                   whileHover={{ scale: 1.01 }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <Label htmlFor="phone" className="flex items-center gap-2 text-gray-700">
//                     <Phone className="h-4 w-4" />
//                     Phone Number *
//                   </Label>
//                   <Input
//                     id="phone"
//                     type="tel"
//                     value={formData.phone}
//                     onChange={(e) => handleInputChange('phone', e.target.value)}
//                     placeholder="+91 9876543210"
//                     className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
//                     required
//                   />
//                 </motion.div>
                
//                 <motion.div 
//                   className="space-y-2"
//                   whileHover={{ scale: 1.01 }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <Label htmlFor="meetWith" className="flex items-center gap-2 text-gray-700">
//                     <Building className="h-4 w-4" />
//                     Meeting With *
//                   </Label>
//                   <Input
//                     id="meetWith"
//                     value={formData.meetWith}
//                     onChange={(e) => handleInputChange('meetWith', e.target.value)}
//                     placeholder="Employee name or department"
//                     className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
//                     required
//                   />
//                 </motion.div>
//               </div>
              
//               <motion.div 
//                 className="space-y-2"
//                 whileHover={{ scale: 1.005 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 <Label htmlFor="photo" className="flex items-center gap-2 text-gray-700">
//                   <Camera className="h-4 w-4" />
//                   Visitor Photo URL (Optional)
//                 </Label>
//                 <Input
//                   id="photo"
//                   type="url"
//                   value={formData.photo}
//                   onChange={(e) => handleInputChange('photo', e.target.value)}
//                   placeholder="https://example.com/photo.jpg"
//                   className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
//                 />
//               </motion.div>
//             </form>
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* Electronic Items Section */}
//       <motion.div variants={itemVariants}>
//         <Card className="bg-white shadow-lg border border-gray-200">
//           <CardHeader className="bg-gray-700 rounded-t-lg">
//             <CardTitle className="flex items-center gap-3 text-white text-xl">
//               <motion.div
//                 whileHover={{ rotate: 360 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <Camera className="h-6 w-6" />
//               </motion.div>
//               Electronic Items
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-8 space-y-6">
//             {/* Add New Item */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <motion.div 
//                 className="space-y-2"
//                 whileHover={{ scale: 1.01 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 <Label htmlFor="name" className="text-gray-700">Product Name</Label>
//                 <Input
//                   id="name"
//                   value={newItem.name}
//                   onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
//                   placeholder="Laptop, Phone, Camera..."
//                   className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
//                 />
//               </motion.div>
              
//               <motion.div 
//                 className="space-y-2"
//                 whileHover={{ scale: 1.01 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 <Label htmlFor="serialNumber" className="text-gray-700">Serial Number</Label>
//                 <Input
//                   id="serialNumber"
//                   value={newItem.serialNumber}
//                   onChange={(e) => setNewItem(prev => ({ ...prev, serialNumber: e.target.value }))}
//                   placeholder="ABC123XYZ"
//                   className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
//                 />
//               </motion.div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="itemPhoto" className="text-gray-700">Photo URL (Optional)</Label>
//                 <div className="flex gap-2">
//                   <Input
//                     id="itemPhoto"
//                     type="url"
//                     value={newItem.photo}
//                     onChange={(e) => setNewItem(prev => ({ ...prev, photo: e.target.value }))}
//                     placeholder="https://..."
//                     className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
//                   />
//                   <motion.div
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <Button 
//                       type="button" 
//                       onClick={addElectronicItem}
//                       disabled={!newItem.name || !newItem.serialNumber}
//                       className="bg-success hover:shadow-md flex items-center gap-1"
//                     >
//                       <Plus className="h-4 w-4" />
//                       Add
//                     </Button>
//                   </motion.div>
//                 </div>
//               </div>
//             </div>

//             {/* Items List */}
//             <AnimatePresence>
//               {electronicItems.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: 'auto' }}
//                   exit={{ opacity: 0, height: 0 }}
//                   className="space-y-2"
//                 >
//                   <Label className="text-gray-700">Added Items:</Label>
//                   <div className="space-y-3">
//                     {electronicItems.map((item, index) => (
//                       <motion.div
//                         key={item.id}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         exit={{ opacity: 0, x: 20 }}
//                         transition={{ delay: index * 0.1 }}
//                         className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
//                       >
//                         <div className="flex items-center gap-3">
//                           {item.photo && (
//                             <motion.img 
//                               src={item.photo} 
//                               alt={item.name}
//                               className="w-12 h-12 object-cover rounded-lg"
//                               whileHover={{ scale: 1.1 }}
//                             />
//                           )}
//                           <div>
//                             <p className="font-medium text-gray-900">{item.name}</p>
//                             <p className="text-sm text-gray-600">Serial: {item.serialNumber}</p>
//                           </div>
//                         </div>
//                         <motion.div
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                         >
//                           <Button
//                             type="button"
//                             variant="outline"
//                             size="sm"
//                             onClick={() => removeElectronicItem(item.id)}
//                             className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400 hover:bg-red-50"
//                           >
//                             <X className="h-4 w-4" />
//                           </Button>
//                         </motion.div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* Submit Button */}
//       <motion.div 
//         className="flex justify-end"
//         variants={itemVariants}
//       >
//         <motion.div
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           <Button 
//             onClick={handleSubmit}
//             disabled={!isFormValid || isSubmitting}
//             className="px-12 py-4 text-lg bg-success hover:shadow-lg transition-all duration-300"
//           >
//             {isSubmitting ? (
//               <motion.div
//                 // animate={{ rotate: 360 }}
//                 transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                 className="flex items-center gap-2"
//               >
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
//                 Processing...
//               </motion.div>
//             ) : (
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="h-5 w-5" />
//                 Register Visitor
//               </div>
//             )}
//           </Button>
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// }
"use client";
import React, { useState, useEffect,useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Plus, X, Camera, User, CheckCircle, Mail, Phone, Building, Upload } from 'lucide-react';
import { ElectronicItem, Visitor } from './VisitorManagement';
import { NEXT_PUBLIC_API_BASE_URL} from '../config/config';


interface VisitorFormProps {
  onSubmit: (visitor: Omit<Visitor, '_id' | 'entryTime' | 'status' | 'exitCode' | "officeId" >) => void;
}

export function VisitorForm({ onSubmit }: VisitorFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    meetWith: '',
    photo: null as File | null,
    photoUrl: ''
  });
  
  const [electronicItems, setElectronicItems] = useState<ElectronicItem[]>([]);
  const [newItem, setNewItem] = useState({
    name: '',
    serialNumber: '',
    photo: null as File | null,
    photoUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visitorPhotoPreview, setVisitorPhotoPreview] = useState<string | null>(null);
  const [itemPhotoPreview, setItemPhotoPreview] = useState<string | null>(null);
  
  const visitorPhotoRef = useRef<HTMLInputElement>(null);
  const itemPhotoRef = useRef<HTMLInputElement>(null);

  // Function to upload image to API
  // const uploadImage = async (file: File): Promise<string> => {
  //   const VisitorFormData = new FormData();
  //   VisitorFormData.append('file', file);
    
  //   try {
  //     const response = await fetch('https://visitor-management-backend-m7yx.onrender.com/api/v1/util/upload', {
  //       method: 'POST',
  //       body: VisitorFormData,
  //     });
      
  //     if (!response.ok) {
  //       throw new Error(`Upload failed: ${response.statusText}`);
  //     }
      
  //     const data = await response.json();
  //     return data.url; // Assuming the API returns { url: '...' }
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //     throw error;
  //   }
  // };

  const uploadImage = async (file: File): Promise<string> => {
  const VisitorFormData = new FormData();
  VisitorFormData.append('file', file);

  const response = await fetch(
    `${NEXT_PUBLIC_API_BASE_URL}/util/upload`,
    { method: 'POST', body: VisitorFormData }
  );

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.msg || 'Upload failed');
  }

  return data.data; // <-- your backend returns URL in `data`
};

  // Camera related states and refs
    const [cameraOpenFor, setCameraOpenFor] = useState<"visitor" | "item" | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [uploading, setUploading] = useState(false);
    
    // Effect to handle camera stream
  useEffect(() => {
    if (cameraOpenFor && videoRef.current) {
      const startCamera = async () => {
        try {
          // Stop any existing stream
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
          }
          
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" }, // front camera
            audio: false,
          });
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            streamRef.current = stream;
            
            // Wait for video to load and play
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play().catch(err => {
                console.error("Error playing video:", err);
              });
            };
          }
        } catch (err) {
          console.error("Camera access denied or unavailable", err);
          alert("Unable to access camera. Please check permissions.");
        }
      };

      startCamera();
    }

    // Cleanup function to stop camera when component unmounts or camera closes
    return () => {
      if (!cameraOpenFor && streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, [cameraOpenFor]);

  // const capturePhoto = async () => {
  //   if (!videoRef.current || !canvasRef.current || !streamRef.current) return;
    
  //   const video = videoRef.current;
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");
    
  //   if (!ctx) return;

  //   // Set canvas dimensions to match video
  //   canvas.width = video.videoWidth;
  //   canvas.height = video.videoHeight;
    
  //   // Draw the current video frame to the canvas
  //   ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
  //   // Convert canvas to blob and create a file
  //   canvas.toBlob(async (blob) => {
  //     if (!blob) return;
      
  //     const file = new File([blob], "captured.jpg", { type: "image/jpeg" });
      
  //     try {
  //       setUploading(true);
  //       const imageUrl = await uploadImage(file);
        
  //       // if (cameraOpenFor === "visitor") {
  //       //   // Store the URL
  //       //   setFormData(prev => ({ ...prev, photoUrl: imageUrl }));
  //       //   const reader = new FileReader();
  //       //   reader.onload = (e) => {
  //       //     setVisitorPhotoPreview(e.target?.result as string);
  //       //   };
  //       //   reader.readAsDataURL(file);
  //       // } else if (cameraOpenFor === "item") {
  //       //   // Store the URL
  //       //   setNewItem(prev => ({ ...prev, photoUrl: imageUrl }));
  //       //   const reader = new FileReader();
  //       //   reader.onload = (e) => {
  //       //     setItemPhotoPreview(e.target?.result as string);
  //       //   };
  //       //   reader.readAsDataURL(file);
  //       // }
  //       if (cameraOpenFor === "visitor") {
  //         setFormData(prev => ({ ...prev, photoUrl: imageUrl })); // <-- store URL
  //         setVisitorPhotoPreview(URL.createObjectURL(file)); // just for preview
  //       } else if (cameraOpenFor === "item") {
  //         setNewItem(prev => ({ ...prev, photoUrl: imageUrl }));
  //         setItemPhotoPreview(URL.createObjectURL(file));
  //       }
  //     } catch (error) {
  //       console.error('Error uploading image:', error);
  //       alert('Failed to upload image. Please try again.');
  //     } finally {
  //       setUploading(false);
  //       stopCamera();
  //     }
  //   }, "image/jpeg", 0.95);
  // };

  const capturePhoto = async () => {
  if (!videoRef.current || !canvasRef.current || !streamRef.current) return;

  const video = videoRef.current;
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  // match canvas size to video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  canvas.toBlob(async (blob) => {
    if (!blob) return;

    const file = new File([blob], "captured.jpg", { type: "image/jpeg" });

    try {
      setUploading(true);
      const imageUrl = await uploadImage(file);

      if (cameraOpenFor === "visitor") {
        setFormData(prev => ({ ...prev, photoUrl: imageUrl }));
        setVisitorPhotoPreview(URL.createObjectURL(file));
      } else if (cameraOpenFor === "item") {
        setNewItem(prev => ({ ...prev, photoUrl: imageUrl }));
        setItemPhotoPreview(URL.createObjectURL(file));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
      stopCamera();
    }
  }, "image/jpeg", 0.95);
};


  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraOpenFor(null);
  };

  //  const handleVisitorPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0] || null;
  //   setFormData(prev => ({ ...prev, photo: file }));
    
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setVisitorPhotoPreview(e.target?.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     setVisitorPhotoPreview(null);
  //   }
  // };
   const handleVisitorPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0] || null;
  setFormData(prev => ({ ...prev, photo: file }));

  if (file) {
    try {
      setUploading(true);
      const imageUrl = await uploadImage(file);
      setFormData(prev => ({ ...prev, photoUrl: imageUrl }));
      setVisitorPhotoPreview(URL.createObjectURL(file));
    } finally {
      setUploading(false);
    }
  } else {
    setVisitorPhotoPreview(null);
    setFormData(prev => ({ ...prev, photoUrl: '' }));
  }
};


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // const handleItemPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0] || null;
  //   setNewItem(prev => ({ ...prev, photo: file }));
    
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setItemPhotoPreview(e.target?.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     setItemPhotoPreview(null);
  //   }
  // };
//   const handleItemPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   const file = e.target.files?.[0] || null;
//   setNewItem(prev => ({ ...prev, photo: file }));

//   if (file) {
//     // preview
//     setItemPhotoPreview(URL.createObjectURL(file));

//     // upload
//     try {
//       setUploading(true);
//       const imageUrl = await uploadImage(file);
//       setNewItem(prev => ({ ...prev, photoUrl: imageUrl }));
//     } catch (err) {
//       console.error('Failed to upload item photo', err);
//     } finally {
//       setUploading(false);
//     }
//   } else {
//     setItemPhotoPreview(null);
//     setNewItem(prev => ({ ...prev, photoUrl: '' }));
//   }
// };
   const handleItemPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0] || null;
  setNewItem(prev => ({ ...prev, photo: file }));

  if (file) {
    setItemPhotoPreview(URL.createObjectURL(file)); // preview
    try {
      setUploading(true);
      const imageUrl = await uploadImage(file); // API upload
      setNewItem(prev => ({ ...prev, photoUrl: imageUrl }));
    } catch (err) {
      console.error('Failed to upload item photo', err);
    } finally {
      setUploading(false);
    }
  } else {
    setItemPhotoPreview(null);
    setNewItem(prev => ({ ...prev, photoUrl: '' }));
  }
};



  // const addElectronicItem = () => {
  //   if (newItem.name && newItem.serialNumber) {
  //     const item: ElectronicItem = {
  //       id: `item-${Date.now()}`,
  //       name: newItem.name,
  //       serialNumber: newItem.serialNumber,
  //       photo: newItem.photo ? URL.createObjectURL(newItem.photo) : '',
  //     };
  //     setElectronicItems(prev => [...prev, item]);
  //     setNewItem({ name: '', serialNumber: '', photo: null });
  //     setItemPhotoPreview(null);
  //     if (itemPhotoRef.current) itemPhotoRef.current.value = '';
  //   }
  // };

//   const addElectronicItem = () => {
//   if (newItem.name && newItem.serialNumber) {
//     const item: ElectronicItem = {
//       id: `item-${Date.now()}`,
//       name: newItem.name,
//       serialNumber: newItem.serialNumber,
//       photo: newItem.photoUrl || '', // <-- use uploaded URL if available
//     };

//     setElectronicItems(prev => [...prev, item]);

//     // reset newItem state
//     setNewItem({ name: '', serialNumber: '', photo: null, photoUrl: '' });
//     setItemPhotoPreview(null);
//     if (itemPhotoRef.current) itemPhotoRef.current.value = '';
//   }
// };

 const addElectronicItem = () => {
  if (newItem.name && newItem.serialNumber) {
    const item: ElectronicItem = {
      id: `item-${Date.now()}`,
      name: newItem.name,
      serialNumber: newItem.serialNumber,
      ...(newItem.photoUrl ? { photo: newItem.photoUrl } : {}), // only include photo if exists
    };

    setElectronicItems(prev => [...prev, item]);

    // reset newItem state
    setNewItem({ name: '', serialNumber: '', photo: null, photoUrl: '' });
    setItemPhotoPreview(null);
    if (itemPhotoRef.current) itemPhotoRef.current.value = '';
  }
};

  const removeElectronicItem = (id: string) => {
    setElectronicItems(prev => prev.filter(item => item.id !== id));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
    
  //   // Simulate API call delay
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   console.log(visitorPhotoPreview," visitorPhotoPreview");
  //   // Convert File objects to data URLs for submission
  //   const visitorPhotoDataUrl = formData.photo ? await fileToDataURL(formData.photo) : '';
    
  //   const electronicItemsWithDataUrls = await Promise.all(
  //     electronicItems.map(async (item) => ({
  //       ...item,
  //       photo: item.photo // Already a data URL from when it was added
  //     }))
  //   );
    
  //   onSubmit({
  //     ...formData,
  //     photo: visitorPhotoDataUrl,
  //     electronicItems: electronicItemsWithDataUrls,
  //   });
    
  //   // Reset form
  //   setFormData({
  //     name: '',
  //     email: '',
  //     phone: '',
  //     meetWith: '',
  //     photo: null,
  //     photoUrl: ''
  //   });
  //   setElectronicItems([]);
  //   setVisitorPhotoPreview(null);
  //   setIsSubmitting(false);
  //   if (visitorPhotoRef.current) visitorPhotoRef.current.value = '';
  // };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  await new Promise(resolve => setTimeout(resolve, 500));

  const electronicItemsWithUrls = electronicItems.map(item => ({
    ...item,
    photo: item.photoUrl || ''  // send uploaded URL
  }));

  onSubmit({
    ...formData,
    photo: formData.photoUrl || '',
    // electronicItems: electronicItemsWithUrls,
    electronicItems: electronicItems.map(item => ({
    ...item,
    photo: item.photoUrl || item.photo || '', // item photo URL if exists
  })),
  });

  // reset
  setFormData({
    name: '',
    email: '',
    phone: '',
    meetWith: '',
    photo: null,
    photoUrl: ''
  });
  setElectronicItems([]);
  setVisitorPhotoPreview(null);
  setIsSubmitting(false);
  if (visitorPhotoRef.current) visitorPhotoRef.current.value = '';
};


  const fileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const isFormValid = formData.name && formData.email && formData.phone && formData.meetWith;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Visitor Information Card */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white shadow-lg border border-gray-200">
          <CardHeader className="bg-blue-600 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-white text-xl">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <User className="h-6 w-6" />
              </motion.div>
              Visitor Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  className="space-y-2"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Label htmlFor="name" className="flex items-center gap-2 text-gray-700">
                    <User className="h-4 w-4" />
                    Visitor Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter visitor's full name"
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                    required
                  />
                </motion.div>
                
                <motion.div 
                  className="space-y-2"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Label htmlFor="email" className="flex items-center gap-2 text-gray-700">
                    <Mail className="h-4 w-4" />
                    Visitor Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="visitor@example.com"
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                    required
                  />
                </motion.div>
                
                <motion.div 
                  className="space-y-2"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Label htmlFor="phone" className="flex items-center gap-2 text-gray-700">
                    <Phone className="h-4 w-4" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 9876543210"
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                    required
                  />
                </motion.div>
                
                <motion.div 
                  className="space-y-2"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Label htmlFor="meetWith" className="flex items-center gap-2 text-gray-700">
                    <Building className="h-4 w-4" />
                    Meeting With *
                  </Label>
                  <Input
                    id="meetWith"
                    value={formData.meetWith}
                    onChange={(e) => handleInputChange('meetWith', e.target.value)}
                    placeholder="Employee name or department"
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                    required
                  />
                </motion.div>
              </div>
              <motion.div 
                className="space-y-2"
                whileHover={{ scale: 1.005 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Label htmlFor="photo" className="flex items-center gap-2 text-gray-700">
                  <Camera className="h-4 w-4" />
                  Visitor Photo (Optional)
                </Label>
                <div className="flex items-center gap-4">
                  <input
                    ref={visitorPhotoRef}
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleVisitorPhotoChange}
                    className="hidden"
                  />
                  <label htmlFor="photo">
                    <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                      <Upload className="h-4 w-4" />
                      <span>Choose File</span>
                    </div>
                  </label>
                  <Button type="button" onClick={() => setCameraOpenFor("visitor")}>
                    <Camera className="w-4 h-4 mr-1" /> Camera
                  </Button>
                  {formData.photo && (
                    <span className="text-sm text-gray-600">{formData.photo.name}</span>
                  )}
                </div>
                {visitorPhotoPreview && (
                  <motion.img 
                    src={visitorPhotoPreview} 
                    alt="Visitor preview"
                    className="w-24 h-24 object-cover rounded-lg mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </motion.div>
                {/* Camera Modal */}
                {cameraOpenFor && (
                  <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50">
                    <div className="relative">
                      <video
                        ref={videoRef}
                        className="w-full max-w-md h-72 bg-black rounded-lg object-cover"
                        autoPlay
                        playsInline
                        muted
                      />
                      <canvas ref={canvasRef} className="hidden" />
                    </div>
                    <div className="flex gap-4 mt-4">
                      <Button type="button" onClick={capturePhoto} className="bg-green-600 text-white">Capture</Button>
                      <Button type="button" onClick={stopCamera} className="bg-red-600 text-white">Cancel</Button>
                    </div>
                  </div>
                )}
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Electronic Items Section */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white shadow-lg border border-gray-200">
          <CardHeader className="bg-gray-700 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-white text-xl">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Camera className="h-6 w-6" />
              </motion.div>
              Electronic Items
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {/* Add New Item */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div 
                className="space-y-2"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Label htmlFor="itemName" className="text-gray-700">Product Name</Label>
                <Input
                  id="itemName"
                  value={newItem.name}
                  onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Laptop, Phone, Camera..."
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </motion.div>
              
              <motion.div 
                className="space-y-2"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Label htmlFor="serialNumber" className="text-gray-700">Serial Number</Label>
                <Input
                  id="serialNumber"
                  value={newItem.serialNumber}
                  onChange={(e) => setNewItem(prev => ({ ...prev, serialNumber: e.target.value }))}
                  placeholder="ABC123XYZ"
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </motion.div>
              
              <div className="space-y-2">
                <Label htmlFor="itemPhoto" className="text-gray-700">Photo (Optional)</Label>
                <div className="flex gap-2">
                  <input
                    ref={itemPhotoRef}
                    id="itemPhoto"
                    type="file"
                    accept="image/*"
                    onChange={handleItemPhotoChange}
                    className="hidden"
                  />
                  <label htmlFor="itemPhoto" className="flex-1">
                    <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 w-full">
                      <Upload className="h-4 w-4" />
                      <span>Choose File</span>
                    </div>
                  </label>
                  <Button type="button" onClick={() => setCameraOpenFor("item")}>
                    <Camera className="w-4 h-4 mr-1" /> Camera
                  </Button>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      type="button" 
                      onClick={addElectronicItem}
                      disabled={!newItem.name || !newItem.serialNumber}
                      className="bg-success hover:shadow-md flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Add
                    </Button>
                  </motion.div>
                </div>
                {itemPhotoPreview && (
                  <motion.img 
                    src={itemPhotoPreview} 
                    alt="Item preview"
                    className="w-16 h-16 object-cover rounded-lg mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </div>
            </div>

            {/* Items List */}
            <AnimatePresence>
              {electronicItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <Label className="text-gray-700">Added Items:</Label>
                  <div className="space-y-3">
                    {electronicItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center gap-3">
                          {item.photo && (
                            <motion.img 
                              src={item.photo} 
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-lg"
                              whileHover={{ scale: 1.1 }}
                            />
                          )}
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">Serial: {item.serialNumber}</p>
                          </div>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeElectronicItem(item.id)}
                            className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* Submit Button */}
      <motion.div 
        className="flex justify-end"
        variants={itemVariants}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className="px-12 py-4 text-lg bg-success hover:shadow-lg transition-all duration-300"
          >
            {isSubmitting ? (
              <motion.div
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="flex items-center gap-2"
              >
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                Processing...
              </motion.div>
            ) : (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Register Visitor
              </div>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// import React, { useState, useRef, useEffect } from 'react';
// import { motion } from 'motion/react';
// import { Card, CardContent, CardHeader } from './ui/card';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { Label } from './ui/label';
// import { Camera } from 'lucide-react';
// import { ElectronicItem, Visitor } from './VisitorManagement';

// interface VisitorFormProps {
//   onSubmit: (visitor: Omit<Visitor, '_id' | 'entryTime' | 'status' | 'exitCode' | 'officeId'>) => void;
// }

// export function VisitorForm({ onSubmit }: VisitorFormProps) {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     meetWith: '',
//     photoUrl: '' // Store the uploaded URL
//   });

//   const [electronicItems, setElectronicItems] = useState<ElectronicItem[]>([]);
//   const [newItem, setNewItem] = useState({
//     name: '',
//     serialNumber: '',
//     photoUrl: '' // Store the uploaded URL
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [visitorPhotoPreview, setVisitorPhotoPreview] = useState<string | null>(null);
//   const [itemPhotoPreview, setItemPhotoPreview] = useState<string | null>(null);
//   const [uploading, setUploading] = useState(false);

//   // Camera state
//   const [cameraOpenFor, setCameraOpenFor] = useState<"visitor" | "item" | null>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const streamRef = useRef<MediaStream | null>(null);

//   // Function to upload image to API
//   const uploadImage = async (file: File): Promise<string> => {
//     const formData = new FormData();
//     formData.append('file', file);
    
//     try {
//       const response = await fetch('https://visitor-management-backend-m7yx.onrender.com/api/v1/util/upload', {
//         method: 'POST',
//         body: formData,
//       });
      
//       if (!response.ok) {
//         throw new Error(`Upload failed: ${response.statusText}`);
//       }
      
//       const data = await response.json();
//       return data.url; // Assuming the API returns { url: '...' }
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       throw error;
//     }
//   };

//   // Effect to handle camera stream
//   useEffect(() => {
//     if (cameraOpenFor && videoRef.current) {
//       const startCamera = async () => {
//         try {
//           // Stop any existing stream
//           if (streamRef.current) {
//             streamRef.current.getTracks().forEach(track => track.stop());
//           }
          
//           const stream = await navigator.mediaDevices.getUserMedia({
//             video: { facingMode: "user" }, // front camera
//             audio: false,
//           });
          
//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//             streamRef.current = stream;
            
//             // Wait for video to load and play
//             videoRef.current.onloadedmetadata = () => {
//               videoRef.current?.play().catch(err => {
//                 console.error("Error playing video:", err);
//               });
//             };
//           }
//         } catch (err) {
//           console.error("Camera access denied or unavailable", err);
//           alert("Unable to access camera. Please check permissions.");
//         }
//       };

//       startCamera();
//     }

//     // Cleanup function to stop camera when component unmounts or camera closes
//     return () => {
//       if (!cameraOpenFor && streamRef.current) {
//         streamRef.current.getTracks().forEach(track => track.stop());
//         streamRef.current = null;
//       }
//     };
//   }, [cameraOpenFor]);

//   const capturePhoto = async () => {
//     if (!videoRef.current || !canvasRef.current || !streamRef.current) return;
    
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
    
//     if (!ctx) return;

//     // Set canvas dimensions to match video
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
    
//     // Draw the current video frame to the canvas
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
//     // Convert canvas to blob and create a file
//     canvas.toBlob(async (blob) => {
//       if (!blob) return;
      
//       const file = new File([blob], "captured.jpg", { type: "image/jpeg" });
      
//       try {
//         setUploading(true);
//         const imageUrl = await uploadImage(file);
        
//         if (cameraOpenFor === "visitor") {
//           // Store the URL
//           setFormData(prev => ({ ...prev, photoUrl: imageUrl }));
//           const reader = new FileReader();
//           reader.onload = (e) => {
//             setVisitorPhotoPreview(e.target?.result as string);
//           };
//           reader.readAsDataURL(file);
//         } else if (cameraOpenFor === "item") {
//           // Store the URL
//           setNewItem(prev => ({ ...prev, photoUrl: imageUrl }));
//           const reader = new FileReader();
//           reader.onload = (e) => {
//             setItemPhotoPreview(e.target?.result as string);
//           };
//           reader.readAsDataURL(file);
//         }
//       } catch (error) {
//         console.error('Error uploading image:', error);
//         alert('Failed to upload image. Please try again.');
//       } finally {
//         setUploading(false);
//         stopCamera();
//       }
//     }, "image/jpeg", 0.95);
//   };

//   const stopCamera = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//       streamRef.current = null;
//     }
//     setCameraOpenFor(null);
//   };

//   const handleVisitorPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
    
//     if (file) {
//       try {
//         setUploading(true);
//         const imageUrl = await uploadImage(file);
        
//         // Update state with the URL
//         setFormData(prev => ({ 
//           ...prev, 
//           photoUrl: imageUrl 
//         }));
        
//         // Set preview
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           setVisitorPhotoPreview(e.target?.result as string);
//         };
//         reader.readAsDataURL(file);
        
//       } catch (error) {
//         console.error('Error uploading image:', error);
//         alert('Failed to upload image. Please try again.');
//         setVisitorPhotoPreview(null);
//       } finally {
//         setUploading(false);
//       }
//     } else {
//       setFormData(prev => ({ ...prev, photoUrl: '' }));
//       setVisitorPhotoPreview(null);
//     }
//   };

//   const handleItemPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
    
//     if (file) {
//       try {
//         setUploading(true);
//         const imageUrl = await uploadImage(file);
        
//         // Update state with the URL
//         setNewItem(prev => ({ 
//           ...prev, 
//           photoUrl: imageUrl 
//         }));
        
//         // Set preview
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           setItemPhotoPreview(e.target?.result as string);
//         };
//         reader.readAsDataURL(file);
        
//       } catch (error) {
//         console.error('Error uploading image:', error);
//         alert('Failed to upload image. Please try again.');
//         setItemPhotoPreview(null);
//       } finally {
//         setUploading(false);
//       }
//     } else {
//       setNewItem(prev => ({ ...prev, photoUrl: '' }));
//       setItemPhotoPreview(null);
//     }
//   };

//   const addElectronicItem = async () => {
//     if (newItem.name && newItem.serialNumber && newItem.photoUrl) {
//       const item: ElectronicItem = {
//         id: `item-${Date.now()}`,
//         name: newItem.name,
//         serialNumber: newItem.serialNumber,
//         photo: newItem.photoUrl,
//       };
      
//       setElectronicItems(prev => [...prev, item]);
//       setNewItem({ name: '', serialNumber: '', photoUrl: '' });
//       setItemPhotoPreview(null);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validate that visitor has a photo
//     if (!formData.photoUrl) {
//       alert("Please upload a visitor photo");
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     try {
//       // Submit with the URLs
//       onSubmit({
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         meetWith: formData.meetWith,
//         photo: formData.photoUrl,
//         electronicItems: electronicItems,
//       });
      
//       // Reset form
//       setFormData({
//         name: '',
//         email: '',
//         phone: '',
//         meetWith: '',
//         photoUrl: ''
//       });
//       setElectronicItems([]);
//       setNewItem({ name: '', serialNumber: '', photoUrl: '' });
//       setVisitorPhotoPreview(null);
//       setItemPhotoPreview(null);
      
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('Failed to submit form. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const isFormValid = formData.name && formData.email && formData.phone && formData.meetWith && formData.photoUrl;

//   return (
//     <motion.div className="space-y-6" initial="hidden" animate="visible">
//       {/* Camera Modal */}
//       {cameraOpenFor && (
//         <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50">
//           <div className="relative">
//             <video
//               ref={videoRef}
//               className="w-full max-w-md h-72 bg-black rounded-lg object-cover"
//               autoPlay
//               playsInline
//               muted
//             />
//             <canvas ref={canvasRef} className="hidden" />
//           </div>
//           <div className="flex gap-4 mt-4">
//             <Button onClick={capturePhoto} className="bg-green-600 text-white">Capture</Button>
//             <Button onClick={stopCamera} className="bg-red-600 text-white">Cancel</Button>
//           </div>
//         </div>
//       )}

//       {/* Loading overlay */}
//       {(isSubmitting || uploading) && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <p className="text-center">{uploading ? "Uploading images..." : "Processing..."}</p>
//           </div>
//         </div>
//       )}

//       {/* Visitor Info */}
//       <Card>
//         <CardHeader className="bg-blue-600 text-white">Visitor Info</CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 gap-4 mb-4">
//             <div>
//               <Label htmlFor="name">Name *</Label>
//               <Input
//                 id="name"
//                 value={formData.name}
//                 onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
//                 placeholder="Enter visitor name"
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="email">Email *</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
//                 placeholder="Enter visitor email"
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="phone">Phone *</Label>
//               <Input
//                 id="phone"
//                 value={formData.phone}
//                 onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
//                 placeholder="Enter visitor phone number"
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="meetWith">Meeting With *</Label>
//               <Input
//                 id="meetWith"
//                 value={formData.meetWith}
//                 onChange={e => setFormData(prev => ({ ...prev, meetWith: e.target.value }))}
//                 placeholder="Enter person to meet"
//                 required
//               />
//             </div>
//           </div>
          
//           <div className="mt-4">
//             <Label>Visitor Photo *</Label>
//             <div className="flex gap-2 mt-2">
//               <input 
//                 type="file" 
//                 accept="image/*" 
//                 onChange={handleVisitorPhotoChange}
//                 className="border rounded p-2"
//               />
//               <Button type="button" onClick={() => setCameraOpenFor("visitor")}>
//                 <Camera className="w-4 h-4 mr-1" /> Camera
//               </Button>
//             </div>
//             {visitorPhotoPreview && (
//               <div className="mt-2">
//                 <img src={visitorPhotoPreview} className="w-24 h-24 rounded-lg object-cover" alt="Visitor preview" />
//                 <p className="text-green-600 text-sm mt-1">✓ Photo uploaded successfully</p>
//               </div>
//             )}
//             {!formData.photoUrl && (
//               <p className="text-red-500 text-sm mt-1">Photo is required</p>
//             )}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Electronic Items */}
//       <Card>
//         <CardHeader className="bg-gray-700 text-white">Electronic Items (Optional)</CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-3 gap-4">
//             <Input
//               placeholder="Item name"
//               value={newItem.name}
//               onChange={e => setNewItem(prev => ({ ...prev, name: e.target.value }))}
//             />
//             <Input
//               placeholder="Serial number"
//               value={newItem.serialNumber}
//               onChange={e => setNewItem(prev => ({ ...prev, serialNumber: e.target.value }))}
//             />
//             <div className="flex gap-2">
//               <input 
//                 type="file" 
//                 accept="image/*" 
//                 onChange={handleItemPhotoChange}
//                 className="border rounded p-2 flex-1"
//               />
//               <Button type="button" onClick={() => setCameraOpenFor("item")}>
//                 <Camera className="w-4 h-4 mr-1" /> Camera
//               </Button>
//             </div>
//           </div>
//           {itemPhotoPreview && (
//             <div className="mt-2">
//               <img src={itemPhotoPreview} className="w-16 h-16 rounded-lg object-cover" alt="Item preview" />
//               <p className="text-green-600 text-sm">✓ Photo uploaded</p>
//             </div>
//           )}
//           <Button 
//             type="button" 
//             onClick={addElectronicItem} 
//             className="mt-3 bg-green-600 text-white"
//             disabled={!newItem.name || !newItem.serialNumber || !newItem.photoUrl}
//           >
//             Add Item
//           </Button>

//           {/* Display added items */}
//           {electronicItems.length > 0 && (
//             <div className="mt-4">
//               <h3 className="font-semibold mb-2">Added Items:</h3>
//               <ul className="space-y-2">
//                 {electronicItems.map((item) => (
//                   <li key={item.id} className="flex justify-between items-center border-b pb-2">
//                     <div>
//                       <span className="font-medium">{item.name}</span>
//                       <span className="text-sm text-gray-600 ml-2">({item.serialNumber})</span>
//                     </div>
//                     {item.photo && (
//                       <img src={item.photo} className="w-12 h-12 rounded object-cover" alt={item.name} />
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* Submit */}
//       <div className="flex justify-end">
//         <Button
//           onClick={handleSubmit}
//           disabled={!isFormValid || isSubmitting || uploading}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
//         >
//           {isSubmitting ? "Processing..." : "Register Visitor"}
//         </Button>
//       </div>

//       {/* Debug info (can be removed in production) */}
//       <div className="text-xs text-gray-500 mt-4">
//         <p>Form valid: {isFormValid ? 'Yes' : 'No'}</p>
//         <p>Name: {formData.name ? '✓' : '✗'}</p>
//         <p>Email: {formData.email ? '✓' : '✗'}</p>
//         <p>Phone: {formData.phone ? '✓' : '✗'}</p>
//         <p>Meet With: {formData.meetWith ? '✓' : '✗'}</p>
//         <p>Photo: {formData.photoUrl ? '✓' : '✗'}</p>
//         <p>Uploading: {uploading ? 'Yes' : 'No'}</p>
//         <p>Submitting: {isSubmitting ? 'Yes' : 'No'}</p>
//       </div>
//     </motion.div>
//   );
// }








