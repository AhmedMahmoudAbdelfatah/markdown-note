import { NoteData, Tag } from "./App"
import { NoteForm } from "./NoteForm"
import { useNote } from "./useNote"

type NewNoteProps = {
  onSubmit: (id: string , data: NoteData) => void,
  onAddTag: (tag: Tag) => void,
  availableTags: Tag[]
}

export const EditNote = (props: NewNoteProps) => {
  const note = useNote();

  return (
    <>
      <h1 className='mb-4'>Edit Note</h1>
      <NoteForm
        onSubmit={data => props.onSubmit(note.id, data)}
        onAddTag={props.onAddTag}
        availableTags={props.availableTags}
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
      />
    </>
  )
}
