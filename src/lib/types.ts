export type ViewType = "daily" | "weekly" | "monthly"

export interface Appointment {
  id: string
  title: string
  patientName: string
  start: Date
  end: Date
  notes: string
  color: string
}

