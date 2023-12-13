const validate = (schema) => {
    return async (req, res, next) => {
        try {
        const parseBody= await schema.parseAsync(req.body);
        req.body = parseBody;

        next();
        } catch (error) {
            const status = 400;
            const message = "Validation error";
            const extraDetails = error.errors[0].message;

            const err={
                status,
                message,
                extraDetails
            }
            next(err);
        }
    };
    }

module.exports = validate;