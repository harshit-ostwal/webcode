import z from "zod/v4";
import { objectIdSchema } from "../../shared/schemas/id.schema.js";

const sessionIdSchema = z.strictObject({
  sessionId: objectIdSchema,
});

export { sessionIdSchema };
