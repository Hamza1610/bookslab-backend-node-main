import { user } from "../customs/index.js";

declare module 'express-serve-static-core' {
    interface Request {
        user: user,
        auth: boolean
    }
}