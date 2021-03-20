import { IEvent } from './interfaces'

export const getAllEvents = async (): Promise<Array<IEvent>> => {
  const response = await fetch(
    'https://project-time-24e7e-default-rtdb.europe-west1.firebasedatabase.app/events.json'
  )

  const data = await response.json()

  const events = []

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    })
  }

  return events
}

export const getFeaturedEvents = async (): Promise<Array<IEvent>> => {
  const allEvents = await getAllEvents()
  return allEvents.filter((event) => event.isFeatured)
}

export const getEventById = async (id: string): Promise<IEvent | undefined> => {
  const allEvents = await getAllEvents()
  return allEvents.find((event) => event.id === id)
}

export const getFilteredEvents = async (dateFilter) => {
  const { year, month } = dateFilter

  const allEvents = await getAllEvents()

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    )
  })

  return filteredEvents
}
