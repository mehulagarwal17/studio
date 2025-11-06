'use client';

import {
  Activity,
  Award,
  BarChart,
  BarChart3,
  BookOpen,
  BrainCircuit,
  Calendar,
  Check,
  CheckCircle,
  ChevronRight,
  Code,
  Crown,
  Dumbbell,
  Globe,
  Home,
  LayoutPanel,
  Star,
  Swords,
  Trophy,
  Zap,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const stats = [
  {
    title: 'Experience Points',
    value: '2,450 XP',
    change: '+120 This Week',
    icon: Star,
  },
  { title: 'Problems Solved', value: '47', change: '+3 This Week', icon: Code },
  { title: 'Battles Won', value: '23', change: '+2 This Week', icon: Swords },
  {
    title: 'Global Rank',
    value: '#42',
    change: '+5 This Week',
    icon: Globe,
  },
];

const recentActivity = [
  {
    icon: Trophy,
    text: 'Won battle against @alex_dev',
    time: '2m ago',
    iconColor: 'text-yellow-400',
  },
  {
    icon: CheckCircle,
    text: 'Solved "Two Sum" in Python',
    time: '1h ago',
    iconColor: 'text-green-500',
  },
  {
    icon: Star,
    text: 'Achieved 7-day streak!',
    time: '3h ago',
    iconColor: 'text-orange-400',
  },
  {
    icon: Dumbbell,
    text: 'Reached Level 12',
    time: '1d ago',
    iconColor: 'text-blue-500',
  },
  {
    icon: Calendar,
    text: 'Completed Daily Challenge',
    time: '2d ago',
    iconColor: 'text-purple-500',
  },
];

const CodingActivity = () => (
  <div className="flex flex-wrap gap-1">
    {Array.from({ length: 365 }).map((_, i) => (
      <div
        key={i}
        className={cn('h-2.5 w-2.5 rounded-sm bg-muted', {
          'bg-primary/20': Math.random() < 0.2,
          'bg-primary/40': Math.random() < 0.15,
          'bg-primary/60': Math.random() < 0.1,
          'bg-primary/80': Math.random() < 0.05,
          'bg-primary': Math.random() < 0.02,
        })}
      />
    ))}
  </div>
);

import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:px-6 sm:py-0 grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription>{stat.title}</CardDescription>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-4xl">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Progress Visualization</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-around">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Level Progress</span>
                <span className="font-semibold text-primary">Level 12</span>
              </div>
              <Progress value={81.6} aria-label="Level progress" />
              <p className="text-right text-xs text-muted-foreground mt-1">
                2,450 / 3,000 XP
              </p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Weekly Goal</span>
                <span className="font-semibold">5/7 Days</span>
              </div>
              <Progress value={71} aria-label="Weekly goal progress" />
              <p className="text-right text-xs text-muted-foreground mt-1">
                71% Complete
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center gap-4">
                <div
                  className={cn(
                    'p-2 rounded-full bg-muted',
                    activity.iconColor
                  )}
                >
                  <activity.icon className="h-5 w-5 text-background" />
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.text}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coding Activity</CardTitle>
          <CardDescription>
            Your contribution activity over the last year.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodingActivity />
        </CardContent>
      </Card>
    </div>
  );
}
