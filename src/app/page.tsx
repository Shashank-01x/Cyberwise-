"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React from "react";
import landingImage from '../images/landing.png'


export default function HomePage() {
  const router = useRouter();

  const handleExploreClick = () => {
    router.push("/dashboard");
  };

  return (
    <div>{/* News Ticker Navbar */}
    <div className="w-full bg-zinc-900 py-4 overflow-hidden">
      <motion.div
        className="flex space-x-10 text-white text-sm font-semibold whitespace-nowrap"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
      >
        <span>🔥 CyberWise v2.0 Released! |</span>
        <span>🚀 New Features Added |</span>
        <span>🔒 Security Patches Updated |</span>
        <span>📢 Stay Tuned for More Updates |</span>
      </motion.div>
    </div>
    <div className="relative h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full px-16">
        {/* Left Section: Branding & CTA */}
        <div className="text-center md:text-left">
          <h1 className="text-6xl md:text-8xl font-bold text-white">CyberWise</h1>
          <p className="text-gray-400 mt-3 text-md  max-w-lg">
            The ultimate security scanning tool for professionals.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExploreClick}
            className="mt-6 bg-purple-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300"
          >
            Explore More
          </motion.button>
        </div>

        {/* Right Section: Monitor Display */}
        <motion.div
          className="relative flex items-center justify-center w-[700px] h-[400px] mt-10 md:mt-0"
          initial={{ scaleY: 0.2 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <motion.div
            className="w-full h-full bg-black border-4 border-zinc-600 flex items-center justify-center overflow-hidden rounded-t-2xl shadow-2xl"
            initial={{ rotateX: 90 }}
            animate={{ rotateX: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: "bottom" }}
          >
            <div className="w-full h-full bg-black rounded-t-lg">
              <div className="h-8 bg-zinc-800 flex items-center justify-start p-2 space-x-2 rounded-t-lg">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex items-center justify-center h-full">
              <img className="w-full h-full" src={landingImage.src} alt="CyberWise" />              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
    </div>
  );
}