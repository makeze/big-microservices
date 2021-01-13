export class DatabaseConnectionError extends Error {
    statusCode = 500;
    reason = 'Error connecting to a database';

    constructor() {
        super();
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [
            {message: this.reason}
        ]
    }
}