import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, isLoading } = useAuth();
  const plan = false;
  if(!user && !isLoading){
    return (<Navigate to="/auth/sign-up" replace/>);
  }

  if(!plan){
    return (<Navigate to="/onboarding" replace/>);
  }

  return (
    <div>profile</div>
  )
}

export default Profile