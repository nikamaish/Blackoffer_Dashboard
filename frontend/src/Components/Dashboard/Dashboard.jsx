import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data');
        const data = response.data;

        // Process the data to fit the chart format
        const labels = data.map(item => item.start_year);
        const intensity = data.map(item => item.intensity);
        const likelihood = data.map(item => item.likelihood);
        const relevance = data.map(item => item.relevance);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Intensity',
              data: intensity,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: true,
            },
            {
              label: 'Likelihood',
              data: likelihood,
              borderColor: 'rgba(192,75,75,1)',
              backgroundColor: 'rgba(192,75,75,0.2)',
              fill: true,
            },
            {
              label: 'Relevance',
              data: relevance,
              borderColor: 'rgba(75,75,192,1)',
              backgroundColor: 'rgba(75,75,192,0.2)',
              fill: true,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Data Visualization</h2>
      <Line data={chartData} />
    </div>
  );
};

export default Dashboard;
