/**
 * @swagger
 * tags:
 *   name: Verification
 *   description: OTP Verification APIs
 */

/**
 * @swagger
 * /verification/send-otp:
 *   post:
 *     summary: Send OTP
 *     description: Generate and send an OTP for email verification or password reset.
 *     tags:
 *       - Verification
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendOTPRequest'
 *     responses:
 *       200:
 *         description: OTP sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SendOTPResponse'
 *       400:
 *         description: Invalid verification type.
 */

/**
 * @swagger
 * /verification/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     description: Verify the OTP for email verification or password reset.
 *     tags:
 *       - Verification
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyOTPRequest'
 *     responses:
 *       200:
 *         description: OTP verified successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VerifyOTPResponse'
 *       400:
 *         description: Invalid or expired OTP.
 *       404:
 *         description: Verification request not found.
 */
