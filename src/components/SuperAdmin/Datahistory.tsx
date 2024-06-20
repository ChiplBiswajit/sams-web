import React, { useEffect, useState, useRef } from "react";
import {
  FaCloud,
  FaTint,
  FaBroadcastTower,
  FaCarCrash,
  FaWineBottle,
  FaFlask,
  FaThermometerHalf,
} from "react-icons/fa";
import { SiAirchina } from "react-icons/si";
import { IconType } from "react-icons";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Loader from "../Loader";

type TabKey =
  | "Oxygen"
  | "Co2"
  | "Temperature"
  | "Humidity"
  | "Voc"
  | "Jerk"
  | "Alcohol"
  | "AQI";

interface DataSet {
  xData: number[];
  yData: number[];
}

const tabIcons: Record<TabKey, IconType> = {
  Oxygen: FaFlask,
  Co2: FaCloud,
  Temperature: FaThermometerHalf,
  Humidity: FaTint,
  Voc: FaBroadcastTower,
  Jerk: FaCarCrash,
  Alcohol: FaWineBottle,
  AQI: SiAirchina,
};

const tabRanges: Record<
  TabKey,
  { low: number; high: number; lowColor: string; highColor: string }
> = {
  Oxygen: { low: 25, high: 90, lowColor: "red", highColor: "green" }, //25 < = Bad, 45 < = Average, 50 > = Good
  Co2: { low: 350, high: 1000, lowColor: "green", highColor: "red" }, //CO2: 0-400 = Good, 400-1000 = Average/Mild, 1000 > = Bad
  Temperature: { low: 15, high: 40, lowColor: "green", highColor: "red" }, //23-28: Good,28-33: Average,33 > = Bad
  Humidity: { low: 30, high: 60, lowColor: "green", highColor: "red" },
  Voc: { low: 30, high: 750, lowColor: "green", highColor: "red" }, //VOC: 0-50 = Good, 50-750 = Average/Mild, 750 > = Bad
  Jerk: { low: 0.01, high: 2, lowColor: "green", highColor: "red" }, //4 > = Bad
  Alcohol: { low: 1, high: 1500, lowColor: "green", highColor: "red" }, //0-1500: Good, 1500-1800: Average, 1800 > = Bad
  AQI: { low: 1, high: 4, lowColor: "green", highColor: "red" }, //AQI: 1-3 = Good, 3-4 = Average, 4-5 = Bad
};

