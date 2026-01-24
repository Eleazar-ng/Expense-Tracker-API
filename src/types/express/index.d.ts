/** @format */

import * as express from 'express-serve-static-core';
import { JwtPayload } from '../../interfaces/requests';

declare global{
  namespace Express {
    interface Request {
        user?: JwtPayload & { id: string}
    }
  }
} 