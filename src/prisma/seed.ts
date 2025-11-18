import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  await prisma.quizResult.deleteMany();
  await prisma.userLessonProgress.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();

  const coursesData = [
    {
      title: 'N5 Beginner',
      description: 'Introductory level Japanese course for absolute beginners.',
      level: 'N5',
      lessons: {
        create: [
          {
            title: 'Lesson 1: Greetings',
            description: 'Basic Japanese greetings and introductions.',
            content: {
              type: 'text',
              body: 'Learn to say hello, goodbye, and introduce yourself in Japanese.',
            },
            quizzes: {
              create: [
                {
                  title: 'Greetings Quiz 1',
                  passingScore: 70,
                  questions: {
                    create: [
                      {
                        questionText: 'How do you say "Hello" in Japanese?',
                        optionA: 'Sayonara',
                        optionB: 'Konnichiwa',
                        optionC: 'Arigatou',
                        optionD: 'Ohayo',
                        correctAnswer: 'B',
                      },
                      {
                        questionText: 'What does "Arigatou" mean?',
                        optionA: 'Goodbye',
                        optionB: 'Please',
                        optionC: 'Thank you',
                        optionD: 'Good morning',
                        correctAnswer: 'C',
                      },
                      {
                        questionText: 'Which phrase means "Good morning"?',
                        optionA: 'Ohayo',
                        optionB: 'Konnichiwa',
                        optionC: 'Konbanwa',
                        optionD: 'Sayonara',
                        correctAnswer: 'A',
                      },
                      {
                        questionText:
                          'Which phrase is used for "Good evening"?',
                        optionA: 'Konnichiwa',
                        optionB: 'Konbanwa',
                        optionC: 'Ohayo',
                        optionD: 'Sayonara',
                        correctAnswer: 'B',
                      },
                    ],
                  },
                },
                {
                  title: 'Greetings Quiz 2',
                  questions: {
                    create: [
                      {
                        questionText: 'How do you say "Goodbye" in Japanese?',
                        optionA: 'Sayonara',
                        optionB: 'Konnichiwa',
                        optionC: 'Arigatou',
                        optionD: 'Ohayo',
                        correctAnswer: 'A',
                      },
                      {
                        questionText: 'Which greeting is used in the morning?',
                        optionA: 'Konnichiwa',
                        optionB: 'Ohayo',
                        optionC: 'Konbanwa',
                        optionD: 'Arigatou',
                        correctAnswer: 'B',
                      },
                      {
                        questionText: '"Konbanwa" means?',
                        optionA: 'Good afternoon',
                        optionB: 'Good morning',
                        optionC: 'Good evening',
                        optionD: 'Goodbye',
                        correctAnswer: 'C',
                      },
                      {
                        questionText: '"Arigatou gozaimasu" means?',
                        optionA: 'Good morning',
                        optionB: 'Thank you very much',
                        optionC: 'Good night',
                        optionD: 'See you',
                        correctAnswer: 'B',
                      },
                    ],
                  },
                },
                {
                  title: 'Greetings Quiz 3',
                  questions: {
                    create: [
                      {
                        questionText:
                          'Which of the following means "See you again"?',
                        optionA: 'Mata ne',
                        optionB: 'Arigatou',
                        optionC: 'Sayonara',
                        optionD: 'Konbanwa',
                        correctAnswer: 'A',
                      },
                      {
                        questionText: '"Ohayo gozaimasu" is used when?',
                        optionA: 'Morning',
                        optionB: 'Afternoon',
                        optionC: 'Evening',
                        optionD: 'Night',
                        correctAnswer: 'A',
                      },
                      {
                        questionText: 'Which of these is a polite greeting?',
                        optionA: 'Yo!',
                        optionB: 'Konnichiwa',
                        optionC: 'Arigatou',
                        optionD: 'Mata ne',
                        correctAnswer: 'B',
                      },
                      {
                        questionText:
                          'Choose the correct translation: "Arigatou gozaimasu"',
                        optionA: 'Thank you very much',
                        optionB: 'Good evening',
                        optionC: 'See you soon',
                        optionD: 'Good morning',
                        correctAnswer: 'A',
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: 'Lesson 2: Numbers',
            description: 'Learn to count from 1 to 10 in Japanese.',
            content: {
              type: 'text',
              body: 'Basic numbers from ichi (1) to juu (10).',
            },
          },
          {
            title: 'Lesson 3: Basic Grammar',
            description: 'Learn basic Japanese sentence structure.',
            content: {
              type: 'text',
              body: 'Understand subject-object-verb order.',
            },
          },
        ],
      },
    },
    {
      title: 'N4 Elementary',
      description: 'Continue learning with simple grammar and kanji.',
      level: 'N4',
      lessons: {
        create: [
          {
            title: 'Lesson 1: Simple Sentences',
            description: 'Learn how to make basic sentences.',
            content: { type: 'text', body: 'Watashi wa gakusei desu.' },
          },
          {
            title: 'Lesson 2: Verb Forms',
            description: 'Understand basic verb conjugations.',
            content: { type: 'text', body: 'Taberu → Tabetai → Tabemashita' },
          },
          {
            title: 'Lesson 3: Kanji Basics',
            description: 'Introduction to basic kanji characters.',
            content: {
              type: 'text',
              body: '日 (day), 月 (month), 人 (person).',
            },
          },
        ],
      },
    },
  ];

  for (const course of coursesData) {
    await prisma.course.create({ data: course });
  }

  console.log('✅ Database seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
