import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { roomDTO } from './dto/room.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class RoomService {
    prisma = new PrismaClient()
    constructor(private cloudinaryService: CloudinaryService){}
    async postRoom(req: any, body: roomDTO): Promise<any>{
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
                message: "You do not have the right to post room"
              }}
            const {ten_phong, khach, phong_ngu, giuong, phong_tam, mo_ta, gia_tien, may_giat, ban_la, tivi, dieu_hoa, wifi, bep, do_xe, ho_boi, ban_ui, hinh_anh, ma_vi_tri} = body
        await this.prisma.phong.create({
            data: {
                ten_phong, khach, phong_ngu, giuong, phong_tam, mo_ta, gia_tien, may_giat, ban_la, tivi, dieu_hoa, wifi, bep, do_xe, ho_boi, ban_ui, hinh_anh, ma_vi_tri
            }
        })
        return{
            statusCode: 200,
            message: "Post room successfully"
        }
        } catch (error) {
            return{
                statusCode: 500,
                message: error
            }   
        }
    }

    async getListRoom(): Promise<any> {
        try {
            const data = await this.prisma.phong.findMany()
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

    async paginationListRoom(skip: number, numSize: number, filter: string): Promise<any>{
        try {
            const data = await this.prisma.phong.findMany({
                where:{
                    ten_phong:{
                        contains: filter
                    }
                },
                skip: skip,
                take: numSize,
                
            })
            if(data.length > 0){
                return {
                    statusCode: 200,
                    content: data
                }
            } else{
                return {
                    statusCode: 404,
                    message: "Room not found"
                }
            }
           
        } catch (error) {
            return {
                statusCode: 500,
                message: error
            }
        }
    }

    async getRoomDetail(id: string):Promise<any>{
        try {
            const data = await this.prisma.phong.findFirst({
                where:{
                    id: +id
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

    async updateRoom(req: any, id: string, body: roomDTO): Promise<any>{
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
                message: "You do not have the right to update room"
              }
            }
            const {ten_phong, khach, phong_ngu, giuong, phong_tam, mo_ta, gia_tien, may_giat, ban_la, tivi, dieu_hoa, wifi, bep, do_xe, ho_boi, ban_ui, hinh_anh, ma_vi_tri} = body
            await this.prisma.phong.update({
               where:{
                id: +id
               },
               data:{
                ten_phong, khach, phong_ngu, giuong, phong_tam, mo_ta, gia_tien, may_giat, ban_la, tivi, dieu_hoa, wifi, bep, do_xe, ho_boi, ban_ui, hinh_anh, ma_vi_tri
               }
            })
            return {
                statusCode: 200,
                message: "Update room successfully"
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: error
            }
        }        
    }

    async deleteRoom(req: any, id: string):Promise<any>{
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
         
      
          await this.prisma.phong.delete({
            where:{
              id : +id
            }
          })
          return {
            statusCode: 200,
            message: "Delete room successfully"
          }
          } catch (error) {
            return {
              statusCode: 500,
              message: error
            }
          }

    }

    async uploadRoomImage(req: any, id: string, file: Express.Multer.File): Promise<any>{
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
          const checkRoom = await this.prisma.phong.findFirst({
            where:{
                id: +id
            }
          })
          if(!checkRoom){
            return{
                statusCode: 404,
                message: "Room not found"
            }
          }
          if(req.user.role != "admin"){
            return {
              statusCode: 400,
              message: "You do not have the right to upload room image"
            }
          }
          const imgUrl = await this.cloudinaryService.uploadImage(file)
          let updateData = {
            
            hinh_anh: imgUrl.url
        }
        await this.prisma.phong.update({
            where: {
                id: +id
            },
            data: updateData
        })
        return {
          statusCode: 200,
          content: {
            ten_phong: checkRoom.ten_phong, 
            khach: checkRoom.khach, 
            phong_ngu: checkRoom.phong_ngu,
            giuong: checkRoom.giuong, 
            phong_tam: checkRoom.phong_tam, 
            mo_ta: checkRoom.mo_ta, 
            gia_tien: checkRoom.gia_tien, 
            may_giat: checkRoom.may_giat, 
            ban_la: checkRoom.ban_la, 
            tivi: checkRoom.tivi, 
            dieu_hoa: checkRoom.dieu_hoa, 
            wifi: checkRoom.wifi, 
            bep: checkRoom.bep, 
            do_xe: checkRoom.do_xe, 
            ho_boi: checkRoom.ho_boi, 
            ban_ui: checkRoom.ban_ui, 
            ma_vi_tri: checkRoom.ma_vi_tri,
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

    async getRoomByLocation(idLocation: string): Promise<any>{
       try {
      const data = await this.prisma.phong.findMany({
        where:{
            ma_vi_tri: +idLocation
        }
      })
        if(data.length == 0){
            return {
                statusCode: 404,
                message: "Id not found"
            }
        } else {
            return{
                statusCode: 200,
                content: data
            }
        }
       } catch (error) {
        return{
            statusCode: 500,
            message: error
        }
       }
    }
}
