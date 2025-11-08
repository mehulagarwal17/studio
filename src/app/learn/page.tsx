'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { VideoCard, Video } from '@/components/learn/video-card';
import { LayoutGrid } from 'lucide-react';
import { videos as videoData } from '@/lib/placeholder-images';

const videos: Video[] = videoData;

export default function LearnPage() {
  const [filter, setFilter] = useState('All');

  const filteredVideos =
    filter === 'All'
      ? videos
      : videos.filter((video) => video.category === filter);

  const categories = ['All', ...Array.from(new Set(videos.map((v) => v.category)))];

  return (
    <div className="p-4 sm:px-6 sm:py-0">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
            <LayoutGrid className="h-8 w-8" />
            Learning Library
        </h1>
        <p className="text-muted-foreground mt-2">
          Browse videos on key computer science and development topics.
        </p>
      </header>

      <div className="mb-6 flex justify-end">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
