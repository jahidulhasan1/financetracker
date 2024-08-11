import { useUser } from "@clerk/clerk-react";
import DashboardForm from "./DashboardForm";
import DashboardList from "./DashboardList";

export const Dashboard = () => {
const {user}=useUser()
  return (
    <div className="w-full mx-auto max-w-[1000px] p-10 h-[40rem] text-center ">
      <h3 className="text-2xl w-[100%] sm:text-3xl  mb-6">Welcome {user?.firstName } ! to The Finance App </h3>
      <DashboardForm />
      <DashboardList />
    </div>
  );
};
