import generateObjectId from "../../shared/utils/objectId.utils";

const requestIdMiddleware = (req, res, next) => {
  const incomingRequestId =
    req.headers.x_request_id || req.headers["x-request-id"];

  if (incomingRequestId) {
    req.id = incomingRequestId;
  } else {
    req.id = generateObjectId();
  }

  res.setHeader("x-request-id", req.id);
  next();
};

export default requestIdMiddleware;
