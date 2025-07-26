import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, 
  MessageSquare, 
  Send,
  Upload,
  FileJson,
  Sparkles,
  TrendingUp,
  Target,
  Zap,
  Activity,
  Bot,
  User as UserIcon,
  Download,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import Layout from '@/components/Layout';
import MuscleMap from '@/components/MuscleMap';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIAnalytics = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your AI workout coach. I can help analyze your fitness data, suggest improvements, and answer questions about your training. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [importData, setImportData] = useState('');
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // AI Insights (mock data)
  const aiInsights = [
    {
      id: 1,
      title: "Optimal Rest Day",
      insight: "Based on your training intensity, consider adding one more rest day per week to maximize recovery.",
      confidence: 92,
      type: "recovery",
      action: "Schedule rest day"
    },
    {
      id: 2,
      title: "Strength Plateau",
      insight: "Your bench press has plateaued. Try incorporating tempo work and pause reps to break through.",
      confidence: 87,
      type: "performance",
      action: "Modify program"
    },
    {
      id: 3,
      title: "Cardio Balance",
      insight: "Your cardio-to-strength ratio is optimal for muscle building goals. Keep the current balance.",
      confidence: 94,
      type: "balance",
      action: "Maintain current"
    },
    {
      id: 4,
      title: "Progressive Overload",
      insight: "You're ready to increase weights on squats and deadlifts by 5-10 lbs based on your recent performance.",
      confidence: 89,
      type: "progression",
      action: "Increase load"
    }
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'recovery': return <Target className="h-4 w-4" />;
      case 'performance': return <TrendingUp className="h-4 w-4" />;
      case 'balance': return <Activity className="h-4 w-4" />;
      case 'progression': return <Zap className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-success';
    if (confidence >= 80) return 'text-warning';
    return 'text-muted-foreground';
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: newMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your recent workouts, I recommend increasing your protein intake to support muscle recovery. Aim for 1.6-2.2g per kg of body weight.",
        "Your workout consistency is excellent! To optimize results, consider periodizing your training with deload weeks every 4-6 weeks.",
        "I notice you're doing a lot of isolation exercises. Adding more compound movements like squats, deadlifts, and pull-ups could improve your overall strength gains.",
        "Your sleep data shows you're averaging 6.5 hours. For optimal recovery and performance, aim for 7-9 hours of quality sleep per night.",
        "Great question! Based on your goals and current progress, I suggest adjusting your training split to focus more on your weaker muscle groups."
      ];

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleImportData = () => {
    try {
      JSON.parse(importData);
      setImportStatus('success');
      setTimeout(() => setImportStatus('idle'), 3000);
    } catch (error) {
      setImportStatus('error');
      setTimeout(() => setImportStatus('idle'), 3000);
    }
  };

  const suggestedQuestions = [
    "How can I improve my squat form?",
    "What's the best recovery strategy?",
    "Should I add more cardio?",
    "How to break through plateaus?"
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Brain className="h-8 w-8 text-primary" />
              AI Analytics & Coach
            </h1>
            <p className="text-muted-foreground">
              Get AI-powered insights and personalized coaching
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button size="sm">
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Insights
            </Button>
          </div>
        </div>

        {/* Muscle Map */}
        <MuscleMap />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Insights */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span>AI Insights</span>
                </CardTitle>
                <CardDescription>
                  Personalized recommendations based on your training data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiInsights.map((insight) => (
                  <div key={insight.id} className="p-4 border border-border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          {getInsightIcon(insight.type)}
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{insight.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-muted-foreground">Confidence:</span>
                            <span className={`text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
                              {insight.confidence}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        {insight.action}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {insight.insight}
                    </p>
                    <Progress value={insight.confidence} className="h-1" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Data Import Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileJson className="h-5 w-5 text-accent" />
                  <span>Data Import</span>
                </CardTitle>
                <CardDescription>
                  Import your fitness data from DEXA scans, wearables, or other sources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    JSON Data
                  </label>
                  <Textarea
                    placeholder='Paste your JSON data here... Example: {"bodyFat": 15.2, "muscleMass": 68.5, "boneDensity": 1.15}'
                    value={importData}
                    onChange={(e) => setImportData(e.target.value)}
                    rows={6}
                    className="font-mono text-sm"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button onClick={handleImportData} disabled={!importData.trim()}>
                      <Upload className="mr-2 h-4 w-4" />
                      Import Data
                    </Button>
                    {importStatus === 'success' && (
                      <div className="flex items-center space-x-1 text-success">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Data imported successfully</span>
                      </div>
                    )}
                    {importStatus === 'error' && (
                      <div className="flex items-center space-x-1 text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Invalid JSON format</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="text-sm font-medium text-foreground mb-2">Supported Data Sources</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">DEXA Scan</Badge>
                    <Badge variant="secondary">InBody</Badge>
                    <Badge variant="secondary">Apple Health</Badge>
                    <Badge variant="secondary">Fitbit</Badge>
                    <Badge variant="secondary">Garmin</Badge>
                    <Badge variant="secondary">MyFitnessPal</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Chat */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-primary" />
                <span>AI Workout Coach</span>
              </CardTitle>
              <CardDescription>
                Chat with your personal AI fitness coach
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Chat Messages */}
              <div className="h-80 overflow-y-auto space-y-3 p-1">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-2 ${
                      message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}>
                      {message.role === 'user' ? (
                        <UserIcon className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    <div className={`flex-1 space-y-1 ${
                      message.role === 'user' ? 'text-right' : ''
                    }`}>
                      <div className={`inline-block p-3 rounded-lg text-sm max-w-[85%] ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}>
                        {message.content}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start space-x-2">
                    <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Suggested Questions */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Suggested questions:</p>
                <div className="flex flex-wrap gap-1">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => setNewMessage(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask your AI coach..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isLoading}
                />
                <Button 
                  size="sm" 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isLoading}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AIAnalytics;