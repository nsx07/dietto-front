import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable(props: { date: number; children: React.ReactNode; id: string }) {
  const { setNodeRef } = useDroppable({
    id: props.id,
    data: { date: props.date },
  });

  return <div ref={setNodeRef}>{props.children}</div>;
}
