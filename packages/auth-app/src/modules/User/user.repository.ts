import { Repository } from "typeorm";
import { User } from "./user.entity";
import { dataSource } from '../../common/db/connection'
import {UserDTO} from "./user.dto";
import {hashPassword} from "../Auth/auth.utils";

export class UserRepository {
    private userTypeORMRepo: Repository<User>;
    constructor() {
        this.userTypeORMRepo = dataSource.getRepository<User>(User)
    }

    async create(userData: UserDTO): Promise<User> {
        const userE = await this.toUserEntity(userData)
        await this.userTypeORMRepo.insert(userE);
        return userE;
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return await this.userTypeORMRepo.findOneBy({email});
    }

    private async toUserEntity(user: UserDTO): Promise<User> {
        const userEntity = new User();
        if (user.id) userEntity.id = user.id;
        if (user.email) userEntity.email = user.email;
        if (user.password) userEntity.passwordHash = await hashPassword(user.password);
        return userEntity;
    }

}