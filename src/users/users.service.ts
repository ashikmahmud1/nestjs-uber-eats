import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { User } from "./entities/user.entity";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>
    ){}

    async createAccount({email, password, role}: CreateAccountInput): Promise<{ok : boolean, error?:string}>{
        // check new user
        // create user & hash password
        try{
            const exists = await this.users.findOne({email});
            if(exists){
                // make error
                return {ok: false, error: "User already exist!"};
            }
            await this.users.save(this.users.create({email, password, role}))
            return {ok: true}
        } catch(e) {
            // make error
            console.log(e);
            return {ok: false, error: "Couldn't create account"};
        }
    }
}