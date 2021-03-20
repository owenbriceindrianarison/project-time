import { IEvent } from '../../helpers/interfaces'
import ErrorAlert from '../ui/error-alert'
import EventItem from './event-item'
import classes from './event-list.module.css'

const EventList = (props: { items?: Array<IEvent> }) => {
  const { items } = props

  if (items && items.length > 0) {
    return (
      <ul className={classes.list}>
        {items.map((event: IEvent) => (
          <EventItem
            key={event.id}
            id={event.id}
            title={event.title}
            location={event.location}
            date={event.date}
            image={event.image}
          />
        ))}
      </ul>
    )
  }

  return <ErrorAlert>Items not found</ErrorAlert>
}

export default EventList
