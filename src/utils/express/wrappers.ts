import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { TypedRequest } from "../zod";
import { config } from "../../config/config";
import { createProxyMiddleware } from "http-proxy-middleware";

// 🧠 גרסה גמישה של wrapController שתומכת גם ב־AuthenticatedRequest
export const wrapController = (
  func: (req: any, res: Response, next?: NextFunction) => Promise<unknown>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(next);
  };
};

export const wrapMiddleware = (
  func: (req: Request, res?: Response) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res).then(next).catch(next);
  };
};

export const validateRequest = (schema: AnyZodObject) => {
  return wrapMiddleware(async (req: Request) => {
    const { body, query, params } = req;
    const result = await schema.parseAsync({ body, query, params });

    if (result.body) Object.assign(req.body, result.body);
    if (result.query) Object.assign(req.query, result.query);
    if (result.params) Object.assign(req.params, result.params);
  });
};

export const wrapProxy = (
  uri: string
  // Timeout: number = config.service.requestTimeout
) => {
  return createProxyMiddleware({
    target: uri,
    // proxyTimeout: Timeout,
  });
};
// init
