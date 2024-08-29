import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AccountInfo } from './user.interface';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bycrypt from 'bcrypt';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private manager: EntityManager;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  constructor(private readonly jwtService: JwtService) {}

  async validateUser(phone: string, pass: string): Promise<any> {
    const users = await this.userRepository.find({ where: { phone } });

    if (users.length && (await bycrypt.compare(pass, users[0]?.password))) {
      const { password: _, ...result } = users[0];
      return result;
    }

    return null;
  }

  /**
   * 登录
   * @param loginInfo
   * @returns
   */
  async login(loginInfo: Exclude<AccountInfo, 'password'>) {
    const payload = { phone: loginInfo.phone };
    try {
      // console.log('JwtService:', this.jwtService); // 检查 jwtService 是否正确注入
      const token = this.jwtService.sign(payload);
      // console.log('Generated token:', token); // 检查 token 是否正确生成
      return {
        data: {
          name: loginInfo.name,
          access_token: token,
        },
        statusCode: 200,
      };
    } catch (error) {
      // console.error('Error signing JWT:', error);
      throw new InternalServerErrorException('Failed to generate token');
    }
  }

  /**
   * 注册
   * @param accountInfo
   * @returns
   */
  async register(accountInfo: AccountInfo) {
    const existingUser = await this.userRepository.find({
      where: { phone: accountInfo.phone },
    });
    if (existingUser.length) throw new ConflictException('User already exists');

    const hashedPassword = await bycrypt.hash(accountInfo.password, 10);
    const newUser = await this.userRepository.create({
      ...accountInfo,
      password: hashedPassword,
    });

    const { password: _, ...res } = await this.userRepository.save(newUser);

    return {
      data: res,
      statusCode: 200,
    };
  }

  async findUserByPhone(phone: string) {
    const res = await this.userRepository.find({
      where: { phone },
    });

    return {
      data: res?.map((i) => {
        const { password: _, ...res } = i;
        return res;
      }),
      statusCode: 200,
    };
  }
}
