/**
 * @swagger
 * components:
 *   schemas:
 *
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 6845e4e4e8d56d60d9b72b33
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
 *     UpdateUserRequest:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *           example: John Doe
 *
 *         username:
 *           type: string
 *           example: johndoe
 *
 *
 *     UserResponse:
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
 *           example: User updated successfully.
 *
 *         data:
 *           $ref: '#/components/schemas/User'
 *
 *
 *     UserListResponse:
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
 *           example: Users fetched successfully.
 *
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 */
