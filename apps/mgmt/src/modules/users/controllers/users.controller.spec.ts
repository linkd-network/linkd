import { Test } from '@nestjs/testing';
import { UserController } from './users.controller';
import { UserService } from '../services/users.service';

describe('UserController', () => {
    let Controller: UserController;
    let Service: UserService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
        }).compile();

        Service = module.get<UserService>(UserService);
        Controller = module.get<UserController>(UserController);
    });

    it('should be defined', () => {
        expect(Controller).toBeDefined();
    });
});