import { Controller, Get, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  async hello(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.hello();

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader(
      'Content-Disposition',
      'attachment; filename=filename.pdf',
    );

    pdfDoc.info.Title = 'Hello-PDF.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
