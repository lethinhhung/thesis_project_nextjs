import CourseDocument from "@/components/course-document";
import { Document } from "@/interfaces/document";

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

function Documents() {
  return <CourseDocument documents={documents} />;
}

export default Documents;
