"use client";
import React from "react";

import {

  Upload,
  LogOutIcon,

  LayoutDashboardIcon,

  PencilRulerIcon,
 
  Rows4,

  Pen,
  BadgeCheck,
} from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import { signOut, useSession } from "next-auth/react";
import { getEmail,setEmail  } from "@/app/libs/myeail";

const Admin_navbar = () => {
  const { data: session } = useSession();
  let userEmail=getEmail()
  const handleSignOut = async () => {
    const data = await signOut({ redirect: true, callbackUrl: '/' })

  }


  return (
    <div>
      <div className="h-screen bg-white shadow text-center">
        <h1 className=" text-2xl">Admin Panel</h1>

        <Sidebar
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              backgroundColor: "#ffffff",
            },
          }}
        >
          <Menu className="mt-10 text-gray-600 h-full">
            <MenuItem
              icon={<LayoutDashboardIcon />}
              component={<Link href="/Admin/dashboard/main" />}
            >
              Dashboard
            </MenuItem>
            <hr />

            <MenuItem
              icon={<Rows4 />}
              component={
                <Link href={"/Admin/dashboard/product/displayproduct"} />
              }
            >
              Services
            </MenuItem>

            <hr />

            <MenuItem
              icon={<Upload />}
              component={<Link href="/Admin/dashboard/upload" />}
            >
              Question Bank
            </MenuItem>

            <hr />
            <SubMenu
              label="Create Assessment"
              icon={<PencilRulerIcon />}
              component={<Link href="/Admin/dashboard/assessment/" />}
            >
              <hr />
              <MenuItem
                icon={<Pen />}
                component={<Link href="/Admin/dashboard/Editassessment/" />}
              >
                Edit Assessment
              </MenuItem>
            </SubMenu>
            <hr />
            <MenuItem
              icon={<BadgeCheck />}
              component={<Link href="/Admin/dashboard/payments" />}
             
            >
              Verify Payments
            </MenuItem>
            <hr />
            <MenuItem
              icon={<LogOutIcon />}
              component={<Link href="/" />}
              onClick={handleSignOut}
            >
              Logout
            </MenuItem>
          </Menu>
          <hr />
        </Sidebar>
      </div>
    </div>
  );
};

export default Admin_navbar;
