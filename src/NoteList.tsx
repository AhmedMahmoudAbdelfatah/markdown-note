import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Tag } from "./App";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { useState } from "react";

type NodeListProps = {
  notes: Note[],
  availableTags: Tag[]
}

type Note = {
  tags: Tag[];
  id: string;
  title: string;
  markdown: string;
  tagIds: string[];
}

export const NoteList = (props: NodeListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col><h1>Notes { props.notes[0]?.title }</h1></Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}> 
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button variant="outline-secondary">Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                value={selectedTags.map(tag => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={tags => {
                  setSelectedTags(tags.map(tag => {
                    return { label: tag.label, id: tag.value };
                  }))
                }}

                options={props.availableTags.map(tag => {
                  return {label: tag.label, value: tag.id}
                })}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  )
}
