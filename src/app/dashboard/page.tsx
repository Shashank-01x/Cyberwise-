"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/dashboard" },
    { name: "IP Scanner", path: "/dashboard/ip_scanner" },
    { name: "Vulnerability Scanner", path: "/dashboard/vulnerability_scanner" },
    { name: "Encrypt/Decrypt", path: "/dashboard/enc_dec" },
  ];

  const blogs = [
    { title: "IP Scanning 101", content: "Learn how IP scanning helps in network security.", span: "row-span-2", },
    { title: "Password Strength Guide", content: "Best practices to create a secure password.", span: "col-span-2" },
    { title: "Generating Secure Passwords", content: "Explore random password generators." },
    { title: "Encryption & Decryption", content: "Basics of encrypting and decrypting messages." },
    { title: "Cybersecurity Essentials", content: "Important tips to stay secure online.", span: "col-span-2" },
    // { title: "Dark Web & Security", content: "How the dark web impacts digital security.", span: "row-span-2 col-span-2" },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5 bg-zinc-900 shadow-lg border-b border-zinc-700">
        <div onClick={() => router.push("/")} className="cursor-pointer flex items-center space-x-2">
        <h1 className="text-6xl font-bold text-purple-400">CyberWise</h1>
        </div>
        <button className="px-3 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition">
          Latest Updates
        </button>
      </nav>

      {/* Navigation Items */}
      <div className="bg-zinc-900 w-3/4 ml-44 rounded-bl-3xl rounded-br-3xl justify-center border border-zinc-700">
        <div className="flex justify-center space-x-16 text-lg font-semibold text-gray-300 px-6 py-3">
          {navItems.map((item, index) => (
            <span
              key={index}
              onClick={() => router.push(item.path)}
              className={`cursor-pointer transition-colors px-4 py-2 rounded-lg ${
                pathname === item.path ? "text-purple-400 bg-zinc-800" : "hover:text-purple-400"
              }`}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center mt-12 px-6">
        <motion.h1 
          className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to CyberWise
        </motion.h1>
        <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
          Explore powerful tools and features to monitor, secure, and optimize your workflows.
        </p>
      </div>

      {/* Blog Section */}
      <div className="mt-16 px-10">
        <h2 className="text-3xl font-semibold text-gray-200 mb-6">Latest Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-[190px]">
          {blogs.map((blog, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className={`relative p-6 bg-zinc-800 rounded-lg shadow-lg cursor-pointer scrollbar-hide overflow-scroll flex flex-col justify-center ${blog.span || ''}`}
            >
              <h3 className="text-xl font-bold text-purple-300">{blog.title}</h3>
              <motion.p 
                className="text-gray-400 mt-2"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {blog.content} Expand for more insights and knowledge on security best practices.
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
