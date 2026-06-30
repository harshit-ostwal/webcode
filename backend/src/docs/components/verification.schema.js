/**
 * @swagger
 * components:
 *   schemas:
 *
 *     VerificationType:
 *       type: string
 *       enum:
 *         - VERIFY_EMAIL
 *         - RESET_PASSWORD
 *
 *
 *     SendOTPRequest:
 *       type: object
 *       required:
 *         - type
 *       properties:
 *         type:
 *           $ref: '#/components/schemas/VerificationType'
 *
 *
 *     VerifyOTPRequest:
 *       type: object
 *       required:
 *         - type
 *         - otp
 *       properties:
 *         type:
 *           $ref: '#/components/schemas/VerificationType'
 *
 *         otp:
 *           type: string
 *           example: "123456"
 *
 *
 *     SendOTPData:
 *       type: object
 *       properties:
 *         expiresAt:
 *           type: string
 *           format: date-time
 *
 *
 *     SendOTPResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *
 *         statusCode:
 *           type: integer
 *           example: 200
 *
 *         message:
 *           type: string
 *           example: OTP has been sent successfully.
 *
 *         data:
 *           $ref: '#/components/schemas/SendOTPData'
 *
 *
 *     VerifyOTPResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *
 *         statusCode:
 *           type: integer
 *           example: 200
 *
 *         message:
 *           type: string
 *           example: OTP verified successfully.
 *
 *         data:
 *           type: object
 *           nullable: true
 */
