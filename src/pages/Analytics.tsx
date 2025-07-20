import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Target,
  Activity,
  Award,
  BarChart3,
  Clock,
  Flame,
  Zap
} from 'lucide-react';
import Layout from '@/components/Layout';

const Analytics = () => {
  // Mock analytics data
  const stats = {
    totalWorkouts: 47,
    totalTime: 2840, // minutes
    avgDuration: 45,
    currentStreak: 5,
    longestStreak: 12,
    caloriesBurned: 8420,
    strengthGains: 15.2, // percentage
    weeklyGoal: 5,
    weeklyComplete: 4
  };

  const weeklyData = [
    { day: 'Mon', workouts: 1, duration: 45 },
    { day: 'Tue', workouts: 0, duration: 0 },
    { day: 'Wed', workouts: 1, duration: 50 },
    { day: 'Thu', workouts: 1, duration: 40 },
    { day: 'Fri', workouts: 0, duration: 0 },
    { day: 'Sat', workouts: 1, duration: 60 },
    { day: 'Sun', workouts: 0, duration: 0 }
  ];

  const muscleGroupData = [
    { name: 'Chest', sessions: 12, progress: 85 },
    { name: 'Back', sessions: 14, progress: 92 },
    { name: 'Legs', sessions: 10, progress: 78 },
    { name: 'Shoulders', sessions: 11, progress: 88 },
    { name: 'Arms', sessions: 13, progress: 90 },
    { name: 'Core', sessions: 8, progress: 65 }
  ];

  const recentAchievements = [
    { id: 1, title: "5-Day Streak", description: "Worked out 5 days in a row", date: "Today", type: "streak" },
    { id: 2, title: "First Pull-up", description: "Completed your first unassisted pull-up", date: "2 days ago", type: "personal-record" },
    { id: 3, title: "Squat Master", description: "Reached 200lb squat milestone", date: "1 week ago", type: "milestone" },
    { id: 4, title: "Consistency King", description: "30 days of regular workouts", date: "2 weeks ago", type: "consistency" }
  ];

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'streak': return <Flame className="h-4 w-4 text-warning" />;
      case 'personal-record': return <Award className="h-4 w-4 text-success" />;
      case 'milestone': return <Target className="h-4 w-4 text-primary" />;
      case 'consistency': return <Calendar className="h-4 w-4 text-accent" />;
      default: return <Award className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Track your progress and performance metrics
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Export Data
            </Button>
            <Button size="sm">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalWorkouts}</p>
                  <p className="text-sm text-muted-foreground">Total Workouts</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-success mr-1" />
                    <span className="text-xs text-success">+12% this month</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 bg-warning/10 rounded-xl flex items-center justify-center">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{Math.round(stats.totalTime / 60)}h</p>
                  <p className="text-sm text-muted-foreground">Total Time</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-success mr-1" />
                    <span className="text-xs text-success">+8% this month</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Flame className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.currentStreak}</p>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-muted-foreground">Best: {stats.longestStreak} days</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 bg-success/10 rounded-xl flex items-center justify-center">
                  <Zap className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.caloriesBurned}</p>
                  <p className="text-sm text-muted-foreground">Calories Burned</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-success mr-1" />
                    <span className="text-xs text-success">+15% this month</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Weekly Activity</span>
              </CardTitle>
              <CardDescription>Your workout frequency this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((day, index) => (
                  <div key={day.day} className="flex items-center space-x-4">
                    <div className="w-12 text-sm text-muted-foreground">{day.day}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <div 
                          className={`h-6 rounded-md flex items-center justify-center text-xs font-medium ${
                            day.workouts > 0 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted text-muted-foreground'
                          }`}
                          style={{ width: day.workouts > 0 ? `${Math.max(day.duration, 20)}px` : '20px' }}
                        >
                          {day.workouts > 0 ? `${day.duration}m` : ''}
                        </div>
                        {day.workouts === 0 && (
                          <span className="text-xs text-muted-foreground">Rest day</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Weekly Progress</span>
                  <span className="text-foreground font-medium">
                    {stats.weeklyComplete}/{stats.weeklyGoal} workouts
                  </span>
                </div>
                <Progress value={(stats.weeklyComplete / stats.weeklyGoal) * 100} className="mt-2" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-warning" />
                <span>Achievements</span>
              </CardTitle>
              <CardDescription>Your recent milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start space-x-3">
                    <div className="h-8 w-8 bg-muted rounded-lg flex items-center justify-center shrink-0">
                      {getAchievementIcon(achievement.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground leading-tight">
                        {achievement.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {achievement.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {achievement.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Muscle Group Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-accent" />
              <span>Muscle Group Development</span>
            </CardTitle>
            <CardDescription>Training balance and progress by muscle group</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {muscleGroupData.map((muscle) => (
                <div key={muscle.name} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-foreground">{muscle.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {muscle.sessions} sessions
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Development</span>
                      <span>{muscle.progress}%</span>
                    </div>
                    <Progress value={muscle.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <span>Performance Trends</span>
            </CardTitle>
            <CardDescription>Key performance indicators over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="h-16 w-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto">
                  <TrendingUp className="h-8 w-8 text-success" />
                </div>
                <h4 className="font-medium text-foreground">Strength Gains</h4>
                <p className="text-2xl font-bold text-success">+{stats.strengthGains}%</p>
                <p className="text-xs text-muted-foreground">vs last month</p>
              </div>
              <div className="text-center space-y-2">
                <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-medium text-foreground">Avg Duration</h4>
                <p className="text-2xl font-bold text-primary">{stats.avgDuration}min</p>
                <p className="text-xs text-muted-foreground">per workout</p>
              </div>
              <div className="text-center space-y-2">
                <div className="h-16 w-16 bg-warning/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Activity className="h-8 w-8 text-warning" />
                </div>
                <h4 className="font-medium text-foreground">Consistency</h4>
                <p className="text-2xl font-bold text-warning">94%</p>
                <p className="text-xs text-muted-foreground">workout completion</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Analytics;