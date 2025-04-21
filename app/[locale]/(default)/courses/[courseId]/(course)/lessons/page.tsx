import CourseLessons from "@/components/course-lessons";
import { Lesson } from "@/interfaces/lesson";

const lessons: Lesson[] = [
  {
    id: "lesson-001",
    title: "Introduction to JavaScript",
    description:
      "Learn the basics of JavaScript, including syntax, variables, and data types.",
    date: "2025-03-10",
  },
  {
    id: "lesson-002",
    title: "React Components and Props",
    description:
      "Understand how to build reusable components and pass data using props in React.",
    date: "2025-03-12",
  },
  {
    id: "lesson-003",
    title: "Data Structures: Arrays and Linked Lists",
    description:
      "Explore the fundamentals of arrays and linked lists, their operations, and use cases.",
    date: "2025-03-15",
  },
  {
    id: "lesson-004",
    title: "Introduction to Python for Data Analysis",
    description:
      "Learn how to use Python for data analysis with Pandas and NumPy.",
    date: "2025-03-18",
  },
  {
    id: "lesson-005",
    title: "Building RESTful APIs with Node.js",
    description:
      "Discover how to create RESTful APIs using Node.js and Express.",
    date: "2025-03-20",
  },
  {
    id: "lesson-006",
    title: "Understanding TypeScript",
    description:
      "Learn how TypeScript enhances JavaScript with static typing and interfaces.",
    date: "2025-03-22",
  },
  {
    id: "lesson-007",
    title: "Database Management with MongoDB",
    description:
      "Understand NoSQL databases and how to use MongoDB for storing data efficiently.",
    date: "2025-03-25",
  },
  {
    id: "lesson-008",
    title: "State Management in React with Redux",
    description:
      "Learn how to manage application state in React using Redux and the Context API.",
    date: "2025-03-27",
  },
  {
    id: "lesson-009",
    title: "Authentication and Authorization in Web Applications",
    description:
      "Explore different authentication methods, including JWT and OAuth.",
    date: "2025-03-30",
  },
  {
    id: "lesson-010",
    title: "Deployment and CI/CD Pipelines",
    description:
      "Learn how to deploy applications using CI/CD pipelines with GitHub Actions and Docker.",
    date: "2025-04-02",
  },
  {
    id: "lesson-011",
    title: "Advanced JavaScript: Closures and Async/Await",
    description:
      "Deep dive into JavaScript closures, promises, and async/await for handling asynchronous operations.",
    date: "2025-04-05",
  },
  {
    id: "lesson-012",
    title: "GraphQL: Introduction and Implementation",
    description:
      "Learn how GraphQL works and how to build APIs with GraphQL and Apollo Server.",
    date: "2025-04-08",
  },
  {
    id: "lesson-013",
    title: "Web Security Fundamentals",
    description:
      "Understand web security principles, including XSS, CSRF, and SQL injection prevention.",
    date: "2025-04-10",
  },
  {
    id: "lesson-014",
    title: "Microservices Architecture with Node.js",
    description:
      "Explore microservices architecture and how to build scalable applications using Node.js and Docker.",
    date: "2025-04-12",
  },
  {
    id: "lesson-015",
    title: "React Performance Optimization",
    description:
      "Learn techniques to improve performance in React applications, such as memoization and lazy loading.",
    date: "2025-04-15",
  },
  {
    id: "lesson-016",
    title: "Testing in JavaScript with Jest",
    description:
      "Understand the importance of testing and how to use Jest for unit and integration testing.",
    date: "2025-04-18",
  },
  {
    id: "lesson-017",
    title: "DevOps Essentials: Docker and Kubernetes",
    description:
      "Get hands-on experience with Docker containers and Kubernetes for managing cloud applications.",
    date: "2025-04-20",
  },
  {
    id: "lesson-018",
    title: "Next.js: Building Server-Side Rendered Applications",
    description:
      "Learn how Next.js improves performance and SEO with server-side rendering and static site generation.",
    date: "2025-04-22",
  },
  {
    id: "lesson-019",
    title: "Machine Learning Basics with TensorFlow.js",
    description:
      "Discover how to build and deploy machine learning models using TensorFlow.js in the browser.",
    date: "2025-04-25",
  },
  {
    id: "lesson-020",
    title: "Web3 and Blockchain Development",
    description:
      "Explore the fundamentals of blockchain technology and build decentralized applications (DApps).",
    date: "2025-04-28",
  },
];

function Lessons() {
  return <CourseLessons lessons={lessons} />;
}

export default Lessons;
