"use client";

import { useRef, useCallback, useState } from "react";
import { DndContext, type DragEndEvent, type DragStartEvent, PointerSensor, TouchSensor, MouseSensor, useSensor, useSensors, DragOverlay, defaultDropAnimation } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import type { Appointment } from "@/lib/types";
import { AppointmentItem } from "./appointment-item";
import { cn } from "@/lib/utils";

interface DailyViewProps {
  date: Date;
  appointments: Appointment[];
  onAppointmentClick: (appointment: Appointment) => void;
  onMoveAppointment: (appointment: Appointment, newStart: Date, newEnd: Date) => void;
}

export function DailyView({ date, appointments, onAppointmentClick, onMoveAppointment }: DailyViewProps) {
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Get the active appointment
  const activeAppointment = activeId ? appointments.find((app) => app.id === activeId) : null;

  // Configure sensors for better cross-device compatibility
  const sensors = useSensors(
    // Mouse sensor with better delay handling
    useSensor(MouseSensor, {
      // Prevent accidental drags when clicking
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    // Touch sensor optimized for mobile
    useSensor(TouchSensor, {
      // Require a small movement to start drag (prevents accidental drags)
      activationConstraint: {
        delay: 250,
        tolerance: 8,
      },
    }),
    // Pointer sensor as fallback
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
        const timeSlot = over.id.toString();
        const [hourStr, minuteStr] = timeSlot.split(":");
        const hour = Number.parseInt(hourStr, 10);
        const minute = Number.parseInt(minuteStr, 10);

        if (isNaN(hour) || isNaN(minute)) {
          console.error("Invalid time format from drop target:", timeSlot);
          return;
        }

        // Create a new date object for the start time
        const newStart = new Date(date);
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
    [appointments, date, onMoveAppointment]
  );

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
      <div className="grid grid-cols-[60px_1fr] sm:grid-cols-[80px_1fr] h-full">
        <div className="border-r">
          {hours.map((hour) => (
            <div key={hour} className="h-20 border-b flex items-center justify-center">
              <span className="text-xs sm:text-sm text-muted-foreground">{hour}</span>
            </div>
          ))}
        </div>
        <div className="relative" ref={containerRef}>
          {hours.map((hour) => (
            <div key={hour} className="h-20 border-b">
              {[0, 15, 30, 45].map((minute) => (
                <div
                  key={`${hour}:${minute}`}
                  id={`${hour}:${minute}`}
                  className={cn(
                    "h-5 border-t border-dashed border-muted last:border-b-0",
                    // Highlight drop targets during drag for better UX
                    activeId && "hover:bg-muted/30 transition-colors"
                  )}
                ></div>
              ))}
            </div>
          ))}

          {/* Appointments container with improved styling */}
          <div className="absolute inset-0 pointer-events-none">
            {appointments.map((appointment) => {
              const startHour = appointment.start.getHours();
              const startMinute = appointment.start.getMinutes();
              const endHour = appointment.end.getHours();
              const endMinute = appointment.end.getMinutes();

              const startPosition = (startHour - 8) * 80 + (startMinute / 60) * 80;
              const duration = (((endHour - startHour) * 60 + (endMinute - startMinute)) / 60) * 80;

              return (
                <AppointmentItem
                  key={appointment.id}
                  appointment={appointment}
                  onClick={() => onAppointmentClick(appointment)}
                  style={{
                    position: "absolute",
                    top: `${startPosition}px`,
                    height: `${duration}px`,
                    left: "4px",
                    right: "4px",
                    zIndex: 10,
                    pointerEvents: "auto",
                  }}
                />
              );
            })}
          </div>

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
                  width: "calc(100% - 8px)",
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
