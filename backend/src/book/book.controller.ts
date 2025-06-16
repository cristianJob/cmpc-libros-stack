// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { GetBookQueryDto } from './dto/get-book.dto';
import { AuthGuard } from '../auth/auth.guard';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query() query: GetBookQueryDto) {
    const take = query.take ? query.take : 4;
    const skip = query.skip ? query.skip : 0;
    // eslint-disable-next-line prettier/prettier
    return this.bookService.findAll(take, skip,  query.autor, query.editorial, query.genero, query.titulo);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
