import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import {
  BookOpen,
  Trophy,
  Clock,
  Calendar,
  BarChart3,
  Medal,
  Rocket,
} from "lucide-react";
import ChartComponent from "@/components/ActivityChart";

interface NFT {
  tokenId: string;
  imageUrl: string;
}

interface Course {
  id: string;
  title: string;
  progress: number;
  lastAccessed: string;
  nft: NFT;
  totalHours: number;
  completedHours: number;
  instructor: string;
}

export default function MyCourses() {
  const ongoingCourses: Course[] = [
    {
      id: "1",
      title: "Advanced Ethereum Development",
      progress: 65,
      lastAccessed: "2 hours ago",
      nft: {
        tokenId: "#8234",
        imageUrl: "/api/placeholder/400/400",
      },
      totalHours: 32,
      completedHours: 20.8,
      instructor: "Alex Thompson",
    },
    {
      id: "2",
      title: "Begineer Rust Development",
      progress: 35,
      lastAccessed: "51 hours ago",
      nft: {
        tokenId: "#8254",
        imageUrl: "/api/placeholder/400/400",
      },
      totalHours: 32,
      completedHours: 20.8,
      instructor: "Alex Thompson",
    },
  ];

  const completedCourses: Course[] = [
    {
      id: "2",
      title: "Web3 Fundamentals",
      progress: 100,
      lastAccessed: "Completed on Mar 15, 2024",
      nft: {
        tokenId: "#7219",
        imageUrl: "/api/placeholder/400/400",
      },
      totalHours: 28,
      completedHours: 28,
      instructor: "Sarah Chen",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 space-y-8">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold mb-2">
                    Welcome back, Dhruv Deora!
                  </h1>
                  <p className="opacity-90">Continue your learning journey</p>
                </div>
                <Trophy className="w-12 h-12 opacity-80" />
              </div>
            </div>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Ongoing Courses
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {ongoingCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <CardContent className="p-4  ">
                      <div className=" flex flex-col justify-between gap-4">
                        <div className="relative w-24 h-24">
                          <img
                            src="/images/authwall.jpg"
                            alt={`NFT ${course.nft.tokenId}`}
                            className="rounded-lg object-cover w-full h-full"
                          />
                          <Badge className="absolute -top-2 -right-2 bg-purple-100 text-purple-700">
                            NFT {course.nft.tokenId}
                          </Badge>
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{course.title}</h3>
                          <div className="space-y-3">
                            <Progress value={course.progress} className="h-2" />
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>{course.progress}% complete</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {course.completedHours}/{course.totalHours}h
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Medal className="w-5 h-5" />
                  Completed Courses
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {completedCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative w-24 h-24">
                          <img
                            src="/images/authwall.jpg"
                            alt={`Certificate NFT ${course.nft.tokenId}`}
                            className="rounded-lg object-cover w-full h-full"
                          />
                          <Badge className="absolute -top-2 -right-2 bg-green-100 text-green-700">
                            CERT #{course.nft.tokenId}
                          </Badge>
                        </div>

                        {/* Course Info */}
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{course.title}</h3>
                          <div className="space-y-2">
                            <Badge className="bg-green-100 text-green-700">
                              Completed
                            </Badge>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {course.lastAccessed}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - Right Section */}
          <div className="lg:w-1/3 space-y-6">
            {/* Learning Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Learning Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartComponent />
              </CardContent>
            </Card>

            {/* Achievements Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="font-bold text-2xl">24</div>
                    <div className="text-sm text-gray-600">Hours Learned</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Medal className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-bold text-2xl">3</div>
                    <div className="text-sm text-gray-600">Certificates</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
