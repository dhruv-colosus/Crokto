"use server";

import prisma from "@/lib/prisma";

export const createCourse = async (data: {
  title: string;
  subheading: string;
  thumbnail: File;
  cost: string;
  discount: string;
  status: string;
  sections: {
    sectionTitle: string;
    subsections: {
      title: string;
      details: string;
    }[];
  }[];
  quiz: {
    question: string;
    options: string[];
    answer: string;
  }[];
  userEmail: string;
}) => {
  const course = await prisma.course.create({
    data: {
      title: data.title,
      subheading: data.subheading,
      cost: data.cost,
      discount: data.discount,
      thumbnail: "",
      status: data.status,
      creatorEmail: data.userEmail,
    },
  });

  await prisma.$transaction(
    data.sections.map((sec) =>
      prisma.courseSection.create({
        data: {
          courseId: course.id,
          title: sec.sectionTitle,
          subsections: {
            createMany: {
              data: sec.subsections.map((subsec) => ({
                title: subsec.title,
                content: subsec.details,
              })),
            },
          },
        },
      })
    )
  );

  await prisma.$transaction(
    [data.quiz].map((quiz) =>
      prisma.quiz.create({
        data: {
          courseId: course.id,
          title: `${course.title} Quiz`,
          questions: {
            createMany: {
              data: quiz.map((ques) => ({
                question: ques.question,
                options: ques.options,
                correctOption: parseInt(ques.answer),
              })),
            },
          },
        },
      })
    )
  );
};

export const getCourses = async () => {
  const courses = await prisma.course.findMany();
  console.log(courses);

  return courses;
};

export const getCourse = async (courseId: string) => {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: { sections: { include: { subsections: true } }, quizzes: true },
  });
  console.log(course);

  return course;
};

export const hasCourse = async (courseId: string, userEmail: string) => {
  const alreadyExists = await prisma.userCourses.findUnique({
    where: { userEmail_courseId: { userEmail, courseId } },
  });

  return alreadyExists ? true : false;
};

export const buyCourse = async (courseId: string, userEmail: string) => {
  const alreadyExists = await prisma.userCourses.findUnique({
    where: { userEmail_courseId: { userEmail, courseId } },
  });

  if (alreadyExists) return;

  await prisma.userCourses.create({ data: { userEmail, courseId } });
};

export const getUserCourses = async (userEmail: string) => {
  const courses = await prisma.userCourses.findMany({
    where: { userEmail },
    include: { course: true },
  });

  console.log(courses.map((course) => course.course));

  return courses.map((course) => course.course);
};

export const getQuiz = async (quizId: string) => {
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: { questions: true, course: true },
  });
  return quiz;
};
