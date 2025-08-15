import { Logger } from "@nestjs/common";

export function LogMethod(): MethodDecorator {
  const logger = new Logger("MethodLogger");

  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      logger.log(
        `Called ${String(propertyKey)} with args: ${JSON.stringify(args)}`
      );

      const result = originalMethod.apply(this, args);

      if (result instanceof Promise) {
        return result
          .then((res) => {
            logger.log(
              `Method ${String(propertyKey)} resolved with: ${JSON.stringify(res)}`
            );
            return res;
          })
          .catch((err) => {
            logger.error(
              `Method ${String(propertyKey)} threw an error: ${err.message}`
            );
            throw err;
          });
      }

      logger.log(
        `Method ${String(propertyKey)} returned: ${JSON.stringify(result)}`
      );
      return result;
    };

    return descriptor;
  };
}
