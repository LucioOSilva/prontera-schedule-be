import * as Joi from 'joi';

export const validationSchema = Joi.object({
  DBCONNECTION: Joi.string().uri().required().messages({
    'string.uri': 'DBCONNECTION deve ser uma URI válida.',
    'any.required': 'DBCONNECTION é obrigatório.',
  }),
  ENV: Joi.string().valid('STAGE', 'PROD').required().messages({
    'any.only': 'ENV deve ser um dos seguintes valores: DEV, STAGE ou PROD.',
    'any.required': 'ENV é obrigatório, não encontrado.',
  }),
});
