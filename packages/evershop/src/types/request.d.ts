import { Request as ExpressRequest } from 'express';
import { Route } from './route.js';
export interface amohajewelleryRequest extends ExpressRequest {
  isAdmin?: boolean;
  session?: any;
  currentRoute?: Route;
}
