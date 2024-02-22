import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Res, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

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
 

  // @Post("/upload")
  // @UseInterceptors(FileInterceptor(
  //   storage: diskStorage({
  //     destination: process.cwd() + "/public/img",
  //     filename: (req, file, callback) => {
  //       callback(null, new Date().getTime() + ``)
  //     }
  //   })
  // ))
  // upload()
}
