import { Module } from '@nestjs/common';
import { AutorService } from './autor.service';
import { AutorController } from './autor.controller';
import { Autor } from './entities/autor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Autor]), AuthModule],
  controllers: [AutorController],
  providers: [AutorService],
})
export class AutorModule {}
