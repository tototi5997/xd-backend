import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './user.dto';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const validateUser = await this.userService.validateUser(
      loginDto.phone,
      loginDto.password,
    );

    if (!validateUser) throw new UnauthorizedException('Invalid credentials');

    const data = await await this.userService.login(validateUser);

    res.cookie('access_token', data.data?.access_token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 3600,
    });

    return data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUserDetail(@Req() req: Request) {
    const user = req.user as { phone: string };
    return this.userService.findUserByPhone(user.phone);
  }

  @Delete('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { statusCode: 200 };
  }
}
