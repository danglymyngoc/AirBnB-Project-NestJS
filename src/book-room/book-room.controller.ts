import { Body, Controller, Delete, Get, Param, Post, Put, Request, Res, UseGuards } from '@nestjs/common';
import { BookRoomService } from './book-room.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { bookRoomDTO } from './dto/bookRoom.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags("Book Room")
@Controller('book-room')
export class BookRoomController {
  constructor(private readonly bookRoomService: BookRoomService) {}

  
  @Get("/get-list-book-room")
  async getListBookRoom(
    @Res() res
  ): Promise<any>{
    const data = await this.bookRoomService.getListBookRoom()
    res.status(data.statusCode).json(data)
  }

  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiBody({type: bookRoomDTO})
  @Post("post-booking-info")
  async postBookingInfo(
    @Body() body: bookRoomDTO,
    @Res() res,
    @Request() req
  ): Promise<any>{
    const data = await this.bookRoomService.postBookingInfo(req,body)
    res.status(data.statusCode).json(data)
  }

  @ApiParam({name: "id", description: "Id of the book room", required: true})
  @Get("/detail/:id")
  async getBookRoomDetail(
    @Param("id") id,
    @Res() res
  ): Promise<any>{
    const data = await this.bookRoomService.getBookRoomDetail(id)
    res.status(data.statusCode).json(data)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @ApiParam({name: "id", description: "Id of the book room", required: true})
  @ApiBody({type: bookRoomDTO})
  @Put("/update-book-room-info/:id")
  async updateBookRoomInfo(
    @Res() res,
    @Param("id") id,
    @Request() req,
    @Body() body
  ): Promise<any>{
      const data = await this.bookRoomService.updateBookRoomInfo(id, req, body)  
      res.status(data.statusCode).json(data)  
  }


  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiParam({name: "id", description:"Id of the book room"})
  @Delete("/delete-book-room-info/:id")
  async deleteBookRoomInfo(
    @Res() res,
    @Request() req,
    @Param("id") id
  ): Promise<any>{
    const data = await this.bookRoomService.deleteBookRoomInfo(id, req)
    res.status(data.statusCode).json(data)
  }

  @ApiParam({name: "idUser", description: "Id of user"})
  @Get("/get-book-room-info-by-user/:idUser")
  async getBookRoomInfoByUser(
    @Res() res,
    @Param("idUser") idUser
  ): Promise<any>{
    const data = await this.bookRoomService.getBookRoomInfoByUser(idUser)
    res.status(data.statusCode).json(data)

  }
}
