import {
  Body,
  Controller,
  // Delete,
  Get,
  // Param,
  Post,
  // Put,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  // @Post('login')
  // login(@Body() loginDto: LoginDto) {
  //   return this.userService.login(loginDto);
  // }

  // @Delete(':id')
  // delete(@Param('id') id: number) {
  //   return this.userService.delete(id);
  // }

  // @Put()
  // update(@Body() accountInfo: LoginDto) {
  //   return this.userService.update(accountInfo);
  // }
}
