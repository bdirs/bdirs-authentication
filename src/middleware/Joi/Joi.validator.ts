export default class JoiValidator {
  public static validateRequestBody(req , res, next, SchemaFunc) {
    const { body } = req;
    const { error } = SchemaFunc(body);
    const errors: string[] = [];
    if (error) {
      error.details.forEach((e) => {
        errors.push(e.message);
      });
      return res.status(400).send({
        errors,
        success: false,
      });
    }
    next();
  }
}
