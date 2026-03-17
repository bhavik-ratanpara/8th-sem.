'use client';

import { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2, Search, LogOut, User as UserIcon, ChefHat, Menu } from 'lucide-react';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { YoutubeSearchResults, type YouTubeVideo } from './youtube-search-results';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import * as PopoverPrimitive from "@radix-ui/react-popover";

export function Header() {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setVideos([]);
    setPopoverOpen(true);

    try {
      const response = await fetch(`/api/youtube?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }
      const data = await response.json();
      setVideos(data.items || []);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch tutorials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-background border-b border-border h-16">
      <div className="max-content flex h-full items-center px-4 justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ChefHat className="h-5 w-5 text-primary" />
          <span className="font-semibold text-lg tracking-tight">
            Cooking Lab
          </span>
        </Link>

        <div className="flex items-center space-x-6">
            {!isUserLoading && user && (
              <div className="hidden md:block">
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <div className="relative w-full max-w-sm">
                        <form onSubmit={handleSearch}>
                            <PopoverPrimitive.Anchor asChild>
                                <Input
                                    type="search"
                                    placeholder="Search tutorials..."
                                    className="pr-10 h-9 bg-secondary border-none"
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        if(!e.target.value.trim()){
                                            setPopoverOpen(false);
                                        }
                                    }}
                                />
                            </PopoverPrimitive.Anchor>
                            <Button
                                type="submit"
                                size="icon"
                                variant="ghost"
                                className="absolute right-0 top-0 h-full w-9"
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Search className="h-4 w-4 text-muted-foreground" />}
                            </Button>
                        </form>
                    </div>
                    <PopoverContent className="w-[400px] mt-2 p-0 rounded-lg shadow-lg" align="end">
                        <YoutubeSearchResults videos={videos} isLoading={isLoading} error={error} />
                    </PopoverContent>
                </Popover>
              </div>
            )}

            <nav className="flex items-center space-x-4">
              {!isUserLoading && (
                <>
                  {user ? (
                    <div className="flex items-center gap-4">
                      <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block">Dashboard</Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                              <AvatarFallback className="text-xs">
                                {user.displayName?.charAt(0) || user.email?.charAt(0) || <UserIcon className="h-4 w-4" />}
                              </AvatarFallback>
                            </Avatar>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end">
                          <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                              <p className="text-sm font-medium">{user.displayName || 'Chef'}</p>
                              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                            </div>
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Sign Out</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button asChild variant="ghost" size="sm" className="font-medium">
                        <Link href="/login">Sign In</Link>
                      </Button>
                      <Button asChild size="sm" className="font-medium bg-primary text-primary-foreground">
                        <Link href="/signup">Get Started</Link>
                      </Button>
                    </div>
                  )}
                </>
              )}
              {isUserLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            </nav>
        </div>
      </div>
    </header>
  );
}