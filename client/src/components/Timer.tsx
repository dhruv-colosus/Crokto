"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
const Timer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Card className="h-[200px] w-[300px] flex flex-col items-center justify-center bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-md font-medium text-gray-600">
          Time Remaining
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="text-6xl font-bold text-gray-800">
          {`${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`}
        </div>
      </CardContent>
    </Card>
  );
};

export default Timer;
