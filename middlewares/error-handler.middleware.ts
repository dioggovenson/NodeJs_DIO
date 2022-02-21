import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import DatabaseError from '../src/models/errors/database.error.model';
import ForbiddenError from '../src/models/errors/forbidden.error.model';

function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if (error instanceof DatabaseError) {
        res.sendStatus(StatusCodes.BAD_REQUEST);
    }
    else if (error instanceof ForbiddenError) {
        res.sendStatus(StatusCodes.FORBIDDEN)
    } else {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
export default errorHandler;