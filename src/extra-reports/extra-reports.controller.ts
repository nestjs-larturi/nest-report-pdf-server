import { Controller, Get, Res } from '@nestjs/common';
import { ExtraReportsService } from './extra-reports.service';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('extra-reports')
export class ExtraReportsController {
  constructor(private readonly extraReportsService: ExtraReportsService) {}

  @Get('html-report')
  @ApiTags('extra-reports') // Swagger
  @ApiOperation({ summary: 'Reporte html' }) // Swagger
  @ApiResponse({ status: 200, description: 'Reporte html ejemplo' }) // Swagger
  async getHtmlReport(@Res() response: Response) {
    const pdfDoc = this.extraReportsService.getHtmlReport();

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader(
      'Content-Disposition',
      'attachment; filename=filename.pdf',
    );

    pdfDoc.info.Title = 'HTML-PDF.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('html-billing-report')
  @ApiTags('extra-reports') // Swagger
  @ApiOperation({ summary: 'Reporte html de una factura' }) // Swagger
  @ApiResponse({ status: 200, description: 'Reporte html de una factura' }) // Swagger
  async getBillingReport(@Res() response: Response) {
    const pdfDoc = this.extraReportsService.getBillingReport();

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader(
      'Content-Disposition',
      'attachment; filename=filename.pdf',
    );

    pdfDoc.info.Title = 'Recipe-PDF.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('custom-size')
  @ApiTags('extra-reports') // Swagger
  @ApiOperation({ summary: 'Custom size' }) // Swagger
  @ApiResponse({ status: 200, description: 'Custom size' }) // Swagger
  async getCustomSize(@Res() response: Response) {
    const pdfDoc = this.extraReportsService.getCustomSize();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Custom-Size';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
