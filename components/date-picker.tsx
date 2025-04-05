"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { SetStateAction, useState } from "react";
import { CalendarX } from "lucide-react";

export function DatePicker() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar
          classNames={{ day_selected: "bg-[red]" }}
          modifiers={{
            eventDay: new Date(2025, 2, 3),
          }}
          modifiersClassNames={{
            eventDay:
              "relative after:content-['•'] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:text-red-500",
          }}
          className="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]"
          selected={selectedDate}
          onSelect={(date: SetStateAction<Date | undefined>) => {
            setSelectedDate(date);
          }}
          mode="single"
        />
        <SidebarSeparator className="mx-0" />
        {selectedDate && (
          <>
            <div className="w-full p-4">
              <p className="text-sm text-muted-foreground">
                On {selectedDate?.toLocaleDateString()}
              </p>
            </div>
            <div className="w-full flex justify-center items-center">
              <div className="p-1">
                <CalendarX size={16} />
              </div>
              No events found.
            </div>
          </>
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
