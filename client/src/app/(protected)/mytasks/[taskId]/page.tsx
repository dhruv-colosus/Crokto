"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Trophy, Check } from "lucide-react";
// import { mockQuestions as questions } from "@/data/mockQuestions";
import Timer from "@/components/Timer";
import Link from "next/link";
import { useQuery } from "react-query";
import { getQuiz } from "@/actions/course";

export default function QuizPage({ params }: { params: { taskId: string } }) {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const { data: quizData, isLoading } = useQuery(["quiz", params.taskId], {
    queryFn: async () => getQuiz(params.taskId),
  });

  console.log(isLoading, quizData);

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quizData!.questions.forEach((question, idx) => {
      if (answers[idx] === question.correctOption - 1) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setShowResults(true);
  };

  const isQuizComplete =
    Object.keys(answers).length === quizData?.questions.length;

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      {quizData ? (
        <div className="flex gap-4 md:gap-6">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-5xl md:text-3xl font-black  text-violet-950">
                  {quizData.course.title} Quiz
                </h1>
                <p className="text-sm md:text-light text-gray-600 mt-1">
                  Test your blockchain expertise. Score More than 50% to get
                  awarded course completion NFT.
                </p>
              </div>
              <div className="text-right">
                <span className="text-xl font-semibold text-violet-600">
                  Quiz {params.taskId}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  Questions • Multiple Choice
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {quizData.questions.map((question, idx) => (
                <Card key={idx} className="bg-white border">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base font-semibold text-gray-800">
                        Question {idx}
                      </CardTitle>
                      <span className="text-xs text-gray-500">
                        Select one answer
                      </span>
                    </div>
                    <p className="text-sm md:text-base text-gray-700 mt-2">
                      {question.question}
                    </p>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <RadioGroup
                      onValueChange={(value) =>
                        handleAnswerSelect(idx, parseInt(value))
                      }
                      value={answers[idx]?.toString()}
                      className="grid grid-cols-1 md:grid-cols-2 gap-3"
                    >
                      {question.options.map((option, index) => (
                        <div key={index} className="relative">
                          <RadioGroupItem
                            value={index.toString()}
                            id={`q${question.id}-${index}`}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={`q${question.id}-${index}`}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer border-2 border-gray-200 
                            hover:bg-violet-50 hover:border-violet-200 
                            peer-data-[state=checked]:border-violet-500 
                            peer-data-[state=checked]:bg-violet-50
                            transition-all duration-200"
                          >
                            <span className="text-sm peer-data-[state=checked]:text-violet-700">
                              {option}
                            </span>
                            <div className="hidden peer-data-[state=checked]:block">
                              <Check className="h-4 w-4 text-violet-600" />
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <Button
                onClick={calculateScore}
                disabled={!isQuizComplete}
                className="px-6 py-2 text-base bg-violet-600 hover:bg-violet-700"
              >
                Submit Quiz
              </Button>
            </div>
          </div>

          <div className="sticky top-4">
            <Timer />
          </div>
        </div>
      ) : (
        "Loading quiz..."
      )}

      <AlertDialog open={showResults} onOpenChange={setShowResults}>
        <AlertDialogContent className="bg-white border max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-4xl font-black text-center mb-3">
              Quiz Results
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center py-3">
              {score > 5 ? (
                <div className="space-y-3">
                  <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
                  <p className="text-xl font-semibold text-gray-800">
                    Congratulations! You scored {score}/{quizData?.questions.length}
                  </p>
                  <p className="text-sm text-violet-800 font-medium">
                    You've earned an NFT! Check "My Courses" tab to view your
                    NFT.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xl font-semibold text-gray-800">
                    You scored {score}/10
                  </p>
                  <p className="text-sm text-violet-600 font-medium">
                    Keep learning and try again tomorrow!
                  </p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-between">
            {score > 5 && (
              <Link href="/mycourses">
                <Button className="bg-violet-700 text-sm">View NFT</Button>
              </Link>
            )}
            <AlertDialogAction className="bg-violet-600 hover:bg-violet-700 text-sm">
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
