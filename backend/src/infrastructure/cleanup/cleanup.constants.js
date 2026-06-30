const CRON_SCHEDULE = Object.freeze({
  EVERY_MINUTE: "* * * * *",
  EVERY_5_MINUTES: "*/5 * * * *",
  EVERY_10_MINUTES: "*/10 * * * *",
  EVERY_HOUR: "0 * * * *",
  EVERY_DAY: "0 0 * * *",
  EVERY_4_HOURS: "0 */4 * * *",
});

export { CRON_SCHEDULE };
