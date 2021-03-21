import { GetStaticPropsResult, NextPage } from 'next'
import Head from 'next/head'

import EventList from '../components/events/event-list'
import NewsletterRegistration from '../components/input/newsletter-registration'
import { getFeaturedEvents } from '../helpers/api-util'
import { IEvent } from '../helpers/interfaces'

interface IHomeProps {
  events?: Array<IEvent>
}

const HomePage: NextPage<{
  events: Array<IEvent>
}> = (props) => {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  )
}

export default HomePage

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<IHomeProps>
> => {
  const featuredEvent = await getFeaturedEvents()

  return {
    props: {
      events: featuredEvent,
    },
    revalidate: 1800,
  }
}
