import { NextFunction } from 'express';
import { amohajewelleryRequest } from './request.js';
import { amohajewelleryResponse } from './response.js';

export type SyncMiddlewareFunction<T, D> = (
  req: amohajewelleryRequest,
  res: amohajewelleryResponse,
  delegate?: D,
  next?: NextFunction
) => T;

export type AsyncMiddlewareFunction<T, D> = (
  req: amohajewelleryRequest,
  res: amohajewelleryResponse,
  delegate?: D,
  next?: NextFunction
) => Promise<T>;

export type ErrorMiddlewareFunction = (
  err: Error,
  req: amohajewelleryRequest,
  res: amohajewelleryResponse,
  delegate?: any,
  next?: NextFunction
) => void;

interface Delegate {}

export interface SyncMiddleware<T, D> extends Middleware {
  callback: SyncMiddlewareFunction<T, D>;
}

export interface AsyncMiddleware<T, D> extends Middleware {
  callback: AsyncMiddlewareFunction<T, D>;
}

// --------------------------------------------------------------------------

export type ENext = (error?: Error, ...args: any[]) => void;

export type MiddlewareFunction = (
  request: amohajewelleryRequest,
  response: amohajewelleryResponse,
  next: ENext
) => void;

export type MiddlewareFunctionWrapper = (
  request: amohajewelleryRequest,
  response: amohajewelleryResponse,
  next: ENext
) => void;

export type ErrorMiddlewareFunctionWrapper = (
  error: Error,
  request: amohajewelleryRequest,
  response: amohajewelleryResponse,
  next: ENext
) => void;

export interface Middleware {
  routeId: string;
  id: string;
  path: string;
  scope: 'app' | 'route';
  region: 'pages' | 'api';
  before?: string[];
  after?: string[];
  middleware: MiddlewareFunctionWrapper | ErrorMiddlewareFunctionWrapper;
}
