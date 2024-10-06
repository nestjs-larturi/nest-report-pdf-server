import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { StoreReportsService } from './store-reports.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('order/:orderId')
  @ApiTags('store-reports') // Swagger
  @ApiOperation({ summary: 'Recibo de orden por id' }) // Swagger
  @ApiResponse({
    status: 200,
    description: 'Recibo de orden por id',
  }) // Swagger
  async getOrderReport(
    @Res() response: Response,
    @Param('orderId') orderId: string,
  ) {
    const pdfDoc = await this.storeReportsService.getOrderByIdReport(orderId);

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader(
      'Content-Disposition',
      'attachment; filename=filename.pdf',
    );

    pdfDoc.info.Title = 'Order-Letter.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
