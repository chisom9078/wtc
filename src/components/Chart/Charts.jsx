import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { AgChartsReact } from 'ag-charts-react';

// Chart Component
 const PieChart = () => {

  var myTheme = {
    baseTheme: 'ag-default-dark',
    palette: {
        fills: ['bg-[#191B28]'],
        strokes: [''],
    },
    overrides: {
        common: {
            title: {
                fontSize: 24,
            },
        },
        bar: {
            series: {
                label: {
                    enabled: true,
                    color: 'black',
                },
            },
        },
    },
};



  // Chart Options: Control & configure the chart
  const data = [
    { type: 'Pre-sale', count: 200000000  },
    { type: 'Community Airdrop', count: 200000000  },
    { type: 'Farm, Staking, Pools, Liquidity', count: 200000000  },
    { type: 'Project Partners', count: 200000000 },
    { type: 'Team and Development', count: 200000000 },

];
const numFormatter = new Intl.NumberFormat('en-US');
const total = data.reduce((sum, d) => sum + d['count'], 0);
  const [chartOptions, setChartOptions] = useState({
    container: document.getElementById('myChart'),
    data,
    theme: myTheme,
    // title: {
    //     text: 'Dwelling Fires (UK)',
    //     padding: 24,
    // },
    // footnote: {
    //     text: 'Source: Home Office',
    // },
    series: [
        {
            type: 'pie',
            calloutLabelKey: 'type',
            angleKey: 'count',
            sectorLabelKey: 'count',
            calloutLabel: {
                enabled: false,
            },
            sectorLabel: {
                formatter: ({ datum, sectorLabelKey }) => {
                    const value = datum[sectorLabelKey];
                    return numFormatter.format(value);
                },
            },
            // title: {
            //     text: 'Annual Count',
            // },
            innerRadiusRatio: 0.7,
            innerLabels: [
              {
                text: 'WTC Supply',
                fontSize: 24,
                margin: 10,
              },
                {
                    text: numFormatter.format(total),
                    fontSize: 24,
                },
              
            ],
            tooltip: {
                renderer: ({ datum, calloutLabelKey, title, sectorLabelKey }) => {
                    return {
                        title,
                        content: `${datum[calloutLabelKey]}: ${numFormatter.format(datum[sectorLabelKey])}`,
                    };
                },
            },
            strokeWidth: 3,
        },
    ],
  
});


  return (
    // AgCharsReact component with options passed as prop
    <AgChartsReact options={chartOptions} />
  );
}

export default PieChart;