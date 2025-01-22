"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your authentication logic here
    router.push("/"); // Redirect to chat page after successful login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="bg-gray-900/50 border-gray-800 p-8">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-400">Sign in to continue to Axel</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800/50 border-gray-700 focus:ring-[#00ff9d] focus:border-[#00ff9d]"
                />
              </div>

              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800/50 border-gray-700 focus:ring-[#00ff9d] focus:border-[#00ff9d]"
                />
              </div>

              <Button
                type="submit"
                variant="custom"
                className="w-full bg-[#00ff9d] hover:bg-[#00ff9d]/90 text-black font-medium transition-colors duration-200"
                onClick={handleSubmit}
              >
                Sign In
              </Button>
            </form>

            <div className="text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <a href="#" className="text-[#00ff9d] hover:underline">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
