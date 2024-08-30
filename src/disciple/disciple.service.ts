import { Injectable } from '@nestjs/common';
import {
  DecipleWantFor,
  DiscipleQueryParams,
  MainAttrMap,
  SubAttrMap,
} from './disciple.interface';
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
    const {
      index,
      pageSize,
      mian_attribute_id,
      mian_attribute_val,
      owner_id,
      disciple_id,
    } = params ?? {};

    const [res, total] = await this.discipleRepository.findAndCount({
      where: {
        mian_attribute_id,
        mian_attribute_val,
        owner: { id: owner_id },
        disciple_id,
      },
      order: {
        create_at: 'DESC',
      },
      skip: (index - 1) * pageSize,
      take: pageSize,
      relations: ['owner'],
    });

    const transfer_data = res?.map((item) => {
      return {
        id: item.disciple_id,
        owner: item?.owner?.name,
        owner_id: item?.owner?.id,
        mian_attribute: MainAttrMap?.[item.mian_attribute_id],
        mian_attribute_val: item.mian_attribute_val,
        sub_attributes: item.sub_attributes.map((id, index) => [
          SubAttrMap?.[id],
          item.sub_attributes_val[index],
        ]),
        want_for_main: MainAttrMap?.[item.want_for_main],
        want_for_main_val: item.want_for_main_val,
        want_for_sub: item.want_for_sub.map((id) => SubAttrMap?.[id]),
      };
    });

    // console.log(transfer_data);

    return {
      data: transfer_data,
      total,
      index,
    };
  }

  async getRankDisciples() {
    const res = await this.discipleRepository.find({
      order: {
        mian_attribute_val: 'DESC',
      },
      take: 10,
      relations: ['owner'],
    });

    const transfer_data = res?.map((item) => {
      return {
        id: item.disciple_id,
        owner: item?.owner?.name,
        owner_id: item?.owner?.id,
        mian_attribute: MainAttrMap?.[item.mian_attribute_id],
        mian_attribute_val: item.mian_attribute_val,
        sub_attributes: item.sub_attributes.map((id, index) => [
          SubAttrMap?.[id],
          item.sub_attributes_val[index],
        ]),
        want_for_main: MainAttrMap?.[item.want_for_main],
        want_for_main_val: item.want_for_main_val,
        want_for_sub: item.want_for_sub.map((id) => SubAttrMap?.[id]),
      };
    });

    return {
      data: transfer_data,
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

    const instance = this.discipleRepository.create({
      ...disciple,
      owner: owner[0],
    });

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
