import { Routes, Route} from 'react-router-dom'
import { NewNote} from "./NewNote"
import Container from 'react-bootstrap/esm/Container'
import { useLocalStorage } from './useLocalStorage'
import { useMemo } from 'react'
import { v4 as uuidV4 } from "uuid"
import { NoteList } from './NoteList'


export type Tag = {
  id: string,
  label: string
}

export type NoteData = {
  title: string,
  markdown: string,
  tags: Tag[]
}

export type Note = { id: string } & NoteData;

export type RawNoteData = {
  title: string,
  markdown: string,
  tagIds: string[]
}

export type RawNote = {
  id: string
} & RawNoteData


function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags]);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return [ ...prevNotes, {...data, tagIds: tags.map(tag => tag.id), id: uuidV4()} ];
    });
  }

  const addTag = (tag: Tag) => {
    setTags(prev => [...prev, tag]);
  }

  return (
    <Container className='my-4'>
      <Routes>
        <Route path='/' element={<NoteList notes={ notesWithTags } availableTags={tags}/>} />
        <Route path='/new' element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={ tags } />} />
      </Routes>
    </Container>
  )
}

export default App
