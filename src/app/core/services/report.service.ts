import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  generatePDFReport(data: any): void {
    console.log('Generando PDF con:', data);
    // Lógica para generar PDF (usar librerías como pdfmake)
  }

  generateExcelReport(data: any): void {
    console.log('Generando Excel con:', data);
    // Lógica para Excel (usar librerías como xlsx)
  }
}