// типизация ОК респонсов для регистрации, логин и рефреш

import {ApiProperty} from '@nestjs/swagger';

export class AuthResponse {
    @ApiProperty({description:"JWT access token", example:"4398kjfsdhohf438u9nfkj4kjbk32ndm"})
    accessToken:string
}