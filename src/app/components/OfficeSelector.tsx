import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Building2, MapPin, Sparkles, Users, Shield } from 'lucide-react';

interface Office {
  id: string;
  name: string;
  address: string;
}

interface OfficeSelectorProps {
  offices: Office[];
  onSelectOffice: (officeId: string) => void;
}

export function OfficeSelector({ offices, onSelectOffice }: OfficeSelectorProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const floatingIconVariants = {
    float: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%236b7280%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      </div>

      {/* Subtle Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-gray-300"
          variants={floatingIconVariants}
          animate="float"
        >
          <Building2 className="h-16 w-16" />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-gray-300"
          variants={floatingIconVariants}
          animate="float"
          transition={{ delay: 1 }}
        >
          <Users className="h-12 w-12" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-20 text-gray-300"
          variants={floatingIconVariants}
          animate="float"
          transition={{ delay: 2 }}
        >
          <Shield className="h-14 w-14" />
        </motion.div>
        <motion.div
          className="absolute top-60 left-1/2 text-gray-300"
          variants={floatingIconVariants}
          animate="float"
          transition={{ delay: 0.5 }}
        >
          <Sparkles className="h-10 w-10" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-4xl"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6 shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Building2 className="h-10 w-10 text-white" />
            </motion.div>
            <h1 className="text-4xl font-semibold text-gray-900 mb-4">
              Welcome to Visitor Management
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select your office location to begin managing visitors with our professional and secure system
            </p>
          </motion.div>

          {/* Office Selection Cards */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white shadow-xl border border-gray-200">
              <CardHeader className="text-center pb-6 bg-gray-50 rounded-t-lg">
                <CardTitle className="text-2xl text-gray-900 flex items-center justify-center gap-3">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Building2 className="h-8 w-8 text-blue-600" />
                  </motion.div>
                  Select Your Office Location
                </CardTitle>
                <p className="text-gray-600 text-lg">Choose the office where you'll be working today</p>
              </CardHeader>
              <CardContent className="space-y-4 p-8">
                {offices.map((office, index) => (
                  <motion.div
                    key={office.id}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.01,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Card 
                      className="cursor-pointer transition-all duration-300 hover:shadow-lg bg-white border-2 border-gray-200 hover:border-blue-400 group"
                      onClick={() => onSelectOffice(office.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <motion.div 
                              className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md"
                              whileHover={{ rotate: 5 }}
                            >
                              <Building2 className="h-8 w-8 text-white" />
                            </motion.div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {office.name}
                              </h3>
                              <div className="flex items-center gap-2 text-gray-600 group-hover:text-blue-500 transition-colors">
                                <MapPin className="h-4 w-4" />
                                <span>{office.address}</span>
                              </div>
                            </div>
                          </div>
                          <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Button 
                              className="bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200 px-8"
                              size="lg"
                            >
                              Select Office
                            </Button>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer */}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-8"
          >
            <p className="text-gray-500">
              Secure • Professional • Efficient
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}