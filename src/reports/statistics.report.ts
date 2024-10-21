import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as Utils from 'src/helpers/chart-utils';

interface TopCountry {
  country: string;
  customers: number;
}

interface ReportOptions {
  title?: string;
  subTitle?: string;
  topCountries: TopCountry[];
}

const generateTopCountriesDunut = async (
  topCountries: TopCountry[],
): Promise<string> => {
  const data = {
    labels: topCountries.map((country) => country.country),
    datasets: [
      {
        label: 'Dataset 1',
        data: topCountries.map((country) => country.customers),
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      legend: {
        position: 'left',
      },
      plugins: {
        datalabels: {
          color: '#fff',
          font: {
            weight: 'bold',
            size: 14,
          },
        },
      },
    },
  };

  return Utils.chartJsToImage(config);
};

export const getStatisticsReport = async (
  options: ReportOptions,
): Promise<TDocumentDefinitions> => {
  const donutChart = await generateTopCountriesDunut(options.topCountries);

  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        image: donutChart,
        width: 500,
      },
    ],
  };

  return docDefinition;
};
