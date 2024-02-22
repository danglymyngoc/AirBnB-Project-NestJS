import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export default class signUpDTO {
        @ApiProperty({type: String, description: "name"})
        @IsNotEmpty()
        name: string

        @ApiProperty({type: String, description: "email"})
        @IsEmail()
        email: string

        @ApiProperty({type: String, description: "pass_word"})
        @IsNotEmpty()
        pass_word: string

        @ApiProperty({type: String, description: "phone"})
        @IsNotEmpty()
        phone: string

        @ApiProperty({type: String, description: "birth_day"})
        @IsNotEmpty()
        birth_day: string

        @ApiProperty({type: String, description: "gender"})
        @IsNotEmpty()
        gender: string

        @ApiProperty({type: String, description: "role"})
        @IsNotEmpty()
        role: string
      
}