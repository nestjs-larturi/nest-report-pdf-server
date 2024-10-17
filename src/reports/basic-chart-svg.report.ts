import fs from 'fs';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as Utils from '../helpers/chart-utils';

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf8');

const generateChartImage = async () => {
  const chartConfig = {
    type: 'bar', // Show a bar chart
    data: {
      labels: [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
      ], // Set X-axis labels
      datasets: [
        {
          label: 'Mi primer grafico', // Create the 'Users' dataset
          data: [120, 60, 50, 180, 120, 110, 200, 230, 200, 120, 500, 700], // Add data to the chart
          backgroundColor: 'rgba(93, 75, 192, 0.2)',
          borderColor: 'rgba(81, 75, 192)',
          borderWith: 1,
        },
      ],
    },
  };

  return Utils.chartJsToImage(chartConfig);
};

export const generateDonutChart = async () => {
  const DATA_COUNT = 5;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

  const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        label: 'Dataset 1',
        data: Utils.numbers(NUMBER_CFG),
        backgroundColor: Object.values(Utils.CHART_COLORS),
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Doughnut Chart',
      },
    },
  };

  return Utils.chartJsToImage(config);
};

export const getBasicChartSvgReporter =
  async (): Promise<TDocumentDefinitions> => {
    const [chart, chartDonut] = await Promise.all([
      generateChartImage(),
      generateDonutChart(),
    ]);

    return {
      content: [
        {
          svg: svgContent,
          width: 100,
          fit: [100, 100],
        },
        {
          image: chart,
          width: 500,
        },
        {
          image: chartDonut,
          width: 500,
        },
      ],
    };
  };
