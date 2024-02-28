import { Body, Controller, Delete, Get, Param, Post, Put, Req, Request, Res, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { commentDTO } from './dto/comment.dto';
import { AuthGuard } from '@nestjs/passport';
@ApiTags("Comment")
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  
  @Get("/get-comment")
  async getComment(
    @Res() res
  ): Promise<any>{
    const data = await this.commentService.getComment()
    res.status(data.statusCode).json(data)
  }

  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiBody({type: commentDTO})
  @Post("/add-comment")
  async addComment(
    @Request() req,
    @Res() res,
    @Body() body:commentDTO
  ):Promise<any>{
    const data = await this.commentService.addComment(req, body)
    res.status(data.statusCode).json(data)
  }

  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiParam({name: "id", description:"Id of comment", required: true})
  @ApiBody({type: commentDTO})
  @Put("update-comment/:id")
  async updateComment(
    @Res() res,
    @Request() req,
    @Param("id") id,
    @Body() body: commentDTO
  ):Promise<any>{
    const data = await this.commentService.updateComment(req, id, body)
    res.status(data.statusCode).json(data)
  }

  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiParam({name: "id", description:"Id of comment"})
  @Delete("/delete-comment/:id")
  async deleteComment(
    @Res() res,
    @Request() req,
    @Param("id") id
  ): Promise<any>{
    const data = await this.commentService.deleteComment(req, id)
    res.status(data.statusCode).json(data)
  }

  @ApiParam({name: "idRoom", description: "Id of the room", required: true})
  @Get("/get-comment-by-room/:idRoom")
  async getCommentByRoom(
    @Res() res,
    @Param("idRoom") idRoom
  ): Promise<any>{
    const data = await this.commentService.getCommentByRoom(idRoom)
    res.status(data.statusCode).json(data)
  }

}
