import fs from 'fs';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf8');

export const getBasicChartSvgReporter =
  async (): Promise<TDocumentDefinitions> => {
    return {
      content: [
        {
          svg: svgContent,
          width: 100,
          fit: [100, 100],
        },
      ],
    };
  };
