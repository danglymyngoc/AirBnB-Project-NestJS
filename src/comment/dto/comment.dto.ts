import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class commentDTO{
    @ApiProperty({type: Number, description: "ma_phong"})
    @IsNotEmpty()
    ma_phong: number

    @ApiProperty({type:String, description:"ngay_binh_luan"})
    @IsNotEmpty()
    ngay_binh_luan: string

    @ApiProperty({type: String,description:"noi_dung"})
    @IsNotEmpty()
    noi_dung: string

    @ApiProperty({type: Number, description:"sao_binh_luan"})
    @IsNotEmpty()
    sao_binh_luan: number
}