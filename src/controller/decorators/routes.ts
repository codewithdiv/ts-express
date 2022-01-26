import { RequestHandler } from 'express';
import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';
import { Methods } from './Methods';

interface RouteHandlerDescriptor extends PropertyDescriptor {
  values?: RequestHandler;
}

const routeBinder = (method: string) =>
  function (path: string) {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const destroy = routeBinder(Methods.delete);
export const patch = routeBinder(Methods.patch);
export const put = routeBinder(Methods.put);
