import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../helpers/api-errors";
import { userRepository } from "../repositories/userRepository";
import JWT from "jsonwebtoken";


type JwtPayload = {
  id: number
}

export const authMiddleware = async(req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

    if(!authorization){
      throw new UnauthorizedError('Não autorizado')
    }

    const [AuthType, token] = authorization.split(' ')

    const { id } = JWT.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload

    const user = await userRepository.findOneBy({id})
  
    if(!user){
      throw new UnauthorizedError('Não autorizado')
    }

    const {password: _, ...loggedUser} = user

    req.user = loggedUser

    next()

  }

