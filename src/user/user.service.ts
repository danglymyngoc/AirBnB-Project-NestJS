import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import signUpDTO from 'src/auth/dto/signUp.dto';
import * as bcrypt from 'bcrypt'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
    private cloudinaryService: CloudinaryService,
    ) {}
  prisma = new PrismaClient();
  
  async getListUser(): Promise<any>{
    try {
      const data = await this.prisma.nguoiDung.findMany({
        select:{
          name: true,
          email: true,
          phone: true,
          birth_day: true,
          gender: true,
          role: true,
          avatar: true
        }
      })
      return {
        statusCode: 200,
        content: data
      }
    } catch (error) {
      return{
        statusCode: 500,
        message: error
      }
    }
  }

  async paginationListUser(skip: number, numSize: number, filter: string): Promise<any>{
    try {
      const data = await this.prisma.nguoiDung.findMany({
        where:{
          name:{
            contains: filter
          }
        },
        skip: skip,
        take: numSize,
        select:{
          name: true,
          email: true,
          gender: true,
          birth_day: true,
          role: true,
          phone: true,
          avatar: true
        }
        
      })
      return{
        statusCode: 200,
        content: data
      }
      
    } catch (error) {
      return{
        statusCode: 500,
        message: error
      }
    }
  }

  async searchUserByName(userName: string): Promise<any>{
    try {
      const data = await this.prisma.nguoiDung.findMany({
        where:{
          name:{
            contains: userName
          }
        },
        select:{
          name: true,
          email: true,
          phone: true,
          birth_day: true,
          gender: true,
          role: true,
          avatar: true
        }
      })
      return {
        statusCode: 200,
        content: data
      }
    } catch (error) {
      return {
        statusCode: 500,
        message: error
      }
    }
  }

  async getUserDetail(id: string):Promise<any>{
    try {
      const data = await this.prisma.nguoiDung.findFirst({
        where:{
          id: +id
        },
        select:{
          name: true,
          email: true,
          phone: true,
          birth_day: true,
          gender: true,
          role: true,
          avatar: true
        }
      })
      if(data != null){
        return {
            statusCode: 200,
            content: data
        }
       } else {
        return {
            statusCode: 404,
            content: "Id not found"
        }
       }
    } catch (error) {
      return {
        statusCode: 500,
        message: error
      }
    }

  }

  async updateUserInfo(body: signUpDTO, req: any, id: string): Promise<any>{
    try {
      const {email, name, pass_word, gender, birth_day, role, phone} = body
      const checkUserId = await this.prisma.nguoiDung.findFirst({
          where: {
              id: +req.user.user_id
          }
      })
      if (!checkUserId) {
          return{
            statusCode: 404,
            message: "User not found"
        }
      }
      const checkEmail = await this.prisma.nguoiDung.findMany({
          where: {
              email
          }
      })
      if (checkEmail.length > 0) {
          return{
            statusCode: 404,
            message: "Email already exists"
        }
      }

      const encodePassword = bcrypt.hashSync(pass_word, 10)

      let updateData = {
          name,
          email,
          pass_word: encodePassword,
          phone,
          birth_day,
          gender,
          role
      }
      await this.prisma.nguoiDung.update({
          where: {
              id: +id
          },
          data: updateData
      })
      return {
        statusCode: 200,
        message: "Update user info successful"
      }
     
    } catch (error) {
      return {
        statusCode: 500,
        message: error
      }
    }
  }

  async deleteUser(req: any, id: string){
    try {
      const checkUserId = await this.prisma.nguoiDung.findFirst({
        where: {
            id: +req.user.user_id
        }
    })
    if (!checkUserId) {
        return{
          statusCode: 404,
          message: "User not found"
      }
    }
    if(req.user.role != "admin" || req.user.user_id != id){
      return {
        statusCode: 400,
        message: "You do not have the right to delete user"
      }
    }
   

    await this.prisma.nguoiDung.delete({
      where:{
        id : +id
      }
    })
    return {
      statusCode: 200,
      message: "Delete user successfully"
    }
    } catch (error) {
      return {
        statusCode: 500,
        message: error
      }
    }
  }

  async uploadAvatar(req: any, file: Express.Multer.File): Promise<any>{
    try {
      const checkUser = await this.prisma.nguoiDung.findFirst({
        where: {
            id: +req.user.user_id
        }
    })
    if (!checkUser) {
        return{
          statusCode: 404,
          message: "User not found"
      }
    }
    const imgUrl = await this.cloudinaryService.uploadImage(file)
    let updateData = {
      avatar: imgUrl.url
  }
  await this.prisma.nguoiDung.update({
      where: {
          id: +checkUser.id
      },
      data: updateData
  })
  return {
    statusCode: 200,
    content: {
        name: checkUser.name,
      email: checkUser.email,
      phone: checkUser.phone,
      birth_day: checkUser.birth_day,
      gender: checkUser.gender,
      role: checkUser.role,
      avatar: imgUrl.url
    }
  }

    }catch (error) {
      return {
        statusCode: 500,
        message: error
      }
    }
  }
 
}
