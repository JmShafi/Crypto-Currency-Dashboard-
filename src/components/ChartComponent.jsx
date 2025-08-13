
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

const ChartComponent = ({ type, data, options }) => {
  if (type === 'bar') {
    return <Bar data={data} options={options} />;
  }
  if (type === 'pie') {
    return <Pie data={data} options={options} />;
  }
  if (type === 'line') {
    return <Line data={data} options={options} />;
  }
  return <div>Chart type not supported</div>;
};

export default ChartComponent;