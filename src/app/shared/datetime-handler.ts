export class DateTimeHandler {
  private static minutes = 60;
  private static seconds = 60;
  private static milliseconds = 1000;

  static getDateTimeOffSetMilliseconds(): number {
    const date = new Date();
    return date.getTimezoneOffset() * this.seconds * this.milliseconds;
  }

  static getCurrentTimeZoneMilliseconds(): number {
    const dateTime = new Date();
    const hourMil =
      dateTime.getHours() * this.minutes * this.seconds * this.milliseconds;
    const minmil = dateTime.getMinutes() * this.seconds * this.milliseconds;
    const secMil = dateTime.getSeconds() * this.milliseconds;
    return hourMil + minmil + secMil;
  }

  static getSelectedDateWithLocalTime(selectedDate: string) : Date {
    // format = yyyy-mm-dd
    var year = Number(selectedDate.substring(0, 4));
    var monthIndex = Number(selectedDate.substring(5, 7)) - 1;
    var date = Number(selectedDate.substring(8, selectedDate.length));
    var myDate = new Date(year, monthIndex, date);
    var now = new Date();
    return new Date(myDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds()));
  }

  static subtractOneMonth(date: Date): Date {
    const newDate = new Date(date);
    const dayOfMonth = newDate.getDate();
    newDate.setDate(1);
    newDate.setMonth(newDate.getMonth() - 1);
    const daysInNewMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
    newDate.setDate(Math.min(dayOfMonth, daysInNewMonth)); // Set the day, capping at the last day of the new month
  
    return newDate;
  }
  
  static isDateEditable(selectedDate: Date, today: Date, maxDay: number): boolean {

    if (selectedDate.getTime() > today.getTime()) {
      return true;
    }

    const todayDay = today.getDate();

    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth(); // 0-based

    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();

    // Helper: diferencia en meses entre selectedDate y hoy
    const monthDiff =
      (todayYear - selectedYear) * 12 +
      (todayMonth - selectedMonth);

    // monthDiff = 0 → mismo mes
    // monthDiff = 1 → mes anterior
    // monthDiff = 2 → hace dos meses, etc.

    if (todayDay <= maxDay) {
      return monthDiff === 0 || monthDiff === 1;
    }

    if (monthDiff === 0) {
      return true;
    }

    return false;
  }
}
