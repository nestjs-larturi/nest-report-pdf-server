import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from '../printer/printer.service';
import { getHelloWorldReport } from '../reports/hello-world.report';
import { getEmploymentLetterReport } from 'src/reports/employment-letter.report';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async hello() {
    const docDefinition = getHelloWorldReport({ name: 'Leandro' });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async employmentLetter() {
    const docDefinition = getEmploymentLetterReport();

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
}
