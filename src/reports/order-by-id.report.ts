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

export interface CompleteOrder {
  order_id: number;
  customer_id: number;
  order_date: Date;
  customers: Customers;
  order_details: OrderDetail[];
}

export interface Customers {
  customer_id: number;
  customer_name: string;
  contact_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  products: Products;
}

export interface Products {
  product_id: number;
  product_name: string;
  category_id: number;
  unit: string;
  price: string;
}

interface ReportValues {
  title?: string;
  subTitle?: string;
  data: CompleteOrder;
}

export const orderByIdReport = (value: ReportValues): TDocumentDefinitions => {
  const { data } = value;

  const { customers, order_details, order_id, order_date } = data;

  const subTotal = order_details.reduce(
    (acc, detail) => acc + detail.quantity * +detail.products.price,
    0,
  );

  // Aplico el IVA
  const total = subTotal * 1.21;

  const updatedDate = new Date(order_date);
  updatedDate.setDate(order_date.getDate() + 30);
  const formattedDate = DataFormatter.getDDMMMMYYYY(updatedDate);

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
                text: `Recibo No#: ${order_id}\n`,
                bold: true,
                style: { fontSize: 14 },
              },
              `Fecha del recibo: ${DataFormatter.getDDMMMMYYYY(new Date(order_date))} \nPagar antes de: ${formattedDate}`,
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
            text: `${customers.contact_name}\n ${customers.address}, ${customers.city}`,
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

            ...order_details.map((detail) => [
              detail.order_id.toString(),
              detail.products.product_name,
              detail.quantity.toString(),
              CurrencyFormatter.formatCurrency(+detail.products.price),
              {
                text: CurrencyFormatter.formatCurrency(
                  +detail.products.price * detail.quantity,
                ),
                alignment: 'right',
              },
            ]),
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
                    text: CurrencyFormatter.formatCurrency(subTotal),
                    alignment: 'right',
                  },
                ],
                [
                  'Impuestos (21%)',
                  {
                    text: CurrencyFormatter.formatCurrency(subTotal * 0.21),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total', bold: true },
                  {
                    text: CurrencyFormatter.formatCurrency(total),
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
