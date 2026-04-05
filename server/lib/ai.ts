import OpenAI from "openai";
import dotenv from 'dotenv';
import { User_profilesAggregateArgs } from "../generated/prisma/models";
import { UserProfile } from "../types";

dotenv.config();

export async function generateTrainingPlan(profile: UserProfiles |
    Record<string, any>,): Promise<TrainingPlan> {

    const normalizedProfile: UserProfile = {
        goal: profile.goal || "bulk",
        experience: profile.experience || "intermediate",
        daysPerWeek: profile.daysPerWeek || 4,
        equipment: profile.equipment || "full_gym",
        sessionDuration: profile.sessionDuration || 60,
        split: profile.split || "upper_lower",
        injuries: profile.injuries || null,
    };

    const apikey = process.env.OPEN_ROUTER_KEY;

    if (!apikey) {
        throw new Error("OPEN_ROUTER_KEY is not set i environment variable")
    }

    const openai = new OpenAI({
        apiKey,
        baseURL: "https://openrouter.ai/api/v1",
        defaultHeaders: {
            "HTTP-Referer": process.env.BASE_URL || "https://localhost:3001",
            "X-Title": "GymAI Plan Generator",
        },
    });

    const prompt = buildPrompt(normalizedProfile)


}

function buildPrompt(profile: UserProfile): {
    const goalMap: Record<string, string> = {
    bulk: "build muscle and gain size",
    cut: "lose at and maintain muscle",
    recomp: "simultanously lose fat and build muscle",
    strength: "build maximum strenght",
    endurance: "improve cardiovascular endurance and stamina"
    };

    const experianceMap: Record<string, string> = {
    beginner: "beginner (0-1 years o training experience)",
    intermediate: "intermediate (1-3 years of training experience)",
    advanced: "advanced (3+ years of training experience)",
    };

    const equipment: Record<string, string> = {
    full_gym: "full gym accesswith all equipment",
    home: "home gym with limited equipment",
    dumbbells: "only dumbbells available"
    };

    const splitMap: Record<string, string> = {
    full_body: "full body workouts",
    upper_lower: "upper/lower split",
    ppl: "push/pull/legs split",
    custom: "best split for their goals"
    };

    return `Create a personalized ${profile.days_per_week}-day per week training plan for someone
    with the following profile:
    
      goal: ${goalMap[profile.goal] || profile.goal}
        experience: ${experienceMap[profile.experience] || profile.experience}
        equipment: ${equipmentMap[profile.equipment] || profile.equipment}
        sessionDuration: ${profile.sessionDuration || 60} minutes per session
        split: ${splitMap[profile.split] || profile.split}
        ${profile.injuries ? `Injuries/Limitations: ${profile.injusries}` : ""}

        Generate a complete training plan in JSON format with this exact structure:

        {
  "overview": {
    "goal": "brief description of the training goal",
    "frequency": "X days per week",
    "split": "training split name",
    "notes": "important notes about the program (2-3 sentences)"
  },
  "weeklySchedule": [
    {
      "day": "Monday",
      "focus": "muscle group or focus area",
      "exercises": [
        {
          "name": "Exercise Name",
          "sets": 4,
          "reps": "6-8",
          "rest": "2-3 min",
          "rpe": 8,
          "notes": "form cues or tips (optional)",
          "alternatives": ["Alternative 1", "Alternative 2"]
        }
      ]
    }
  ],
  "progression": "detailed progression strategy (2-3 sentences explaining how to progress)"
}

`;


}