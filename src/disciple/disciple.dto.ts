import { IsNotEmpty } from 'class-validator';
import { MainAttribute, SubAttribute } from './disciple.interface';

export class DiscipleQueryDto {
  mian_attribute_id?: MainAttribute;
  mian_attribute_val?: number;
  // sub_attributes?: SubAttribute[];
  ownerId?: number;
}

export class DiscipleCreateDto {
  @IsNotEmpty({ message: 'ownerId is required' })
  ownerId: number;

  @IsNotEmpty({ message: 'mian_attribute_id is required' })
  mian_attribute_id: MainAttribute;

  @IsNotEmpty({ message: 'mian_attribute_val is required' })
  mian_attribute_val: number;

  sub_attributes?: SubAttribute[];

  sub_attributes_val?: number[];

  want_for_main?: MainAttribute;

  want_for_main_val?: number;

  want_for_sub?: SubAttribute[];
}
