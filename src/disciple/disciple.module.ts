import { Module } from '@nestjs/common';
import { DiscipleService } from './disciple.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disciple } from './disciple.entity';
import { DiscipleController } from './disciple.controller';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Disciple]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [DiscipleController],
  providers: [DiscipleService],
})
export class DiscipleModule {}
