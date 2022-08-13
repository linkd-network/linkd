import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserPayload, UserDataViewPayload } from 'src/app.models';
import { UserService } from '../services/users.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){}

    @Post()
    async upsertUser(@Body() userData: CreateUserPayload): Promise<UserDataViewPayload> {
        return await this.userService.createUser(userData);
    }

    @Get()
    async findUser(@Query('account_id') accountId: string): Promise<UserDataViewPayload> {
        return await this.userService.findUser(accountId);
    }
}