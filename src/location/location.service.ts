import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { locationDTO } from './dto/location.dto';

@Injectable()
export class LocationService {
    constructor(
        private cloudinaryService: CloudinaryService
    ) {}
    prisma = new PrismaClient()

    async getListLocation(): Promise<any>{
        try {
            const data = await this.prisma.viTri.findMany()
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

    async postLocation(req: any, body: locationDTO): Promise<any>{
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
            if(req.user.role != "admin"){
              return {
                statusCode: 400,
                message: "You do not have the right to post location"
              }
            }
            const {ten_vi_tri, tinh_thanh, quoc_gia, hinh_anh} = body
            await this.prisma.viTri.create({
                data:{
                    ten_vi_tri,
                    tinh_thanh,
                    quoc_gia,
                    hinh_anh
                }
            })
            return{
                statusCode: 200,
                message: "Post location successfully"
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: error
            }
        }
    }

    async paginationListLocation(skip: number, numSize: number, filter: string): Promise<any>{
        try {
            const data = await this.prisma.viTri.findMany({
                where:{
                    ten_vi_tri:{
                        contains: filter
                    }
                },
                skip: skip,
                take: numSize,
                select:{
                    ten_vi_tri: true,
                    tinh_thanh: true,
                    quoc_gia: true,
                    hinh_anh: true
                }
            })
            if(data.length > 0){
                return {
                    statusCode: 200,
                    content: data
                }
            } else{
                return {
                    statusCode: 404,
                    message: "Location not found"
                }
            }
           
        } catch (error) {
            return {
                statusCode: 500,
                message: error
            }
        }
    }

    async getLocationDetail(id: string):Promise<any>{
        try {
            const data = await this.prisma.viTri.findFirst({
                where:{
                    id: +id
                },
                select:{
                    ten_vi_tri: true,
                    tinh_thanh: true,
                    quoc_gia: true,
                    hinh_anh: true 
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

    async updateLocation(req: any, id: string, body: locationDTO): Promise<any>{
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
            if(req.user.role != "admin"){
              return {
                statusCode: 400,
                message: "You do not have the right to update location"
              }
            }
        const {ten_vi_tri, tinh_thanh, quoc_gia, hinh_anh} = body
            await this.prisma.viTri.update({
               where:{
                id: +id
               },
               data:{
                ten_vi_tri,
                tinh_thanh,
                quoc_gia,
                hinh_anh
               }
            })
            return {
                statusCode: 200,
                message: "Update location successfully"
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: error
            }
        }        
    }

    async deleteLocation(req: any, id: string):Promise<any>{
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
          if(req.user.role != "admin"){
            return {
              statusCode: 400,
              message: "You do not have the right to delete location"
            }
          }
         
      
          await this.prisma.viTri.delete({
            where:{
              id : +id
            }
          })
          return {
            statusCode: 200,
            message: "Delete location successfully"
          }
          } catch (error) {
            return {
              statusCode: 500,
              message: error
            }
          }

    }

    async uploadLocationImage(req: any, id: string, file: Express.Multer.File): Promise<any>{
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
          const checkLocation = await this.prisma.viTri.findFirst({
            where:{
                id: +id
            }
          })
          if(!checkLocation){
            return{
                statusCode: 404,
                message: "Location not found"
            }
          }
          if(req.user.role != "admin"){
            return {
              statusCode: 400,
              message: "You do not have the right to upload location image"
            }
          }
          const imgUrl = await this.cloudinaryService.uploadImage(file)
          let updateData = {
            hinh_anh: imgUrl.url
        }
        await this.prisma.viTri.update({
            where: {
                id: +id
            },
            data: updateData
        })
        return {
          statusCode: 200,
          content: {
             ten_vi_tri: checkLocation.ten_vi_tri,
             tinh_thanh: checkLocation.tinh_thanh,
             quoc_gia: checkLocation.quoc_gia,
             hinh_anh: imgUrl.url
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
