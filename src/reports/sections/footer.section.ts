import { Content } from 'pdfmake/interfaces';

export const footerSection = (
  currentPage: number,
  pageCount: number,
): Content => {
  return {
    text: `Pagina ${currentPage.toString()} de ${pageCount}`,
    alignment: 'right',
    fontSize: 11,
    margin: [0, 10, 25, 0],
  };
};
