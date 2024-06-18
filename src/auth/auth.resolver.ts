import { Args, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginInput } from "./auth.inputs";
import { AuthModel } from "./auth.model";


@Resolver(of => AuthModel)
export class AuthResolver {
    constructor(private authService : AuthService) {}
    
    @Query(() => AuthModel)
    async login(@Args('loginInputData') loginInputData : LoginInput) : Promise<AuthModel>{
        const res = await this.authService.login(loginInputData); 
        return res; 
    }
}