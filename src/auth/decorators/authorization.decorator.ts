import {applyDecorators, UseGuards} from '@nestjs/common';
import {JWTGuard} from 'src/auth/quards/auth.guard';

export function Authorization() {

    return applyDecorators(UseGuards(JWTGuard))
}