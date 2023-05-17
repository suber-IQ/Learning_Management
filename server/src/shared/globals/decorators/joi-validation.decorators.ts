/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request } from 'express';
import { ObjectSchema, ValidationError, ValidationErrorItem } from 'joi';

class JoiRequestValidationError extends ValidationError {
  statusCode: number;

  constructor(message: string, details: ValidationErrorItem[], original: any) {
    super(message, details, original);
    this.statusCode = 400;
  }
}

type IJoiDecorator = (target: any, key: string, descriptor?: PropertyDescriptor) => void;

export function joiValidation(schema: ObjectSchema): IJoiDecorator {
  return (target: any, key: string, descriptor?: PropertyDescriptor) => {
    const originalMethod = descriptor?.value;

    if (originalMethod) {
      descriptor!.value = async function (...args: any[]) {
        try {
          const req: Request = args[0];
          const { error } = await Promise.resolve(schema.validate(req.body));
          if (error) {
            // const validationErrorItems: ValidationErrorItem[] = error.details || [];
            // throw new ValidationError(error.details[0]?.message, validationErrorItems, error._original);
            // const message = error.details[0]?.message || 'Joi validation error';
            // throw new JoiRequestValidationError(message, 400);
            const validationErrorItems: ValidationErrorItem[] = error.details || [];
            throw new JoiRequestValidationError(error.details[0]?.message, validationErrorItems, error._original);
          }
          return originalMethod.apply(this, args);
        } catch (err) {
          if (err instanceof JoiRequestValidationError) {
            const message = err.details.map((detail: any) => detail.message).join(', ');
            err.statusCode = 400;
            err.message = message;
          }
          throw err;
        }
      };
    }

    return descriptor;
  };
}



