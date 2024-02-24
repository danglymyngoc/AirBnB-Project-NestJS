import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class locationDTO {
    @ApiProperty({type: String, description: "ten_vi_tri"})
    @IsNotEmpty()
    ten_vi_tri: string

    @ApiProperty({type: String, description: "tinh_thanh"})
    @IsNotEmpty()
    tinh_thanh: string

    @ApiProperty({type: String, description: "quoc_gia"})
    @IsNotEmpty()
    quoc_gia: string

    @ApiProperty({type: String, description: "hinh_anh"})
    @IsNotEmpty()
    hinh_anh: string

}