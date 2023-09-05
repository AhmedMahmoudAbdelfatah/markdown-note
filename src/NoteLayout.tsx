import { Navigate, Outlet, useParams } from "react-router-dom"
import { Note } from "./App"

type NoteLayoutProps = {
  notes: Note[]
}

export const NoteLayout = (props: NoteLayoutProps) => {
  const { id } = useParams();
  const note = props.notes.find(note => note.id === id);

  if (note == null) return <Navigate to={"/"} replace />
  
  return (
    <Outlet context={ note }/>
  )
}


