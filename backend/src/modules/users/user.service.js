import ApiError from "../../core/http/api.error.js";
import { getChangedFields } from "../../shared/utils/object.utils.js";
import { generateUsername } from "../../shared/utils/username.utils.js";
import { SessionService } from "../sessions/session.service.js";
import UserMessages from "./user.messages.js";
import { UserRepository } from "./user.repository.js";

class UserService {
  #userRepo;
  #sessionService;
  constructor() {
    this.#userRepo = new UserRepository();
    this.#sessionService = new SessionService();
  }

  async getAllUsers() {
    return await this.#userRepo.findAll();
  }

  async getUserById(id) {
    const user = await this.#userRepo.findById(id);

    if (!user) {
      throw ApiError.notFound(UserMessages.Errors.USER_NOT_FOUND);
    }

    return user;
  }

  async findUserById(id) {
    return await this.#userRepo.findById(id);
  }

  async findByIdentifier(identifier) {
    return await this.#userRepo.findByIdentifier(identifier);
  }

  async findByEmail(email) {
    return await this.#userRepo.findByEmail(email);
  }

  async findByUsername(username) {
    return await this.#userRepo.findByUsername(username);
  }

  async createUser(data) {
    const existingUser = await this.#userRepo.findByEmail(data.email);

    if (existingUser) {
      throw ApiError.conflict(UserMessages.Errors.EMAIL_ALREADY_EXISTS);
    }

    const existingUsername = await this.#userRepo.findByUsername(data.username);

    if (existingUsername) {
      throw ApiError.conflict(UserMessages.Errors.USERNAME_ALREADY_EXISTS);
    }

    const user = await this.#userRepo.create(data);

    if (!user) {
      throw ApiError.internalServerError(
        UserMessages.Errors.FAILED_TO_CREATE_USER,
      );
    }

    return user;
  }

  async updateUser(id, data) {
    const existingUser = await this.getUserById(id);

    const changedFields = getChangedFields(existingUser, data);

    if (changedFields.username) {
      const existingUsername = await this.#userRepo.findByUsername(
        changedFields.username,
      );

      if (existingUsername && existingUsername._id.toString() !== id) {
        throw ApiError.conflict(UserMessages.Errors.USERNAME_ALREADY_EXISTS);
      }
    }

    if (Object.keys(changedFields).length === 0) {
      return existingUser;
    }

    const user = await this.#userRepo.update(id, changedFields);

    if (!user) {
      throw ApiError.internalServerError(
        UserMessages.Errors.FAILED_TO_UPDATE_USER,
      );
    }

    return user;
  }

  async deleteUser(id) {
    await this.getUserById(id);

    await this.#sessionService.deleteSessionsByUserId(id);
    const user = await this.#userRepo.delete(id);

    if (!user) {
      throw ApiError.internalServerError(
        UserMessages.Errors.FAILED_TO_DELETE_USER,
      );
    }

    return user;
  }

  async generateUniqueUsername(fullName) {
    const baseUsername = generateUsername(fullName);

    if (!baseUsername) {
      throw ApiError.badRequest(
        UserMessages.Errors.INVALID_USERNAME_GENERATION,
      );
    }

    let username = baseUsername;
    let counter = 1;
    let existingUser = await this.#userRepo.findByUsername(username);

    while (existingUser) {
      username = `${baseUsername}_${counter}`;
      existingUser = await this.#userRepo.findByUsername(username);
      counter++;
    }

    return username;
  }
}

export { UserService };
