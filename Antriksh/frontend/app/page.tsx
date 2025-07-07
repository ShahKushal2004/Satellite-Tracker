"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Satellite, Rocket, Globe } from "lucide-react"

export default function HomePage() {
  const [satelliteId, setSatelliteId] = useState("")

  const handleTrack = () => {
    if (satelliteId.trim()) {
      console.log("Tracking satellite:", satelliteId)
      // Add your tracking logic here
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Stars */}
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>

        {/* Nebula Effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-purple-500/20 via-transparent to-transparent opacity-50"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-blue-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-radial from-pink-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Floating Satellites */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="satellite-1 absolute top-20 left-10 text-blue-400 opacity-60">
          <Satellite className="w-8 h-8 animate-pulse" />
        </div>
        <div className="satellite-2 absolute top-40 right-20 text-green-400 opacity-50">
          <Rocket className="w-6 h-6" />
        </div>
        <div className="satellite-3 absolute bottom-32 left-1/4 text-purple-400 opacity-40">
          <Satellite className="w-10 h-10" />
        </div>
        <div className="satellite-4 absolute top-1/3 right-1/3 text-cyan-400 opacity-30">
          <Globe className="w-12 h-12 animate-spin" style={{ animationDuration: "20s" }} />
        </div>
      </div>

      {/* Earth in Corner */}
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-30">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 via-green-400 to-blue-600 shadow-2xl shadow-blue-500/20 animate-pulse"></div>
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-green-400/40 via-transparent to-blue-400/40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              Welcome to
            </h1>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-wider">
              SATELLITE TRACKER
            </h1>
          </div>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide max-w-2xl mx-auto">
            Track real-time satellite positions across the globe
          </p>

          {/* Input and Button */}
          <div className="space-y-6 max-w-md mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter Satellite ID "
                value={satelliteId}
                onChange={(e) => setSatelliteId(e.target.value)}
                className="w-full px-6 py-4 text-lg bg-black/40 border-2 border-cyan-500/50 rounded-xl text-white placeholder-gray-400 backdrop-blur-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                onKeyPress={(e) => e.key === "Enter" && handleTrack()}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 pointer-events-none"></div>
            </div>

            <Button
              onClick={handleTrack}
              className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <span className="flex items-center justify-center gap-2">
                <Satellite className="w-5 h-5" />
                TRACK NOW
              </span>
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-gray-400 text-sm space-y-2 max-w-lg mx-auto">
            <p>Popular satellites: ISS (25544), Hubble (20580), Starlink satellites</p>
            <div className="flex justify-center gap-4 text-xs">
              <span className="px-3 py-1 bg-blue-500/20 rounded-full border border-blue-500/30">
                Real-time tracking
              </span>
              <span className="px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">
                Global coverage
              </span>
              <span className="px-3 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/30">Live updates</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .stars, .stars2, .stars3 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }

        .stars {
          background-image: 
            radial-gradient(2px 2px at 20px 30px, #eee, transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 90px 40px, #fff, transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
            radial-gradient(2px 2px at 160px 30px, #ddd, transparent);
          background-repeat: repeat;
          background-size: 200px 100px;
          animation: zoom 20s infinite;
        }

        .stars2 {
          background-image: 
            radial-gradient(1px 1px at 40px 60px, #fff, transparent),
            radial-gradient(1px 1px at 120px 10px, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 170px 50px, #eee, transparent);
          background-repeat: repeat;
          background-size: 250px 120px;
          animation: zoom 10s infinite;
        }

        .stars3 {
          background-image: 
            radial-gradient(1px 1px at 10px 10px, #fff, transparent),
            radial-gradient(1px 1px at 150px 150px, rgba(255,255,255,0.5), transparent);
          background-repeat: repeat;
          background-size: 300px 200px;
          animation: zoom 15s infinite;
        }

        @keyframes zoom {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .satellite-1 {
          animation: float1 8s ease-in-out infinite;
        }

        .satellite-2 {
          animation: float2 12s ease-in-out infinite;
        }

        .satellite-3 {
          animation: float3 10s ease-in-out infinite;
        }

        .satellite-4 {
          animation: float4 15s ease-in-out infinite;
        }

        @keyframes float1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(20px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }

        @keyframes float2 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-15px) translateX(-10px) rotate(120deg); }
          66% { transform: translateY(-25px) translateX(15px) rotate(240deg); }
        }

        @keyframes float3 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-40px) translateX(-20px); }
        }

        @keyframes float4 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          25% { transform: translateY(-10px) translateX(15px) scale(1.1); }
          50% { transform: translateY(-20px) translateX(-10px) scale(0.9); }
          75% { transform: translateY(-5px) translateX(20px) scale(1.05); }
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  )
}
