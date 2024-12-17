/* eslint-disable prettier/prettier */

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {
    }
    async canActivate(context: ExecutionContext) {
        const request: Request = context.switchToHttp().getRequest();
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        if(token && type === "Bearer") {
           try {
            const payload = await this.jwtService.verifyAsync(
                token, {
                    secret: this.configService.get<string>("JWT_SECRET")
                }
            );
            request["user"] = payload;
           } catch(error){
                throw new UnauthorizedException("access denied, invalid token");
           }
        } else {
            throw new UnauthorizedException("access denied, invalid token");
        }
        return true;
    }

}