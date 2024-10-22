import fs from 'fs';

import { Injectable } from '@nestjs/common';
import { PrinterService } from '../printer/printer.service';
import { getHtmlContent } from 'src/helpers';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from 'src/reports/sections/header.section';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {}

  getHtmlReport() {
    const html = fs.readFileSync('src/reports/html/basic-html.html', 'utf-8');
    const content = getHtmlContent(html);
    const docDefinition: TDocumentDefinitions = {
      pageMargins: [40, 110, 40, 60],
      header: headerSection({
        title: 'HtmlToPDF',
        subTitle: 'Convertir HTML a PDF con pdfmake',
      }),
      content: content,
    };

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
