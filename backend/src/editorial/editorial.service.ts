import { Injectable } from '@nestjs/common';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Editorial } from './entities/editorial.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EditorialService {
  constructor(
    @InjectRepository(Editorial)
    private readonly editorialRepository: Repository<Editorial>,
  ) {}

  create(createEditorialDto: CreateEditorialDto) {
    return 'This action adds a new editorial';
  }

  findAll() {
    return this.editorialRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} editorial`;
  }

  update(id: number, updateEditorialDto: UpdateEditorialDto) {
    return `This action updates a #${id} editorial`;
  }

  remove(id: number) {
    return `This action removes a #${id} editorial`;
  }
}
