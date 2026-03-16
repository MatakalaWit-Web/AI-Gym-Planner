import { RedirectToSignIn, SignedIn } from '@neondatabase/neon-js/auth/react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../componets/ui/Card';
import { Select } from '../componets/ui/Select';
import { useState } from 'react';

const goalOptions = [
  { value: 'lose_weight', label: 'Lose Weight' },
  { value: 'build_muscle', label: 'Build Muscle' },
  { value: 'improve_endurance', label: 'Improve Endurance' },
  { value: 'general_fitness', label: 'General Fitness' },
  {value: 'cut', label: 'Loose body fat'},
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


  const { user } = useAuth();

  const{formData, setFormData} = useState({
    goal: '',
    experience: '',
    daysPerWeek: '',
    equipment: '',
    sessionDuration: '',
    split: '',

  });

  function updateForm(field: string, value: string){
    setFormData((prev) => ({...prev, [field]: value}));

  }


  if(!user){
    return <RedirectToSignIn></RedirectToSignIn>
  }
  return (
    <SignedIn>
      <div className='min-h-screen pt-24 pb-12 px-6'>
        <div className='max-w-xl mx-auto'>



          <Card variant='bordered'>
            <h1 className='text-2xl font-bold mb-2'>Tell us about your goals</h1>
            <p className='text-[var(--color-muted)] mb-6'>Lets create a perfect plan for you.</p>
             <form>
              <Select id="goals" 
              label='What are your goals?' 
              options={goalOptions}
              value={formData.goal}
              onChange={(e) => updateForm('goal', e.target.value)}></Select>
             </form>
          </Card>



        </div>
      </div>
    </SignedIn>
   
  )
}

export default Onboarding