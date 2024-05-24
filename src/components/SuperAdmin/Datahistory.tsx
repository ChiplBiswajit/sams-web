import React, { useEffect, useState } from "react";
import {
  FaCloud,
  FaTint,
  FaBroadcastTower,
  FaCarCrash,
  FaWineBottle,
  FaFlask,
  FaThermometerHalf,
} from "react-icons/fa"; // Importing icons
import { IconType } from "react-icons";
import { Chart } from "react-google-charts"; // Import Chart from react-google-charts

type TabKey =
  | "Oxygen"
  | "Co2"
  | "Temperature"
  | "Humidity"
  | "Voc"
  | "Jerk"
  | "Alcohol";

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
};

export default function Datahistory() {
  const [activeTab, setActiveTab] = useState<TabKey | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [showChart, setShowChart] = useState<boolean>(false);
  const [LineChart, setLineChart] = useState<any>(null);
  const [vehicleslist, setVehicleslist] = useState<string[]>([]);
  const [chartData, setChartData] = useState<{
    xData: number[];
    yData: number[];
  }>({ xData: [], yData: [] });

  const fetchVehicles = async () => {
    const authToken = sessionStorage.getItem("authToken");
    try {
      const response = await fetch(
        "https://0r4mtgsn-8004.inc1.devtunnels.ms/admins/getFilterAmbulance?ambulanceType=ALL",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data = await response.json();
      setVehicleslist(data.ambulanceList);
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
    }
  };
  useEffect(() => {
    fetchVehicles();
    console.log("Fetched vehicle list:", vehicleslist);
  }, []);

  const tabs: TabKey[] = [
    "Oxygen",
    "Co2",
    "Temperature",
    "Humidity",
    "Voc",
    "Jerk",
    "Alcohol",
  ];

  const handleTabClick = async (tab: TabKey) => {
    setActiveTab(tab);
    if (!LineChart) {
      try {
        const { LineChart: importedLineChart } = await import("@mui/x-charts/LineChart");
        setLineChart(importedLineChart);
      } catch (error) {
        console.error("Error importing LineChart:", error);
      }
    }
    setShowChart(false);
  };
  

  const handleSubmit = () => {
    if (selectedVehicle && activeTab) {
      const fromDate = document.getElementById("fromDate") as HTMLInputElement;
      const toDate = document.getElementById("toDate") as HTMLInputElement;

      if (fromDate && toDate) {
        const startDate = fromDate.value;
        const endDate = toDate.value;

        let apiUrl = "";
        switch (activeTab) {
          case "Oxygen":
            apiUrl = `https://0r4mtgsn-8004.inc1.devtunnels.ms/dataHistory/getOxygen?ambulanceId=${selectedVehicle}&startDate=${startDate}&endDate=${endDate}`;
            break;
          case "Co2":
            apiUrl = `https://0r4mtgsn-8004.inc1.devtunnels.ms/dataHistory/getCo2?ambulanceId=${selectedVehicle}&startDate=${startDate}&endDate=${endDate}`;
            break;
          case "Temperature":
            apiUrl = `https://0r4mtgsn-8004.inc1.devtunnels.ms/dataHistory/getTemp?ambulanceId=${selectedVehicle}&startDate=${startDate}&endDate=${endDate}`;
            break;
          case "Humidity":
            apiUrl = `https://0r4mtgsn-8004.inc1.devtunnels.ms/dataHistory/getHumidity?ambulanceId=${selectedVehicle}&startDate=${startDate}&endDate=${endDate}`;
            break;
          case "Voc":
            apiUrl = `https://0r4mtgsn-8004.inc1.devtunnels.ms/dataHistory/getVoc?ambulanceId=${selectedVehicle}&startDate=${startDate}&endDate=${endDate}`;
            break;
          case "Jerk":
            apiUrl = `https://0r4mtgsn-8004.inc1.devtunnels.ms/dataHistory/getJerk?ambulanceId=${selectedVehicle}&startDate=${startDate}&endDate=${endDate}`;
            break;
          case "Alcohol":
            apiUrl = `https://0r4mtgsn-8004.inc1.devtunnels.ms/dataHistory/getAlcohol?ambulanceId=${selectedVehicle}&startDate=${startDate}&endDate=${endDate}`;
            break;
          default:
            break;
        }

        // Fetch data from the constructed URL
        const authToken = sessionStorage.getItem("authToken");
        fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Fetched data:", data);
            // Assuming the API response contains result array
            const xData = data.result.map((item: any) => item.time);
            const yData = data.result.map((item: any) => item.value);
            setChartData({ xData, yData });
            setShowChart(true);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
    }
    setShowChart(true);
  };

  const renderForm = (tab: TabKey) => (
    <div className="mt-4 p-4 bg-white rounded shadow-md w-1/2 mx-auto">
      <h2 className="text-lg font-bold mb-2">{tab} Data</h2>
      <div className="mb-4">
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
      <div className="mb-4">
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
      <div className="w-full center">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 "
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );

  const renderChart = () => {
    return (
      <div className="mt-4 w-[100%] h-[80%] p-4 bg-white rounded shadow-md mx-auto">
        <h2 className="text-lg font-bold mb-2 text-center">
          Line Chart for {activeTab}
        </h2>
        <Chart
          width={"100%"}
          height={"400px"}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Index", activeTab || ""],
            ...chartData.xData.map((x, index) => [x, chartData.yData[index]]),
          ]}
          options={{
            hAxis: {
              title: "Index",
            },
            vAxis: {
              title: "Value",
            },
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </div>
    );
  };

  return (
    <section className="h-screen">
      <div className="flex flex-col items-center mt-[2%] p-2">
        <div className="mb-4 w-1/2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="vehicleSelect"
          >
            Select Vehicle:
          </label>
          <select
            id="vehicleSelect"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            {vehicleslist.map((vehicle : any) => (
              <option key={vehicle.ambulanceId} value={vehicle.ambulanceId}>
                {vehicle.ambulanceId}
              </option>
            ))}
          </select>
        </div>
        {selectedVehicle && (
          <div className="flex flex-row gap-4 justify-center items-center mt-4">
            {tabs.map((tab) => {
              const Icon = tabIcons[tab];
              return (
                <div key={""}>
                <button
                  key={tab}
                  type="button"
                  className={`flex items-center gap-2 text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-4 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 ${
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
        {showChart && renderChart()}
      </div>
    </section>
  );
}
