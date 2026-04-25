import { Dumbbell, Info } from "lucide-react";
import type { DaySchedule, Excercise } from "../../types"
import { Card } from "../ui/Card";


function ExerciseRow({ exercise, index }: { exercise: Excercise, index: number }) {
    return (<tr>

        <td>
            <div>
                <span>{index + 1}.</span>
                <div>
                    <p>{exercise.name}</p>
                    {exercise.notes && (
                        <p>
                            <Info></Info>
                            {exercise.notes}
                        </p>
                    )}
                </div>
            </div>
            <td>
                <span>{exercise.sets}</span>
                <span> x </span>
                <span>{exercise.reps}</span>
            </td>
            {exercise.rpe}

            <td> 
                <span>{exercise.rest}</span>
            </td>
        </td>

    </tr>)

}

function DayCard({ schedule }: { schedule: DaySchedule }) {
    return <Card variant="bordered" className="overflow-hidden">
        <div className="flex items-center justify-center mb-4">
            <div>
                <h3 className="font-semibold text-lg">{schedule.day}</h3>
                <p className="text-sm text-[var(--color-accent)]">{schedule.focus}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                <Dumbbell className="w-4 h-4"></Dumbbell>
                <span> {schedule.exercises.length} exercises</span>
            </div>
            <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-[var(--color-muted)] text-xs uppercase tracking-wider">
                            <th className="text-left py-2 pr-4 font-medium">Exercise</th>
                            <th className=" py-2 pr-4 font-medium">Sets x Reps</th>
                            <th className="py-2 pr-4 font-medium">RPE</th>
                            <th className=" py-2 pr-4 font-medium">Rest</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.exercises.map((exercise, key) => (
                            <ExerciseRow exercise={exercise} index={key} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </Card>
}


interface PlanDisplayProps {
    weeklySchedule: DaySchedule[];
}

export function PlanDisplay({ weeklySchedule }: PlanDisplayProps) {
    return (
        <div>
            {weeklySchedule.map((schedule, key) => (
                <DayCard key={key} schedule={schedule} />
            ))}
        </div>
    )
}