import { RedirectToSignIn, SignedIn } from '@neondatabase/neon-js/auth/react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../componets/ui/Card';
import { Select } from '../componets/ui/Select';
import { useState } from 'react';
import { Textarea } from '../componets/ui/Textarea';
import { Button } from '../componets/ui/Button';
import { ArrowRight } from 'lucide-react';
import type { User, UserProfile } from '../types';

const goalOptions = [
  { value: 'lose_weight', label: 'Lose Weight' },
  { value: 'build_muscle', label: 'Build Muscle' },
  { value: 'improve_endurance', label: 'Improve Endurance' },
  { value: 'general_fitness', label: 'General Fitness' },
  { value: 'cut', label: 'Loose body fat' },
];


const experienceOptions = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];


const daysOptions = [
  { value: '1', label: '1 day/week' },
  { value: '2', label: '2 days/week' },
  { value: '3', label: '3 days/week' },
  { value: '4', label: '4 days/week' },
  { value: '5', label: '5 days/week' },
  { value: '6', label: '6 days/week' },
];


const equipmentOptions = [
  { value: 'dumbbells', label: 'Dumbbells' },
  { value: 'barbell', label: 'Barbell' },
  { value: 'kettlebells', label: 'Kettlebells' },
  { value: 'resistance_bands', label: 'Resistance Bands' },
  { value: 'bodyweight', label: 'Bodyweight' },
];


const sessionOptions = [
  { value: '30', label: '30 minutes' },
  { value: '45', label: '45 minutes' },
  { value: '60', label: '60 minutes' },
  { value: '90', label: '90 minutes' },
];


const splitOptions = [
  { value: 'full_body', label: 'Full Body' },
  { value: 'upper_lower', label: 'Upper/Lower' },
  { value: 'push_pull_legs', label: 'Push/Pull/Legs' },
  { value: 'bro_split', label: 'Bro Split' },
]



const Onboarding = () => {


  const { user, saveProfile } = useAuth();

  const [formData, setFormData] = useState({
    goal: 'bulk',
    experience: 'intermediate',
    daysPerWeek: '4',
    equipment: 'full_gym',
    sessionDuration: '60',
    split: 'upper_lower',
    injuries: ''

  });

  function updateForm(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));

  }


  async function handleQuestionaire(e: React.SubmitEvent) {
    e.preventDefault();

    const profile: Omit<UserProfile, "userId" | "updateAt"> = {
      goal: formData.goal as UserProfile["goal"],
      experience: formData.experience as UserProfile["experience"],
      daysPerWeek: parseInt(formData.daysPerWeek),
      equipment: formData.equipment as UserProfile["equipment"],
      sessionDuration: parseInt(formData.sessionDuration),
      split: formData.split as UserProfile["split"],
      injuries: formData.injuries || undefined
    };

    saveProfile(profile)

  }




  if (!user) {
    return <RedirectToSignIn></RedirectToSignIn>
  }
  return (
    <SignedIn>
      <div className='min-h-screen pt-24 pb-12 px-6'>
        <div className='max-w-xl mx-auto'>



          <Card variant='bordered'>
            <h1 className='text-2xl font-bold mb-2'>Tell us about your goals</h1>
            <p className='text-[var(--color-muted)] mb-6'>Lets create a perfect plan for you.</p>
            <form onSubmit={handleQuestionaire} className='space-y-3'>
              <Select id="goals"
                label='What are your goals?'
                options={goalOptions}
                value={formData.goal}
                onChange={(e) => updateForm('goal', e.target.value)}>
              </Select>

              <div className='grid grid-cols-2 gap-3'>


                <Select id="experience"
                  label='Experience level?'
                  options={experienceOptions}
                  value={formData.experience}
                  onChange={(e) => updateForm('experience', e.target.value)}>
                </Select>

                <Select id="daysPerWeek"
                  label='days per week'
                  options={daysOptions}
                  value={formData.daysPerWeek}
                  onChange={(e) => updateForm('daysPerWeek', e.target.value)}>
                </Select>


              </div>




              <Select id="sessionDuration"
                label='How long do you want each session to be?'
                options={sessionOptions}
                value={formData.sessionDuration}
                onChange={(e) => updateForm('sessionDuration', e.target.value)}>
              </Select>

              <Select id="split"
                label='What is your preferred training split?'
                options={splitOptions}
                value={formData.split}
                onChange={(e) => updateForm('split', e.target.value)}>
              </Select>


              <Select id="equipment"
                label='What equipment do you have access to?'
                options={equipmentOptions}
                value={formData.equipment}
                onChange={(e) => updateForm('equipment', e.target.value)}>
              </Select>

              <Textarea id='injuries'
                label='Any injuries or limitations?(optional)'
                placeholder='E.g., lower back issues, shoulder impingement'

                rows={4}
                value={formData.injuries}
                onChange={(e) => updateForm('injuries', e.target.value)}>

              </Textarea>

              <div className='flex gap-3 pt-2 '>
                <Button type='submit' className='flex-1 gap-2'>
                  Genarate my plan <ArrowRight className='w-4 h-4'></ArrowRight>
                </Button>
              </div>


            </form>
          </Card>



        </div>
      </div>
    </SignedIn>

  )
}

export default Onboarding