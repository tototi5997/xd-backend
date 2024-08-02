import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  is_admin: boolean;

  @Column({ nullable: false })
  password: string;
}
