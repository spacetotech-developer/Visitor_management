import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Plus, X, Camera, User, CheckCircle, Mail, Phone, Building } from 'lucide-react';
import { ElectronicItem, Visitor } from './VisitorManagement';

interface VisitorFormProps {
  onSubmit: (visitor: Omit<Visitor, '_id' | 'entryTime' | 'status' | 'exitCode' | "officeId" >) => void;
}

export function VisitorForm({ onSubmit }: VisitorFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    meetWith: '',
    photo: '',
  });
  
  const [electronicItems, setElectronicItems] = useState<ElectronicItem[]>([]);
  const [newItem, setNewItem] = useState({
    name: '',
    serialNumber: '',
    photo: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addElectronicItem = () => {
    if (newItem.name && newItem.serialNumber) {
      const item: ElectronicItem = {
        id: `item-${Date.now()}`,
        ...newItem,
      };
      setElectronicItems(prev => [...prev, item]);
      setNewItem({ name: '', serialNumber: '', photo: '' });
    }
  };

  const removeElectronicItem = (id: string) => {
    setElectronicItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit({
      ...formData,
      electronicItems,
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      meetWith: '',
      photo: '',
    });
    setElectronicItems([]);
    setIsSubmitting(false);
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
                    Email Address *
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
                  Visitor Photo URL (Optional)
                </Label>
                <Input
                  id="photo"
                  type="url"
                  value={formData.photo}
                  onChange={(e) => handleInputChange('photo', e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </motion.div>
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
                <Label htmlFor="name" className="text-gray-700">Product Name</Label>
                <Input
                  id="name"
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
                <Label htmlFor="itemPhoto" className="text-gray-700">Photo URL (Optional)</Label>
                <div className="flex gap-2">
                  <Input
                    id="itemPhoto"
                    type="url"
                    value={newItem.photo}
                    onChange={(e) => setNewItem(prev => ({ ...prev, photo: e.target.value }))}
                    placeholder="https://..."
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                  />
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
                animate={{ rotate: 360 }}
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