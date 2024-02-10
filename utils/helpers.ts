import { randomBytes, randomUUID } from "crypto";

export const cryptoToken = () => randomBytes(64).toString("hex");

export const generateUUID = () => randomUUID()