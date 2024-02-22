import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class UserService {
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
      return{
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

}
