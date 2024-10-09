// app/course/[courseId]/page.tsx

import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  Users,
  Star,
  BookOpen,
  Share2,
  Award,
  CheckCircle2,
  Globe,
} from "lucide-react";
import { AvatarIcon } from "@radix-ui/react-icons";
import ReviewSection from "@/components/ReviewSection";
import { getCourse } from "@/actions/course";
import { notFound, redirect } from "next/navigation";
import getUsername from "@/util/getUsername";
import BuyButton from "@/components/BuyButton";

export async function generateMetadata({
  params,
}: {
  params: { courseId: string };
}): Promise<Metadata> {
  return {
    title: `Rust Course- Crokto ${params.courseId}`,
    description: "Best Rust Course on the planet",
  };
}

export default async function CourseDetails({
  params,
}: {
  params: { courseId: string };
}) {
  const course = await getCourse(params.courseId);

  if (!course) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative h-[400px] w-full">
                <Image
                  src={"/images/authwall.jpg"}
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-sm">
                    Web3 Development
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-gray-500" />
                  </div>
                </div>

                <h1 className="text-3xl font-bold">{course.title}</h1>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    {5}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {42} students
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {42} hours
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    {"English"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <AvatarIcon width={30} height={30} />
                  <div>
                    <p className="font-medium">
                      {getUsername(course.creatorEmail)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {course.creatorEmail}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Description */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">About This Course</h2>
              <p className="text-gray-700 leading-relaxed">
                {course.subheading}
              </p>
            </Card>

            {/* Course Curriculum */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Course Curriculum</h2>
              <div className="space-y-4">
                {course.sections.map((section, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="font-semibold">{section.title}</h3>
                    {section.subsections.map((subsection, subsectionIdx) => (
                      <div
                        key={subsectionIdx}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-gray-500" />
                          <span>{subsection.title}</span>
                        </div>
                        <span className="text-sm text-gray-500">{42}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Card>
            <ReviewSection />
          </div>

          {/* Sidebar - Right Section */}
          <div className="lg:w-1/3">
            <Card className="p-6 sticky top-8">
              <div className="space-y-6">
                {/* Price */}
                <div className="space-y-2">
                  {course.discount ? (
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold">
                        ${course.discount}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ${course.cost}
                      </span>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        {Math.round(
                          ((parseFloat(course.cost) -
                            parseFloat(course.discount)) /
                            parseFloat(course.cost)) *
                            100
                        )}
                        % OFF
                      </Badge>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold">${course.cost}</span>
                  )}
                </div>

                {/* CTA Button */}
                <BuyButton courseId={params.courseId} />

                <Separator />

                {/* Course Features */}
                {/* <div className="space-y-3">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div> */}

                <Separator />

                {/* Achievement */}
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                  <Award className="w-8 h-8 text-orange-500" />
                  <div>
                    <h3 className="font-semibold">Certificate of Completion</h3>
                    <p className="text-sm text-gray-600">
                      Earn after finishing the course
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
