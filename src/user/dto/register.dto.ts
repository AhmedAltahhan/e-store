/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(250)
    email;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(15)
    name;

    @IsNotEmpty()
    @MinLength(6)
    password;
}
