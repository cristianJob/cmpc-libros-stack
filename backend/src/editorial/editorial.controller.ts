// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EditorialService } from '../editorial/editorial.service';
import { CreateEditorialDto } from '../editorial/dto/create-editorial.dto';
import { UpdateEditorialDto } from '../editorial/dto/update-editorial.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('editorial')
export class EditorialController {
  constructor(private readonly editorialService: EditorialService) {}

  @Post()
  create(@Body() createEditorialDto: CreateEditorialDto) {
    return this.editorialService.create(createEditorialDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.editorialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.editorialService.findOne(+id);
  }

  @Patch(':id')
  // eslint-disable-next-line prettier/prettier
  update(@Param('id') id: string, @Body() updateEditorialDto: UpdateEditorialDto) {
    return this.editorialService.update(+id, updateEditorialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.editorialService.remove(+id);
  }
}
