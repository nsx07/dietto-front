"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Appointment } from "@/lib/types"

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: Appointment | null
  onSave: (appointment: Appointment) => void
  onDelete: (id: string) => void
}

export function AppointmentModal({ isOpen, onClose, appointment, onSave, onDelete }: AppointmentModalProps) {
  const [formData, setFormData] = useState<Appointment>({
    id: "",
    title: "",
    patientName: "",
    start: new Date(),
    end: new Date(),
    notes: "",
    color: "#3b82f6",
  })

  useEffect(() => {
    if (appointment) {
      setFormData(appointment)
    } else {
      // Set default times for new appointment
      const start = new Date()
      start.setHours(9, 0, 0, 0)
      const end = new Date()
      end.setHours(10, 0, 0, 0)

      setFormData({
        id: "",
        title: "",
        patientName: "",
        start,
        end,
        notes: "",
        color: "#3b82f6",
      })
    }
  }, [appointment, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const [hours, minutes] = value.split(":").map(Number)

    setFormData((prev) => {
      const newDate = new Date(name === "startTime" ? prev.start : prev.end)
      newDate.setHours(hours, minutes)

      return {
        ...prev,
        [name === "startTime" ? "start" : "end"]: newDate,
      }
    })
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const [year, month, day] = value.split("-").map(Number)

    setFormData((prev) => {
      const newStart = new Date(prev.start)
      newStart.setFullYear(year, month - 1, day)

      const newEnd = new Date(prev.end)
      newEnd.setFullYear(year, month - 1, day)

      return {
        ...prev,
        start: newStart,
        end: newEnd,
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleDelete = () => {
    if (appointment && appointment.id) {
      onDelete(appointment.id)
    }
  }

  const formatTimeForInput = (date: Date) => {
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
  }

  const formatDateForInput = (date: Date) => {
    return format(date, "yyyy-MM-dd")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{appointment ? "Edit Appointment" : "New Appointment"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Checkup"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="patientName" className="text-right">
                Patient
              </Label>
              <Input
                id="patientName"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                className="col-span-3"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formatDateForInput(formData.start)}
                onChange={handleDateChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startTime" className="text-right">
                Start Time
              </Label>
              <Input
                id="startTime"
                name="startTime"
                type="time"
                value={formatTimeForInput(formData.start)}
                onChange={handleTimeChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endTime" className="text-right">
                End Time
              </Label>
              <Input
                id="endTime"
                name="endTime"
                type="time"
                value={formatTimeForInput(formData.end)}
                onChange={handleTimeChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">
                Color
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  id="color"
                  name="color"
                  type="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-12 h-8 p-1"
                />
                <span className="text-sm text-muted-foreground">Appointment color</span>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Additional information..."
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            {appointment && (
              <Button type="button" variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            )}
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

