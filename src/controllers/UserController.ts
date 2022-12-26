import { Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-errors";
import { userRepository } from "../repositories/userRepository";
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import { PassThrough } from "stream";
import { getCipherInfo } from "crypto";




export class UserController {
  async create(req: Request, res: Response){
    if(req.body.email && req.body.password) {
      const {name, email, password} = req.body

      const userExists = await userRepository.findOneBy({email})
  
      if(userExists){
        throw new BadRequestError('Email já existe')
      }
  
      const hashPassword = await bcrypt.hash(password, 10)
    
      const newUser = userRepository.create({
        name,
        email,
        password: hashPassword
      })
  
      await userRepository.save(newUser)
  
      const {password: _, ... user} = newUser
      return res.status(201).json(user)
    }
  }


  async login(req: Request, res: Response){
    const {email, password} = req.body

    const user = await userRepository.findOneBy({email})
  
      if(!user){
        throw new BadRequestError('Email ou senha inválidos')
      }

      const verifyPass = await bcrypt.compare(password, user.password)

      if(!verifyPass) {
        throw new BadRequestError('Email ou senha inválidos')
      }

      const token = JWT.sign(
        {id: user.id},
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: '1h'}
      )

      const {password:_, ...userLogin} = user

      return res.json({
        user: userLogin,
        token
      })
  } 

  async getProfile(req: Request, res: Response){
    return res.json(req.user)
  }
} 