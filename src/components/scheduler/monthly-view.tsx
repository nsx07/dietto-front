"use client";
import { format, startOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addDays } from "date-fns";

import { cn } from "@/lib/utils";
import type { Appointment } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ptBR } from "date-fns/locale/pt-BR";

interface MonthlyViewProps {
  date: Date;
  appointments: Appointment[];
  onAppointmentClick: (appointment: Appointment) => void;
  onCreateAppointment: (appointment: Appointment | null) => void;
}

export function MonthlyView({ date, appointments, onAppointmentClick, onCreateAppointment }: MonthlyViewProps) {
  const monthStart = startOfMonth(date);
  const startDate = addDays(monthStart, -monthStart.getDay() + (monthStart.getDay() === 0 ? -6 : 1));

  // Generate 6 weeks (42 days) starting from the adjusted start date
  const days = eachDayOfInterval({
    start: startDate,
    end: addDays(startDate, 41),
  });

  const getAppointmentsForDay = (day: Date) => {
    return appointments.filter((app) => isSameDay(app.start, day));
  };

  const handleDayClick = (day: Date) => {
    const newAppointment: Appointment = {
      id: "",
      title: "",
      patientName: "",
      start: new Date(day.setHours(9, 0, 0)),
      end: new Date(day.setHours(10, 0, 0)),
      notes: "",
      color: "#3b82f6",
    };
    onCreateAppointment(newAppointment);
  };

  return (
    <div className="grid grid-cols-7 h-full">
      {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => (
        <div key={day} className="h-12 border-b flex items-center justify-center">
          <span className="text-sm font-medium">{day}</span>
        </div>
      ))}

      {days.map((day, i) => {
        const dayAppointments = getAppointmentsForDay(day);
        const isCurrentMonth = isSameMonth(day, date);
        const isToday = isSameDay(day, new Date());

        return (
          <div key={i} className={cn("border-r border-b last:border-r-0 min-h-[120px] p-1", !isCurrentMonth && "bg-muted/30")} onClick={() => handleDayClick(day)}>
            <div className="flex justify-end">
              <span className={cn("text-sm h-7 w-7 flex items-center justify-center rounded-full", isToday && "bg-primary text-primary-foreground")}>{format(day, "d", { locale: ptBR })}</span>
            </div>

            <ScrollArea className="h-[calc(100%-28px)]">
              <div className="space-y-1 mt-1">
                {dayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="text-xs p-1 rounded cursor-pointer"
                    style={{ backgroundColor: `${appointment.color}20` }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAppointmentClick(appointment);
                    }}
                  >
                    <div className="font-medium truncate">
                      {format(appointment.start, "HH:mm", { locale: ptBR })} - {appointment.patientName}
                    </div>
                    <div className="truncate">{appointment.title}</div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        );
      })}
    </div>
  );
}
