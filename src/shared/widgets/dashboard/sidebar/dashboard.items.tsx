import { sideBarBottomItems, sideBarItems } from '@/app/configs/constants';
import useRouteChange from '@/shared/hooks/useRouteChange';
import { ICONS } from '@/shared/utils/icons';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'
import SidebarFotterLogo from "./sidebar.fotter.logo";



const DashboardItems = ({bottomContent}:{bottomContent?: boolean}) => {
    const { activeRoute , setActiveRoute} = useRouteChange();
    const {  user } =   useUser();
    const pathName = usePathname();
    console.log(sideBarItems);


    useEffect(() => {
      setActiveRoute(pathName);
    }, [pathName, setActiveRoute]);
    
  return (
    <>
        {!bottomContent ? (
            <>
                {sideBarItems.map((item : DashboardSideBarTypes, index: number) => {

                    return <Link
                      key={index}
                      href={item.url}
                      className="p-2 py-5 flex items-center text-black"
                    >
                      <span
                        className={`text-3xl mr-2 ${
                          item.url === activeRoute && "text-[#463bbc]"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`text-xl mr-2 ${
                          item.url === activeRoute && "text-[#463bbd]"
                        }`}
                      >
                        {item.title}
                      </span>
                    </Link>;
                })}
            </>
        ) : (
            <>
            {sideBarBottomItems.map((item : DashboardSideBarTypes , index : number) => (
                <Link
                key={index}
                className='p-2 py-5 flex items-center'
                href={item.url === "/" ? `subscribe?username=${user?.nickname}` : item.url}
                
                >
                <span
                  className={`text-3xl mr-2 ${
                    item.url === activeRoute && "text-[#463bbd]"
                  }`}
                >
                  {item.icon}
                </span>
                <span
                  className={`text-xl mr-2 ${
                    item.url === activeRoute && "text-[#463bbd]"
                  }`}
                >
                  {item.title}
                </span>

                </Link>
            ))}
            {/* sign out */}
            <a className="p-2 py-5 flex items-center cursor-pointer border-b"
            href = "/api/auth/logout"
          
          >
            <span className="text-3xl mr-2">{ICONS.logOut}</span>
            <span className="text-xl">Sign Out</span>
          </a>

           {/* footer */}
           <br />
          <br />
          <div className="w-full flex justify-center cursor-pointer">
            <SidebarFotterLogo />
          </div>
          <p className="text-sm text-center pt-5 pb-10">
            © 2024 Becodemy, Inc. All rights reserved.
          </p>
            </>
        )}
    </>
  )}


export default DashboardItems;