import React, { useState } from 'react';
import { cubicBezier, motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { User, Lock, LogIn, Shield, Building2, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { setTokens } from '../utils/apiService';
import { useToast } from './ui/toast';

interface LoginPageProps {
  onLogin: (accessToken: string ) => void;
}

interface ApiResponse {
  message:string
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { callApi, loading } = useApi<ApiResponse>();
  const { showToast } = useToast();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both mobile number and password');
      return;
    }

    setIsLoading(true);
    setError('');

    const payload = {
      email,
      password
    };
    const{data,error} =  await callApi(`/user/login`,{
      method: 'POST',
      body:payload,
      usePublic: true, 
    });

    if (error) {
      setError(error.message || 'Login failed. Please try again.');
      setIsLoading(false);
      return;
    }
    if (data) {
      setIsLoading(false);
      setTokens((data as any).data ?? data);
      onLogin((data as any).data ?? data);
      showToast({
        type: "success",
        title: data.message,
      });
    } else {
      setError(error ? error : 'Login failed. Please try again.');
      setIsLoading(false);
    }
  };

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

  const floatingIconVariants = {
  float: {
    y: [-10, 10, -10],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: cubicBezier(0.42, 0, 0.58, 1), // ✅ correct type-safe easing
    },
  },
  };

  const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: cubicBezier(0.42, 0, 0.58, 1) // ✅ matches CSS easeOut
    }
  }
  };
  

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%236b7280%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-gray-300"
          variants={floatingIconVariants}
          animate="float"
        >
          <Shield className="h-16 w-16" />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-gray-300"
          variants={floatingIconVariants}
          animate="float"
          transition={{ delay: 1 }}
        >
          <Building2 className="h-14 w-14" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-20 text-gray-300"
          variants={floatingIconVariants}
          animate="float"
          transition={{ delay: 2 }}
        >
          <User className="h-12 w-12" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6 shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Shield className="h-10 w-10 text-white" />
            </motion.div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Secure Login
            </h1>
            <p className="text-gray-600">
              Access the Visitor Management System
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white shadow-xl border border-gray-200">
              <CardHeader className="text-center pb-6 bg-gray-50 rounded-t-lg">
                <CardTitle className="text-xl text-gray-900 flex items-center justify-center gap-3">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <LogIn className="h-6 w-6 text-blue-600" />
                  </motion.div>
                  Login to Continue
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Username Field */}
                  <motion.div 
                    className="space-y-2"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Label htmlFor="email" className="flex items-center gap-2 text-gray-700">
                      <User className="h-4 w-4" />
                      Mobile
                    </Label>
                    <Input
                      id="email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your mobile number"
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 h-12"
                      disabled={isLoading}
                      required
                    />
                  </motion.div>

                  {/* Password Field */}
                  <motion.div 
                    className="space-y-2"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Label htmlFor="password" className="flex items-center gap-2 text-gray-700">
                      <Lock className="h-4 w-4" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 h-12 pr-12"
                        disabled={isLoading}
                        required
                      />
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Alert className="bg-red-50 border-red-200">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-700">
                          {error}
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit"
                      disabled={isLoading || !email || !password}
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700 hover:shadow-lg transition-all duration-300 text-base"
                    >
                      {isLoading ? (
                        <motion.div
                          // animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                          Signing In...
                        </motion.div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <LogIn className="h-5 w-5" />
                          Sign In
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer */}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-6"
          >
            <p className="text-gray-500">
              Secure • Professional • Reliable
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}