import SessionCleanup from "./tasks/session.cleanup.task.js";

class CleanupManager {
  #sessionCleanup;

  constructor() {
    this.#sessionCleanup = new SessionCleanup();
  }

  async sessionCleanup() {
    await this.#sessionCleanup.deleteExpiredSessions();
  }
}

export default new CleanupManager();
