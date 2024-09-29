import { Controller, Get, Param, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  @ApiTags('basic-reports') // Swagger
  @ApiOperation({ summary: 'Reporte básico' }) // Swagger
  @ApiResponse({ status: 200, description: 'Reporte básico' }) // Swagger
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

  @Get('employment-letter')
  @ApiTags('basic-reports') // Swagger
  @ApiOperation({ summary: 'Constancia de Empleo' }) // Swagger
  @ApiResponse({ status: 200, description: 'Constancia de Empleo' }) // Swagger
  async employmentLetter(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.employmentLetter();

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader(
      'Content-Disposition',
      'attachment; filename=filename.pdf',
    );

    pdfDoc.info.Title = 'Employment-Letter.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter/:employeeId')
  @ApiTags('basic-reports') // Swagger
  @ApiOperation({ summary: 'Constancia de Empleo por Id de Empleado' }) // Swagger
  @ApiResponse({
    status: 200,
    description: 'Constancia de Empleo Id de Empleado',
  }) // Swagger
  async employmentLetterByEmployeeId(
    @Res() response: Response,
    @Param('employeeId') employeeId: string,
  ) {
    const pdfDoc =
      await this.basicReportsService.employmentLetterByEmployeeId(+employeeId);

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader(
      'Content-Disposition',
      'attachment; filename=filename.pdf',
    );

    pdfDoc.info.Title = 'Employment-Letter.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('countries')
  @ApiTags('basic-reports') // Swagger
  @ApiOperation({ summary: 'Reporte de paises' }) // Swagger
  @ApiResponse({
    status: 200,
    description: 'Reporte de paises',
  }) // Swagger
  async countriesReport(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.getCountries();

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader(
      'Content-Disposition',
      'attachment; filename=filename.pdf',
    );

    pdfDoc.info.Title = 'Countries.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
