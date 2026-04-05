import OpenAI from "openai";
import dotenv from 'dotenv';
import { User_profilesAggregateArgs } from "../generated/prisma/models";
import { UserProfile } from "../types";

dotenv.config();

export async function generateTrainingPlan(profile: UserProfiles |
    Record<string, any>,): Promise<TrainingPlan> {

    const normalizedProfile: UserProfile = {
        goal: profile.goal || "bulk",
        experience:profile.experience || "intermediate",
        daysPerWeek: profile.daysPerWeek || 4,
        equipment: profile.equipment || "full_gym",
        sessionDuration: profile.sessionDuration || 60,
        split: profile.split || "upper_lower",
        injuries: profile.injuries || null,
    }
}
