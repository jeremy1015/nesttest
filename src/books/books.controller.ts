import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Book, BooksService } from './books.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateBookDto, UpdateBookDto } from './book.dto';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  withHateoasLinks(book: Book, req: Request) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const { id, authorId } = book;
    return {
      ...book,
      links: {
        self: { href: `${baseUrl}/books/${id}` },
        author: { href: `${baseUrl}/authors/${authorId}` },
        update: { href: `${baseUrl}/books/${id}`, method: 'PUT' },
        delete: { href: `${baseUrl}/books/${id}`, method: 'DELETE' },
      },
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'List of all books.' })
  findAll(@Req() req: Request) {
    const books = this.booksService.findAll();
    return books.map((book) => this.withHateoasLinks(book, req));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get book by ID' })
  @ApiResponse({ status: 200, description: 'The book with the given ID.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.withHateoasLinks(this.booksService.findOne(+id), req);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({ status: 201, description: 'The book has been created.' })
  create(@Body() createBookDto: CreateBookDto, @Req() req: Request) {
    return this.withHateoasLinks(this.booksService.create(createBookDto), req);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing book' })
  @ApiResponse({ status: 200, description: 'The book has been updated.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Req() req: Request,
  ) {
    return this.withHateoasLinks(
      this.booksService.update(+id, updateBookDto),
      req,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book' })
  @ApiResponse({ status: 200, description: 'The book has been deleted.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
