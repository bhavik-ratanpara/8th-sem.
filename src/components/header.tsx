
'use client';

import { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2, Search, LogOut, User as UserIcon, ChefHat } from 'lucide-react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        isScrolled 
          ? "glass-nav h-16 shadow-lg" 
          : "bg-transparent h-24"
      )}
    >
      <div className="container mx-auto flex h-full items-center px-4 justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-primary/10 p-2.5 rounded-lg group-hover:bg-primary/20 transition-all border border-primary/20">
            <ChefHat className="h-6 w-6 text-primary" />
          </div>
          <span className="font-headline font-bold text-2xl tracking-tight hidden sm:inline-block italic">
            Cooking <span className="text-primary not-italic">Lab</span>
          </span>
        </Link>

        <div className="flex items-center space-x-8">
            {!isUserLoading && user && (
              <div className="hidden lg:block">
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <div className="relative w-full max-w-sm">
                        <form onSubmit={handleSearch}>
                            <PopoverPrimitive.Anchor asChild>
                                <Input
                                    type="search"
                                    placeholder="Search Master Tutorials..."
                                    className="pr-12 h-11 rounded-full border-border bg-card/50 focus:bg-card focus:ring-1 focus:ring-primary/30 transition-all"
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
                                className="absolute right-1 top-0 h-full w-10 hover:bg-transparent"
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin text-primary" /> : <Search className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />}
                            </Button>
                        </form>
                    </div>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] mt-3 p-2 rounded-xl shadow-2xl bg-card border-border" align="start">
                        <YoutubeSearchResults videos={videos} isLoading={isLoading} error={error} />
                    </PopoverContent>
                </Popover>
              </div>
            )}

            <nav className="flex items-center space-x-4">
              {!isUserLoading && (
                <>
                  {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-11 w-11 rounded-full ring-2 ring-primary/10 hover:ring-primary/40 transition-all">
                          <Avatar className="h-11 w-11">
                            <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'Chef'} />
                            <AvatarFallback className="bg-primary/10 text-primary font-bold">
                              {user.displayName?.charAt(0) || user.email?.charAt(0) || <UserIcon className="h-5 w-5" />}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-72 rounded-xl p-3 mt-3 bg-card border-border shadow-2xl" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal p-4">
                          <div className="flex flex-col space-y-2">
                            <p className="text-base font-bold leading-none font-headline italic">{user.displayName || 'Distinguished Chef'}</p>
                            <p className="text-xs leading-none text-muted-foreground font-mono">{user.email}</p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-border/50" />
                        <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive focus:bg-destructive/5 cursor-pointer rounded-lg p-3 transition-colors">
                          <LogOut className="mr-3 h-4 w-4" />
                          <span className="font-bold text-[10px] uppercase tracking-widest">Sign Out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <div className="flex gap-4">
                      <Button asChild variant="ghost" className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary hover:bg-transparent">
                        <Link href="/login">Chef Login</Link>
                      </Button>
                      <Button asChild variant="default" className="btn-premium h-11 bg-primary text-background shadow-primary/20">
                        <Link href="/signup">Join Academy</Link>
                      </Button>
                    </div>
                  )}
                </>
              )}
              {isUserLoading && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
            </nav>
        </div>
      </div>
    </header>
  );
}
