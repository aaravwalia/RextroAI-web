import React, { useState } from "react";
import { Camera, Upload, Loader2, Sparkles, AlertCircle, FileDigit, CloudRain } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export const AIToolsView: React.FC = () => {
  const { menu, setMenu } = useAppContext();
  const [activeTab, setActiveTab] = useState<"menu" | "forecast">("menu");

  // Menu Scanner State
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any[] | null>(null);
  const [error, setError] = useState("");

  // Forecast state
  const [isForecasting, setIsForecasting] = useState(false);
  const [forecastResult, setForecastResult] = useState<any[] | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setScanResult(null);
      setError("");
    }
  };

  const handleScanMenu = async () => {
    if (!file) return;
    setIsScanning(true);
    setError("");

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = (reader.result as string).split(',')[1];
        
        const res = await fetch("/api/menu-scanner", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64data, mimeType: file.type }),
        });

        if (!res.ok) {
           const errData = await res.json();
           throw new Error(errData.error || "Failed to scan menu");
        }

        const data = await res.json();
        setScanResult(data);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsScanning(false);
    }
  };

  const approveImport = () => {
    if (!scanResult) return;
    
    const newItems = scanResult.map(item => ({
      id: `m-ai-${Math.random().toString(36).substring(2, 9)}`,
      name: item.name,
      price: item.price,
      estimatedCost: item.estimatedCost,
      category: item.category || "General",
    }));

    setMenu([...menu, ...newItems]);
    setScanResult(null);
    setFile(null);
    alert("Items imported successfully!");
  }

  const handleForecast = async () => {
    setIsForecasting(true);
    setError("");
    
    try {
      // Mocked data for forecast API
      const reqData = {
        salesData: [
          { item: "Premium Coffee Beans", weeklyVelocity: 15 },
          { item: "Avocado", weeklyVelocity: 80 }
        ],
        weatherForecast: "Heavy rain next 3 days, temp dropping 5 degrees."
      };

      const res = await fetch("/api/demand-forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to forecast demand");
      }

      const data = await res.json();
      setForecastResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
       setIsForecasting(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-blue-500" /> AI Intelligence Suite
        </h2>
        <p className="text-gray-400 mt-1">Leverage Gemini Vision and predictive analysis models.</p>
      </div>

      <div className="flex gap-4 mb-6 border-b border-white/10 pb-px">
        <button 
          onClick={() => setActiveTab("menu")}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 relative top-px ${activeTab === "menu" ? "border-blue-500 text-blue-400" : "border-transparent text-gray-500 hover:text-gray-300"}`}
        >
          Menu Digitization Model
        </button>
        <button 
          onClick={() => setActiveTab("forecast")}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 relative top-px ${activeTab === "forecast" ? "border-blue-500 text-blue-400" : "border-transparent text-gray-500 hover:text-gray-300"}`}
        >
          Supply Demand Forecasting
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-6">
        {activeTab === "menu" ? (
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column: Upload */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                   <FileDigit className="w-5 h-5 text-gray-400" /> Upload Physical Menu
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                  Upload an image of a physical menu. The AI model will extract items, prices, and estimate raw material making costs based on standard ingredient profiles.
                </p>

                <div className="border-2 border-dashed border-white/10 hover:border-blue-500/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-colors">
                  <Upload className="w-8 h-8 text-gray-500 mb-4" />
                  <p className="text-sm text-gray-300 font-medium mb-1">Drag and drop menu image</p>
                  <p className="text-xs text-gray-500 mb-4">PNG, JPG up to 10MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-400
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-600/10 file:text-blue-500
                      hover:file:bg-blue-600/20 file:cursor-pointer"
                  />
                </div>

                <button 
                  onClick={handleScanMenu}
                  disabled={!file || isScanning}
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {isScanning ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
                  {isScanning ? "Scanning with Gemini Vision..." : "Extract Menu Data"}
                </button>
                
                {error && (
                  <div className="mt-4 p-4 bg-red-500/10 rounded-xl flex gap-3 text-red-500 border border-red-500/20">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}
              </div>

              {/* Right Column: Results */}
              <div className="bg-[#0A0A0A] rounded-xl border border-white/10 p-6 min-h-[400px] flex flex-col">
                <h3 className="text-lg font-medium text-white mb-4">Extracted Data Object</h3>
                
                {!scanResult ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-500 text-sm">
                    {isScanning ? "Processing image layers..." : "Awaiting scan payload"}
                  </div>
                ) : (
                  <div className="flex-1 overflow-auto">
                    <div className="space-y-3">
                      {scanResult.map((item, idx) => (
                        <div key={idx} className="bg-[#111111] p-4 rounded-xl border border-white/10 flex flex-col gap-2">
                          <div className="flex justify-between items-start">
                            <div>
                               <p className="font-medium text-white">{item.name}</p>
                               <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded">{item.category}</span>
                            </div>
                            <span className="font-semibold text-blue-400">${item.price.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-blue-300">
                             <Sparkles className="w-3 h-3" />
                             Estimated Cost: ${item.estimatedCost.toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <button onClick={approveImport} className="mt-6 w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-xl transition-colors">
                      Import to Inventory System
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 shadow-sm">
             <div className="max-w-2xl">
               <h3 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
                  <CloudRain className="w-5 h-5 text-gray-400" /> Weather-Adjusted Demand Engine
               </h3>
               <p className="text-sm text-gray-400 mb-6">
                 This model analyzes recent local sales velocity parameters and correlates them with dynamic exogenous features (like upcoming weather forecasts) to predict ingredient depletion curves.
               </p>
               
               <button 
                 onClick={handleForecast}
                 disabled={isForecasting}
                 className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 mb-8"
               >
                 {isForecasting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                 {isForecasting ? "Running predictive models..." : "Run Forecast Engine"}
               </button>
               
               {error && (
                  <div className="mb-6 p-4 bg-red-500/10 rounded-xl flex gap-3 text-red-500 border border-red-500/20">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

               {forecastResult && (
                 <div className="bg-[#0A0A0A] rounded-xl border border-white/10 p-6 animate-in fade-in">
                   <h4 className="text-md font-medium text-white mb-4">Predicted Inventory Risks (Next 72 Hours)</h4>
                   <div className="space-y-4">
                     {forecastResult.map((res, idx) => (
                       <div key={idx} className="bg-[#111111] p-4 rounded-xl border border-white/10 relative overflow-hidden group">
                         <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                         <h5 className="font-medium text-gray-200 mb-1 pl-2">{res.item}</h5>
                         <p className="text-sm text-gray-400 mb-3 pl-2">{res.reasoning}</p>
                         
                         <div className="grid grid-cols-3 gap-4 pl-2 bg-white/5 p-3 rounded-lg border border-white/5 mt-2">
                            <div>
                               <p className="text-xs text-gray-500">Current</p>
                               <p className="text-sm font-medium text-white">{res.currentStock}</p>
                            </div>
                            <div>
                               <p className="text-xs text-gray-500">Est. Depletion</p>
                               <p className="text-sm font-medium text-red-400">{res.predictedNeed}</p>
                            </div>
                            <div>
                               <p className="text-xs text-blue-500/70 font-medium">Reorder Suggestion</p>
                               <p className="text-sm font-bold text-blue-400">{res.recommendedOrder}</p>
                            </div>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               )}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
