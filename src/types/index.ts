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