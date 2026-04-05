import { Router, type Request, type Response } from 'express';
import { error } from 'node:console';
import { prisma } from '../lib/prisma';
import { version } from 'node:os';
import { create } from 'node:domain';

export const planRouter = Router();

planRouter.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Plan route is working' });
});

planRouter.post('/generate', async (req: Request, res: Response) => {
  try{
    const{userId} = req.body;

    if(!userId){
      return res.status(400).json({error: "User ID is required"})
    }

    const profile = await prisma.user_profiles.findUnique({
      where: {user_id: userId},
    });

    if(!profile){
      return res.status(400).json({error: "User profile not found. Complete onbording first"})
    }

    const latestPlan = await prisma.training_plans.findFirst({
      where: {user_id: userId},
      oderBy: {created_at: "desc"},
      select: {version: true},
    });

    const nextVersion = latestPlan ? latestPlan.version + 1: 1;
    let planJson;


    const planText = JSON.stringify(planJson, null, 2);
    const newPlan = await prisma.training_plans.create({
      data: {
        user_id: userId,
        plan_jason: planJson asn AnyNull,
        plan_text: planText,
        version: nextVersion, 
      },
    });

    res.json({
      id: newPlan.id,
      version: newPlan.version,
      createdAt: newPlan.created_at,
    })

  }catch(error){
    console.error("Error genarting plan:", error);
    res.status(500).json({error: "Failed to generate plan"});
  }
  
});
