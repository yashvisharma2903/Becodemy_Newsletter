"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import {NextUIProvider} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import DashboardSidebar from "@/shared/widgets/dashboard/sidebar/dashboard.sidebar";
import { Toaster } from "react-hot-toast";
import { addStripe } from "@/actions/add.stripe";
import { useEffect } from "react";
// import { addStripe } from "@/actions/add.stripe";



interface ProviderProps{
    children : React.ReactNode;
}

export default function Providers({children}:ProviderProps){
    const pathname = usePathname();

    const { isLoading, user } = useUser();

    const isStripeCustomerIdHas = async () => {
      if (user) {
        await addStripe(user.sid as string, user.email as string);
      }
    };

    useEffect(() => {
      if (!isLoading) {
        if (user) {
          isStripeCustomerIdHas();
        }
      }

      console.log("HEELO");
    }, []);


    return (
      <NextUIProvider>
        {pathname !== "/dashboard/new-email" &&
        pathname !== "/" &&
        pathname !== "/sign-up" &&
        pathname !== "/subscribe" &&
        pathname !== "/success" &&
        pathname !== "/sign-in" ? (
          <div className="w-full flex">
            <div className="w-[290px] h-screen overflow-y-scroll">
              <DashboardSidebar />
            </div>
            {children}
          </div>
        ) : (
          <>{children}</>
        )}
        <Toaster position = "top-center" reverseOrder = {false} />
      </NextUIProvider>
    );
}