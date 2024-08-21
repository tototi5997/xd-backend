import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { DiscipleModule } from './disciple/disciple.module';
import { Disciple } from './disciple/disciple.entity';

@Module({
  imports: [
    CatsModule,
    UserModule,
    DiscipleModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '123.57.149.177',
      port: 3306,
      username: 'root',
      password: '@admin123',
      database: 'test-sql',
      synchronize: true, // 创建表
      entities: [User, Disciple],
      connectorPackage: 'mysql2',
    }),
  ],
})
export class AppModule {}
