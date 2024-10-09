"use client";
import React, { useState, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, PlayCircle } from "lucide-react";

import { courseContent } from "@/data/mockCourse";
import ReviewSection from "@/components/ReviewSection";
import { Button } from "@/components/ui/button";

const CoursePage = () => {
  const [activeSection, setActiveSection] = useState<string>("");

  const sectionRefs = useRef<SectionRefs>({});

  const scrollToSection = (sectionId: string): void => {
    setActiveSection(sectionId);
    sectionRefs.current[sectionId]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex h-full bg-gray-50">
      <div className="w-3/4 p-8 overflow-y-auto">
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <img
            src="/images/authwall.jpg"
            alt={courseContent.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h1 className="text-6xl font-black mb-4 text-neutral-800">
            {courseContent.title}
          </h1>
          <p className="text-gray-500 text-base">{courseContent.description}</p>
        </div>

        <div className="space-y-12">
          {courseContent.sections.map((section, index) => (
            <div
              key={index}
              ref={(el) => (sectionRefs.current[`section-${index}`] = el)}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-4xl font-extrabold mb-6 text-neutral-800">
                {index + 1}. {section.title}
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {section.content}
                </p>
                {section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex} className="mt-6">
                    <h3 className="text-xl font-semibold mb-3 text-neutral-700">
                      {subsection.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {subsection.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <ReviewSection />
      </div>

      {/* Course Content Sidebar */}
      <div className="w-1/4 bg-white py-6 shadow-lg">
        <div className="flex items-center px-6 pb-6 mb-2 border-b-[1px] border-neutral-200">
          <BookOpen className="w-6 h-6 text-neutral-700 mr-2" />
          <h2 className="text-2xl font-bold text-neutral-800">
            Course Contents
          </h2>
        </div>
        <ScrollArea className="h-[calc(100vh-200px)] px-6">
          <Accordion type="single" collapsible className="w-full">
            {courseContent.sections.map((section, index) => (
              <AccordionItem value={`section-${index}`} key={index}>
                <AccordionTrigger
                  className={`hover:text-neutral-700 ${
                    activeSection === `section-${index}`
                      ? "text-neutral-700 font-semibold"
                      : ""
                  }`}
                  onClick={() => scrollToSection(`section-${index}`)}
                >
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {section.subsections.map((subsection, subIndex) => (
                      <li
                        key={subIndex}
                        className="flex items-center py-1 hover:text-neutral-700 cursor-pointer"
                        onClick={() => scrollToSection(`section-${index}`)}
                      >
                        <PlayCircle className="w-4 h-4 mr-2 text-neutral-600" />
                        <span className="text-sm">{subsection.title}</span>
                        <span className="ml-auto text-xs text-gray-500">
                          {subsection.estimatedTime || "5 min"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
        <div className="items-center flex justify-center w-full">
          <Button className="w-full mx-6">Final Test</Button>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
