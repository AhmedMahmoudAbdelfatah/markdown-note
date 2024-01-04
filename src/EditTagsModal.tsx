import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap"
import { Tag } from "./App"

type EditTagsModalProps = {
  onUpdateTag: (id: string, label: string) => void,
  onDeleteTag: (id: string) => void,
  availableTags: Tag[],
  show: boolean,
  onClose: () => void
}

export const EditTagsModal = (props: EditTagsModalProps) => {
  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {props.availableTags.map(tag => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control type="text" value={tag.label} onChange={(e) => props.onUpdateTag(tag.id, e.target.value)}/>
                </Col>
                <Col xs="auto">
                  <Button variant="outline-danger" onClick={() => props.onDeleteTag(tag.id)}>&times;</Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
