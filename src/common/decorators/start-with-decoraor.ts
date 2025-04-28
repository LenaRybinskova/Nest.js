import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

// StartWith это декоратор, а декоратор это функ высш порядка, она возвр другую функцию.
export function StartWith(
  prefix: string,
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'startsWith',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Проверка на тип данных и начало строки с заданного префикса
          return typeof value === 'string' && value.startsWith(prefix);
        },
        defaultMessage(args: ValidationArguments) {
          return `название должно начинаться с ${prefix}`;
        },
      },
    });
  };
}
