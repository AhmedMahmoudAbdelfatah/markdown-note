import { FormEvent, useRef, useState } from "react"
import { Col, Form, Row, Stack, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import CreateableReactSelect from "react-select/creatable"
import { NoteData, Tag } from "./App"
import { v4 as uuidV4 } from "uuid"


type NoteFormProps = {
  onSubmit: (data: NoteData) => void,
  onAddTag: (tag: Tag) => void,
  availableTags: Tag[]
}

export const NoteForm = (props: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.onSubmit({ title: titleRef.current!.value, markdown: markdownRef.current!.value, tags: tags });
    navigate("..");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control required ref={titleRef}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreateableReactSelect
                isMulti
                value={tags.map(tag => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={tags => {
                  setTags(tags.map(tag => {
                    return { label: tag.label, id: tag.value };
                  }))
                }}
                onCreateOption={label => {
                  const newTag = { id: uuidV4(), label }
                  props.onAddTag(newTag);
                  setTags(prev => [...prev, newTag]);
                }}
                options={props.availableTags.map(tag => {
                  return {label: tag.label, value: tag.id}
                })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="markdown">
              <Form.Label>Body</Form.Label>
              <Form.Control required as="textarea" rows={15} ref={markdownRef}/>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Stack direction="horizontal" gap={3} className="justify-content-end">
            <Button type="submit" variant="primary">Save</Button>
            <Button type="button" variant="outline-secondary" onClick={() => navigate("..")}>Cancel</Button>
          </Stack>
        </Row>
      </Stack>
    </Form> 
  )
}
