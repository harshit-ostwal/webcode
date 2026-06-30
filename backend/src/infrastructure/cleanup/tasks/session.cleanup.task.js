import { SessionService } from "../../../modules/sessions/session.service.js";
import loggerService from "../../logger/logger.service.js";

class SessionCleanup {
  #sessionService;

  constructor() {
    this.#sessionService = new SessionService();
  }

  async deleteExpiredSessions() {
    const sessions = await this.#sessionService.deleteExpiredSessions();

    if (sessions.deletedCount > 0) {
      loggerService.info(
        `Deleted ${sessions.deletedCount} expired session(s).`,
      );
    } else {
      loggerService.debug("No expired sessions found.");
    }
  }
}

export default SessionCleanup;
