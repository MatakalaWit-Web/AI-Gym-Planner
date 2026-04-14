import OpenAI from "openai";
import dotenv from 'dotenv';

import { TrainingPlan, UserProfile } from "../types";
import { profile } from "node:console";

dotenv.config();

export async function generateTrainingPlan(profile: UserProfile |
  Record<string, any>,): Promise<Omit<TrainingPlan, "id" | "userId" | "createdAt" | "version">> {

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

  const prompt = buildPrompt(normalizedProfile);

  try {
    const completion = await openai.chat.completions.create({
      model: "nvidia/nemotron-3-nano-30b-a3b:free",
      messages: [
        {
          role: "system",
          content: "You are an expect fitness trainer and program designer. You must respond with a complete training plan in JSON format based on the user's profile and goals. Follow the provided structure and requirements exactly, and do not include any additional text or explanations outside of the JSON response."
        },
        {
          role: "user",
          content: prompt,
        },

      ],

      temperature: 0.7,
      response_format: {
        type: "json_object",
      },

    });

    const content = completion.choices[0].message.content;

    if (!content) {
      console.error("[AI] No content in completion response",
        JSON.stringify(completion, null, 2),

      );
    
      throw new Error("No content in AI response");

    }

    const planData = JSON.parse(content);
    return formatPlanResponse(planData, normalizedProfile);

  } catch (error) {
    console.error("[AI] Error generating training plan:", error);
  }


}


function formatPlanResponse(
  aiResponse: any,
  profile: UserProfile,
): Omit<TrainingPlan, "id" | "userId" | "createdAt" | "version"> {
  const plan: Omit<TrainingPlan, "id" | "userId" | "createdAt" | "version"> = {
    overview: {
      goal: aiResponse.overview?.goal || `Customized ${profile.goal} program`,
      frequency: aiResponse.overview?.frequency || `${profile.daysPerWeek} days per week`,
      split: aiResponse.overview?.split || profile.split,
      notes: aiResponse.overview?.notes || "Follow the program consistently for best results."

    },

    weeklySchedule: (aiResponse.weeklySchedule || []).map((day: any) => ({
      day: day.day || "Day",
      focus: day.focus || "General Training",
      exercises: (day.exercises || []).map((ex: any) => ({
        name: ex.name || "Exercise",
        sets: ex.sets || 3,
        reps: ex.reps || "8-12",
        rest: ex.rest || "60-90 sec",
        rpe: ex.rpe || 7,
        notes: ex.notes,
        alternatives: ex.alternatives,
      }))
    })),
    progression: aiResponse.progression || "Progress gradually by increasing weight, reps, or sets each week."
  };

  return plan;



}

function buildPrompt(profile: UserProfile): string {
  const goalMap: Record<string, string> = {
    bulk: "build muscle and gain size",
    cut: "lose at and maintain muscle",
    recomp: "simultanously lose fat and build muscle",
    strength: "build maximum strenght",
    endurance: "improve cardiovascular endurance and stamina"
  };

  const experienceMap: Record<string, string> = {
    beginner: "beginner (0-1 years o training experience)",
    intermediate: "intermediate (1-3 years of training experience)",
    advanced: "advanced (3+ years of training experience)",
  };

  const equipmentMap: Record<string, string> = {
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
        ${profile.injuries ? `Injuries/Limitations: ${profile.injuries}` : ""}

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
Rquirements:
- Create exactly ${profile.days_per_week} workout days per week
- Each workout should fit within ${profile.sessionDuration} minutes
- Include 4-6 exercises per workout
- RPE(Rate of Perceived Exertion) should be between 6-9 for main lifts
- Include compound movements for beginner/intermediate, advanced can have isolation
- Match th preferred split type: ${profile.split}
- ${profile.injuries ? `Avoid exercises that may aggravate the following injuries/limitations: ${profile.injuries}` : ""}
- Provide exercise alternatives for any exercises that may be difficult to perform due to equipment limitations or injuries
- Make it progressive and suitable for ${experienceMap[profile.experience] || profile.experience} lifters aiming to ${goalMap[profile.goal] || profile.goal}

Return only the JSON response without any additional text or explanations.
`;


}