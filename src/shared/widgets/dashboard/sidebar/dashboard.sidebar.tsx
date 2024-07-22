"use-client"
import Dashboard from "@/modules/dashboard";
import { ICONS } from "@/shared/utils/icons";
import { useUser } from "@auth0/nextjs-auth0/client"
import DashboardItems from "./dashboard.items";
import UserPlan from "./user.plan";


const DasboardSidebar = () => {
    const {user} = useUser();
  return (
    <div className="p-2">
        <div className="p-2 flex items-center bg-[#f5f5f5f5] rounded">
            <span className="text-2xl">
                {ICONS.home}
            </span>
            <h5 className="pl-2 pt-1 capitalize">{user?.nickname} Newsletter</h5>
        </div>
        <div>
            <DashboardItems />
            <UserPlan />
            <DashboardItems bottomContent = {true} />
        </div>
    </div>
  )
}

export default DasboardSidebar