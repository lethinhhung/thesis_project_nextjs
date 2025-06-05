import { useState } from "react";
import { Course } from "@/interfaces/course";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Loader, Paperclip } from "lucide-react";
import { processResponse } from "@/lib/response-process";
import { format } from "date-fns";
import { useLocale } from "next-intl";
import { enUS as en } from "date-fns/locale/en-US";
import { vi } from "date-fns/locale/vi";

export function AttachContent({
  disabled = true,
  selectedCourse,
  setSelectedCourse,
}: {
  disabled?: boolean;
  selectedCourse: Course | null;
  setSelectedCourse: (course: Course | null) => void;
}) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAttached, setIsAttached] = useState(false);

  const locale = useLocale();
  const dateFnsLocales = {
    vi,
    en,
  };

  const currentDateFnsLocale = dateFnsLocales[locale as "vi" | "en"] || vi;

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/course/get-all`, {
        method: "GET",
      });
      const response = await processResponse(res, {
        success: false,
        error: true,
      });

      if (response.success) {
        setCourses(response.data);
      }
    } catch (error) {
      console.error("Error fetching lesson:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          variant={isAttached ? "default" : "secondary"}
          onClick={() => fetchCourses()}
        >
          {isLoading ? (
            <Loader className="animate-spin" size={18} />
          ) : (
            <Paperclip />
          )}
          {isAttached ? (
            <p className="truncate max-w-12 xl:max-w-50">
              {selectedCourse?.title}
            </p>
          ) : (
            <p className="hidden xl:flex">Attach</p>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select course</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="min-h-18 w-full flex items-center justify-center">
            <Loader className="animate-spin" size={18} />
          </div>
        ) : (
          <div>
            <ul className="space-y-1">
              {courses.map((course) => (
                <li
                  key={course._id}
                  onClick={() => {
                    setSelectedCourse(course);
                    setIsAttached(true);
                  }}
                  className={`flex justify-between p-2 rounded hover:bg-secondary text-sm cursor-pointer ${
                    selectedCourse?._id === course._id ? "bg-secondary" : ""
                  }`}
                >
                  {course.customization.emoji} {course.title}
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(course?.createdAt), "P", {
                      locale: currentDateFnsLocale,
                    })}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <DialogFooter>
          <DialogClose type="button" asChild>
            <Button>Close</Button>
          </DialogClose>
          <Button
            variant={"destructive"}
            onClick={() => {
              setSelectedCourse(null);
              setIsAttached(false);
            }}
          >
            Deleted attachment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
