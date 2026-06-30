/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: Register a new account
 *     description: Creates a new user account using username, email and password.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpRequest'
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       409:
 *         description: User already exists.
 */

/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     summary: Sign in
 *     description: Authenticate using email or username and password.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInRequest'
 *     responses:
 *       200:
 *         description: Sign in successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignInResponse'
 *       401:
 *         description: Invalid credentials.
 */

/**
 * @swagger
 * /auth/check-username:
 *   get:
 *     summary: Check username availability
 *     description: Checks if a username is available for registration.
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: query
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
 * /auth/refresh-tokens:
 *   get:
 *     summary: Refresh access token
 *     description: Generates a new access token and refresh token using the refresh token cookie.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Tokens refreshed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshTokenResponse'
 *       401:
 *         description: Invalid or expired refresh token.
 */

/**
 * @swagger
 * /auth/verify-email:
 *   post:
 *     summary: Verify email address
 *     description: Verifies a user's email address using the OTP sent to their email.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyEmailRequest'
 *     responses:
 *       200:
 *         description: Email verified successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Invalid or expired OTP.
 *       404:
 *         description: User not found.
 */

/**
 * @swagger
 * /auth/verify-email/resend:
 *   post:
 *     summary: Resend verification email
 *     description: Sends a new email verification OTP to the user's email address.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResendVerificationEmailRequest'
 *     responses:
 *       200:
 *         description: Verification email sent successfully.
 *       400:
 *         description: Email already verified.
 *       404:
 *         description: User not found.
 */

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current user
 *     description: Returns the authenticated user's information.
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Current user fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /auth/sign-out:
 *   delete:
 *     summary: Sign out
 *     description: Sign out from the current device.
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Signed out successfully.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /auth/sign-out/all:
 *   delete:
 *     summary: Sign out from all devices
 *     description: Deletes all active sessions of the authenticated user.
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Signed out from all devices successfully.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
