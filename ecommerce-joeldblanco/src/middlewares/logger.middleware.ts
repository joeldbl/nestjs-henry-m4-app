import { NextFunction, Request, Response } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  const now = new Date();
  const date = now.toLocaleString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const time = now.toLocaleString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  console.log(`${req.method} ${req.url} ${date}-${time}`);
  next();
}
