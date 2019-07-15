import { Router } from 'express';
import joi from '@hapi/joi';

const router = Router();

router.get('/', (_req, res) => {
  res.status(200).json({ data: 'Hello world' });
});

const schema = {
  fullname: joi
    .string()
    .min(5)
    .required(),
  address: joi
    .string()
    .min(10)
    .optional()
    .allow(''),
  email: joi
    .string()
    .email()
    .required()
    .lowercase()
};

router.post('/', (req, res) => {
  const { error, value } = joi.validate(req.body, schema, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    res.status(404).json(error);
    return;
  }
  res.status(200).json({ data: `Welcom hom ${value.fullname}` });
});
