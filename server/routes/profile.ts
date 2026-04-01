import { Router, type Request, type Response } from 'express';
import { error, profile } from 'node:console';


export const profileRouter = Router();

profileRouter.post("/", (req: Request, res: Response) => {
  try{
    const {userId, ...profileData} = req.body;

    if(!userId){
      return res.status(400).json({error: "userId is required"});
    }
    


  }catch(error){
    console.error("error saving profile data:", error);
    res.status(500).json({ message: "Failed to save profile data" });

  }
});