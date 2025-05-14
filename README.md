# AI-Powered Study Assistant Platform (Ongoing)

Frontend for personalized learning support platform with AI integration that helps students manage notes, track study progress, and generate quizzes or tests based on uploaded documents.

## Technologies Used

- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework  
- [Shadcn/ui](https://ui.shadcn.com/) - Reusable component library
- [BlockNote](https://www.blocknotejs.org/) - WYSIWYG editor
- [Next-Auth](https://next-auth.js.org/) - Authentication & Authorization
- [next-intl](https://next-intl-docs.vercel.app/) - Internationalization (i18n)
- [Framer Motion](https://www.framer.com/motion/) - Animation library

## Key Features

- User authentication and authorization
- Course management 
- Lesson management with rich text editor
- Document management
- AI Assistant integration
- Multi-language support (Vietnamese & English)
- Responsive design
- Dark/Light mode

## Installation

1. Clone repository
```bash
git clone <repository-url>
cd NextJS
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create environment file
```bash
cp .env.example .env.local
```

4. Update environment variables in `.env.local`
Create a `.env` file in the root directory with the following variables:

```env
# Authentication
NEXTAUTH_SECRET=your_nextauth_secret_key

# Backend API
BACKEND_URL=your_backend_url (default: http://localhost:8080)

# Optional: Service URLs
(Under development)
```

6. Start development server
```bash
npm run dev
# or
yarn dev
```

Access [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
NextJS/
├── app/                   # App router and pages
├── components/           # React components  
├── hooks/               # Custom React hooks
├── interfaces/         # TypeScript interfaces
├── lib/               # Utility functions
├── public/           # Static files
```

## API Documentation 

API endpoints are defined in the `app/api` directory.
See Backend README for detailed API documentation.
