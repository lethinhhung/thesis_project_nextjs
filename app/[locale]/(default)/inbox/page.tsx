"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  PaginationNextNoTitle,
  PaginationPreviousNoTitle,
} from "@/components/custom-ui/pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail as MailInterface } from "@/interfaces/mail";
import MailPreview from "@/components/mail-preview";
import { useState } from "react";
import { useIsTablet } from "@/hooks/use-tablet";
import MailPreviewMobile from "@/components/mail-preview-mobile";

const mails: MailInterface[] = [
  {
    from: "Admin",
    title: "Welcome to the Platform",
    content:
      "Thank you for joining our learning platform! Get started with your first course today.",
    date: "2025-03-18",
    status: false,
  },
  {
    from: "Math Instructor",
    title: "New Lesson Available",
    content: "We have added a new lesson on Calculus. Check it out now!",
    date: "2025-03-17",
    status: true,
  },
  {
    from: "System",
    title: "Password Change Alert",
    content:
      "Your password was recently changed. If this wasn't you, reset your password immediately.",
    date: "2025-03-16",
    status: true,
  },
  {
    from: "AI Assistant",
    title: "Your Weekly Progress Report",
    content: "You have completed 3 courses this week. Keep up the great work!",
    date: "2025-03-15",
    status: true,
  },
  {
    from: "Course Advisor",
    title: "Recommended Courses for You",
    content:
      "Based on your learning history, we recommend taking 'Machine Learning Basics' next.",
    date: "2025-03-14",
    status: true,
  },
];

function Inbox() {
  const [mail, setmail] = useState<MailInterface | null>(null);
  const [openMailPreview, setOpenMailPreview] = useState(false);
  const isTablet = useIsTablet();

  const handleSelectmail = (mail: MailInterface) => {
    setmail(mail);
    if (isTablet) {
      setOpenMailPreview(true);
      return;
    }
  };
  return (
    <div className="w-full h-[calc(100dvh-92px)] rounded-xl flex justify-center items-center">
      <div className="w-full h-full rounded-xl columns-1 lg:columns-2">
        <div className="flex flex-col justify-center col-span-1 h-full w-full rounded-xl">
          <div
            className={
              "w-full sticky top-0 left-0 z-10 flex flex-wrap gap-2 items-center p-2 rounded-xl border border-dashed bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            }
          >
            <div className="flex flex-row flex-wrap gap-2 px-2 pt-2 w-full">
              <div className="w-full flex flex-row gap-2">
                <Input
                  className="w-full border border-dashed"
                  placeholder={"Search"}
                />

                <Button
                  size={"icon"}
                  variant="ghost"
                  className="border border-dashed"
                >
                  <Mail />
                </Button>
              </div>
              <Pagination className="w-full bg-transparent">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPreviousNoTitle href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      isActive
                      className="border border-dashed"
                    >
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNextNoTitle href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
          <div className="h-full w-full rounded-xl overflow-y-auto">
            <div className="w-full flex flex-col gap-2 p-3">
              {mails.map((mail, index) => (
                <Card
                  className={!mail.status ? "bg-secondary" : ""}
                  key={index}
                  onClick={() => handleSelectmail(mail)}
                >
                  <CardHeader>
                    <CardTitle>{mail.from}</CardTitle>
                    <p>{mail.title}</p>
                    <CardDescription className="line-clamp-2">
                      {mail.content}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{mail.date}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {isTablet && (
          <MailPreviewMobile
            open={openMailPreview}
            onOpenChange={setOpenMailPreview}
            mail={mail}
          />
        )}

        <div className="w-full h-full hidden lg:flex rounded-xl col-span-1">
          <MailPreview mail={mail} />
        </div>
      </div>
    </div>
  );
}

export default Inbox;
