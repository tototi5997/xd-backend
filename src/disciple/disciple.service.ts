import { Injectable } from '@nestjs/common';
import { DecipleWantFor, DiscipleQueryParams } from './disciple.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Disciple } from './disciple.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class DiscipleService {
  @InjectRepository(Disciple)
  private readonly discipleRepository: Repository<Disciple>;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  /**
   * 获取所有弟子
   * @param params
   * @returns
   */
  async getDisciples(params?: DiscipleQueryParams) {
    const { ownerId, mian_attribute_id, mian_attribute_val } = params ?? {};

    const res = await this.discipleRepository.find({
      where: {
        owner: { id: ownerId },
        mian_attribute_id,
        mian_attribute_val,
      },
    });

    return {
      data: res,
      length: res.length,
    };
  }

  /**
   * 添加弟子
   * @param disciple
   * @returns
   */
  async createDisciple(disciple: DecipleWantFor) {
    const { ownerId } = disciple;

    const owner = await this.userRepository.find({ where: { id: ownerId } });

    if (!owner.length) return { message: 'owner is not exist' };

    const instance = this.discipleRepository.create({ ...disciple });

    const res = await this.discipleRepository.save(instance);

    return {
      data: res,
      message: 'success',
    };
  }

  /**
   * 删除弟子
   * @param disciple_id
   * @returns
   */
  async removeDisciple(disciple_id: string) {
    const disciple = await this.discipleRepository.findOneBy({ disciple_id });

    if (!disciple) {
      return {
        message: "Can't find this Disciple",
      };
    }

    const res = await this.discipleRepository.delete(disciple.id);

    return {
      data: res.affected > 0,
      message: 'success',
    };
  }
}
