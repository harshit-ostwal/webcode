import ApiResponse from "../../core/http/api.response.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import { UserDto } from "./user.dto.js";
import UserMessages from "./user.messages.js";
import { UserService } from "./user.service.js";

class UserController {
  #userService;
  constructor() {
    this.#userService = new UserService();
  }

  getAllUsers = asyncHandler(async (req, res) => {
    const users = await this.#userService.getAllUsers();

    return ApiResponse.ok(
      Array.isArray(users) ? users.map((user) => new UserDto(user)) : [],
      UserMessages.Success.FETCHED_ALL_USERS_SUCCESSFULLY,
    ).send(res);
  });

  getUserById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const user = await this.#userService.getUserById(id);

    return ApiResponse.ok(
      user ? new UserDto(user) : null,
      UserMessages.Success.FETCHED_USER_SUCCESSFULLY,
    ).send(res);
  });

  updateUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const user = await this.#userService.updateUser(id, data);

    return ApiResponse.ok(
      user ? new UserDto(user) : null,
      UserMessages.Success.USER_UPDATED_SUCCESSFULLY,
    ).send(res);
  });

  deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id;

    await this.#userService.deleteUser(id);

    return ApiResponse.ok(
      null,
      UserMessages.Success.USER_DELETED_SUCCESSFULLY,
    ).send(res);
  });
}

export default new UserController();
