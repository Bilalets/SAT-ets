'use client';
import {
  BarChart3,
  Component,
  CircleUser,
  Info,
  LayoutDashboard,
  LogOutIcon,
  BookOpenCheck,
  Users,
  ScanEye,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from 'react-pro-sidebar';

const SuperAdminNavbar = () => {
  
  const handleSignOut = async () => {
    const data = await signOut({ redirect: true, callbackUrl: '/' })
    
  

  }
  return (
    <div className="h-screen bg-white shadow">
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: '#ffffff',
          },
        }}
      >
        <Menu className="mt-10 text-gray-600 h-full">
          <SubMenu
            icon={<LayoutDashboard />}
            label="Dashboard"
            defaultOpen={false}
          >
            <hr />
            <MenuItem
              icon={<BarChart3 />}
              component={<Link href="/superadmin/dashboard/statistics" />}
            >
              Statistics
            </MenuItem>
            <hr />
            <MenuItem
              icon={<Info />}
              component={<Link href="/superadmin/dashboard/informative" />}
            >
              Informative
            </MenuItem>
            <hr />
          </SubMenu>

          <hr />
          <MenuItem
            icon={<Component />}
            component={<Link href="/superadmin/subjects" />}
          >
            Subjects
          </MenuItem>
          <hr />
          <MenuItem
            icon={<Users />}
            component={<Link href="/superadmin/experts" />}
          >
            Experts
          </MenuItem>
          <hr />

          <MenuItem
            icon={<BookOpenCheck />}
            component={<Link href="/superadmin/subjects" />}
          >
            Assessments
          </MenuItem>
          <hr />
          <MenuItem
            icon={<ScanEye />}
            component={<Link href="/superadmin/assessments" />}
          >
            Categories
          </MenuItem>
          <hr />
          <MenuItem
            icon={<Users />}
            component={<Link href="/superadmin/categories" />}
          >
            Applicants
          </MenuItem>
          <hr />

          <MenuItem icon={<LogOutIcon />}  onClick={handleSignOut}>
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SuperAdminNavbar;
