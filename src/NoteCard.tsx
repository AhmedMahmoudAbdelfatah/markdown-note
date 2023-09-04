import { Badge, Card, Stack } from "react-bootstrap"
import { Tag } from "./App"
import { Link } from "react-router-dom"
import style from "./NoteList.module.css"

type NoteCardProps = {
  id: string,
  title: string,
  tags:Tag[]
}
export const NoteCard = (props: NoteCardProps) => {
  return (
    <Card as={Link} to={`/${props.id}`} className={`h-100 text-reset text-decoration-none ${style.card}`}>
      <Card.Body>
        <Stack gap={2} className="align-items-center justify-content-center h-100">
          <span className="fs-5">{ props.title }</span>
          {props.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap">
              {props.tags.map(tag => (
                <Badge key={tag.id} className="text-truncate">{ tag.label }</Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  )
}
