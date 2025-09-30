import {CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "../decorators/roles.decorator";
import {IS_PUBLIC_KEY} from "../decorators/public.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {
	}

	canActivate(context: ExecutionContext): boolean {
		const isPublic = this.reflector.getAllAndOverride<boolean>(
			IS_PUBLIC_KEY,
			[context.getHandler(), context.getClass()]
		)
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()],
		);

		if (isPublic) return true;

		const {user} = context.switchToHttp().getRequest();

		if (!user) throw new UnauthorizedException('Invalid user data');
		console.log('Check user role: ', user.role);
		console.log('Check all get roles: ', requiredRoles);
		if (!requiredRoles.includes(user.role)) throw new ForbiddenException();

		return true;
	}
}