"use client";

import CourseDashboard from "@/components/course-dashboard";
import { Document } from "@/interfaces/document";
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

const documents: Document[] = [
  {
    id: "1",
    title: "JavaScript Basics",
    description:
      "This document provides a fundamental introduction to JavaScript, covering basic syntax, data types, loops, functions, and event handling. It is designed for beginners who want to understand how JavaScript works in the web development ecosystem.",
    summary:
      "Introduction to JavaScript covering syntax, data types, loops, and event handling. Introduction to JavaScript covering syntax, data types, loops, and event handling. Introduction to JavaScript covering syntax, data types, loops, and event handling. Introduction to JavaScript covering syntax, data types, loops, and event handling.",
    tags: ["JavaScript", "Programming", "Beginner"],
    date: "2023-06-10",
    status: true,
  },
  {
    id: "2",
    title: "React Guide",
    description:
      "A comprehensive guide to React framework, explaining core concepts such as components, props, state management, hooks, and best practices. This document is suitable for both beginners and experienced developers looking to build modern web applications with React.",
    summary:
      "Comprehensive guide to React, covering components, state, and best practices.",
    tags: ["React", "Frontend", "Web Development"],
    date: "2023-07-15",
    status: true,
  },
  {
    id: "3",
    title: "Node.js for Backend",
    description:
      "An in-depth resource on Node.js for backend development, including server-side programming, asynchronous operations, Express.js, database interactions, and REST API development. Ideal for developers seeking to build scalable web applications.",
    summary:
      "Guide to Node.js for backend development, covering Express.js and REST APIs.",
    tags: ["Node.js", "Backend", "API"],
    date: "2023-08-20",
    status: false,
  },
  {
    id: "4",
    title: "MongoDB Essentials",
    description:
      "This document provides an essential overview of MongoDB, a NoSQL database. It covers data modeling, CRUD operations, indexing, and best practices for handling large-scale data efficiently.",
    summary:
      "Essential guide to MongoDB, including data modeling and CRUD operations.",
    tags: ["MongoDB", "Database", "NoSQL"],
    date: "2023-09-05",
    status: true,
  },
  {
    id: "5",
    title: "CSS Grid & Flexbox",
    description:
      "A complete reference to CSS layout techniques, focusing on Grid and Flexbox. It explains how to create responsive designs, align elements efficiently, and implement modern UI structures.",
    summary:
      "Mastering CSS Grid and Flexbox for responsive layouts and modern UI design.",
    tags: ["CSS", "Web Design", "Frontend"],

    date: "2023-10-01",
    status: true,
  },
  {
    id: "6",
    title: "Software Engineering Principles",
    description:
      "An extensive discussion on software engineering principles, covering software design patterns, clean coding practices, testing methodologies, and agile development workflows.",
    summary:
      "Discussion on software engineering principles, design patterns, and best practices.",
    tags: ["Software Engineering", "Development", "Best Practices"],

    date: "2023-11-12",
    status: false,
  },
  {
    id: "7",
    title: "Machine Learning Basics",
    description:
      "An introductory guide to machine learning concepts, including supervised and unsupervised learning, neural networks, feature engineering, and model evaluation techniques.",
    summary:
      "Introduction to machine learning concepts, including supervised learning and neural networks.",
    tags: ["Machine Learning", "AI", "Data Science"],

    date: "2023-12-08",
    status: false,
  },
  {
    id: "8",
    title: "Python for Data Science",
    description:
      "A practical guide to using Python for data science, featuring NumPy, Pandas, Matplotlib, and Scikit-Learn for data manipulation, visualization, and machine learning tasks.",
    summary:
      "Using Python for data science with libraries like Pandas and Scikit-Learn.",
    tags: ["Python", "Data Science", "Pandas"],

    date: "2024-01-20",
    status: true,
  },
  {
    id: "9",
    title: "System Design Interview Guide",
    description:
      "A strategic resource for system design interviews, covering scalable architectures, microservices, caching strategies, database sharding, and real-world case studies.",
    summary:
      "Guide to system design interviews, including scalability and microservices.",
    tags: ["System Design", "Interviews", "Architecture"],

    date: "2024-02-14",
    status: true,
  },
  {
    id: "10",
    title: "Blockchain Fundamentals",
    description:
      "An overview of blockchain technology, including consensus mechanisms, smart contracts, cryptographic principles, and decentralized applications.",
    summary:
      "Introduction to blockchain, covering smart contracts and decentralization.",
    tags: ["Blockchain", "Cryptocurrency", "Decentralization"],
    date: "2024-03-10",
    status: false,
  },
];

function Dashboard() {
  return <CourseDashboard lessons={lessons} documents={documents} />;
}

export default Dashboard;
