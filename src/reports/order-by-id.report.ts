import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { DataFormatter } from 'src/helpers';

const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin: [30, 30],
};

const styles: StyleDictionary = {
  header: {
    fontSize: 14,
    bold: true,
    margin: [0, 30, 0, 0],
  },
};

export const orderByIdReport = (): TDocumentDefinitions => {
  return {
    styles: styles,
    header: logo,
    pageMargins: [37, 60, 40, 60],
    content: [
      {
        text: 'Tucan Code',
        style: 'header',
      },
      {
        columns: [
          {
            text: '15 Montgomery Str, Suite 100 \nOttawa ON K2Y 9X1, CANADA\n BN: 12783671823 \nhttps://devtalles.com',
          },
          {
            text: `Recibo No#: 10255\nFecha del recibo: ${DataFormatter.getDDMMMMYYYY(new Date())} \nPagar antes de: ${DataFormatter.getDDMMMMYYYY(new Date())}`,
            alignment: 'right',
          },
        ],
      },
    ],
  };
};