export default function Datahistory() {
  const [activeTab, setActiveTab] = useState<TabKey | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [showChart, setShowChart] = useState<boolean>(false);
  const [vehicleslist, setVehicleslist] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState<{
    xData: number[];
    yData: number[];
  }>({ xData: [], yData: [] });

  const graphRef = useRef<HTMLDivElement>(null); // Create a ref for the graph container

  const fetchVehicles = async () => {
    const authToken = sessionStorage.getItem("authToken");
    try {
      const response = await fetch(
        "https://24x7healthcare.live/admins/getFilterAmbulance?ambulanceType=ALL",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data = await response.json();
      setVehicleslist(data.ambulanceList);
    } catch (error) {
      // console.error("Failed to fetch vehicles:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
    // console.log("Fetched vehicle list:", vehicleslist);
  }, []);

  const tabs: TabKey[] = [
    "Oxygen",
    "Co2",
    "Temperature",
    "Humidity",
    "Voc",
    "Jerk",
    "Alcohol",
    "AQI",
  ];

  const handleTabClick = (tab: TabKey) => {
    setActiveTab(tab);
    setShowChart(false);
  };

  const handleSubmit = () => {
    if (selectedVehicle && activeTab) {
      const fromDate = document.getElementById("fromDate") as HTMLInputElement;
      const toDate = document.getElementById("toDate") as HTMLInputElement;

      if (fromDate && toDate) {
        const startDate = fromDate.value;
        const endDate = toDate.value;

        if (!startDate || !endDate) {
          setErrorMessage("Please enter both start and end dates.");
          setShowChart(false);
          return;
        } else {
          setErrorMessage(null); // Clear error message if dates are provided
        }

        let apiUrl = "";
        switch (activeTab) {
          case "Oxygen":
            apiUrl = `https://24x7healthcare.live/dataHistory/getOxygen?ambulanceId=${selectedVehicle}&startDate=${startDate}&endDate=${endDate}`;
            break;
          case "Co2":
            apiUrl = `https://24x7healthcare.live/dataHistory/getCo2?ambulanceId=${selectedVehicle}&startDate=${startDate}&endDate=${endDate}`;
            break;
          case "Temperature":
            apiUrl = `https://24x7healthcare.live/dataHistory/getTemp?ambulanceId=${selectedVehicle}&startDate=${startDate}&endDate=${endDate}`;
            break;
          case "Humidity":
            apiUrl = `https://24x7healthcare.live/dataHistory/getHumidity?ambulanceId=${selectedVehicle}&startDate=${startDate}&endDate=${endDate}`;
            break;
          case "Voc":
            apiUrl = `https://24x7healthcare.live/dataHistory/getVoc?ambulanceId=${selectedVehicle}&startDate=${startDate}&endDate=${endDate}`;
            break;
          case "Jerk":
            apiUrl = `https://24x7healthcare.live/dataHistory/getJerk?ambulanceId=${selectedVehicle}&startDate=${startDate}&endDate=${endDate}`;
            break;
          case "Alcohol":
            apiUrl = `https://24x7healthcare.live/dataHistory/getAlcohol?ambulanceId=${selectedVehicle}&startDate=${startDate}&endDate=${endDate}`;
            break;
          case "AQI":
            apiUrl = `https://24x7healthcare.live/dataHistory/getAqiIndex?ambulanceId=${selectedVehicle}&startDate=${startDate}&endDate=${endDate}`;
            break;
          default:
            break;
        }

        const authToken = sessionStorage.getItem("authToken");
        setLoading(true); // Start loading
        fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log("Fetched data:", data);
            const xData = data.result.map(
              (item: any) => `${item.date} ${item.time}`
            );
            const yData = data.result.map((item: any) => item.value);
            setChartData({ xData, yData });
            setShowChart(true);
            setLoading(false); // End loading
            setTimeout(() => {
              graphRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to the graph
            }, 100);
          })
          .catch((error) => {
            // console.error("Error fetching data:", error);
            setLoading(false); // End loading on error
          });
      }
    }
  };

  const renderForm = (tab: TabKey) => (
    <div className="mt-4 p-4 bg-white rounded shadow-md w-1/2 mx-auto">
      <h2 className="text-lg font-bold mb-2">{tab} Data :</h2>
      <div className="w-full flex gap-2">
        <div className="mb-4 w-full">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fromDate"
          >
            From:
          </label>
          <input
            type="date"
            id="fromDate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 w-full">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="toDate"
          >
            To:
          </label>
          <input
            type="date"
            id="toDate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      {errorMessage && (
        <p className="text-red-500 text-base italic mb-8">{errorMessage}</p>
      )}
      <div className="w-full center">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          onClick={handleSubmit}
        >
          View Data
        </button>
      </div>
    </div>
  );

  const determineDotStyle = (value: number, tab: TabKey) => {
    const { low, high, lowColor, highColor } = tabRanges[tab];
    if (value < low) {
      return lowColor;
    }
    if (value > high) {
      return highColor;
    }
    return "#01339f";
  };

  const CustomDot = (props: any) => {
    const { cx, cy, value } = props;
    const fill = determineDotStyle(value, activeTab!);
    return <circle cx={cx} cy={cy} r={5} fill={fill} stroke="none" />;
  };

  const renderChart = () => {
    if (loading) {
      return (
        <div className="mt-4 p-4 bg-white rounded shadow-md mx-auto text-center">
          <Loader />
        </div>
      );
    }

    if (!showChart) {
      return (
        <div className="w-[70%] mt-4 p-2 bg-white rounded shadow-md mx-auto text-center">
          <p className="w-full text-lg font-bold text-black">
            Please Select a Vehicle & date range to view the data.
          </p>
        </div>
      );
    }

    const data = chartData.xData.map((x, index) => ({
      date: x,
      value: chartData.yData[index],
    }));

    return (
      <div
        ref={graphRef}
        className="mt-4 w-[100%] h-[80%] p-4 center flex flex-col bg-white rounded shadow-md mx-auto"
      >
        <h2 className="text-lg font-bold mb-2 text-center">
          Line Chart for {activeTab}
        </h2>
        <LineChart
          width={900}
          height={400}
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          className=""
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            label={{
              value: "Date & Time",
              position: "insideBottomRight",
              offset: 0,
              dy: 15,
              style: { fill: "black" },
            }}
          />
          <YAxis
            label={{
              value: activeTab,
              angle: -90,
              position: "insideLeft",
              style: { fill: "black" },
              dx: -10,
            }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#01339f"
            yAxisId={0}
            dot={<CustomDot />}
          />
        </LineChart>
      </div>
    );
  };

  return (
    <section className="md:h-auto h-screen bg-zinc-100">
      <div className="flex flex-col items-center pt-[2%] p-2">
        <div className="mb-4 w-[80%]">
          <label
            className="block text-gray-700  text-sm font-bold mb-2"
            htmlFor="vehicleSelect"
          >
            Select Vehicle:
          </label>
          <div className="relative">
            <select
              id="vehicleSelect"
              className="block appearance-none w-full bg-white border hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => {
                setSelectedVehicle(e.target.value);
                setActiveTab(null);
                setShowChart(false);
              }}
              value={selectedVehicle || ""}
            >
              <option value="" disabled>
                Select a vehicle
              </option>
              {vehicleslist?.map((vehicle: any) => (
                <option key={vehicle.ambulanceId} value={vehicle.ambulanceId}>
                  {vehicle.ambulanceId}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </div>
          </div>
        </div>
        {selectedVehicle && (
          <div className="grid grid-cols-4 gap-2 justify-center items-center mt-2">
            {tabs.map((tab) => {
              const Icon = tabIcons[tab];
              return (
                <div key={tab}>
                  <button
                    key={tab}
                    type="button"
                    className={`w-full gap-1 center flex items-center text-white bg-[#01339F] hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-md text-base px-2 py-2.5 text-center mb-2   ${
                      activeTab === tab ? "bg-red-600 " : ""
                    }`}
                    onClick={() => handleTabClick(tab)}
                  >
                    <Icon className="w-6 h-6" />
                    {tab}
                  </button>
                </div>
              );
            })}
          </div>
        )}
        {activeTab && renderForm(activeTab)}
        {renderChart()}
      </div>
    </section>
  );
}
