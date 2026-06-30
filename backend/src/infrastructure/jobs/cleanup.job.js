import cron from "node-cron";
import { CRON_SCHEDULE } from "../cleanup/cleanup.constants.js";
import cleanupManager from "../cleanup/cleanup.manager.js";
import loggerService from "../logger/logger.service.js";

const cleanupJob = cron.schedule(
  CRON_SCHEDULE.EVERY_MINUTE,
  async () => {
    loggerService.warn("Running Session Cleanup Job...");
    await cleanupManager.sessionCleanup();
    loggerService.info("Session Cleanup Job completed.");
  },
  {
    name: "Clean Up Job",
  },
);

export { cleanupJob };
