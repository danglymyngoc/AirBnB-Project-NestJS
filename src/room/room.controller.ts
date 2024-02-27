import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { RoomService } from './room.service';
import { roomDTO } from './dto/room.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from 'src/user/dto/fileUpload.dto';

@ApiTags("Room")
@Controller('room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService) {}

    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth()
    @ApiBody({type: roomDTO})
    @Post("/post-room")
    async postRoom(
      @Request() req,
      @Res() res,
      @Body() body: roomDTO
    ): Promise<any>{
      const data = await this.roomService.postRoom(req, body)
      res.status(data.statusCode).json(data)
    }

    @Get("/get-list-room")
    async getListRoom(@Res() res): Promise<any>{
      const data = await this.roomService.getListRoom()
      res.status(data.statusCode).json(data)

    }

    @ApiParam({name: "page"})
    @ApiParam({name: "size"})
    @ApiQuery({name: "filter", required: false, description: "filter by room name"})
    @Get("/pagination/:page/:size")
    async paginationListRoom(
      @Res() res,
      @Param("page") page,
      @Param("size") size,
      @Query("filter") filter
    ): Promise<any>{
      const numPage = Number(page)
      const numSize = Number(size)
      const skip = (numPage - 1) * numSize
      const data = await this.roomService.paginationListRoom(skip, numSize, filter)
      res.status(data.statusCode).json(data)
    }

    @ApiParam({name: "id", description: "Id of room", required: true})
    @Get("/detail/:id")
    async getRoomDetail(
      @Res() res,
      @Param("id") id
      ): Promise<any>{
        const data = await this.roomService.getRoomDetail(id)
        res.status(data.statusCode).json(data)
    }

    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth()
    @ApiParam({name: "id", required: true, description: "Id of the room"})
    @ApiBody({type: roomDTO})
    @Put("/update-room/:id")
    async updateRoom(
      @Res() res,
      @Request() req,
      @Param("id") id,
      @Body() body: roomDTO
    ): Promise<any>{
      const data = await this.roomService.updateRoom(req, id, body)
      res.status(data.statusCode).json(data)
    }

    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth()
    @ApiParam({name: "id", required: true})
    @Delete("/delete-room/:id")
    async deleteRoom(
      @Request() req,
      @Res() res,
      @Param("id") id
    ): Promise<any>{
      const data = await this.roomService.deleteRoom(req, id)
      res.status(data.statusCode).json(data)
    }

    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @ApiBody({type: FileUploadDto})
    @UseInterceptors(FileInterceptor("file"))
    @ApiParam({name: "id", required: true, description: "Id of the room"})
    @Post("/upload-room-image/:id")
    async uploadRoomImage(
      @Res() res,
      @Param("id") id,
      @Request() req,
      @UploadedFile("file") file: Express.Multer.File
    ): Promise<any>{
      const data = await this.roomService.uploadRoomImage(req, id, file)
      res.status(data.statusCode).json(data)
    }

    @ApiQuery({name: "idLocation", required: true, description: "Filter by id of location"})
    @Get("/get-room-by-location")
    async getRoomByLocation(
      @Query("idLocation") idLocation,
      @Res() res
    ): Promise<any>{
      const data  = await this.roomService.getRoomByLocation(idLocation)
      res.status(data.statusCode).json(data)
    }
}
