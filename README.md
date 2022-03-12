# CatalogCountsWeb

## Notes

```text
payload.registrationDate =
  (payloadRegistration.getTime() + // UTC time picked from UI
    DateTimeHandler.getCurrentTimeZoneMilliseconds() + // diff from timeZone Offset to actual user's time.
    DateTimeHandler.getDateTimeOffSetMilliseconds()) / 1000; // timeZone offset
    //divided by 1000 -> Instant class Java (API object)
```
