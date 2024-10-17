import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export const getStatisticsReport = (): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    content: [`Hola desde statistics`],
  };

  return docDefinition;
};
