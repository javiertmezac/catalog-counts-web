# Catalog Counts Web App

This is custom application to heep track of "movements".
Most of these movements are "manually" recorded in paper or excel-sheets. This program will help to digitally control these movements, and keep track of each record.

## Notes

```text
payload.registrationDate =
  (payloadRegistration.getTime() + // UTC time picked from UI
    DateTimeHandler.getCurrentTimeZoneMilliseconds() + // diff from timeZone Offset to actual user's time.
    DateTimeHandler.getDateTimeOffSetMilliseconds()) / 1000; // timeZone offset
    //divided by 1000 -> Instant class Java (API object)
```
