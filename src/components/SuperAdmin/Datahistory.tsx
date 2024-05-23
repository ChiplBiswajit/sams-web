import React, { useState } from 'react';
type TabKey = 'Oxygen' | 'Co2' | 'Temperature' | 'Humidity' | 'Voc' | 'Jerk' | 'Alcohol';
interface DataSet {
    xData: number[];
    yData: number[];
}

const dataSets: Record<TabKey, DataSet> = {
    Oxygen: { xData: [1, 2, 3, 4, 5], yData: [21, 19, 20, 22, 18] },
    Co2: { xData: [1, 2, 3, 4, 5], yData: [400, 420, 440, 410, 430] },
    Temperature: { xData: [1, 2, 3, 4, 5], yData: [22, 23, 21, 24, 20] },
    Humidity: { xData: [1, 2, 3, 4, 5], yData: [50, 55, 52, 48, 53] },
    Voc: { xData: [1, 2, 3, 4, 5], yData: [0.5, 0.6, 0.4, 0.7, 0.5] },
    Jerk: { xData: [1, 2, 3, 4, 5], yData: [0.1, 0.3, 0.2, 0.4, 0.3] },
    Alcohol: { xData: [1, 2, 3, 4, 5], yData: [0, 0.02, 0.01, 0.03, 0.01] }
};

export default function Datahistory() {
    const [activeTab, setActiveTab] = useState<TabKey | null>(null);
    const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
    const [showChart, setShowChart] = useState<boolean>(false);
    const [LineChart, setLineChart] = useState<any>(null);

    const vehicles = ['Vehicle 1', 'Vehicle 2', 'Vehicle 3']; // Replace with your vehicle list
    const tabs: TabKey[] = [
        'Oxygen', 'Co2', 'Temperature', 'Humidity', 'Voc', 'Jerk', 'Alcohol'
    ];

    const handleTabClick = async (tab: TabKey) => {
        setActiveTab(tab);
        if (!LineChart) {
            const module = await import('@mui/x-charts/LineChart');
            setLineChart(() => module.LineChart);
        }
        setShowChart(false); // Reset showChart when clicking on a tab
    };

    const handleSubmit = () => {
        setShowChart(true);
    };

    const renderForm = (tab: TabKey) => (
        <div className="mt-4 p-4 bg-white rounded shadow-md w-1/2 mx-auto">
            <h2 className="text-lg font-bold mb-2">{tab} Data</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fromDate">
                    From:
                </label>
                <input
                    type="date"
                    id="fromDate"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="toDate">
                    To:
                </label>
                <input
                    type="date"
                    id="toDate"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className='w-full center'>
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
        const chartData = dataSets[activeTab!];
        return (
            <div className="mt-4 p-4 bg-white rounded shadow-md mx-auto">
                <h2 className="text-lg font-bold mb-2 text-center">Line Chart for {activeTab}</h2>
                {LineChart && (
                    <LineChart
                        xAxis={[{ data: chartData.xData }]}
                        series={[{
                            data: chartData.yData,
                            area: true,
                            color: '#8B95E3',
                        }]}
                        width={900}
                        height={300}
                    />
                )}
            </div>
        );
    };

    return (
        <section className='h-screen'>
            <div className='flex flex-col items-center mt-[2%] p-2'>
                <div className="mb-4 w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicleSelect">
                        Select Vehicle:
                    </label>
                    <select
                        id="vehicleSelect"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => setSelectedVehicle(e.target.value)}
                        value={selectedVehicle || ''}
                    >
                        <option value="" disabled>Select a vehicle</option>
                        {vehicles.map(vehicle => (
                            <option key={vehicle} value={vehicle}>
                                {vehicle}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedVehicle && (
                    <div className='flex flex-row gap-4 justify-center items-center mt-4'>
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                type="button"
                                className={`text-white  bg-purple-700 center hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-7 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-[12%] ${activeTab === tab ? 'bg-green-500 text-black' : ''}`}
                                onClick={() => handleTabClick(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                )}
                {activeTab && renderForm(activeTab)}
                {showChart && renderChart()}
            </div>
        </section>
    );
}

