import {registerDecorator, ValidationArguments, ValidatorOptions} from "class-validator";


export function IsSortKey(keys: string[], options?: ValidatorOptions) {
	return function (object: any, propertyName: string) {
		registerDecorator({
			name: 'isSortKey',
			target: object.constructor,
			propertyName: propertyName,
			options: options,
			validator: {
				validate(value: any, validationArguments: ValidationArguments) {
					if(!value) return true;

					return keys.includes(value);
				},
				defaultMessage(validationArguments: ValidationArguments) {
					return `${validationArguments.property} must be of [${keys.join(' ')}]`;
				}
			}
		})
	}
}