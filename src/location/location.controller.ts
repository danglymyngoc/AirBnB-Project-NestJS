import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { LocationService } from './location.service';
import { ConfigService } from '@nestjs/config';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { locationDTO } from './dto/location.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from 'src/user/dto/fileUpload.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags("Location")
@Controller('location')
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
    private configService: ConfigService,
    private cloudinaryService: CloudinaryService) {}

    @Get("/get-list-location")
    async getListLocation(@Res() res): Promise<any>{
      const data = await this.locationService.getListLocation()
      res.status(data.statusCode).json(data)
    }

    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth()
    @ApiBody({type: locationDTO})
    @Post("/post-location")
    async postLocation(
      @Res() res,
      @Request() req,
      @Body() body: locationDTO
      ): Promise<any>{
        const data = await this.locationService.postLocation(req, body)
        res.status(data.statusCode).json(data)
    }

    @ApiParam({name: "page"})
    @ApiParam({name: "size"})
    @ApiQuery({name: "filter", required: false, description: "filter by location name"})
    @Get("/pagination/:page/:size")
    async paginationListLocation(
      @Res() res,
      @Param("page") page,
      @Param("size") size,
      @Query("filter") filter
    ): Promise<any>{
      const numPage = Number(page)
      const numSize = Number(size)
      const skip = (numPage - 1) * numSize
      const data = await this.locationService.paginationListLocation(skip, numSize, filter)
      res.status(data.statusCode).json(data)
    }
    

    @ApiParam({name: "id", description: "Id of location", required: true})
    @Get("/detail/:id")
    async getLocationDetail(
      @Res() res,
      @Param("id") id
      ): Promise<any>{
        const data = await this.locationService.getLocationDetail(id)
        res.status(data.statusCode).json(data)
    }

    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth()
    @ApiParam({name: "id", required: true, description: "Id of the location"})
    @ApiBody({type: locationDTO})
    @Put("/update-location/:id")
    async updateLocation(
      @Res() res,
      @Request() req,
      @Param("id") id,
      @Body() body: locationDTO
    ): Promise<any>{
      const data = await this.locationService.updateLocation(req, id, body)
      res.status(data.statusCode).json(data)
    }

    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth()
    @ApiParam({name: "id", required: true})
    @Delete("/delete-location/:id")
    async deleteLocation(
      @Request() req,
      @Res() res,
      @Param("id") id
    ): Promise<any>{
      const data = await this.locationService.deleteLocation(req, id)
      res.status(data.statusCode).json(data)
    }

    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @ApiBody({type: FileUploadDto})
    @UseInterceptors(FileInterceptor("file"))
    @ApiParam({name: "id", required: true, description: "Id of the location"})
    @Post("/upload-location-image/:id")
    async uploadLocationImage(
      @Res() res,
      @Param("id") id,
      @Request() req,
      @UploadedFile("file") file: Express.Multer.File
    ): Promise<any>{
      const data = await this.locationService.uploadLocationImage(req, id, file)
      res.status(data.statusCode).json(data)
    }

}
