import {IsString, MaxLength, MinLength, IsNumber, IsOptional,} from 'class-validator';

export class UserDTO {
    @IsOptional()
    @IsNumber()
    id: number

    @IsString()
    @MinLength(3)
    @MaxLength(500)
    email: string

    @IsString()
    @MinLength(3)
    @MaxLength(500)
    password: string
}
