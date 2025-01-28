import joi from "joi"

export const updateUserValidation = joi
  .object()
  .keys({
    name: joi.string().min(3).max(100),
    email: joi
      .string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 3,
        tlds: { allow: ["com", "net"] },
      })
      ,
    password: joi
      .string()
      .pattern(
        new RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
      )
      ,
  })
  .required();