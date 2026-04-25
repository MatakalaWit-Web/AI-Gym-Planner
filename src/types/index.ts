export interface User {
    id: string;
    email: string;
    createAt: string
}

export interface UserProfile {
    userId: string;
    goal: 'bulk' | "cut" | "recomp" | "endurance",
    experience: 'intermediate' | "intermediate" | "advance",
    daysPerWeek: number,
    equipment: 'full_gym' | "home" | "dumbbells",
    sessionDuration: number,
    split: 'upper_lower',
    injuries: 'string ',

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
    exercises: Excercise[];
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
    version: number;
}