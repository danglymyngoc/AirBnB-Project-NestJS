import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { commentDTO } from './dto/comment.dto';

@Injectable()
export class CommentService {
    prisma = new PrismaClient()

    async getComment(): Promise<any>{
        try {
            const data = await this.prisma.binhLuan.findMany()
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

    async addComment(req: any, body: commentDTO): Promise<any>{
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
            const {ma_phong, ngay_binh_luan, noi_dung, sao_binh_luan} = body
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
            await this.prisma.binhLuan.create({
                data:{
                    ma_phong,
                    ma_nguoi_binh_luan: +req.user.user_id,
                    ngay_binh_luan,
                    noi_dung,
                    sao_binh_luan
                }
            })
            return {
                statusCode: 200,
                message: "Add comment successfully"
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: error
            }
        }
    }

    async updateComment(req: any, id:string, body: commentDTO): Promise<any>{
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
            const checkId = await this.prisma.binhLuan.findFirst({
                where:{
                    id: +id
                }
                })
            if(req.user.user_id != checkId.ma_nguoi_binh_luan){
                return {
                    statusCode: 400,
                    message: "You do not have the right to update comment"
                }
            }    
            const {ma_phong, ngay_binh_luan, noi_dung, sao_binh_luan} = body
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
            await this.prisma.binhLuan.update({
                where:{
                    id: +id
                },
                data:{
                    ma_phong,
                    ma_nguoi_binh_luan: +req.user.user_id,
                    ngay_binh_luan,
                    noi_dung,
                    sao_binh_luan
                }
            })
            return {
                statusCode: 200,
                message: "Updated comment successfully"
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: error
            }
        }

    }

    async deleteComment(req: any, id:string): Promise<any>{
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
            const checkId = await this.prisma.binhLuan.findFirst({
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
            if(req.user.user_id != checkId.ma_nguoi_binh_luan){
                return {
                    statusCode: 400,
                    message: "You do not have the right to delete comment"
                }
            }
            await this.prisma.binhLuan.delete({
                where:{
                    id: +id
                }
            })
            return {
                statusCode: 200,
                message: "Delete comment successfully"
              }
        } catch (error) {
            return {
                statusCode: 500,
                message: error
            }
        }

    }

    async getCommentByRoom(idRoom: string):Promise<any>{
        try {
            const data = await this.prisma.binhLuan.findMany({
                where:{
                    ma_phong: +idRoom
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
            return{
                statusCode: 500,
                message: error
            }
        }
    }
}
