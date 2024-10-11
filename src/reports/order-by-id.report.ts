import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { CurrencyFormatter, DataFormatter } from 'src/helpers';
import { footerSection } from './sections/footer.section';

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
    footer: footerSection,
    content: [
      // Header
      {
        text: 'Tucan Code\n\n',
        style: 'header',
      },
      // Address and Recipe
      {
        columns: [
          {
            text: '15 Montgomery Str, Suite 100 \nOttawa ON K2Y 9X1, CANADA\n BN: 12783671823 \nhttps://tucancode.com',
          },
          {
            text: [
              {
                text: 'Recibo No#: 10255\n',
                bold: true,
                style: { fontSize: 14 },
              },
              `Fecha del recibo: ${DataFormatter.getDDMMMMYYYY(new Date())} \nPagar antes de: ${DataFormatter.getDDMMMMYYYY(new Date())}`,
            ],
            alignment: 'right',
          },
        ],
      },
      // QR
      { qr: 'https://leandroarturi.com.ar', fit: 75, alignment: 'right' },
      // Client address
      {
        text: [
          {
            text: `Cobrar a:\nRazón Social: `,
          },
          {
            text: `Juan Perez\n Greenvile 1123`,
            bold: true,
          },
        ],
      },
      // Order details table
      {
        layout: 'headerLineOnly',
        margin: [0, 23],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['Id', 'Descripcion', 'Cantidad', 'Precio', 'Total'],
            [
              '1',
              'Producto 1',
              '4',
              'Precio',
              {
                text: CurrencyFormatter.formatCurrency(100),
                alignment: 'right',
              },
            ],
            [
              '1',
              'Producto 1',
              '4',
              'Precio',
              {
                text: CurrencyFormatter.formatCurrency(100),
                alignment: 'right',
              },
            ],
            [
              '1',
              'Producto 1',
              '4',
              'Precio',
              {
                text: CurrencyFormatter.formatCurrency(100),
                alignment: 'right',
              },
            ],
          ],
        },
      },
      // Totals
      {
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                [
                  'Subtotal',
                  {
                    text: CurrencyFormatter.formatCurrency(122),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total', bold: true },
                  {
                    text: CurrencyFormatter.formatCurrency(160),
                    alignment: 'right',
                    bold: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
};
