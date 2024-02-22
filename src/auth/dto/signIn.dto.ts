import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export default class signInDTO {
    @ApiProperty({type: String, description: "email"})
    @IsEmail()
    email: string

    @ApiProperty({type: String, description: "pass_word"})
    @IsNotEmpty()
    pass_word: string
}