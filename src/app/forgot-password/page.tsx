"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios, { AxiosResponse } from "axios";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
 
    const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<AxiosResponse>("/api/forgot-password",{email});
      if(response.data.status === 201) {
          router.push("/reset-password");
      } 
    } catch (error) {
      console.log(error);
      throw new Error("Error at Login !");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[40rem] p-8 mx-auto  backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-gray-700 to-black flex items-center justify-center shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Forgot Password</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 "
                  placeholder="Enter your email"
                />
              </div>
            </div>

            
          </div>

          
          <div>
            <Button type="submit" className="w-full py-2.5 px-4 ">
              Forgot Password
            </Button>
          </div>

         
        </form>

        
      </motion.div>
    </div>
  );
}
