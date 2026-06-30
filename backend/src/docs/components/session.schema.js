/**
 * @swagger
 * components:
 *   schemas:
 *
 *     Session:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 685cbcc3b4a4fd91b20d6d54
 *
 *         userId:
 *           type: string
 *           example: 685cbcc3b4a4fd91b20d6d55
 *
 *         ipAddress:
 *           type: string
 *           example: 192.168.1.10
 *
 *         userAgent:
 *           type: string
 *           example: Mozilla/5.0 (Macintosh; Intel Mac OS X)
 *
 *         lastLoginAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *
 *     SessionResponse:
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
 *           example: Session fetched successfully.
 *
 *         data:
 *           $ref: '#/components/schemas/Session'
 *
 *
 *     SessionListResponse:
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
 *           example: Sessions fetched successfully.
 *
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Session'
 */