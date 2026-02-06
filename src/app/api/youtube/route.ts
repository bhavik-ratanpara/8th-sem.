'use server';

import {NextResponse} from 'next/server';
import {PlaceHolderImages} from '@/lib/placeholder-images';

// This is mock data. In a real application, you would fetch this from the YouTube API.
const mockVideos = [
  {
    id: {videoId: 'mock-video-1'},
    snippet: {
      title: 'Amazing Recipe Video',
      channelTitle: 'Chef John',
      thumbnails: {
        medium: {
          url: PlaceHolderImages[0]?.imageUrl || 'https://placehold.co/320x180',
        },
      },
    },
  },
  {
    id: {videoId: 'mock-video-2'},
    snippet: {
      title: 'The Best Way to Cook',
      channelTitle: 'Food Wishes',
      thumbnails: {
        medium: {
          url: PlaceHolderImages[1]?.imageUrl || 'https://placehold.co/320x180',
        },
      },
    },
  },
  {
    id: {videoId: 'mock-video-3'},
    snippet: {
      title: 'Quick & Easy Dinner',
      channelTitle: 'Pro Home Cooks',
      thumbnails: {
        medium: {
          url: PlaceHolderImages[2]?.imageUrl || 'https://placehold.co/320x180',
        },
      },
    },
  },
  {
    id: {videoId: 'mock-video-4'},
    snippet: {
      title: 'Learn to Cook Like a Pro',
      channelTitle: 'Gordon Ramsay',
      thumbnails: {
        medium: {
          url: PlaceHolderImages[3]?.imageUrl || 'https://placehold.co/320x180',
        },
      },
    },
  },
  {
    id: {videoId: 'mock-video-5'},
    snippet: {
      title: 'Secret Family Recipe',
      channelTitle: 'Joshua Weissman',
      thumbnails: {
        medium: {
          url: PlaceHolderImages[4]?.imageUrl || 'https://placehold.co/320x180',
        },
      },
    },
  },
];

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      {error: 'Query parameter "q" is required.'},
      {status: 400}
    );
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In a real app, you would replace this with a call to the YouTube Data API v3.
  // Example endpoint:
  // `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${query}&type=video&key=YOUR_API_KEY`
  const results = mockVideos.map(video => ({
    ...video,
    snippet: {
      ...video.snippet,
      title: `How to make ${query} - ${video.snippet.channelTitle}`,
    },
  }));

  return NextResponse.json({items: results});
}
