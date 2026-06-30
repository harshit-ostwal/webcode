/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Session Management APIs
 */

/**
 * @swagger
 * /sessions/all:
 *   get:
 *     summary: Get all active sessions
 *     description: Returns all active sessions of the authenticated user.
 *     tags:
 *       - Sessions
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Sessions fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SessionListResponse'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: No sessions found.
 */

/**
 * @swagger
 * /sessions/all:
 *   delete:
 *     summary: Delete all sessions
 *     description: Deletes every active session for the authenticated user.
 *     tags:
 *       - Sessions
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: All sessions deleted successfully.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /sessions/{id}:
 *   get:
 *     summary: Get a session by id
 *     description: Returns a single session belonging to the authenticated user.
 *     tags:
 *       - Sessions
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Session Id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SessionResponse'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: Session not found.
 */

/**
 * @swagger
 * /sessions/{id}:
 *   delete:
 *     summary: Delete a session
 *     description: Deletes a specific session of the authenticated user.
 *     tags:
 *       - Sessions
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Session Id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session deleted successfully.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: Session not found.
 */
