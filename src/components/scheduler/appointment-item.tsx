"use client";

import { memo } from "react";
import type { CSSProperties } from "react";
import { format } from "date-fns";
import { useDraggable } from "@dnd-kit/core";

import { cn } from "@/lib/utils";
import type { Appointment } from "@/lib/types";

interface AppointmentItemProps {
  appointment: Appointment;
  onClick: () => void;
  style?: CSSProperties;
  isDragOverlay?: boolean;
}

export const AppointmentItem = memo(function AppointmentItem({ appointment, onClick, style, isDragOverlay = false }: AppointmentItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: appointment.id,
    // Disable draggable when used as overlay
    disabled: isDragOverlay,
  });

  // Optimize transform for better performance
  const draggableStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 999,
        opacity: 0.8,
        // Use hardware acceleration
        willChange: "transform",
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        ...style,
        ...draggableStyle,
      }}
      className={cn(
        "rounded cursor-move overflow-hidden touch-manipulation",
        isDragging ? "opacity-50" : "opacity-100",
        // Add shadow and transition for better visual feedback
        "shadow-sm transition-shadow duration-200",
        isDragging && "shadow-md",
        // Prevent text selection during drag
        "select-none"
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      // Improve accessibility
      aria-label={`Appointment: ${appointment.title} with ${appointment.patientName} at ${format(appointment.start, "HH:mm")}`}
      role="button"
      tabIndex={0}
      // Handle keyboard events for accessibility
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div
        className={cn(
          "h-full rounded p-1 overflow-hidden",
          // Add hover effect for better UX
          "hover:brightness-95 transition-all",
          // Ensure text is readable
          "flex flex-col justify-between"
        )}
        style={{
          backgroundColor: `${appointment.color}20`,
          borderLeft: `3px solid ${appointment.color}`,
        }}
      >
        <div className="min-w-0">
          <div className="font-medium text-xs truncate">{appointment.patientName}</div>
          <div className="text-xs truncate">{appointment.title}</div>
        </div>
        <div className="text-xs mt-1 text-muted-foreground truncate">
          {format(appointment.start, "HH:mm")} - {format(appointment.end, "HH:mm")}
        </div>
      </div>
    </div>
  );
});
