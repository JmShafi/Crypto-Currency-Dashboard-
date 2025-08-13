
import React, { useState, useMemo } from 'react';
import useFetchData from './hooks/useFetchData.js';
import ChartComponent from './components/ChartComponent.jsx';
import DataTable from './components/DataTable.jsx';
import FilterControls from './components/FilterControls.jsx';
import Header from './components/Header.jsx';

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

function App() {
  const { data: rawData, loading, error } = useFetchData(API_URL);
  const [filterText, setFilterText] = useState('');

  const filteredData = useMemo(() => {
    if (!rawData) return [];
    return rawData.filter(coin =>
      coin.name.toLowerCase().includes(filterText.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [rawData, filterText]);

 
  const chartData = useMemo(() => {
    if (!filteredData.length) return { labels: [], datasets: [] };
    const labels = filteredData.map(coin => coin.symbol.toUpperCase());
    const prices = filteredData.map(coin => coin.current_price);
    const marketCaps = filteredData.map(coin => coin.market_cap);

    return {
      barChart: {
        labels: labels.slice(0, 10),
        datasets: [{
          label: 'Current Price (USD)',
          data: prices.slice(0, 10),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      pieChart: {
        labels: labels.slice(0, 5),
        datasets: [{
          label: 'Market Cap',
          data: marketCaps.slice(0, 5),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
        }],
      },
      lineChart: {
        labels: labels.slice(0, 15),
        datasets: [{
          label: 'Current Price',
          data: prices.slice(0, 15),
          borderColor: 'rgba(255, 159, 64, 1)',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          fill: true,
        }],
      }
    };
  }, [filteredData]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-2xl font-bold">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-600 text-2xl font-bold">Error: {error.message}</div>;
  }

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Symbol', accessor: 'symbol' },
    { header: 'Current Price', accessor: 'current_price' },
    { header: 'Market Cap', accessor: 'market_cap' },
    { header: '24h Change (%)', accessor: 'price_change_percentage_24h' },
  ];

  const handleFilterChange = (value) => {
    setFilterText(value);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Header title="Crypto Dashboard" />
      
      <FilterControls onFilterChange={handleFilterChange} />
      
      {/* responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Top 10 Crypto Prices</h2>
          <ChartComponent type="bar" data={chartData.barChart} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Top 5 Market Cap Distribution</h2>
          <ChartComponent type="pie" data={chartData.pieChart} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md lg:col-span-2 xl:col-span-1">
          <h2 className="text-xl font-bold mb-4">Price Trend (Top 15)</h2>
          <ChartComponent type="line" data={chartData.lineChart} />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Market Data Table</h2>
        <DataTable data={filteredData} columns={columns} />
      </div>
    </div>
  );
}


export default App;