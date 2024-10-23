import fs from 'fs';

import { Injectable } from '@nestjs/common';
import { PrinterService } from '../printer/printer.service';
import { getHtmlContent } from 'src/helpers';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from 'src/reports/sections/header.section';
import { footerSection } from 'src/reports/sections/footer.section';
import { billingReport } from 'src/reports';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {}

  getHtmlReport() {
    const html = fs.readFileSync('src/reports/html/basic3.html', 'utf-8');
    const content = getHtmlContent(html, {
      client: 'Leandro Arturi',
    });
    const docDefinition: TDocumentDefinitions = {
      pageMargins: [40, 110, 40, 60],
      header: headerSection({
        title: 'HtmlToPDF',
        subTitle: 'Convertir HTML a PDF con pdfmake',
      }),
      content: content,
      footer: footerSection,
    };

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  getBillingReport() {
    const docDefinition = billingReport();

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  getCustomSize() {
    const doc = this.printerService.createPdf({
      pageSize: 'A4',
      // pageSize: {
      //   width: 150,
      //   height: 300,
      // },
      content: [
        {
          qr: 'https://leandroarturi.com.ar',
          fit: 100,
          alignment: 'center',
        },
        {
          text: 'Reporte con tamaño',
          fontSize: 10,
          alignment: 'center',
          margin: [0, 20],
        },
      ],
    });

    return doc;
  }
}
