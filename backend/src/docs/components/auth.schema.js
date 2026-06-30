/**
 * @swagger
 * components:
 *   schemas:
 *
 *     AuthUser:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 685cbcc3b4a4fd91b20d6d54
 *
 *         fullName:
 *           type: string
 *           nullable: true
 *           example: John Doe
 *
 *         username:
 *           type: string
 *           example: johndoe
 *
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *
 *         emailVerifiedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *
 *
 *     SignUpRequest:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           example: johndoe
 *
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *
 *         password:
 *           type: string
 *           format: password
 *           example: Password@123
 *
 *
 *     SignInRequest:
 *       type: object
 *       required:
 *         - identifier
 *         - password
 *       properties:
 *         identifier:
 *           type: string
 *           example: johndoe
 *
 *         password:
 *           type: string
 *           format: password
 *           example: Password@123
 *
 *
 *    CheckUsernameRequest:
 *       type: object
 *       required:
 *         - username
 *       properties:
 *         username:
 *           type: string
 *           example: johndoe
 *
 *          statusCode:
 *            type: integer
 *            example: 200
 *
 *          message:
 *            type: string
 *
 *         data:
 *         type: object
 *
 *
 *     AuthResponse:
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
 *
 *         data:
 *           $ref: '#/components/schemas/AuthUser'
 *
 *
 *     SignInData:
 *       type: object
 *       properties:
 *         user:
 *           $ref: '#/components/schemas/AuthUser'
 *
 *         accessToken:
 *           type: string
 *
 *         refreshToken:
 *           type: string
 *
 *
 *     SignInResponse:
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
 *
 *         data:
 *           $ref: '#/components/schemas/SignInData'
 *
 *
 *     VerifyEmailRequest:
 *       type: object
 *       required:
 *         - email
 *         - otp
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *
 *         otp:
 *           type: integer
 *           minimum: 100000
 *           maximum: 999999
 *           example: 123456
 *
 *
 *     ResendVerificationEmailRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *
 *
 *
 *     RefreshTokenData:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *
 *
 *     RefreshTokenResponse:
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
 *
 *         data:
 *           $ref: '#/components/schemas/RefreshTokenData'
 */
