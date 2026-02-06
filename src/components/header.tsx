'use client';

import { useState } from 'react';
import { Icons } from './icons';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2, Search } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { YoutubeSearchResults, type YouTubeVideo } from './youtube-search-results';

export function Header() {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

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
      setError(e.message || 'Failed to fetch videos.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Icons.Logo className="h-6 w-6 mr-2" />
          <span className="font-bold">Cooking Lab</span>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <div className="relative w-full max-w-sm">
                    <form onSubmit={handleSearch}>
                        <PopoverTrigger asChild>
                            <Input
                                type="search"
                                placeholder="Search for recipe videos..."
                                className="pr-10"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    if(!e.target.value.trim()){
                                        setPopoverOpen(false);
                                    }
                                }}
                            />
                        </PopoverTrigger>
                        <Button
                            type="submit"
                            size="icon"
                            variant="ghost"
                            className="absolute right-0 top-0 h-full w-10"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                        </Button>
                    </form>
                </div>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] mt-2 p-2" align="start">
                    <YoutubeSearchResults videos={videos} isLoading={isLoading} error={error} />
                </PopoverContent>
            </Popover>
        </div>
      </div>
    </header>
  );
}
