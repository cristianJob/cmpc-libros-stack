import { Module } from '@nestjs/common';
import { EditorialService } from './editorial.service';
import { EditorialController } from './editorial.controller';
import { Editorial } from './entities/editorial.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Editorial]), AuthModule],
  controllers: [EditorialController],
  providers: [EditorialService],
})
export class EditorialModule {}
