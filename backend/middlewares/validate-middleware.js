//* -------------------------
//* Middleware for validation
//* -------------------------
//? await schema.parseAsync(req.body) is the line where we use Zod to validate the request body data agaiast the defined schema.

const validate = (schema) => async (req, res, next) => {
  try {
    if (!schema) {
      throw new Error("Validation schema is missing.");
    }

    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    const status = 422;
    const message = "Fill the input properly";
    const extraDetails = await err.issues[0].message;

    const error = {
      status,
      message,
      extraDetails,
    };

    // console.error(err);
    console.log(error);
    next(error);
  }
};

module.exports = validate;
