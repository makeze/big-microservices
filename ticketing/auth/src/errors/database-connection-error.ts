import {CustomError} from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Error connecting to a database';

    constructor() {
        super('Error connecting to a database');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [
            {message: this.reason}
        ]
    }
}