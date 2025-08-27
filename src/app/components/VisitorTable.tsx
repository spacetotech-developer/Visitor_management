import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Clock, Mail, Phone, Monitor, User, TrendingUp, Users, Calendar } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { useToast } from './ui/toast';
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
  message: string;
}
interface VisitorTableProps {
  officeId: string | null;
  visitorsdetails?: Visitor[];
  visitorState?: {
    totalVisitors: number;
    totalVisitorsIn: number;
    totalVisitorsOut: number;
    totalElectronicItems: number;
  };
}

export function VisitorTable({ officeId,visitorState}: VisitorTableProps) {
  const { callApi, loading } = useApi<ApiResponse>();
  const [visitors, setVisitors] = React.useState<Visitor[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);  
  const pageSize = 5;
  const {showToast} = useToast()
  
  useEffect(() => {
    if (!officeId) return;
    let called = false;
    // Fetch visitors data from API or state management
    const fetchVisitors = async () => {
      if (called) return; // block 2nd call
      called = true;
      try {
        const {data,error} = await callApi(`/visitor/getAllVisitors?page=${currentPage}&limit=${pageSize}&search&status&officeId=${officeId}`, 
          { 
            method: 'GET' 
          });
        if (data && data.data && Array.isArray(data.data.visitors)) {
          showToast({
            type:'success',
            title:data.message
          })
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
  }, [currentPage, officeId]);

  // Pagination logic
  const totalPageses = Math.ceil(totalPages! / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedVisitors = visitors;


  // Format time and date
  const formatTime = (date: string | Date) => {
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

  const formatDate = (date: string | Date) => {
  const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

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
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-md"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Users className="h-7 w-7 text-white" />
                </motion.div>
                <div>
                  <p className="text-sm text-gray-600">Total Visitors</p>
                  <motion.p 
                    className="text-3xl font-semibold text-gray-900"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                  >
                    {visitorState?.totalVisitors || 0}
                  </motion.p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-14 h-14 bg-success rounded-xl flex items-center justify-center shadow-md"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Clock className="h-7 w-7 text-white" />
                </motion.div>
                <div>
                  <p className="text-sm text-gray-600">Currently In Office</p>
                  <motion.p 
                    className="text-3xl font-semibold text-gray-900"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                  >
                    {/* {visitors.filter(v => v.status === 'In').length} */}
                    {visitorState?.totalVisitorsIn || 0}
                  </motion.p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-14 h-14 bg-gray-600 rounded-xl flex items-center justify-center shadow-md"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Monitor className="h-7 w-7 text-white" />
                </motion.div>
                <div>
                  <p className="text-sm text-gray-600">Total Electronics</p>
                  <motion.p 
                    className="text-3xl font-semibold text-gray-900"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.4 }}
                  >
                    {visitorState?.totalElectronicItems || 0}
                    {/* {visitors.reduce((total, visitor) => total + visitor.electronicItems.length, 0)} */}
                  </motion.p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Visitors Table */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white shadow-lg border border-gray-200">
          {/* <CardHeader className="bg-gray-700 rounded-t-lg">
            <CardTitle className="flex items-center justify-center gap-3 text-white text-xl py-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <TrendingUp className="h-6 w-6" />
              </motion.div>
              Visitor Records
            </CardTitle>
          </CardHeader> */}
          <CardHeader className="bg-gray-700 rounded-t-lg flex items-center justify-center h-20 py-3">
            <CardTitle className="flex items-center gap-3 text-white text-xl">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <TrendingUp className="h-6 w-6" />
              </motion.div>
              Visitor Records
            </CardTitle>
          </CardHeader>

          <CardContent className="p-8">
            {visitors.length === 0 ? (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No visitors recorded for this office yet.</p>
              </motion.div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200">
                      <TableHead className="text-gray-700">Visitor</TableHead>
                      <TableHead className="text-gray-700">Contact</TableHead>
                      <TableHead className="text-gray-700">Meeting With</TableHead>
                      <TableHead className="text-gray-700">Entry Time</TableHead>
                      <TableHead className="text-gray-700">Exit Time</TableHead>
                      <TableHead className="text-gray-700">Status</TableHead>
                      <TableHead className="text-gray-700">Electronics</TableHead>
                      <TableHead className="text-gray-700">Exit Code</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedVisitors.map((visitor, index) => (
                      <motion.tr
                        key={visitor._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Avatar className="h-10 w-10 ring-2 ring-gray-200">
                                <AvatarImage src={visitor.photo} />
                                <AvatarFallback className="bg-blue-600 text-white">
                                  {visitor.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                            </motion.div>
                            <div>
                              <p className="font-medium text-gray-900">{visitor.name}</p>
                              <p className="text-sm text-gray-500">{formatDate(visitor.entryTime)}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Mail className="h-3 w-3" />
                              {visitor.email}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Phone className="h-3 w-3" />
                              {visitor.mobileNo}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-700">{visitor.meetWith}</TableCell>
                        <TableCell className="text-gray-700">{formatTime(visitor.entryTime)}</TableCell>
                        <TableCell className="text-gray-700">
                          {visitor.exitTime ? formatTime(visitor.exitTime) : '-'}
                        </TableCell>
                        <TableCell>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Badge 
                              className={`${
                                visitor.status === 'In' 
                                  ? 'bg-success shadow-md' 
                                  : 'bg-secondary shadow-md'
                              } border-0 text-white`}
                            >
                              {visitor.status === 'In' ? 'In Office' : 'Left Office'}
                            </Badge>
                          </motion.div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {visitor.electronicItems.length === 0 ? (
                              <span className="text-gray-500">None</span>
                            ) : (
                              visitor.electronicItems.map((item) => (
                                <motion.div 
                                  key={item._id} 
                                  className="flex items-center gap-2"
                                  whileHover={{ scale: 1.02 }}
                                >
                                  {item.photo && (
                                    <img 
                                      src={item.photo} 
                                      alt={item.name}
                                      className="w-6 h-6 object-cover rounded"
                                    />
                                  )}
                                  <div className="text-sm">
                                    <p className="font-medium text-gray-700">{item.name}</p>
                                    <p className="text-gray-500">#{item.serialNumber}</p>
                                  </div>
                                </motion.div>
                              ))
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {/* {visitor.status === 'In' && visitor.uniqueCode ? ( */}
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Badge 
                                variant="outline" 
                                className="font-mono bg-gray-50 border-gray-300 text-gray-700 shadow-sm"
                              >
                                {visitor.uniqueCode}
                              </Badge>
                            </motion.div>
                          {/* ) : ( */}
                            {/* <span className="text-gray-500">-</span> */}
                          {/* )} */}
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          {/* Pagination */}
              {/* <div className="flex justify-between items-center mt-4">
                <span className="text-sm">
                  Showing {startIndex + 1} to {Math.min(startIndex + pageSize, totalPages!)} of{" "}
                  {totalPages} entries
                </span>

                <div className="flex space-x-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPageses }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 border rounded ${
                        currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === totalPageses}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div> */}
              {/* Pagination */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0">
                <span className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(startIndex + pageSize, totalPages!)} of {totalPages} entries
                </span>

                <div className="flex flex-wrap justify-center sm:justify-end gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 transition"
                  >
                    Previous
                  </button>

                  {/* Numeric page buttons */}
                  {Array.from({ length: totalPageses }, (_, i) => {
                    // Show only first, last, current ±1 for mobile
                    const isMobile = window.innerWidth < 640; // sm breakpoint
                    if (isMobile && i + 1 !== 1 && i + 1 !== totalPageses && Math.abs(currentPage - (i + 1)) > 1) {
                      return null;
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 border rounded ${
                          currentPage === i + 1 ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                        } transition`}
                      >
                        {i + 1}
                      </button>
                    );
                  })}

                  <button
                    disabled={currentPage === totalPageses}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 transition"
                  >
                    Next
                  </button>
                </div>
              </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}