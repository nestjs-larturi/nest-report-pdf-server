export class DataFormatter {
  static formater = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  static getDDMMMMYYYY(date: Date): string {
    return this.formater.format(date);
  }
}
