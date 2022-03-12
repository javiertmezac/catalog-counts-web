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
}
