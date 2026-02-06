import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Video } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export type YouTubeVideo = {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
};

type YoutubeSearchResultsProps = {
  videos: YouTubeVideo[];
  isLoading: boolean;
  error: string | null;
};

const VideoSkeleton = () => (
  <div className="flex items-center gap-4 p-2">
    <Skeleton className="h-[90px] w-[120px] rounded" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-4 w-32" />
    </div>
  </div>
);

export function YoutubeSearchResults({ videos, isLoading, error }: YoutubeSearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <VideoSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Search Failed</AlertTitle>
            <AlertDescription>
                {error}
            </AlertDescription>
        </Alert>
    );
  }

  if (videos.length === 0) {
    return (
        <div className="text-center text-sm text-muted-foreground py-8">
            <Video className="mx-auto h-8 w-8 mb-2"/>
            <p>Search for a recipe to see YouTube videos here.</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {videos.map(video => (
        <a
          key={video.id.videoId}
          href={`https://www.youtube.com/watch?v=${video.id.videoId}&autoplay=1`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-accent transition-colors"
        >
          <Image
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            width={120}
            height={90}
            className="rounded-md object-cover"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-sm line-clamp-2">{video.snippet.title}</h4>
            <p className="text-xs text-muted-foreground">{video.snippet.channelTitle}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
