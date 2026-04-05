import { version } from "node:os";

export interface UserProfile {
     goal: string;
      experience: string;
      daysPerWeek: number;
      equipment: string;
      sessionDuration: number;
      split: string;
      injuries: string || null;
}

export interface TrainingPlan{
    id: string;
    userId: string;
    overview: PlanOverview;
    weeklySchedule: DaySchedule[];
    progression: string;
    version: number;
    createdAt: string;

}

export interface DaySchedule {
    day: string;
    focus: string;
    exercise: Excercise[];
}

export interface Excercise{
    name: string;
    sets: number;
    reps: string;
    rest: string;
    rpe: number;
    notes?: string;
    alternatives: string[];
}

export interface PlanOverview {
    goal: string;
    frequency: string;
    split: string;
    notes: string;
}