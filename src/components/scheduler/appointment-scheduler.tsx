"use client";

import { useState, useCallback, useMemo } from "react";
import { format, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameMonth, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DailyView } from "./daily-view";
import { WeeklyView } from "./weekly-view";
import { MonthlyView } from "./monthly-view";
import { AppointmentModal } from "./appointment-modal";
import type { Appointment, ViewType } from "@/lib/types";
import { generateSampleAppointments } from "@/lib/sample-data";
import { ptBR } from "date-fns/locale/pt-BR";

export function AppointmentScheduler() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>("daily");
  const [appointments, setAppointments] = useState<Appointment[]>(generateSampleAppointments());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Memoize filtered appointments for better performance
  const filteredAppointments = useMemo(() => {
    if (view === "daily") {
      return appointments.filter((app) => isSameDay(app.start, currentDate));
    } else if (view === "weekly") {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 });
      const end = endOfWeek(currentDate, { weekStartsOn: 1 });
      return appointments.filter((app) => app.start >= start && app.start <= end);
    } else {
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      return appointments.filter((app) => isSameMonth(app.start, currentDate) || (app.start >= start && app.start <= end));
    }
  }, [appointments, currentDate, view]);

  // Navigation handlers
  const handlePrevious = useCallback(() => {
    setCurrentDate((prev) => {
      if (view === "daily") return addDays(prev, -1);
      if (view === "weekly") return addDays(prev, -7);
      return new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
    });
  }, [view]);

  const handleNext = useCallback(() => {
    setCurrentDate((prev) => {
      if (view === "daily") return addDays(prev, 1);
      if (view === "weekly") return addDays(prev, 7);
      return new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
    });
  }, [view]);

  const handleToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  // Appointment handlers
  const handleOpenModal = useCallback((appointment: Appointment | null = null) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  }, []);

  const handleSaveAppointment = useCallback((appointment: Appointment) => {
    setAppointments((prev) => {
      if (appointment.id) {
        // Update existing appointment
        return prev.map((app) => (app.id === appointment.id ? appointment : app));
      } else {
        // Add new appointment with generated ID
        return [...prev, { ...appointment, id: Date.now().toString() }];
      }
    });
    setIsModalOpen(false);
  }, []);

  const handleDeleteAppointment = useCallback((id: string) => {
    setAppointments((prev) => prev.filter((app) => app.id !== id));
    setIsModalOpen(false);
  }, []);

  const handleMoveAppointment = useCallback((appointment: Appointment, newStart: Date, newEnd: Date) => {
    setAppointments((prev) =>
      prev.map((app) => {
        if (app.id === appointment.id) {
          return { ...app, start: newStart, end: newEnd };
        }
        return app;
      })
    );
  }, []);

  // Format date range text
  const dateRangeText = useMemo(() => {
    if (view === "daily") {
      return format(currentDate, "d/MMMM/yyyy", { locale: ptBR });
    } else if (view === "weekly") {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 });
      const end = endOfWeek(currentDate, { weekStartsOn: 1 });
      return `${format(start, "d MMM", { locale: ptBR })} - ${format(end, "d/MMM/yyyy", { locale: ptBR })}`;
    } else {
      return format(currentDate, "MMMM yyyy", { locale: ptBR });
    }
  }, [currentDate, view]);

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b">
        <div className="flex items-center mb-4 sm:mb-0">
          <Button variant="outline" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNext} className="ml-2">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={handleToday} className="ml-2">
            Hoje
          </Button>
          <h2 className="text-xl font-semibold ml-4 capitalize">{dateRangeText}</h2>
        </div>
        <div className="flex items-center">
          <Tabs value={view} onValueChange={(v) => setView(v as ViewType)} className="mr-4">
            <TabsList>
              <TabsTrigger value="daily">Dia</TabsTrigger>
              <TabsTrigger value="weekly">Semana</TabsTrigger>
              <TabsTrigger value="monthly">Mês</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={() => handleOpenModal()}>
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {view === "daily" && <DailyView date={currentDate} appointments={filteredAppointments} onAppointmentClick={handleOpenModal} onMoveAppointment={handleMoveAppointment} />}
        {view === "weekly" && <WeeklyView date={currentDate} appointments={filteredAppointments} onAppointmentClick={handleOpenModal} onMoveAppointment={handleMoveAppointment} />}
        {view === "monthly" && <MonthlyView date={currentDate} appointments={filteredAppointments} onAppointmentClick={handleOpenModal} onCreateAppointment={handleOpenModal} />}
      </div>

      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} appointment={selectedAppointment} onSave={handleSaveAppointment} onDelete={handleDeleteAppointment} />
    </div>
  );
}
