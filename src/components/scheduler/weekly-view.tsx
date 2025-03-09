"use client";

import { useRef, useCallback, useState, useMemo } from "react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { DndContext, type DragEndEvent, type DragStartEvent, PointerSensor, TouchSensor, MouseSensor, useSensor, useSensors, DragOverlay, defaultDropAnimation } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { ptBR } from "date-fns/locale/pt-BR";

import { cn } from "@/lib/utils";
import type { Appointment } from "@/lib/types";
import { AppointmentItem } from "./appointment-item";

interface WeeklyViewProps {
  date: Date;
  appointments: Appointment[];
  onAppointmentClick: (appointment: Appointment) => void;
  onMoveAppointment: (appointment: Appointment, newStart: Date, newEnd: Date) => void;
}

// Helper type for appointment positioning
interface PositionedAppointment {
  appointment: Appointment;
  column: number;
  columnSpan: number;
  columnCount: number;
  startPosition: number;
  duration: number;
}

export function WeeklyView({ date, appointments, onAppointmentClick, onMoveAppointment }: WeeklyViewProps) {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 }); // Start from Monday
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Get the active appointment
  const activeAppointment = activeId ? appointments.find((app) => app.id === activeId) : null;

  // Configure sensors for better cross-device compatibility
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 8,
      },
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Track drag start to update UI accordingly
  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  }, []);

  // Handle drag end with improved position calculation
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);

      if (!over) return;

      const appointment = appointments.find((app) => app.id === active.id);
      if (!appointment) return;

      try {
        const [dayIndex, hourStr, minuteStr] = over.id.toString().split("-");
        const day = Number.parseInt(dayIndex, 10);
        const hour = Number.parseInt(hourStr, 10);
        const minute = Number.parseInt(minuteStr, 10);

        if (isNaN(day) || isNaN(hour) || isNaN(minute)) {
          console.error("Invalid format from drop target:", over.id.toString());
          return;
        }

        // Create a new date object for the start time
        const newStart = new Date(weekStart);
        newStart.setDate(newStart.getDate() + day);
        newStart.setHours(hour, minute, 0, 0); // Set seconds and ms to 0 for consistency

        // Calculate the duration of the appointment in milliseconds
        const durationMs = appointment.end.getTime() - appointment.start.getTime();

        // Create a new date object for the end time
        const newEnd = new Date(newStart.getTime() + durationMs);

        // Call the onMoveAppointment function with the updated times
        onMoveAppointment(appointment, newStart, newEnd);
      } catch (error) {
        console.error("Error processing drag end:", error);
      }
    },
    [appointments, weekStart, onMoveAppointment]
  );

  // Group appointments by day and handle overlaps
  const positionedAppointmentsByDay = useMemo(() => {
    const result: Record<number, PositionedAppointment[]> = {};

    // Initialize empty arrays for each day
    for (let i = 0; i < 7; i++) {
      result[i] = [];
    }

    // Process each day's appointments
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const day = days[dayIndex];
      const dayAppointments = appointments.filter((app) => isSameDay(app.start, day));

      if (dayAppointments.length === 0) continue;

      // Sort appointments by start time
      const sortedAppointments = [...dayAppointments].sort((a, b) => a.start.getTime() - b.start.getTime());

      // Find overlapping appointment groups
      const overlappingGroups: Appointment[][] = [];
      let currentGroup: Appointment[] = [];

      sortedAppointments.forEach((appointment, index) => {
        if (index === 0) {
          currentGroup = [appointment];
          return;
        }

        const previousAppointment = sortedAppointments[index - 1];
        const previousEnd = previousAppointment.end;

        // Check if this appointment overlaps with the previous one
        if (appointment.start < previousEnd) {
          // Overlapping, add to current group
          currentGroup.push(appointment);
        } else {
          // Not overlapping, start a new group
          if (currentGroup.length > 0) {
            overlappingGroups.push([...currentGroup]);
          }
          currentGroup = [appointment];
        }

        // Handle the last appointment
        if (index === sortedAppointments.length - 1 && currentGroup.length > 0) {
          overlappingGroups.push([...currentGroup]);
        }
      });

      // If we only have one appointment, add it as a group
      if (sortedAppointments.length === 1) {
        overlappingGroups.push([sortedAppointments[0]]);
      }

      // Process each group to determine column positions
      overlappingGroups.forEach((group) => {
        // For each appointment in the group, determine its column
        const columns: Appointment[][] = [];

        group.forEach((appointment) => {
          // Find the first column where this appointment doesn't overlap
          let columnIndex = 0;
          let placed = false;

          while (!placed && columnIndex < columns.length) {
            const column = columns[columnIndex];
            const lastAppointmentInColumn = column[column.length - 1];

            if (appointment.start >= lastAppointmentInColumn.end) {
              // This appointment can be placed in this column
              column.push(appointment);
              placed = true;
            } else {
              // Try the next column
              columnIndex++;
            }
          }

          if (!placed) {
            // Create a new column for this appointment
            columns.push([appointment]);
          }
        });

        // Now that we have columns, create positioned appointments
        columns.forEach((column, columnIndex) => {
          column.forEach((appointment) => {
            const startHour = appointment.start.getHours();
            const startMinute = appointment.start.getMinutes();
            const endHour = appointment.end.getHours();
            const endMinute = appointment.end.getMinutes();

            // Calculate position and duration
            const startPosition = (startHour - 8) * 80 + (startMinute / 60) * 80 - 48;
            const duration = (((endHour - startHour) * 60 + (endMinute - startMinute)) / 60) * 80;

            result[dayIndex].push({
              appointment,
              column: columnIndex,
              columnSpan: 1,
              columnCount: columns.length,
              startPosition,
              duration,
            });
          });
        });
      });
    }

    return result;
  }, [appointments, days]);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
      <div className="grid grid-cols-[60px_1fr] sm:grid-cols-[80px_1fr] h-full">
        <div className="border-r">
          <div className="h-12 border-b"></div>
          {hours.map((hour) => (
            <div key={hour} className="h-20 border-b flex items-center justify-center">
              <span className="text-xs sm:text-sm text-muted-foreground">{hour}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7" ref={containerRef}>
          {days.map((day, dayIndex) => (
            <div key={dayIndex} className="border-r last:border-r-0">
              <div className="h-12 border-b flex flex-col items-center justify-center">
                <span className="text-xs sm:text-sm font-medium capitalize">{format(day, "EEE", { locale: ptBR })}</span>
                <span className={cn("text-xs sm:text-sm mt-1 h-6 w-6 flex items-center justify-center rounded-full", isSameDay(day, new Date()) && "bg-primary text-primary-foreground")}>
                  {format(day, "d", { locale: ptBR })}
                </span>
              </div>
              <div className="relative">
                {hours.map((hour) => (
                  <div key={hour} className="h-20 border-b">
                    {[0, 15, 30, 45].map((minute) => (
                      <div
                        key={`${dayIndex}-${hour}-${minute}`}
                        id={`${dayIndex}-${hour}-${minute}`}
                        className={cn("h-5 border-t border-dashed border-muted last:border-b-0", activeId && "hover:bg-muted/30 transition-colors")}
                      ></div>
                    ))}
                  </div>
                ))}

                {/* Appointments container with improved positioning */}
                <div className="absolute inset-0 pointer-events-none">
                  {positionedAppointmentsByDay[dayIndex]?.map(({ appointment, column, columnCount, startPosition, duration }) => {
                    // Skip rendering the active appointment (it will be in the overlay)
                    if (activeId === appointment.id) return null;

                    // Calculate width based on column count
                    const columnWidth = 100 / columnCount;
                    const leftPosition = column * columnWidth;

                    return (
                      <AppointmentItem
                        key={appointment.id}
                        appointment={appointment}
                        onClick={() => onAppointmentClick(appointment)}
                        style={{
                          position: "absolute",
                          top: `${startPosition + 48}px`, // 48px for the header
                          height: `${Math.max(20, duration)}px`, // Ensure minimum height
                          left: `${leftPosition}%`,
                          width: `${columnWidth}%`,
                          paddingLeft: "2px",
                          paddingRight: "2px",
                          zIndex: 10,
                          pointerEvents: "auto",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          ))}

          {/* Drag overlay for smoother dragging experience */}
          <DragOverlay
            dropAnimation={{
              ...defaultDropAnimation,
              duration: 150,
            }}
          >
            {activeId && activeAppointment && (
              <div
                className="opacity-80 pointer-events-none"
                style={{
                  width: "calc(100% / 7 - 4px)",
                }}
              >
                <AppointmentItem appointment={activeAppointment} onClick={() => {}} isDragOverlay />
              </div>
            )}
          </DragOverlay>
        </div>
      </div>
    </DndContext>
  );
}
