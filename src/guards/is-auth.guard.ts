import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";


@Injectable()
export class IsAuthGuard implements CanActivate{
    constructor(
        private jwtService: JwtService
    ){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()

        const authorization = req.headers['authorization']
        // Bearer token
        if(!authorization) throw new UnauthorizedException('permition denied')
        
        const [type, token] = authorization.split(' ')
        if(!token) throw new UnauthorizedException('permition denied')

        try{
            const payload = this.jwtService.verify(token)
            req['userId'] = payload.userId

            return true
        }catch(e){
            throw new UnauthorizedException('permition denied')
        }
    }
}