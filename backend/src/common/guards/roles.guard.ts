import {CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {
	}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()],
		);

		const { user } = context.switchToHttp().getRequest();

		if(!user) throw new UnauthorizedException();

		if(!requiredRoles.includes(user.role)) throw new ForbiddenException();

		return true;
	}
}