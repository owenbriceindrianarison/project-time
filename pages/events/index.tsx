import { GetStaticPropsResult, NextPage } from 'next'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'
import { getAllEvents } from '../../helpers/api-util'
import { IEvent } from '../../helpers/interfaces'

interface IAllEvent {
  events?: Array<IEvent>
}

const AllEventsPage: NextPage<IAllEvent> = (props) => {
  const router = useRouter()

  const { events } = props

  const findEventsHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  )
}

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<IAllEvent>
> => {
  const events = await getAllEvents()

  return {
    props: {
      events,
    },
    revalidate: 60,
  }
}

export default AllEventsPage
