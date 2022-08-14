import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserPayload, UserDataViewPayload } from "src/app.models";
import { User } from "src/model/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }
    
    /**
     * Create a new user account.
     *  
     * @param userData user data like wallet account id etc
     * @returns persisted user data
     */
    public async createUser(userData: CreateUserPayload): Promise<UserDataViewPayload> {
        let user = await this.userRepository.findOne({ where: [ {accountId: userData.accountId} ] })
        
        if (user == null) {
            const newUser = new User();
            const currentDateTime = new Date();
            newUser.accountId = userData.accountId;
            newUser.createdAt = currentDateTime;
            newUser.lastUpdatedAt = currentDateTime;

            user = await this.userRepository.save(newUser);
        }

        return {
            accountId: user.accountId,
            lastUpdatedAt: user.lastUpdatedAt,
            createdAt: user.createdAt,
        };
    }

    public async findUser(accountId: string): Promise<UserDataViewPayload> {
        const user = await this.userRepository.findOne({ where: [ {accountId: accountId} ] })
        return {
            accountId: user.accountId,
            lastUpdatedAt: user.lastUpdatedAt,
            createdAt: user.createdAt,
        };
    }
}