import { Injectable } from '@nestjs/common';

export interface Author {
  id: number;
  name: string;
}

@Injectable()
export class AuthorsService {
  private authors: Author[] = [
    { id: 1, name: 'J.D. Salinger' },
    { id: 2, name: 'Harper Lee' },
    { id: 3, name: 'George Orwell' },
  ];
  private idCounter = 4;

  findAll(): Author[] {
    return this.authors;
  }

  findOne(id: number): Author {
    return this.authors.find((author) => author.id === id);
  }

  create(author: Omit<Author, 'id'>): Author {
    const newAuthor = { ...author, id: this.idCounter++ };
    this.authors.push(newAuthor);
    return newAuthor;
  }

  update(id: number, updatedAuthor: Omit<Author, 'id'>): Author {
    const authorIndex = this.authors.findIndex((author) => author.id === id);
    if (authorIndex === -1) return null;

    const author = { ...this.authors[authorIndex], ...updatedAuthor };
    this.authors[authorIndex] = author;
    return author;
  }

  remove(id: number): boolean {
    const authorIndex = this.authors.findIndex((author) => author.id === id);
    if (authorIndex === -1) return false;

    this.authors.splice(authorIndex, 1);
    return true;
  }
}
