"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { createCourse } from "@/actions/course";
import { useAuthStore } from "@/store";
function Upload() {
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState({
    title: "",
    subheading: "",
    cost: "",
    discount: "",
    thumbnail: null,
    sections: [],
    quiz: [],
  });
  const [sectionData, setSectionData] = useState({
    sectionTitle: "",
    subsections: [],
  });
  const [subsection, setSubsection] = useState({
    title: "",
    details: "",
  });
  const [quizData, setQuizData] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadOption, setUploadOption] = useState("draft");
  const { user } = useAuthStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCourseData((prev) => ({
      ...prev,
      thumbnail: file,
    }));
  };

  const handleSectionChange = (e) => {
    const { name, value } = e.target;
    setSectionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubsectionChange = (e) => {
    const { name, value } = e.target;
    setSubsection((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSubsection = () => {
    setSectionData((prev) => ({
      ...prev,
      subsections: [...prev.subsections, subsection],
    }));
    setSubsection({ title: "", details: "" });
  };

  const addSection = () => {
    setCourseData((prev) => ({
      ...prev,
      sections: [...prev.sections, sectionData],
    }));
    setSectionData({ sectionTitle: "", subsections: [] });
  };

  const handleQuizChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "question" || name === "answer") {
      setQuizData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      const updatedOptions = [...quizData.options];
      updatedOptions[index] = value;
      setQuizData((prev) => ({
        ...prev,
        options: updatedOptions,
      }));
    }
  };

  const addQuiz = () => {
    setCourseData((prev) => ({
      ...prev,
      quiz: [...prev.quiz, quizData],
    }));
    setQuizData({ question: "", options: ["", "", "", ""], answer: "" });
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleUpload();
      setIsModalOpen(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleTabClick = (step) => {
    setCurrentStep(step);
  };

  const handleUpload = () => {
    // console.log(courseData);
    // Implement the upload logic here
    console.log("Uploading course:", { ...courseData, status: uploadOption });

    toast("Uploading course...");
    createCourse({
      ...courseData,
      status: uploadOption,
      userEmail: user?.email,
    } as any)
      .then(() => {
        toast("Course uploaded successfully");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error uploading course");
      });

    setIsModalOpen(false);
  };

  return (
    <div>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-black">Create New Course</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <button
              onClick={() => handleTabClick(1)}
              className={`text-left ${
                currentStep === 1 ? "font-semibold text-primary" : ""
              }`}
            >
              Course Details
            </button>
            <button
              onClick={() => handleTabClick(2)}
              className={`text-left ${
                currentStep === 2 ? "font-semibold text-primary" : ""
              }`}
            >
              Course Content
            </button>
            <button
              onClick={() => handleTabClick(3)}
              className={`text-left ${
                currentStep === 3 ? "font-semibold text-primary" : ""
              }`}
            >
              Course Quiz
            </button>
          </nav>

          <div className="grid gap-6">
            <Card>
              {currentStep === 1 && (
                <>
                  <CardHeader>
                    <CardTitle>Course Information</CardTitle>
                    <CardDescription>
                      Enter the basic details of your course
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="grid gap-6">
                      <div className="grid gap-2 mb-4">
                        <Label htmlFor="thumbnail">Course Thumbnail</Label>
                        <Input
                          id="thumbnail"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </div>

                      <div className="grid gap-2 mb-4">
                        <Label htmlFor="title">Course Title</Label>
                        <Input
                          id="title"
                          name="title"
                          placeholder="Enter course title"
                          value={courseData.title}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="grid gap-2 mb-4">
                        <Label htmlFor="subheading">Subheading</Label>
                        <Textarea
                          id="subheading"
                          name="subheading"
                          placeholder="Enter course subheading"
                          value={courseData.subheading}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2 mb-4">
                          <Label htmlFor="cost">Course Cost ($)</Label>
                          <Input
                            id="cost"
                            name="cost"
                            type="number"
                            placeholder="Enter course cost"
                            value={courseData.cost}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="grid gap-2 mb-4">
                          <Label htmlFor="discount">Discount (%)</Label>
                          <Input
                            id="discount"
                            name="discount"
                            type="number"
                            placeholder="Enter discount"
                            value={courseData.discount}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <CardHeader>
                    <CardTitle>Course Sections</CardTitle>
                    <CardDescription>
                      Add sections and subsections
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor="sectionTitle">Section Title</Label>
                        <Input
                          id="sectionTitle"
                          name="sectionTitle"
                          placeholder="Enter section title"
                          value={sectionData.sectionTitle}
                          onChange={handleSectionChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="subsectionTitle">
                          Subsection Title
                        </Label>
                        <Input
                          id="subsectionTitle"
                          name="title"
                          placeholder="Enter subsection title"
                          value={subsection.title}
                          onChange={handleSubsectionChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="subsectionDetails">
                          Subsection Details
                        </Label>
                        <Textarea
                          id="subsectionDetails"
                          name="details"
                          placeholder="Enter subsection details"
                          value={subsection.details}
                          onChange={handleSubsectionChange}
                        />
                      </div>
                      <Button onClick={addSubsection}>Add Subsection</Button>
                      <Button onClick={addSection}>Add Section</Button>

                      {/* Display added sections and subsections */}
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">
                          Added Sections:
                        </h3>
                        {courseData.sections.map((section, sectionIndex) => (
                          <div
                            key={sectionIndex}
                            className="mb-4 p-4 border rounded"
                          >
                            <h4 className="font-semibold">
                              {section.sectionTitle}
                            </h4>
                            <ul className="list-disc pl-6">
                              {section.subsections.map(
                                (subsection, subsectionIndex) => (
                                  <li key={subsectionIndex}>
                                    <strong>{subsection.title}</strong>:{" "}
                                    {subsection.details}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <CardHeader>
                    <CardTitle>Quiz Information</CardTitle>
                    <CardDescription>Create the Quiz Here</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <Label htmlFor="question">Question</Label>
                      <Input
                        id="question"
                        name="question"
                        placeholder="Enter the question"
                        value={quizData.question}
                        onChange={handleQuizChange}
                      />
                      {quizData.options.map((option, index) => (
                        <div key={index}>
                          <Label htmlFor={`option-${index}`}>
                            Option {index + 1}
                          </Label>
                          <Input
                            id={`option-${index}`}
                            name={`option-${index}`}
                            placeholder={`Enter option ${index + 1}`}
                            value={option}
                            onChange={(e) => handleQuizChange(e, index)}
                          />
                        </div>
                      ))}
                      <Label htmlFor="answer">Correct Answer</Label>
                      <Input
                        id="answer"
                        name="answer"
                        placeholder="Enter correct answer"
                        value={quizData.answer}
                        onChange={handleQuizChange}
                      />
                      <Button onClick={addQuiz}>Add Question</Button>

                      {/* Display added quiz questions */}
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">
                          Added Questions:
                        </h3>
                        {courseData.quiz.map((quiz, index) => (
                          <div key={index} className="mb-4 p-4 border rounded">
                            <p>
                              <strong>Question:</strong> {quiz.question}
                            </p>
                            <p>
                              <strong>Options:</strong>
                            </p>
                            <ul className="list-disc pl-6">
                              {quiz.options.map((option, optionIndex) => (
                                <li key={optionIndex}>{option}</li>
                              ))}
                            </ul>
                            <p>
                              <strong>Correct Answer:</strong> {quiz.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </>
              )}
              <CardFooter className="flex justify-between border-t px-6 py-4">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={handlePrevious}>
                    Previous
                  </Button>
                )}
                <Button onClick={handleNext}>
                  {currentStep === 1
                    ? "Next : Course Content"
                    : currentStep === 2
                    ? "Next : Course Quiz"
                    : "Finish"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      {/* <Dialog open={dialogOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Gem className="cursor-pointer mr-4 hover:text-red-400 transition delay-75" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Award User</DialogTitle>
            <DialogDescription>
              Send Tokens as a reward to the user if you super like the content
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Network
              </Label>
              <Select value={networkVal} onValueChange={networkValChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Network" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="POLYGON_TESTNET_AMOY">
                    {toNetworkName("POLYGON_TESTNET_AMOY")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Token
              </Label>
              <Select
                value={tokenVal}
                onValueChange={(newVal) => setTokenVal(newVal)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Token" />
                </SelectTrigger>
                <SelectContent>
                  {availTokens.map((availToken, idx) => (
                    <SelectItem
                      key={idx}
                      value={availToken.token_address || "NATIVE"}
                    >
                      {availToken.token_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Amount
              </Label>
              <Input
                id="username"
                type="number"
                defaultValue="$0"
                value={amountVal}
                onChange={(e) => setAmountVal(Number(e.target.value))}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={awardfunc} disabled={loading}>
              Award
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}

export default Upload;
