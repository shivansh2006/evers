import { Request as ExpressRequest } from 'express';

export interface amohajewelleryRequest extends ExpressRequest {
  isAdmin?: boolean;
  session?: any;
  currentRoute?: string;
}
