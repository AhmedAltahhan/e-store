/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(250)
    email;

    @IsNotEmpty()
    @MinLength(6)
    password;

}
