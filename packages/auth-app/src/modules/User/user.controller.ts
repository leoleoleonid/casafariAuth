import {UserRepository} from "./user.repository";
import {UserDTO} from "./user.dto";
import {ErrorException} from "../../common/errors/error-exception";
import {ErrorCode} from "../../common/errors/error-code";
import {compareHash, generateToken} from "../Auth/auth.utils";
import {User} from "./user.entity";

export default class UserController {
    private userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    static createInstance(): UserController {
        const userRepository = new UserRepository();
        return new UserController(userRepository)
    }

    async create(user: UserDTO): Promise<{ token: string }> {
        if (await this.userRepository.findOneByEmail(user.email)) {
            throw new ErrorException(ErrorCode.ValidationError, 'User With This Email Already Exist')
        }
        const dbUser = await this.userRepository.create(user);
        const userWithoutPassword: Partial<User> = dbUser;
        delete userWithoutPassword.passwordHash;

        // TODO sync
        return {token: generateToken(userWithoutPassword)}
    }

    async login(user: UserDTO): Promise<{token: string}> {
        const dbUser = await this.userRepository.findOneByEmail(user.email);

        if (!dbUser) {
            throw new ErrorException(ErrorCode.NotFound, 'User not found')
        }

        const isCorrectPassword = await compareHash(dbUser.passwordHash, user.password);

        if(!isCorrectPassword) {
            throw new ErrorException(ErrorCode.Unauthenticated, 'Incorrect password')
        }
        const userWithoutPassword: Partial<User> = dbUser;
        delete userWithoutPassword.passwordHash;

        return {token: generateToken(userWithoutPassword)}
    }
}