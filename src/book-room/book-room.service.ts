import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { bookRoomDTO } from './dto/bookRoom.dto';

@Injectable()
export class BookRoomService {

    prisma = new PrismaClient()

    async getListBookRoom(): Promise<any>{
      try {
        const data = await this.prisma.datPhong.findMany()
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

    async postBookingInfo(req: any,body: bookRoomDTO): Promise<any>{
        try {
            const checkUserId = await this.prisma.nguoiDung.findFirst({
                where:{
                    id: +req.user.user_id
                }
            })
            if(!checkUserId){
                return {
                    statusCode: 404,
                    message: 'User not found'
                }
            }
           
            const ma_nguoi_dat = Number(req.user.user_id)
            const {ma_phong, ngay_den, ngay_di, so_luong_khach} = body
            const checkroomId = await this.prisma.phong.findFirst({
                where:{
                    id: ma_phong
                }
            })
            if(!checkroomId){
                return{
                    statusCode: 404,
                    message: 'Room not found'
                }
            }
            await this.prisma.datPhong.create({
                data:{
                    ma_phong,
                    ngay_den,
                    ngay_di,
                    so_luong_khach,
                    ma_nguoi_dat
                }
            })
            return{
                statusCode: 200,
                message: "Post booking info successfully"
            }
        } catch (error) {
            return{
                statusCode: 500,
                message: error
            }
        }
    }

    async getBookRoomDetail(id:string): Promise<any>{
        try {
           const data = await this.prisma.datPhong.findFirst({
            where:{
                id: +id
            }
           }) 
           if(!data){
            return {
                statusCode: 404,
                message: "Id not found"
            }
           }
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

    async updateBookRoomInfo(id: string, req: any, body: bookRoomDTO): Promise<any>{
        try {
            const checkUserId = await this.prisma.nguoiDung.findFirst({
                where:{
                    id: +req.user.user_id
                }
            })
            if(!checkUserId){
                return {
                    statusCode: 404,
                    message: "User not found"
                }
            }
            const checkId = await this.prisma.datPhong.findFirst({
                where:{
                    id: +id
                }
            })
            if(req.user.user_id != checkId.ma_nguoi_dat){
                return {
                    statusCode: 400,
                    message: "You do not have the right to update book room info"
                }
            }
            const {ma_phong, ngay_den, ngay_di, so_luong_khach} = body
            const checkroomId = await this.prisma.phong.findFirst({
                where:{
                    id: ma_phong
                }
            })
            if(!checkroomId){
                return{
                    statusCode: 404,
                    message: 'Room not found'
                }
            }
            await this.prisma.datPhong.update({
                where:{
                    id: +id
                },
                data:{
                    ma_phong,
                    ngay_den,
                    ngay_di,
                    so_luong_khach
                }
            })
            return {
                statusCode: 200,
                message: "Updated book room info successfully"
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: error
            }
        }
    }

    async deleteBookRoomInfo(id: string, req: any):Promise<any>{
        try {
            const checkUserId = await this.prisma.nguoiDung.findFirst({
                where:{
                    id: +req.user.user_id
                }
            })
            if(!checkUserId){
                return {
                    statusCode: 404,
                    message: "User not found"
                }
            }
            const checkId = await this.prisma.datPhong.findFirst({
                where:{
                    id: +id
                }
            })
            if(!checkId){
                return {
                    statusCode: 404,
                    message: "Id not found"
                }
            }
            if(req.user.user_id != checkId.ma_nguoi_dat){
                return {
                    statusCode: 400,
                    message: "You do not have the right to delete book room info"
                }
            }
            await this.prisma.datPhong.delete({
                where:{
                    id: +id
                }
            })
            return {
                statusCode: 200,
                message: "Delete book room info successfully"
              }
        } catch (error) {
            return {
                statusCode: 500,
                message: error
            }
        }
    }

    async getBookRoomInfoByUser(idUser: string): Promise<any>{
        try {
            const data = await this.prisma.datPhong.findMany({
                where:{
                    ma_nguoi_dat: +idUser
                }
            })
            if(data.length == 0){
                return {
                    statusCode: 404,
                    message: "Id not found"
                }
            }
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
