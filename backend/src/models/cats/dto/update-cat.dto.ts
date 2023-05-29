import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class UpdateCatDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;
}
