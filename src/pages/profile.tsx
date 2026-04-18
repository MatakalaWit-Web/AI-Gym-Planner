import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, isLoading, plan } = useAuth();

  if(!user && !isLoading){
    return (<Navigate to="/auth/sign-up" replace/>);
  }

  if(!plan){
    return (<Navigate to="/onboarding" replace/>);
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-us", {
      month: "short",
      year: "numeric",
      day: "numeric",
      minute: "2-digit",
      hour: "2-digit",
    });

  }


  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1"> Your Training Plan</h1>
            <p className="text-[var(--color-muted)]">Version {plan.version} * Created{plan.createdAt}</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile