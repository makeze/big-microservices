import {ValidationError} from "express-validator";

export class RequestValidationError extends Error {
    constructor(private errors: ValidationError[]) {
        super();
    }
}