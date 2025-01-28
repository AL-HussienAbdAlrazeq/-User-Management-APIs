import joi from "joi";

export const signupValidation = joi
  .object()
  .keys({
    name: joi.string().min(3).max(100).required(),
    email: joi
      .string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 3,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: joi
      .string()
      .pattern(
        new RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
      )
      .required(),
  })
  .required();
export const loginValidation = joi
  .object()
  .keys({
    email: joi
      .string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 3,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: joi
      .string()
      .pattern(
        new RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
      )
      .required(),
  })
  .required();

export const verifyAccountValidation = joi
  .object()
  .keys({
    email: joi
      .string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 3,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
  })
  .required();
