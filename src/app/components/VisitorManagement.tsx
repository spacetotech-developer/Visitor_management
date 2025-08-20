import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence,anticipate } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Clock, User, Phone, Mail, Monitor, LogOut, Sparkles, TrendingUp } from 'lucide-react';
import { OfficeSelector } from './OfficeSelector';
import { VisitorForm } from './VisitorForm';
import { VisitorTable } from './VisitorTable';
import { ExitProcess } from './ExitProcess';

export interface ElectronicItem {
  id: string;
  productName: string;
  serialNumber: string;
  photo?: string;
}

export interface Visitor {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  meetWith: string;
  electronicItems: ElectronicItem[];
  entryTime: Date;
  exitTime?: Date;
  status: 'in-office' | 'left-office';
  exitCode?: string;
  officeId: string;
}

export function VisitorManagement() {
  const [selectedOffice, setSelectedOffice] = useState<string>('');
  const [currentView, setCurrentView] = useState<'entry' | 'dashboard' | 'exit'>('entry');
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [selectedVisitorForExit, setSelectedVisitorForExit] = useState<Visitor | null>(null);

  // Mock offices data
  const offices = [
    { id: 'office-1', name: 'Main Office - Mumbai', address: 'Bandra Kurla Complex' },
    { id: 'office-2', name: 'Branch Office - Delhi', address: 'Connaught Place' },
    { id: 'office-3', name: 'Tech Hub - Bangalore', address: 'Electronic City' },
  ];

  const generateExitCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const addVisitor = (visitorData: Omit<Visitor, 'id' | 'entryTime' | 'status' | 'exitCode' | 'officeId'>) => {
    const newVisitor: Visitor = {
      ...visitorData,
      id: `visitor-${Date.now()}`,
      entryTime: new Date(),
      status: 'in-office',
      exitCode: generateExitCode(),
      officeId: selectedOffice,
    };
    setVisitors(prev => [...prev, newVisitor]);
    
    // Simulate sending WhatsApp message with exit code
    console.log(`WhatsApp message sent to ${newVisitor.phone}: Your exit code is ${newVisitor.exitCode}`);
  };

  const exitVisitor = (visitorId: string, enteredCode: string) => {
    const visitor = visitors.find(v => v.id === visitorId);
    if (visitor && visitor.exitCode === enteredCode) {
      setVisitors(prev => prev.map(v => 
        v.id === visitorId 
          ? { ...v, exitTime: new Date(), status: 'left-office' as const }
          : v
      ));
      setSelectedVisitorForExit(null);
      return true;
    }
    return false;
  };

  const currentOfficeVisitors = visitors.filter(v => v.officeId === selectedOffice);
  const activeVisitors = currentOfficeVisitors.filter(v => v.status === 'in-office');

  if (!selectedOffice) {
    return (
      <OfficeSelector 
        offices={offices} 
        onSelectOffice={setSelectedOffice} 
      />
    );
  }

  const selectedOfficeInfo = offices.find(o => o.id === selectedOffice);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    ease: anticipate,
    duration: 0.5
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative z-10 min-h-screen p-4">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div 
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
                  {selectedOfficeInfo?.name} - {selectedOfficeInfo?.address}
                </motion.p>
              </div>
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge 
                    className="px-4 py-2 text-sm bg-success border-0 shadow-md"
                  >
                    <User className="mr-2 h-4 w-4" />
                    {activeVisitors.length} Active Visitors
                  </Badge>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedOffice('')}
                    className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Change Office
                  </Button>
                </motion.div>
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
              { key: 'entry', label: 'New Entry', icon: User },
              { key: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { key: 'exit', label: 'Exit Process', icon: LogOut }
            ].map(({ key, label, icon: Icon }) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant={currentView === key ? 'default' : 'outline'}
                  onClick={() => setCurrentView(key as any)}
                  className={`px-6 py-3 text-base flex items-center gap-2 transition-all duration-300 ${
                    currentView === key 
                      ? 'bg-blue-600 hover:bg-blue-700 shadow-md' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Button>
              </motion.div>
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
              {currentView === 'entry' && (
                <VisitorForm onSubmit={addVisitor} />
              )}

              {currentView === 'dashboard' && (
                <VisitorTable visitors={currentOfficeVisitors} />
              )}

              {currentView === 'exit' && (
                <ExitProcess 
                  visitors={activeVisitors}
                  onExit={exitVisitor}
                  selectedVisitor={selectedVisitorForExit}
                  onSelectVisitor={setSelectedVisitorForExit}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}