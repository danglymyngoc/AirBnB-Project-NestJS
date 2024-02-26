import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Res, Query, UseGuards, Put, Request, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import signUpDTO from 'src/auth/dto/signUp.dto';
import { FileUploadDto } from './dto/fileUpload.dto';

@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
    private configService: ConfigService,
    private cloudinaryService: CloudinaryService
    ) {}

    @Get("/get-list-user")
    async getListUser(@Res() res): Promise<any>{
      const data = await this.userService.getListUser()
      res.status(data.statusCode).json(data)
    }

    @ApiParam({name: "page"})
    @ApiParam({name: "size"})
    @ApiQuery({name: "filter", required: false, description: "filter by name"})
    @Get("/pagination/:page/:size")
    async paginationListUser(
      @Res() res,
      @Param("page") page, 
      @Param("size") size, 
      @Query("filter") filter): Promise<any>{
      const numPage = Number(page)
      const numSize = Number(size)
      const skip = (numPage - 1) * numSize
      const data = await this.userService.paginationListUser(skip, numSize, filter)
      res.status(data.statusCode).json(data)
    }

    @ApiQuery({name: "userName", required: true, description: "Search user by name"})
    @Get("/search")
    async searchUserByName(
      @Query("userName") userName,
      @Res() res): Promise<any>{
      const data = await this.userService.searchUserByName(userName)
      res.status(data.statusCode).json(data)
    }

    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth()
    @ApiParam({name: "id", description: "Id of user", required: true})
    @Get("/detail/:id")
    async getUserDetail(
      @Param("id") id,
      @Res() res): Promise<any>{
        const data = await this.userService.getUserDetail(id)
        res.status(data.statusCode).json(data)
    }

    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth()
    @ApiBody({type: signUpDTO})
    @ApiParam({name: "id", required: true})
    @Put("update-user-info/:id")
    async updateUserInfo(
      @Request() req,
      @Param("id") id,
      @Res() res,
      @Body() body: signUpDTO): Promise<any>{
      const data = await this.userService.updateUserInfo(body, req, id)
        res.status(data.statusCode).json(data)
    }

    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth()
    @ApiParam({name: "id", required: true})
    @Delete("/delete-user/:id")
    async deleteUser(
      @Res() res,
      @Param("id") id,
      @Request() req
      ): Promise<any>{
        const data = await this.userService.deleteUser(req, id)
        res.status(data.statusCode).json(data)
    }

    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @ApiBody({type: FileUploadDto})
    @UseInterceptors(FileInterceptor("file"))
    @Post("/upload-avatar")
    async uploadAvatar(
      @UploadedFile("file") file: Express.Multer.File,
      @Request() req,
      @Res() res,
      
      ): Promise<any>{
      const data = await this.userService.uploadAvatar(req, file)
      res.status(data.statusCode).json(data)
    }


}
