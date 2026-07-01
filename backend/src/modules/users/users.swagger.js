/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User Management APIs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Returns a list of all registered users.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserListResponse'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /users/check-username/{username}/availability:
 *   get:
 *     summary: Check username availability
 *     description: Checks if a username is available for registration.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The username to check for availability.
 *     responses:
 *       200:
 *         description: Username is available.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsernameAvailabilityResponse'
 *       409:
 *         description: Username is unavailable.
 */

/**
 * @swagger
 * /users:
 *   patch:
 *     summary: Update current user
 *     description: Update the authenticated user's profile.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Validation failed.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       409:
 *         description: Username already exists.
 */

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Delete current user
 *     description: Permanently deletes the authenticated user account and all associated sessions.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
