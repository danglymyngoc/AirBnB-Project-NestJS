import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class roomDTO{
    @ApiProperty({type: String, description:"ten_phong"})
    @IsNotEmpty()
    ten_phong: string

    @ApiProperty({type: Number, description:"khach"})
    @IsNotEmpty()
    khach: number

    @ApiProperty({type: Number, description:"phong_ngu"})
    @IsNotEmpty()
    phong_ngu: number

    @ApiProperty({type: Number, description:"giuong"})
    @IsNotEmpty()
    giuong: number

    @ApiProperty({type: Number, description:"phong_tam"})
    @IsNotEmpty()
    phong_tam: number

    @ApiProperty({type: String, description:"mo_ta"})
    @IsNotEmpty()
    mo_ta: string

    @ApiProperty({type: Number, description:"gia_tien"})
    @IsNotEmpty()
    gia_tien: number

    @ApiProperty({type: Boolean, description:"may_giat"})
    @IsNotEmpty()
    may_giat: boolean

    @ApiProperty({type: Boolean, description:"ban_la"})
    @IsNotEmpty()
    ban_la: boolean

    @ApiProperty({type: Boolean, description:"tivi"})
    @IsNotEmpty()
    tivi: boolean

    @ApiProperty({type: Boolean, description:"dieu_hoa"})
    @IsNotEmpty()
    dieu_hoa: boolean

    @ApiProperty({type: Boolean, description:"wifi"})
    @IsNotEmpty()
    wifi: boolean

    @ApiProperty({type: Boolean, description:"do_xe"})
    @IsNotEmpty()
    do_xe: boolean

    @ApiProperty({type: Boolean, description:"bep"})
    @IsNotEmpty()
    bep: boolean

    @ApiProperty({type: Boolean, description:"ho_boi"})
    @IsNotEmpty()
    ho_boi: boolean

    @ApiProperty({type: Boolean, description:"ban_ui"})
    @IsNotEmpty()
    ban_ui: boolean

    @ApiProperty({type: String, description:"hinh_anh"})
    @IsNotEmpty()
    hinh_anh: string

    @ApiProperty({type: Number, description:"ma_vi_tri"})
    @IsNotEmpty()
    ma_vi_tri: number



}