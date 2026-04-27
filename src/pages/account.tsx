
import { useParams } from 'react-router-dom';
import { AccountView } from '@neondatabase/neon-js/auth/react';

const Account = () => {
  const { pathname } = useParams();
  return (
    <div className='min-h-screen pt-24 pb-12 '>
      <div className='max-w-4xl mx-auto'>
        <AccountView pathname={pathname} />
      </div>
      
      </div>
  )
}

export default Account