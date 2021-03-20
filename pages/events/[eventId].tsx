import classes from '*.module.css'
import { NextPage, GetStaticPathsResult, GetStaticPropsResult } from 'next'
import React, { Fragment } from 'react'

import EventContent from '../../components/event-detail/event-content'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventSummary from '../../components/event-detail/event-summary'
import { getFeaturedEvents } from '../../dummy-data'
import { getEventById } from '../../helpers/api-util'
import { IEvent } from '../../helpers/interfaces'

interface IEventDetailProps {
  selectedEvent?: IEvent
}

const EventDetailPage: NextPage<IEventDetailProps> = (props) => {
  const { selectedEvent } = props
  if (!selectedEvent)
    return (
      <div className='center'>
        <p className='center'>Loading...</p>
      </div>
    )

  return (
    <Fragment>
      <EventSummary title={selectedEvent.title} />
      <EventLogistics
        date={selectedEvent.date}
        address={selectedEvent.location}
        image={selectedEvent.image}
        imageAlt={selectedEvent.title}
      />
      <EventContent>
        <p>{selectedEvent.description}</p>
      </EventContent>
    </Fragment>
  )
}

export default EventDetailPage

export const getStaticProps = async (context: {
  params: { eventId: string }
}): Promise<GetStaticPropsResult<IEventDetailProps>> => {
  const eventId = context.params.eventId

  const event = await getEventById(eventId)

  return {
    props: {
      selectedEvent: event,
    },
  }
}

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const events = await getFeaturedEvents()

  const paths = events.map((event) => ({
    params: {
      eventId: event.id,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}
