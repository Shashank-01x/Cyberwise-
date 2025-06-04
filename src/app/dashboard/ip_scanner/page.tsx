'use client';

import React, { useState } from 'react';
import { useRouter , usePathname } from 'next/navigation';
import { Input, Button, Card, CardBody} from '@nextui-org/react';
import { VscCheck } from "react-icons/vsc"; // Import for tick symbol
import { CiCircleQuestion } from "react-icons/ci"; // Import for question mark symbol


const IpScannerPage = () => {
  const [ip, setIp] = useState<string>('');
  interface AnalysisStats {
    malicious: number;
    suspicious: number;
    undetected: number;
    harmless: number;
  }

  interface AnalysisResult {
    result: string;
    category: string;
  }

  interface ResultData {
    attributes: {
      last_analysis_stats: AnalysisStats;
      last_analysis_results: Record<string, AnalysisResult>;
    };
  }

  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();


  const navItems = [
    { name: "Home", path: "/dashboard" },
    { name: "IP Scanner", path: "/dashboard/ip_scanner" },
    { name: "Vulnerability Scanner", path: "/dashboard/vulnerability_scanner" },
    { name: "Encrypt/Decrypt", path: "/dashboard/enc_dec" },
  ];

  const handleSearch = async () => {
    if (!ip) return;
    setLoading(true);

    try {
      // Fetch IP address details
      const response = await fetch(`/api/proxy?ip=${ip}`);


      if (!response.ok) {
        throw new Error('Failed to fetch data from VirusTotal');
      }

      const data = await response.json();
      setResult(data.data);



    } catch (error: unknown) {
      console.error('Error fetching data:', error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5 bg-zinc-900 shadow-lg border-b border-zinc-700">
        <h1 className="text-6xl font-bold text-purple-400">CyberWise</h1>
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
    <div className="flex flex-col items-center py-10 px-6 sm:px-10 bg-black min-h-screen text-white transition-all">
     

      <h2 className="mt-10 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 mb-8">
        CyberWise IP Address Scanner
      </h2>

      <div className="flex justify-center gap-6 mb-12 w-full sm:w-auto">
        <Input
          placeholder="Enter IP Address"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          className="w-full max-w-xl text-white placeholder-gray-400  rounded-lg py-3 px-6 text-lg shadow-md transition-all duration-300 focus:ring-2 focus:ring-blue-500  focus:outline-none transform hover:scale-105"
        />
        <Button
          onClick={handleSearch}
          disabled={loading}
          className="mt-3 w-36 bg-white transition-all duration-300 focus:outline-none transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500"
        >
          {loading ? (
            <div className="flex items-center">
              <div className="spinner-border spinner-border-sm mr-2 text-white" role="status" />
              Searching...
            </div>
          ) : (
            'Search'
          )}
        </Button>
      </div>

      {result && (
        <Card className="w-full max-w-4xl bg-gradient-to-b from-gray-800 to-black shadow-lg rounded-xl p-8 mb-8 transition-all duration-300 ease-in-out hover:shadow-2xl">
          <CardBody>
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                </div>
              </div>
            </div>
            <div className="text-center mb-8">
              {result.attributes.last_analysis_stats.malicious > 0 || result.attributes.last_analysis_stats.suspicious > 0 ? (
              <p className="text-xl text-red-500 font-semibold">
                Your IP is not safe. It has been found to be suspicious or malicious.
              </p>
              ) : (
              <p className="text-xl text-green-500 font-semibold">
                Your IP has been scanned by multiple antivirus engines and is detected to be safe.
              </p>
              )}
            </div>


            <div className="mb-8">
              <h4 className="text-2xl font-semibold text-white mb-4">Last Analysis Stats:</h4>
              <div className="flex justify-between text-gray-300 mb-4">
                <div className="flex items-center">
                  <span>Malicious:</span>
                  <span className="ml-2 text-red-500">{result.attributes.last_analysis_stats.malicious}</span>
                </div>
                <div className="flex items-center">
                  <span>Suspicious:</span>
                  <span className="ml-2 text-yellow-400">{result.attributes.last_analysis_stats.suspicious}</span>
                </div>
              </div>
              <div className="flex justify-between text-gray-300 mb-4">
                <div className="flex items-center">
                  <span>Undetected:</span>
                  <span className="ml-2 text-gray-500">{result.attributes.last_analysis_stats.undetected}</span>
                </div>
                <div className="flex items-center">
                  <span>Harmless:</span>
                  <span className="ml-2 text-green-500">{result.attributes.last_analysis_stats.harmless}</span>
                </div>
              </div>
            </div>

            <h4 className="text-2xl font-semibold text-white mb-4">Last Analysis Results:</h4>
            <div>
              {result.attributes.last_analysis_results ? (
                Object.entries(result.attributes.last_analysis_results).map(([vendor, analysis]) => {
                  const analysisResult = analysis as { result: string; category: string };
                  return (
                    <div key={vendor} className="flex items-center space-x-2 text-gray-300 mb-4">
                      <strong>{vendor}</strong>:
                      <span
                        className={`${
                          analysisResult.result === 'malicious' ? 'text-red-500' :
                          analysisResult.result === 'suspicious' ? 'text-yellow-400' :
                          analysisResult.result === 'clean' ? 'text-green-500' :
                          'text-gray-500'
                        }`}
                      >
                        {analysisResult.result === 'clean' ? (
                          <VscCheck className="inline mr-2 text-green-400" />
                        ) : analysisResult.result === 'unrated' ? (
                          <CiCircleQuestion className="inline mr-2 text-gray-500" />
                        ) : null}
                        {analysisResult.result}
                        <span className="ml-2 text-sm text-gray-400">({analysisResult.category})</span>
                      </span>
                    </div>
                  );
                })
              ) : (
                <div>No analysis results available.</div>
              )}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
    </div>
  );
};

export default IpScannerPage;
