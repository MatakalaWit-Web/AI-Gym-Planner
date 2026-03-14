
import { useParams } from 'react-router-dom';
import { AuthView } from '@neondatabase/neon-js/auth/react';

const Auth = () => {
  const { pathname } = useParams();
  return (
    <div className='min-h-screen pt-24 pb-12 px-6 flex items-center justify-center'>
      <AuthView pathname={pathname} /></div>
  )
}

export default Auth