import React, { useState } from "react";
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
  Smartphone,
  Users,
} from "lucide-react";
import { Visitor } from "./VisitorManagement";

interface ExitProcessProps {
  visitors: Visitor[];
  onExit: (visitorId: string, exitCode: string) => boolean;
  selectedVisitor: Visitor | null;
  onSelectVisitor: (visitor: Visitor | null) => void;
}

export function ExitProcess({
  visitors,
  onExit,
  selectedVisitor,
  onSelectVisitor,
}: ExitProcessProps) {
  const [exitCode, setExitCode] = useState("");
  const [exitStatus, setExitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleExit = () => {
    if (!selectedVisitor) return;

    const success = onExit(
      selectedVisitor.id,
      exitCode.toUpperCase(),
    );

    if (success) {
      setExitStatus("success");
      setExitCode("");
      setTimeout(() => {
        setExitStatus("idle");
        onSelectVisitor(null);
      }, 2000);
    } else {
      setExitStatus("error");
      setErrorMessage(
        "Invalid exit code. Please check the code sent to your phone.",
      );
      setTimeout(() => {
        setExitStatus("idle");
        setErrorMessage("");
      }, 3000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Visitor Selection */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white shadow-lg border border-gray-200">
          <CardHeader className="bg-blue-600 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-white text-xl">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Users className="h-6 w-6" />
              </motion.div>
              Select Visitor for Exit
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
                <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  No visitors currently in the office.
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {visitors.map((visitor, index) => (
                  <motion.div
                    key={visitor.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all duration-300 border-2 bg-white hover:shadow-lg ${
                        selectedVisitor?.id === visitor.id
                          ? "border-blue-400 bg-blue-50 shadow-lg scale-105"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => onSelectVisitor(visitor)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                            }}
                          >
                            <Avatar className="h-12 w-12 ring-2 ring-gray-200">
                              <AvatarImage
                                src={visitor.photo}
                              />
                              <AvatarFallback className="bg-blue-600 text-white">
                                {visitor.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </motion.div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {visitor.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              Meeting: {visitor.meetWith}
                            </p>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Clock className="h-3 w-3" />
                              Entry:{" "}
                              {formatTime(visitor.entryTime)}
                            </div>
                          </div>
                          {selectedVisitor?.id ===
                            visitor.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                              }}
                            >
                              <CheckCircle className="h-6 w-6 text-blue-600" />
                            </motion.div>
                          )}
                        </div>
                        {visitor.electronicItems.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-xs text-gray-500">
                              Electronics:{" "}
                              {visitor.electronicItems
                                .map((item) => item.productName)
                                .join(", ")}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

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
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <LogOut className="h-6 w-6" />
                  </motion.div>
                  Exit Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <motion.div
                  className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                    }}
                  >
                    <Avatar className="h-16 w-16 ring-2 ring-gray-200">
                      <AvatarImage
                        src={selectedVisitor.photo}
                      />
                      <AvatarFallback className="bg-blue-600 text-white text-lg">
                        {selectedVisitor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-gray-900">
                      {selectedVisitor.name}
                    </h3>
                    <p className="text-gray-600">
                      Meeting with: {selectedVisitor.meetWith}
                    </p>
                    <p className="text-sm text-gray-500">
                      Phone: {selectedVisitor.phone}
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                    }}
                  >
                    <Badge className="bg-success shadow-md text-lg px-4 py-2">
                      Exit Code: {selectedVisitor.exitCode}
                    </Badge>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Alert className="bg-blue-50 border-blue-200">
                    <Smartphone className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-gray-700">
                      The exit code has been sent to the
                      visitor's phone via WhatsApp:{" "}
                      <strong className="text-gray-900">
                        {selectedVisitor.phone}
                      </strong>
                    </AlertDescription>
                  </Alert>
                </motion.div>

                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label
                    htmlFor="exitCode"
                    className="text-gray-700 text-lg"
                  >
                    Enter Exit Code
                  </Label>
                  <div className="flex gap-4">
                    <motion.div
                      className="flex-1"
                      whileHover={{ scale: 1.01 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                      }}
                    >
                      <Input
                        id="exitCode"
                        value={exitCode}
                        onChange={(e) =>
                          setExitCode(
                            e.target.value.toUpperCase(),
                          )
                        }
                        placeholder="Enter 6-digit code"
                        className="font-mono text-xl text-center bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 h-14"
                        maxLength={6}
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={handleExit}
                        disabled={
                          exitCode.length !== 6 ||
                          exitStatus === "success"
                        }
                        className={`px-8 h-14 text-lg ${
                          exitStatus === "success"
                            ? "bg-success"
                            : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
                        }`}
                      >
                        {exitStatus === "success" ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="h-5 w-5" />
                            Success
                          </motion.div>
                        ) : (
                          "Process Exit"
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>

                <AnimatePresence>
                  {exitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Alert className="bg-green-50 border-green-200">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-700">
                          Visitor exit processed successfully!{" "}
                          {selectedVisitor.name} has been
                          checked out.
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}

                  {exitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Alert className="bg-red-50 border-red-200">
                        <XCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-700">
                          {errorMessage}
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

                {selectedVisitor.electronicItems.length > 0 && (
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Label className="text-gray-700 text-lg">
                      Electronic Items to Return:
                    </Label>
                    <div className="space-y-3">
                      {selectedVisitor.electronicItems.map(
                        (item, index) => (
                          <motion.div
                            key={item.id}
                            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.6 + index * 0.1,
                            }}
                            whileHover={{ scale: 1.01 }}
                          >
                            {item.photo && (
                              <motion.img
                                src={item.photo}
                                alt={item.productName}
                                className="w-12 h-12 object-cover rounded-lg"
                                whileHover={{ scale: 1.1 }}
                              />
                            )}
                            <div>
                              <p className="font-medium text-gray-900">
                                {item.productName}
                              </p>
                              <p className="text-sm text-gray-600">
                                Serial: {item.serialNumber}
                              </p>
                            </div>
                          </motion.div>
                        ),
                      )}
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}