import EventItem from './event-item'

import classes from './event-list.module.css'

interface ItemInterface {
  id: string
  title: string
  image: string
  date: string
  location: string
}

const EventList = (props: { items: Array<ItemInterface> }) => {
  const { items } = props

  if (items && items.length > 0) {
    return (
      <ul className={classes.list}>
        {items.map((event: ItemInterface) => (
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

  return <div>Items not founs</div>
}

export default EventList
