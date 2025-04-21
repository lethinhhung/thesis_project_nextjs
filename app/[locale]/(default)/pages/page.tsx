"use client";

import SortButton from "@/components/sort-button";
import { Button } from "@/components/ui/button";
import { Page } from "@/interfaces/page";
import { PageCard } from "@/components/page-card";
import { useRouter } from "next/navigation";

const recentPages: Page[] = [
  {
    id: "1",
    title: "JavaScript Basics",
    description:
      "This document provides a fundamental introduction to JavaScript, covering essential topics such as basic syntax, data types, control structures including loops and conditionals, functions, and event handling. Additionally, it explores how JavaScript interacts with the DOM and how it plays a crucial role in the web development ecosystem. This resource is ideal for beginners looking to develop a strong foundation in JavaScript and start building interactive web applications.",
    summary:
      "Comprehensive introduction to JavaScript covering syntax, data types, loops, functions, event handling, and DOM manipulation.",
    tags: ["JavaScript", "Programming", "Beginner"],
    date: "2023-06-10",
    status: true,
  },
  {
    id: "2",
    title: "React Guide",
    description:
      "A comprehensive guide to the React framework, explaining its core concepts such as components, props, state management, lifecycle methods, and the importance of hooks. The document also covers best practices for structuring React applications, optimizing performance, and leveraging React Router for navigation. Whether you are a beginner or an experienced developer, this guide will help you build efficient and scalable web applications using React.",
    summary:
      "In-depth guide to React, covering components, state management, lifecycle methods, hooks, and best practices for building scalable web applications.",
    tags: ["Frontend", "Web Development"],
    date: "2023-07-15",
    status: true,
  },
  {
    id: "3",
    title: "Node.js for Backend",
    description:
      "An extensive resource on Node.js for backend development, introducing server-side programming concepts, asynchronous JavaScript, event-driven architecture, and working with the Express.js framework. The document also covers database interactions with MongoDB and SQL, REST API development, authentication strategies, and performance optimization techniques. Ideal for developers seeking to build efficient, scalable, and high-performing web applications with Node.js.",
    summary:
      "Comprehensive guide to Node.js covering Express.js, REST API development, authentication, and performance optimization.",
    tags: ["Node.js", "Backend", "API"],
    date: "2023-08-20",
    status: false,
  },
];

