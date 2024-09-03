import { IsString, IsInt } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class BaseBookDto {
  @ApiProperty({ example: 'The Catcher in the Rye' })
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  readonly authorId: number;
}

export class CreateBookDto extends BaseBookDto {}

export class UpdateBookDto extends PartialType(BaseBookDto) {}
