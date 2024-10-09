"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, CheckCircle, CircleX } from "lucide-react";
import Link from "next/link";

const upcomingTasks = [
  {
    id: 1,
    title: "JavaScript Basics Quiz",
    dueDate: "2024-10-15",
    type: "Quiz",
    course: "Web Development Fundamentals",
  },
  {
    id: 2,
    title: "React Hooks Assignment",
    dueDate: "2024-10-18",
    type: "Assignment",
    course: "Advanced React",
  },
  {
    id: 3,
    title: "CSS Layout Challenge",
    dueDate: "2024-10-20",
    type: "Challenge",
    course: "CSS Mastery",
  },
  {
    id: 4,
    title: "Node.js Fundamentals Test",
    dueDate: "2024-10-22",
    type: "Test",
    course: "Backend Development",
  },
  {
    id: 5,
    title: "Database Design Project",
    dueDate: "2024-10-25",
    type: "Project",
    course: "Database Management",
  },
];

const completedTasks = [
  {
    id: 6,
    title: "HTML Structure Quiz",
    score: 9,
    type: "Quiz",
    course: "Web Development Fundamentals",
  },
  {
    id: 7,
    title: "Python Data Types Assignment",
    score: 8,
    type: "Assignment",
    course: "Python Programming",
  },
  {
    id: 8,
    title: "Responsive Design Challenge",
    score: 10,
    type: "Challenge",
    course: "CSS Mastery",
  },
  {
    id: 9,
    title: "Git Basics Test",
    score: 7,
    type: "Test",
    course: "Version Control Systems",
  },
  {
    id: 10,
    title: "Personal Portfolio Project",
    score: 3,
    type: "Project",
    course: "Web Development Portfolio",
  },
];

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    dueDate: string;
    type: string;
    course: string;
    score?: number;
  };
  isCompleted: boolean;
}

const TaskCard = ({ task, isCompleted }: TaskCardProps) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-col space-y-2 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{task.title}</CardTitle>
          <Badge variant="secondary">{task.type}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{task.course}</p>
      </CardHeader>

      <CardFooter className="flex justify-between items-center">
        {isCompleted ? (
          <>
            <div className="flex items-center text-sm text-muted-foreground">
              {(task.score ?? 0) > 5 ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Completed
                </>
              ) : (
                <>
                  <CircleX className="mr-2 h-4 w-4 text-red-500" />
                  Failed
                </>
              )}
            </div>
            <div className="text-sm font-medium">Score: {task.score}/10</div>
            <Link href={`/mytasks/${task.id}`}>
              <Button size="sm">Retry</Button>
            </Link>
          </>
        ) : (
          <>
            <div className="flex items-center text-xs font-bold text-violet-800 bg-violet-100 rounded-md py-2 px-3">
              <ClipboardList className="mr-2 h-4 w-4" />
              Due: {task.dueDate}
            </div>
            <Link href={`/mytasks/${task.id}`}>
              <Button size="sm">Start Task</Button>
            </Link>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

const MyTasksPage = () => {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-neutral-800">My Tasks</h1>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="grid gap-6 md:grid-cols-2">
              {upcomingTasks.map((task) => (
                <TaskCard key={task.id} task={task} isCompleted={false} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="completed">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="grid gap-6 md:grid-cols-2">
              {completedTasks.map((task) => (
                <TaskCard key={task.id} task={task} isCompleted={true} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyTasksPage;
