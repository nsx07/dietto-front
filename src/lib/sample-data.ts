import { addDays, setHours, setMinutes } from "date-fns"
import type { Appointment } from "./types"

export function generateSampleAppointments(): Appointment[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const colors = [
    "#3b82f6", // blue
    "#10b981", // green
    "#f59e0b", // amber
    "#ef4444", // red
    "#8b5cf6", // violet
  ]

  const appointments: Appointment[] = [
    {
      id: "1",
      title: "Annual Checkup",
      patientName: "John Smith",
      start: setHours(setMinutes(today, 0), 9),
      end: setHours(setMinutes(today, 30), 10),
      notes: "Regular annual physical examination",
      color: colors[0],
    },
    {
      id: "2",
      title: "Follow-up Consultation",
      patientName: "Emma Johnson",
      start: setHours(setMinutes(today, 0), 11),
      end: setHours(setMinutes(today, 45), 11),
      notes: "Follow-up on medication adjustment",
      color: colors[1],
    },
    {
      id: "3",
      title: "Vaccination",
      patientName: "Michael Brown",
      start: setHours(setMinutes(today, 0), 14),
      end: setHours(setMinutes(today, 15), 14),
      notes: "Flu shot",
      color: colors[2],
    },
    {
      id: "4",
      title: "Therapy Session",
      patientName: "Sarah Wilson",
      start: setHours(setMinutes(addDays(today, 1), 10), 10),
      end: setHours(setMinutes(addDays(today, 1), 0), 11),
      notes: "Weekly therapy session",
      color: colors[3],
    },
    {
      id: "5",
      title: "Lab Results Review",
      patientName: "David Lee",
      start: setHours(setMinutes(addDays(today, 1), 15), 13),
      end: setHours(setMinutes(addDays(today, 1), 45), 13),
      notes: "Review recent blood work results",
      color: colors[4],
    },
    {
      id: "6",
      title: "New Patient Consultation",
      patientName: "Jennifer Garcia",
      start: setHours(setMinutes(addDays(today, 2), 0), 9),
      end: setHours(setMinutes(addDays(today, 2), 0), 10),
      notes: "Initial consultation for new patient",
      color: colors[0],
    },
    {
      id: "7",
      title: "Prescription Renewal",
      patientName: "Robert Martinez",
      start: setHours(setMinutes(addDays(today, 2), 30), 11),
      end: setHours(setMinutes(addDays(today, 2), 0), 12),
      notes: "Medication review and prescription renewal",
      color: colors[1],
    },
    {
      id: "8",
      title: "Physical Therapy",
      patientName: "Lisa Anderson",
      start: setHours(setMinutes(addDays(today, 3), 0), 15),
      end: setHours(setMinutes(addDays(today, 3), 0), 16),
      notes: "Shoulder rehabilitation session",
      color: colors[2],
    },
    {
      id: "9",
      title: "Dermatology Consultation",
      patientName: "Thomas White",
      start: setHours(setMinutes(addDays(today, 4), 30), 10),
      end: setHours(setMinutes(addDays(today, 4), 0), 11),
      notes: "Skin condition assessment",
      color: colors[3],
    },
    {
      id: "10",
      title: "Pediatric Checkup",
      patientName: "Olivia Harris",
      start: setHours(setMinutes(addDays(today, 4), 0), 14),
      end: setHours(setMinutes(addDays(today, 4), 30), 14),
      notes: "Regular growth and development checkup",
      color: colors[4],
    },
  ]

  return appointments
}

