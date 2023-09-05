import { Routes, Route, Navigate} from 'react-router-dom'
import { NewNote} from "./NewNote"
import Container from 'react-bootstrap/esm/Container'
import { useLocalStorage } from './useLocalStorage'
import { useMemo } from 'react'
import { v4 as uuidV4 } from "uuid"
import { NoteList } from './NoteList'
import { NoteLayout } from './NoteLayout'
import { Note } from './Note'
import { EditNote } from './EditNote'


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

  const onEditNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return prevNotes.map(note => {
        if (note.id === id) return { ...note, ...data, tagIds: tags.map(tag => tag.id) };
        return note;
      })
    });
  }

  const onDeleteNote = (id:string) => {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id);
    });
  }

  const onUpdateTag = (id: string, label: string) => {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) return { ...tag, label };
        return tag;
      })
    })
  }

  const onDeleteTag = (id: string) => {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id);
    });
  }

  return (
    <Container className='my-4'>
      <Routes>
        <Route
          path='/'
          element={
            <NoteList
              notes={notesWithTags}
              availableTags={tags}
              onUpdateTag={onUpdateTag}
              onDeleteTag={onDeleteTag}
            />
          }
        />
        <Route path='/new' element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />} />
        <Route path='/:id' element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={ onDeleteNote } />}></Route>
          <Route path='edit'
            element={
              <EditNote
                onSubmit={onEditNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path='*' element={ <Navigate to={"/"} replace/>}></Route>
      </Routes>
    </Container>
  )
}

export default App
