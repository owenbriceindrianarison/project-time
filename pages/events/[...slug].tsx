import { GetServerSidePropsResult, NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'

import EventsList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'
import { getFilteredEvents } from '../../helpers/api-util'
import { IEvent } from '../../helpers/interfaces'

interface IFilteredEvents {
  events?: Array<IEvent>
  hasError?: boolean
  date?: {
    year: number
    month: number
  }
}

const FilteredEventsPage: NextPage<IFilteredEvents> = (props) => {
  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name='description'
        content={`All Events for ${props.date?.month}/${props.date?.year}`}
      />
    </Head>
  )

  if (props.hasError) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p className='center'>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  let pageResult
  if (props.date) {
    const date = new Date(props.date?.year, props.date?.month - 1)
    pageResult = <ResultsTitle date={date} />
  }

  return (
    <Fragment>
      {pageHeadData}
      {pageResult}
      <EventsList items={props.events} />
    </Fragment>
  )
}

export const getServerSideProps = async (context: {
  params: { slug: Array<string> }
}): Promise<GetServerSidePropsResult<IFilteredEvents>> => {
  const { params } = context

  const filterData = params.slug

  const filteredYear = filterData[0]
  const filteredMonth = filterData[1]

  const numYear = parseInt(filteredYear)
  const numMonth = parseInt(filteredMonth)

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: true },
      // notFound: true,
      // redirect: {
      //   destination: '/error',
      // },
    }
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  })

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  }
}

export default FilteredEventsPage
