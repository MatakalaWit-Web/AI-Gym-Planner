import { Router, type Request, type Response } from 'express';

export const planRouter = Router();

planRouter.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Plan route is working' });
});

planRouter.post('/', (req: Request, res: Response) => {
  const planData = req.body;
  res.json({ message: 'Plan created', planData });
});
