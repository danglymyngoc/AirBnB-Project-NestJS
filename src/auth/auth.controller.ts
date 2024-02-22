import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import signInDTO from './dto/signIn.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import signUpDTO from './dto/signUp.dto';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

 @Post("/signin")
 @ApiBody({type: signInDTO})
 async signin(@Body() body: signInDTO, @Res() res): Promise<any>{
  const data = await this.authService.signin(body)
  res.status(data.statusCode).json(data)
 }

@Post("/signup")
@ApiBody({type: signUpDTO})
async signup(@Body() body: signUpDTO,@Res() res): Promise<any>{
  const data = await this.authService.signup(body)
  res.status(data.statusCode).json(data)
}


}
