export interface APIErrorResponse {
    code: number; 
    message: string;
}

export class APIError extends Error {
    constructor(public code: number, public message: string) {
        super();
    }

    static toString(err: APIErrorResponse) {
        return `Error ${err.code}: ${err.message}`;
    }

    static toResponse(err: APIError): APIErrorResponse {
        return {
            code: err.code,
            message: err.message,
        };
    }

    static fromError = (err: Error): APIError => {
        if (err instanceof APIError) {
            return err;
        }

        switch (err.name) {
            case ERROR_KEYS.ValidationError:
                return new APIError(409, err.message);
            case ERROR_KEYS.MongoError:
                return new APIError(500, 'Database error.');
            default:
                return new APIError(500, 'Unknown error.');
        }
    };
}

export const ERROR_KEYS = {
    ValidationError: 'ValidationError',
    MongoError: 'MongoError',
};
