import { ApiProperty } from "@nestjs/swagger"
import { IsEmpty, IsNotEmpty } from "class-validator"

export class bookRoomDTO{
    @ApiProperty({type: Number, description:"ma_phong"})
    @IsEmpty()
    ma_phong: number

    @ApiProperty({type: String, description:"ngay_den"})
    @IsNotEmpty()
    ngay_den: string

    @ApiProperty({type: String, description:"ngay_di"})
    @IsNotEmpty()
    ngay_di: string

    @ApiProperty({type: Number, description:"so_luong_khach"})
    @IsNotEmpty()
    so_luong_khach: number
}