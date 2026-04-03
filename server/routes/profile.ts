import { Router, type Request, type Response } from 'express';
import { error, profile } from 'node:console';
import { prisma } from '../lib/prisma';
import { create } from 'node:domain';


export const profileRouter = Router();

profileRouter.post("/", (req: Request, res: Response) => {
  try {
    const { userId, ...profileData } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }


    const {

      goal,
      experience,
      daysPerWeek,
      equipment,
      sessionDuration,
      split,
      injuries,
      
    } = profileData;

    if (
      !goal ||
      !experience ||
      !daysPerWeek ||
      !equipment ||
      !sessionDuration ||
      !split 
     
    ) {
      return res.status(400).json({error: "Missing required fields"});
    }

    await prisma.user_profiles.upsert({
      where: {user_id: userId},
      update: {
      goal,
      experience,
      daysPerWeek: daysPerWeek,
      equipment,
      sessionDuration: sessionDuration,
      split: split,
      injuries: injuries || null,
      updated_at: new Date()
    },

    create: {
      user_id: userId,
       goal,
      experience,
      daysPerWeek: daysPerWeek,
      equipment,
      sessionDuration: sessionDuration,
      split: split,
      injuries: injuries || null,
    
    },



    });

    res.json({success: true})



  } catch (error) {
    console.error("error saving profile data:", error);
    res.status(500).json({ message: "Failed to save profile data" });

  }
});