import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  public title: string;

  @IsString()
  public publisher: string;
  
  @IsNumber()
  public price: number;
}
