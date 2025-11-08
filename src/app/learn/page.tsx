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

const videos: Video[] = [
  {
    id: '1',
    title: 'Introduction to Big O Notation',
    description: 'Understand how to analyze the efficiency of algorithms.',
    thumbnailUrl: 'https://picsum.photos/seed/cs1/600/400',
    imageHint: 'algorithm complexity',
    category: 'Algorithms',
    duration: '12:45',
  },
  {
    id: '2',
    title: 'Mastering Linked Lists',
    description: 'A deep dive into one of the most fundamental data structures.',
    thumbnailUrl: 'https://picsum.photos/seed/cs2/600/400',
    imageHint: 'data structure',
    category: 'Data Structures',
    duration: '25:10',
  },
  {
    id: '3',
    title: 'React Hooks Explained',
    description: 'Learn how to use state and effects in modern React.',
    thumbnailUrl: 'https://picsum.photos/seed/cs3/600/400',
    imageHint: 'web development',
    category: 'Web Development',
    duration: '18:30',
  },
  {
    id: '4',
    title: 'Quick Sort vs. Merge Sort',
    description: 'A visual comparison of two classic sorting algorithms.',
    thumbnailUrl: 'https://picsum.photos/seed/cs4/600/400',
    imageHint: 'sorting algorithm',
    category: 'Algorithms',
    duration: '15:20',
  },
  {
    id: '5',
    title: 'Understanding Hash Tables',
    description:
      'Explore how key-value pairs are stored and retrieved efficiently.',
    thumbnailUrl: 'https://picsum.photos/seed/cs5/600/400',
    imageHint: 'hash table',
    category: 'Data Structures',
    duration: '22:00',
  },
  {
    id: '6',
    title: 'Building a REST API with Node.js',
    description: 'A step-by-step guide to creating your first backend service.',
    thumbnailUrl: 'https://picsum.photos/seed/cs6/600/400',
    imageHint: 'backend api',
    category: 'Web Development',
    duration: '45:50',
  },
  {
    id: '7',
    title: 'Dynamic Programming Fundamentals',
    description: 'Learn the core concepts of solving complex problems by breaking them down.',
    thumbnailUrl: 'https://picsum.photos/seed/cs7/600/400',
    imageHint: 'dynamic programming',
    category: 'Algorithms',
    duration: '35:15',
  },
  {
    id: '8',
    title: 'Binary Search Trees',
    description: 'Everything you need to know about BSTs, from insertion to traversal.',
    thumbnailUrl: 'https://picsum.photos/seed/cs8/600/400',
    imageHint: 'binary tree',
    category: 'Data Structures',
    duration: '28:40',
  },
];

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
