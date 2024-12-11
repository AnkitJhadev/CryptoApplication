import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([['Date', 'Prices']]);

  useEffect(() => {
    if (historicalData?.prices?.length) {
      const formattedData = [['Date', 'Prices']];
      historicalData.prices.forEach(([timestamp, price]) => {
        formattedData.push([new Date(timestamp).toLocaleDateString(), price]);
      });
      setData(formattedData);
    }
  }, [historicalData]);

  return (
    <div className="line-chart-wrapper">
      <div className="chart-container">
        {data.length > 1 ? (
          <Chart
            chartType="LineChart"
            data={data}
            height="400px"
            options={{
              title: 'Price History',
              hAxis: { title: 'Date' },
              vAxis: { title: 'Prices' },
              legend: 'none',
            }}

            
          />
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>

</div>

  );
};

export default LineChart;