const pages: Page[] = [
  {
    id: "1",
    title: "JavaScript Basics",
    description:
      "This document provides a fundamental introduction to JavaScript, covering essential topics such as basic syntax, data types, control structures including loops and conditionals, functions, and event handling. Additionally, it explores how JavaScript interacts with the DOM and how it plays a crucial role in the web development ecosystem. This resource is ideal for beginners looking to develop a strong foundation in JavaScript and start building interactive web applications.",
    summary:
      "Comprehensive introduction to JavaScript covering syntax, data types, loops, functions, event handling, and DOM manipulation.",
    tags: ["JavaScript", "Programming", "Beginner"],
    date: "2023-06-10",
    status: true,
  },
  {
    id: "2",
    title: "React Guide",
    description:
      "A comprehensive guide to the React framework, explaining its core concepts such as components, props, state management, lifecycle methods, and the importance of hooks. The document also covers best practices for structuring React applications, optimizing performance, and leveraging React Router for navigation. Whether you are a beginner or an experienced developer, this guide will help you build efficient and scalable web applications using React.",
    summary:
      "In-depth guide to React, covering components, state management, lifecycle methods, hooks, and best practices for building scalable web applications.",
    tags: ["Frontend", "Web Development"],
    date: "2023-07-15",
    status: true,
  },
  {
    id: "3",
    title: "Node.js for Backend",
    description:
      "An extensive resource on Node.js for backend development, introducing server-side programming concepts, asynchronous JavaScript, event-driven architecture, and working with the Express.js framework. The document also covers database interactions with MongoDB and SQL, REST API development, authentication strategies, and performance optimization techniques. Ideal for developers seeking to build efficient, scalable, and high-performing web applications with Node.js.",
    summary:
      "Comprehensive guide to Node.js covering Express.js, REST API development, authentication, and performance optimization.",
    tags: ["Node.js", "Backend", "API"],
    date: "2023-08-20",
    status: false,
  },
  {
    id: "4",
    title: "MongoDB Essentials",
    description:
      "This document provides an essential overview of MongoDB, a popular NoSQL database. Topics covered include fundamental concepts such as document-based data modeling, CRUD operations, indexing strategies, data aggregation pipelines, and best practices for handling large-scale data efficiently. The guide also explores how to integrate MongoDB with backend frameworks like Node.js and Express, making it a valuable resource for developers looking to build robust database solutions.",
    summary:
      "Detailed introduction to MongoDB, covering data modeling, CRUD operations, indexing, and integration with backend frameworks.",
    tags: ["Database", "NoSQL"],
    date: "2023-09-05",
    status: true,
  },
  {
    id: "5",
    title: "CSS Grid & Flexbox",
    description:
      "A complete reference to modern CSS layout techniques, with a focus on Grid and Flexbox. The document explains the fundamental principles behind each layout system, provides practical examples for creating responsive designs, and discusses advanced positioning techniques. Additionally, it covers best practices for aligning elements, nesting grids, and optimizing layouts for various screen sizes and devices.",
    summary:
      "Mastering CSS Grid and Flexbox for creating responsive layouts and modern UI designs.",
    tags: ["CSS", "Web Design", "Frontend"],
    date: "2023-10-01",
    status: true,
  },
  {
    id: "6",
    title: "Software Engineering Principles",
    description:
      "An extensive discussion on software engineering principles, covering key topics such as software design patterns, clean coding practices, testing methodologies, and agile development workflows. The document explores various architectural styles, system scalability considerations, and strategies for writing maintainable and efficient code, making it a valuable resource for both new and experienced software engineers.",
    summary:
      "Comprehensive discussion on software engineering principles, including design patterns, clean code, and agile workflows.",
    tags: ["Software Engineering", "Development", "Best Practices"],
    date: "2023-11-12",
    status: false,
  },
  {
    id: "7",
    title: "Machine Learning Basics",
    description:
      "An introductory guide to machine learning concepts, covering the fundamentals of supervised and unsupervised learning, neural networks, feature engineering, and model evaluation techniques. The document also provides an overview of popular machine learning libraries such as TensorFlow and Scikit-Learn, along with practical examples to help beginners get started with building and training models.",
    summary:
      "Introduction to machine learning concepts, covering supervised learning, neural networks, and model evaluation techniques.",
    tags: ["Machine Learning", "AI"],
    date: "2023-12-08",
    status: false,
  },
  {
    id: "8",
    title: "Python for Data Science",
    description:
      "A practical guide to using Python for data science, covering essential libraries such as NumPy, Pandas, Matplotlib, and Scikit-Learn. The document provides hands-on examples for data manipulation, visualization, statistical analysis, and machine learning applications, making it an excellent resource for data scientists and analysts looking to enhance their Python skills.",
    summary:
      "Practical guide to Python for data science, featuring data manipulation, visualization, and machine learning with Pandas and Scikit-Learn.",
    tags: ["Python"],
    date: "2024-01-20",
    status: true,
  },
  {
    id: "9",
    title: "System Design Interview Guide",
    description:
      "A strategic resource for system design interviews, covering key concepts such as scalable architectures, microservices, caching strategies, database sharding, load balancing, and real-world case studies. This guide provides a structured approach to tackling system design problems and includes sample questions, solution frameworks, and best practices to help candidates excel in technical interviews.",
    summary:
      "In-depth guide to system design interviews, covering scalability, microservices, caching, and database sharding.",
    tags: ["System Design", "Interviews", "Architecture"],
    date: "2024-02-14",
    status: true,
  },
  {
    id: "10",
    title: "Blockchain Fundamentals",
    description:
      "An overview of blockchain technology, covering core topics such as consensus mechanisms, smart contracts, cryptographic principles, and decentralized applications (DApps). The document explains how blockchain works, its real-world applications in industries such as finance and supply chain management, and the future potential of decentralized technologies.",
    summary:
      "Comprehensive introduction to blockchain, covering consensus mechanisms, smart contracts, and real-world applications.",
    tags: ["Blockchain", "Decentralization"],
    date: "2024-03-10",
    status: false,
  },
  {
    id: "11",
    title: "Kubernetes for Beginners",
    description:
      "A step-by-step guide to Kubernetes, explaining container orchestration, deployment strategies, pod management, and scaling applications efficiently.",
    summary:
      "Introduction to Kubernetes, covering pods, deployments, and scaling strategies.",
    tags: ["Kubernetes", "DevOps", "Containers"],
    date: "2024-04-05",
    status: true,
  },
  {
    id: "12",
    title: "Django Web Development",
    description:
      "A complete guide to building web applications with Django, covering models, views, templates, authentication, and best practices for scalable applications.",
    summary:
      "Comprehensive guide to Django web development, including authentication and templates.",
    tags: ["Django", "Python", "Web Development"],
    date: "2024-04-20",
    status: true,
  },
  {
    id: "13",
    title: "TypeScript Essentials",
    description:
      "A deep dive into TypeScript, covering type annotations, interfaces, generics, decorators, and how it enhances JavaScript development.",
    summary:
      "Mastering TypeScript, including interfaces, generics, and decorators.",
    tags: ["TypeScript", "JavaScript"],
    date: "2024-05-10",
    status: false,
  },
  {
    id: "14",
    title: "GraphQL API Development",
    description:
      "A practical approach to GraphQL, covering schema design, queries, mutations, subscriptions, and integrating with frontend frameworks like React and Vue.",
    summary: "Learn GraphQL with schema design, queries, and API integration.",
    tags: ["GraphQL", "API", "Web Development"],
    date: "2024-05-25",
    status: true,
  },
  {
    id: "15",
    title: "Cybersecurity Fundamentals",
    description:
      "An essential guide to cybersecurity, discussing network security, cryptography, ethical hacking, penetration testing, and best practices for securing applications.",
    summary:
      "Introduction to cybersecurity, covering cryptography and ethical hacking.",
    tags: ["Cybersecurity", "Security", "Hacking"],
    date: "2024-06-08",
    status: false,
  },
  {
    id: "16",
    title: "Rust Programming Language",
    description:
      "A beginner-friendly introduction to Rust, covering ownership, borrowing, concurrency, and building efficient system applications with Rust’s memory safety features.",
    summary:
      "Getting started with Rust, covering ownership, borrowing, and concurrency.",
    tags: ["Rust", "Systems Programming", "Concurrency"],
    date: "2024-06-22",
    status: true,
  },
  {
    id: "17",
    title: "Flutter Mobile Development",
    description:
      "A hands-on guide to building cross-platform mobile applications with Flutter, covering widgets, state management, animations, and Firebase integration.",
    summary:
      "Build cross-platform apps with Flutter, covering widgets and Firebase.",
    tags: ["Flutter", "Mobile Development", "Dart"],
    date: "2024-07-05",
    status: false,
  },
  {
    id: "18",
    title: "AI-Powered Chatbots",
    description:
      "A complete guide to building AI-driven chatbots using NLP techniques, integrating with APIs, and deploying chatbots in real-world applications.",
    summary: "Learn to build AI chatbots with NLP and API integrations.",
    tags: ["AI", "Chatbots", "NLP"],
    date: "2024-07-20",
    status: true,
  },
  {
    id: "19",
    title: "Cloud Computing with AWS",
    description:
      "A deep dive into AWS cloud services, covering EC2, S3, Lambda, IAM roles, networking, and best practices for cloud security and cost optimization.",
    summary: "Learn AWS cloud computing, including EC2, S3, and Lambda.",
    tags: ["AWS", "Cloud Computing", "DevOps"],
    date: "2024-08-10",
    status: false,
  },
  {
    id: "20",
    title: "Agile Project Management",
    description:
      "A complete guide to Agile methodologies, covering Scrum, Kanban, sprint planning, backlog grooming, and best practices for managing software projects.",
    summary:
      "Master Agile project management with Scrum and Kanban techniques.",
    tags: ["Agile", "Project Management", "Scrum"],
    date: "2024-08-25",
    status: true,
  },
];

function Pages() {
  const router = useRouter();
  return (
    <>
      <div className="w-full flex justify-between items-center sticky top-18">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight px-2">
          Pages ({pages.length})
        </h4>
        <div className="flex gap-2 items-center">
          <SortButton variant={"secondary"} />

          <Button>new</Button>
        </div>
      </div>
      <div className="w-full p-2 pb-4 md:p-4 border-b md:border-none">
        <div className="w-full md:p-4 md:border md:border-dashed rounded-lg">
          <p className="text-sm text-muted-foreground pb-2 md:p-0">Recent</p>
          <div className="columns-3xs space-y-4 md:p-4">
            {recentPages.map((page) => (
              <PageCard
                key={page.id}
                page={page}
                onClick={() => {
                  router.push(`/pages/${page.id}`);
                }}
                className="break-inside-avoid-column"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="columns-3xs space-y-4 p-2 md:p-4">
        {pages.map((page) => (
          <PageCard
            key={page.id}
            page={page}
            onClick={() => {
              router.push(`/pages/${page.id}`);
            }}
            className="break-inside-avoid-column"
          />
        ))}
      </div>
    </>
  );
}
export default Pages;
