import React from 'react';
import Button from '../shared/button'; // Update with your actual Button component path
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '../shared/avatar';
import { LogOut, User } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useAuth } from '../../context/auth-context';
import default_avatar from '../../assets/default_avatar.jpg';
import logo from '../../assets/logo.svg';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userInfo, updateAfterLogout } = useAuth();
  //console.log(isAuthenticated,userInfo);
  return (
    <header className="sticky z-[1000] top-0 z-50 w-full bg-[#032541] text-white">
      <div className="container flex h-16 items-center justify-between px-10">
        <div className="flex items-center gap-8">
          {/* Your content for left section if needed */}
          <Link to="/tmdb-frontend" className="flex items-center">
            <img src={logo} width={154} height={20}></img>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          {!isAuthenticated ? (
            <>
              <Button variant="ghost" className="h-8 mb-2 px-0 text-[15px] font-semibold hover:text-[#01b4e4]">
                <Link to="/tmdb-frontend/login">Login</Link>
              </Button>
              <Button variant="ghost" className="h-8 mb-2 px-0 text-[15px] font-semibold hover:text-[#01b4e4]">
                <Link to="/tmdb-frontend/register">Sign up</Link>
              </Button>
            </>
          ) : (
            <>
              <DropdownMenu.Root>
                {/* Dropdown Trigger */}

                <DropdownMenu.Trigger asChild>
                  <button className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      {userInfo?.profile == null ? (
                        <AvatarImage src={default_avatar} alt="User" />
                      ) : (
                        <AvatarImage src={userInfo?.profile} alt="User" />
                      )}

                      <AvatarFallback>MH</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenu.Trigger>

                {/* Dropdown Content */}
                <DropdownMenu.Content
                  align="end"
                  sideOffset={5}
                  className="w-56 p-2 bg-black text-white shadow-lg rounded-lg z-50"
                  style={{
                    borderRadius: '12px', // Rounded corners
                  }}
                >
                  {/* User Information */}
                  <DropdownMenu.DropdownMenuLabel>
                    <div className="flex flex-col space-y-1 px-3 py-2">
                      <p className="text-sm font-medium leading-none">{userInfo?.username}</p>
                      <p className="text-xs leading-none text-muted-foreground">{userInfo?.email}</p>
                    </div>
                  </DropdownMenu.DropdownMenuLabel>
                  <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />

                  {/* Dropdown Actions */}
                  <DropdownMenu.Item className="flex items-center px-3 py-2 cursor-pointer rounded">
                    <User className="mr-2 h-4 w-4" />
                    <span
                      onClick={() => {
                        navigate('/profile');
                      }}
                    >
                      View profile
                    </span>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
                  <DropdownMenu.Item className="flex items-center px-3 py-2 cursor-pointer rounded">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span onClick={updateAfterLogout}>Log out</span>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
