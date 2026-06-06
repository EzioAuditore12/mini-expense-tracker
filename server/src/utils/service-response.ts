import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

/**
 * Standardized API response wrapper used by all service methods.
 * Enforces a consistent { success, message, responseObject, statusCode } shape
 * so controllers and clients always know what to expect.
 */
export class ServiceResponse<T = null> {
  readonly success: boolean;
  readonly message: string;
  readonly responseObject: T;
  readonly statusCode: number;

  private constructor(
    success: boolean,
    message: string,
    responseObject: T,
    statusCode: number,
  ) {
    this.success = success;
    this.message = message;
    this.responseObject = responseObject;
    this.statusCode = statusCode;
  }

  static success<T>(
    message: string,
    responseObject: T,
    statusCode: number = StatusCodes.OK,
  ) {
    return new ServiceResponse(true, message, responseObject, statusCode);
  }

  static failure<T>(
    message: string,
    responseObject: T,
    statusCode: number = StatusCodes.BAD_REQUEST,
  ) {
    return new ServiceResponse(false, message, responseObject, statusCode);
  }
}

/**
 * Generates a Zod schema matching the ServiceResponse shape for any given
 * data schema. Used by the OpenAPI registry to auto-generate docs.
 */
export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    responseObject: dataSchema.optional(),
    statusCode: z.number(),
  });
