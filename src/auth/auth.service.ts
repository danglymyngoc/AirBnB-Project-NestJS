import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import signInDTO from './dto/signIn.dto';
import signUpDTO from './dto/signUp.dto';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
  prisma = new PrismaClient();
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ){}

  async signin(body: signInDTO): Promise<any> {
    try {
        const {email, pass_word} = body
        const checkUser = await this.prisma.nguoiDung.findFirst({
            where:{
                email: email,
            }
        })
        if(!checkUser){
            return{
                statusCode: 404,
                message: "User not found"
            }
        }
        const checkPassword = bcrypt.compareSync(pass_word, checkUser.pass_word)
        if(!checkPassword){
            return {
                statusCode: 404,
                message: "Password incorrect"
            }
        } 

           const payload = {
            user_id: checkUser.id,
            email: checkUser.email,
            role: checkUser.role
        }
        const token = this.jwtService.sign(payload,{
            secret: this.configService.get("SECRET_KEY"),
            // expiresIn: this.configService.get("EXPISES_IN")
            expiresIn: "1m"
        })
        
        return {
            statusCode: 200,
            token: token,
            content:{
              name: checkUser.name,
              email: checkUser.email,
              phone: checkUser.phone,
              birth_day: checkUser.birth_day,
              gender: checkUser.gender,
              role: checkUser.role
            }
        }
    } catch (error) {
        return{
            statusCode: 500,
            message: `Error: ${error}`
        }
    }
}


 async signup(body: signUpDTO): Promise<any>{
  try {
    const {name, email, pass_word, phone, birth_day, gender, role} = body
  const checkUser = await this.prisma.nguoiDung.findFirst({
    where:{
      email: email
    }
  })

  if(checkUser){
    return {
      statusCode: 400,
      message: "User already exists"
    }
  } 
  const encodedPassword = bcrypt.hashSync(pass_word, 10)
  await this.prisma.nguoiDung.create({
    data:{
      name,
      email, 
      pass_word: encodedPassword,
      phone,
      birth_day,
      gender,
      role,
      avatar: "https://i.pravatar.cc/300"
    }
  })
  return {
    statusCode: 201,
    message: "Sign up successfully!"
  }
  } catch (error) {
    return {
      statusCode: 500,
      message: error
    }
  }

 }
}
