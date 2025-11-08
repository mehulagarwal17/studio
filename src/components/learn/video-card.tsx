'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';
import Link from 'next/link';

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  imageHint: string;
  category: string;
  duration: string;
  url: string;
}

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link href={video.url} target="_blank" rel="noopener noreferrer" className="group">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10">
        <CardHeader className="p-0 relative">
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={video.thumbnailUrl}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={video.imageHint}
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute top-2 right-2">
              <Badge variant="secondary">{video.duration}</Badge>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayCircle className="h-16 w-16 text-white/80" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-1">
          <h3 className="font-semibold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {video.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Badge variant="outline">{video.category}</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
