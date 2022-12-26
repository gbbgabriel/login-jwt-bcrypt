import { User } from "../entites/User";

declare global {
  namespace Express {
    export interface Request {
      user: Partial <User>
    }
  }
}