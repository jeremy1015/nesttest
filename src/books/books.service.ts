import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './book.dto';

export interface Book {
  id: number;
  title: string;
  authorId: number;
}

@Injectable()
export class BooksService {
  private books: Book[] = [
    { id: 1, title: 'The Catcher in the Rye', authorId: 1 },
    { id: 2, title: 'To Kill a Mockingbird', authorId: 2 },
    { id: 3, title: '1984', authorId: 3 },
  ];
  private idCounter = 4;

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book {
    return this.books.find((book) => book.id === id);
  }

  create(createBookDto: CreateBookDto): Book {
    const newBook: Book = {
      id: this.idCounter++,
      ...createBookDto,
    };

    this.books.push(newBook);
    return newBook;
  }

  update(id: number, updateBookDto: UpdateBookDto): Book {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    const book = { ...this.books[bookIndex], ...updateBookDto };
    this.books[bookIndex] = book;
    return book;
  }

  remove(id: number): boolean {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    this.books.splice(bookIndex, 1);
    return true;
  }
}
