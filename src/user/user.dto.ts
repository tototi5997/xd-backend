import { IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Phone is required' })
  phone: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}

export class LoginDto {
  @IsNotEmpty({ message: 'Phone is required' })
  phone: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
