import { Optional } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { uuid } from 'src/utils/uuid';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'disciple',
})
export class Disciple {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, default: null })
  @Optional()
  disciple_id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  owner: User;

  @Column()
  mian_attribute_id: number;

  @Column()
  mian_attribute_val: number;

  @Column('json')
  sub_attributes: number[];

  @Column('json')
  sub_attributes_val: number[];

  @Column('int', { nullable: true, default: null })
  want_for_main: number | null;

  @Column('int', { nullable: true, default: null })
  want_for_main_val: number | null;

  @Column('json')
  want_for_sub: number[];

  @CreateDateColumn()
  create_at: Date;

  @BeforeInsert()
  public generateDiscipleId() {
    this.disciple_id = Date.now().toString() + uuid();
  }
}
