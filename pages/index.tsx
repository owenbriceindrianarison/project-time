import { GetStaticPropsResult, NextPage } from 'next'

import EventList from '../components/events/event-list'
import { getFeaturedEvents } from '../helpers/api-util'
import { IEvent } from '../helpers/interfaces'

interface IHomeProps {
  events?: Array<IEvent>
}

const HomePage: NextPage<{
  events: Array<IEvent>
}> = (props) => {
  return <div>{<EventList items={props.events} />}</div>
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
