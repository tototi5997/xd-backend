import { Injectable } from '@nestjs/common';
import { AccountInfo } from './user.interface';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private manager: EntityManager;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  /**
   * 注册
   * @param accountInfo
   * @returns
   */
  async register(accountInfo: AccountInfo) {
    const is_exit = await this.userRepository.find({
      where: { phone: accountInfo.phone },
    });
    if (is_exit.length) {
      return {
        message: 'Phone number already exists',
      };
    } else {
      const res = await this.userRepository.save(accountInfo);
      return {
        message: 'Register successful',
        res,
      };
    }
  }

  /**
   *  获取所有用户
   * @returns
   */
  async getAllUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  /**
   * 登录
   * @param loginInfo
   * @returns
   */
  async login(loginInfo: Pick<AccountInfo, 'phone' | 'password'>) {
    const user = await this.userRepository.find({
      where: {
        phone: loginInfo.phone,
      },
    });

    const is_not_exit = user.length === 0;
    const { password, ...res } = user[0] ?? {};
    const is_error_password = password && password !== loginInfo.password;

    if (is_not_exit) {
      return {
        message: 'User is not exist',
      };
    }

    if (is_error_password) {
      return {
        message: 'Wrong password',
      };
    }

    return {
      message: `Wlecome, ${user[0].name}`,
      res,
    };
  }

  // async delete(id: number) {
  //   const res = await this.manager.delete(User, id);
  //   return res.affected > 0;
  // }

  // async update(accountInfo: AccountInfo) {
  //   const res = await this.manager.save(User, accountInfo);
  //   return {
  //     res,
  //     message: 'Success',
  //   };
  // }

  // login({ name }: AccountInfo) {
  //   return this.manager.find(User, {
  //     where: {
  //       name,
  //     },
  //   });
  // }
}
