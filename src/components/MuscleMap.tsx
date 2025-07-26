import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  RotateCcw
} from 'lucide-react';

interface MuscleGroup {
  id: string;
  name: string;
  status: 'worked' | 'rest' | 'missed' | 'active';
  lastWorked: string;
  intensity: number;
  position: { x: number; y: number; width: number; height: number };
}

const MuscleMap = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | null>(null);
  const [viewMode, setViewMode] = useState<'front' | 'back'>('front');

  const frontMuscles: MuscleGroup[] = [
    { id: 'chest', name: 'Chest', status: 'worked', lastWorked: '1 day ago', intensity: 85, position: { x: 42, y: 25, width: 16, height: 12 } },
    { id: 'shoulders', name: 'Shoulders', status: 'rest', lastWorked: '2 days ago', intensity: 70, position: { x: 35, y: 20, width: 30, height: 8 } },
    { id: 'biceps', name: 'Biceps', status: 'active', lastWorked: 'Today', intensity: 90, position: { x: 25, y: 30, width: 8, height: 15 } },
    { id: 'triceps', name: 'Triceps', status: 'missed', lastWorked: '5 days ago', intensity: 45, position: { x: 67, y: 30, width: 8, height: 15 } },
    { id: 'abs', name: 'Abs', status: 'worked', lastWorked: '1 day ago', intensity: 75, position: { x: 44, y: 40, width: 12, height: 20 } },
    { id: 'quads', name: 'Quadriceps', status: 'rest', lastWorked: '3 days ago', intensity: 80, position: { x: 38, y: 65, width: 24, height: 25 } },
    { id: 'calves', name: 'Calves', status: 'missed', lastWorked: '6 days ago', intensity: 30, position: { x: 40, y: 92, width: 20, height: 8 } }
  ];

  const backMuscles: MuscleGroup[] = [
    { id: 'traps', name: 'Trapezius', status: 'worked', lastWorked: 'Today', intensity: 95, position: { x: 40, y: 18, width: 20, height: 12 } },
    { id: 'lats', name: 'Latissimus', status: 'active', lastWorked: 'Today', intensity: 88, position: { x: 35, y: 30, width: 30, height: 20 } },
    { id: 'rhomboids', name: 'Rhomboids', status: 'rest', lastWorked: '2 days ago', intensity: 65, position: { x: 44, y: 25, width: 12, height: 15 } },
    { id: 'lower-back', name: 'Lower Back', status: 'missed', lastWorked: '7 days ago', intensity: 40, position: { x: 42, y: 50, width: 16, height: 15 } },
    { id: 'glutes', name: 'Glutes', status: 'worked', lastWorked: '1 day ago', intensity: 82, position: { x: 40, y: 60, width: 20, height: 12 } },
    { id: 'hamstrings', name: 'Hamstrings', status: 'rest', lastWorked: '3 days ago', intensity: 70, position: { x: 38, y: 72, width: 24, height: 18 } }
  ];

  const currentMuscles = viewMode === 'front' ? frontMuscles : backMuscles;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'worked': return 'hsl(var(--success))';
      case 'active': return 'hsl(var(--primary))';
      case 'rest': return 'hsl(var(--warning))';
      case 'missed': return 'hsl(var(--destructive))';
      default: return 'hsl(var(--muted))';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'worked': return <CheckCircle className="h-3 w-3" />;
      case 'active': return <Activity className="h-3 w-3" />;
      case 'rest': return <Clock className="h-3 w-3" />;
      case 'missed': return <AlertTriangle className="h-3 w-3" />;
      default: return <User className="h-3 w-3" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'worked': return 'Recently Worked';
      case 'active': return 'Currently Active';
      case 'rest': return 'Needs Rest';
      case 'missed': return 'Needs Attention';
      default: return 'Unknown';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span>Muscle Map Analysis</span>
            </CardTitle>
            <CardDescription>
              Interactive body map showing muscle group status and recovery needs
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'front' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('front')}
            >
              Front
            </Button>
            <Button
              variant={viewMode === 'back' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('back')}
            >
              Back
            </Button>
            <Button variant="outline" size="sm">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Muscle Map Visualization */}
          <div className="lg:col-span-2">
            <div className="relative bg-muted/30 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
              <div className="relative w-64 h-96">
                {/* Human Body Outline */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full absolute inset-0"
                  style={{ filter: 'drop-shadow(0 4px 8px hsl(var(--muted-foreground) / 0.1))' }}
                >
                  {/* Body outline */}
                  <path
                    d="M35 15 Q50 12 65 15 L68 25 Q65 35 62 40 L65 45 Q68 55 65 65 L62 75 Q58 85 50 95 Q42 85 38 75 L35 65 Q32 55 35 45 L38 40 Q35 35 32 25 Z"
                    fill="hsl(var(--muted))"
                    stroke="hsl(var(--border))"
                    strokeWidth="0.5"
                  />
                  
                  {/* Head */}
                  <circle cx="50" cy="10" r="8" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.5" />
                  
                  {/* Arms */}
                  <path
                    d="M32 25 Q25 30 20 40 Q18 50 22 60 L25 65"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M68 25 Q75 30 80 40 Q82 50 78 60 L75 65"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  
                  {/* Legs */}
                  <path
                    d="M42 95 Q40 85 38 75 Q36 65 38 55"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <path
                    d="M58 95 Q60 85 62 75 Q64 65 62 55"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Muscle Group Overlays */}
                {currentMuscles.map((muscle) => (
                  <div
                    key={muscle.id}
                    className="absolute cursor-pointer transform transition-all duration-200 hover:scale-110"
                    style={{
                      left: `${muscle.position.x}%`,
                      top: `${muscle.position.y}%`,
                      width: `${muscle.position.width}%`,
                      height: `${muscle.position.height}%`,
                    }}
                    onClick={() => setSelectedMuscle(muscle)}
                  >
                    <div
                      className="w-full h-full rounded-lg opacity-70 hover:opacity-90 border-2 border-background"
                      style={{
                        backgroundColor: getStatusColor(muscle.status),
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-background text-xs font-medium text-center leading-tight">
                        {muscle.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-sm text-muted-foreground">Recently Worked</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Currently Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-warning" />
                <span className="text-sm text-muted-foreground">Needs Rest</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <span className="text-sm text-muted-foreground">Needs Attention</span>
              </div>
            </div>
          </div>

          {/* Muscle Details Panel */}
          <div className="space-y-4">
            {selectedMuscle ? (
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{selectedMuscle.name}</h3>
                    <Badge 
                      variant="secondary"
                      className="flex items-center space-x-1"
                    >
                      {getStatusIcon(selectedMuscle.status)}
                      <span>{getStatusLabel(selectedMuscle.status)}</span>
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Last Worked:</span>
                      <p className="text-sm font-medium text-foreground">{selectedMuscle.lastWorked}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm text-muted-foreground">Training Intensity:</span>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${selectedMuscle.intensity}%`,
                              backgroundColor: getStatusColor(selectedMuscle.status),
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground">{selectedMuscle.intensity}%</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button size="sm" className="w-full">
                        View Workout History
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <User className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Click on a muscle group to view detailed analysis</p>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-success/10 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Worked</p>
                <p className="text-lg font-semibold text-success">
                  {currentMuscles.filter(m => m.status === 'worked').length}
                </p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Active</p>
                <p className="text-lg font-semibold text-primary">
                  {currentMuscles.filter(m => m.status === 'active').length}
                </p>
              </div>
              <div className="p-3 bg-warning/10 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Rest</p>
                <p className="text-lg font-semibold text-warning">
                  {currentMuscles.filter(m => m.status === 'rest').length}
                </p>
              </div>
              <div className="p-3 bg-destructive/10 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Missed</p>
                <p className="text-lg font-semibold text-destructive">
                  {currentMuscles.filter(m => m.status === 'missed').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MuscleMap;