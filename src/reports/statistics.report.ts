import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getBarChart, getDonutChart, getLineChart } from './charts';
import { headerSection } from './sections/header.section';
import { footerSection } from './sections/footer.section';

interface TopCountry {
  country: string;
  customers: number;
}

interface ReportOptions {
  title?: string;
  subTitle?: string;
  topCountries: TopCountry[];
}

export const getStatisticsReport = async (
  options: ReportOptions,
): Promise<TDocumentDefinitions> => {
  const [donutChart, lineChart, barChart1, barChart2] = await Promise.all([
    await getDonutChart({
      entries: options.topCountries.map((c) => ({
        label: c.country,
        value: c.customers,
      })),
    }),

    await getLineChart(),

    await getBarChart(),

    await getBarChart(),
  ]);

  const docDefinition: TDocumentDefinitions = {
    pageMargins: [40, 120, 40, 60],
    header: headerSection({
      title: options.title ?? 'Estadisticas de Clientes',
      subTitle: options.subTitle ?? 'Top 10 paises con mas clientes',
    }),
    footer: footerSection,
    content: [
      {
        columns: [
          {
            stack: [
              {
                text: 'Top 10 paises con mas clientes',
                alignment: 'center',
                margin: [30, 0, 0, 12],
              },
              {
                image: donutChart,
                width: 320,
              },
            ],
          },
          {
            width: 'auto',
            layout: 'lightHorizontalLines',
            table: {
              headerRows: 1,
              widths: [100, 'auto'],
              body: [
                ['País', 'Clientes'],
                ...options.topCountries.map((c) => [c.country, c.customers]),
              ],
            },
          },
        ],
      },
      {
        image: lineChart,
        width: 500,
        margin: [0, 20],
      },
      {
        columnGap: 10,
        columns: [
          {
            image: barChart1,
            width: 250,
            height: 200,
            margin: [0, 20],
          },
          {
            image: barChart2,
            width: 250,
            height: 200,
            margin: [0, 20],
          },
        ],
      },
    ],
  };

  return docDefinition;
};
