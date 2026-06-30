import createRouter from "../../core/factories/router.factory.js";
import validate from "../../core/middlewares/validate.middleware.js";
import ValidationSource from "../../shared/constants/validation.constants.js";
import { verifyAuthenticationJWT } from "../../core/middlewares/authentication.middleware.js";

import roomController from "./room.controller.js";
import {
  createRoomSchema,
  joinRoomSchema,
  roomIdSchema,
  renameRoomSchema,
  kickParticipantSchema,
} from "./room.schema.js";

const router = createRouter();

// Create Room
router
  .route("/")
  .post(
    verifyAuthenticationJWT,
    validate(createRoomSchema, ValidationSource.BODY),
    roomController.createRoom
  );

// Join Room
router
  .route("/join")
  .post(
    verifyAuthenticationJWT,
    validate(joinRoomSchema, ValidationSource.BODY),
    roomController.joinRoom
  );

// Get Room
router
  .route("/:id")
  .get(
    verifyAuthenticationJWT,
    validate(roomIdSchema, ValidationSource.PARAMS),
    roomController.getRoomById
  );

// Rename Room
router
  .route("/:id")
  .patch(
    verifyAuthenticationJWT,
    validate(roomIdSchema, ValidationSource.PARAMS),
    validate(renameRoomSchema, ValidationSource.BODY),
    roomController.renameRoom
  );

// Close Room
router
  .route("/:id")
  .delete(
    verifyAuthenticationJWT,
    validate(roomIdSchema, ValidationSource.PARAMS),
    roomController.closeRoom
  );

// Kick Participant
router
  .route("/:id/participants/:participantId")
  .delete(
    verifyAuthenticationJWT,
    validate(kickParticipantSchema, ValidationSource.PARAMS),
    roomController.kickParticipant
  );

export { router as RoomRouter };