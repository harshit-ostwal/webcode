import z from "zod/v4";

const uuid7Schema = z.uuidv7("Invalid UUID format");

const createUuidSchema = (name) => {
  return z.strictObject({
    [name]: uuid7Schema,
  });
};

const idParamSchema = createUuidSchema("id");

export { createUuidSchema, idParamSchema, uuid7Schema };
