export interface IEvent {
  id: string
  title: string
  description: string
  location: string
  image: string
  date: string
  isFeatured: boolean
}

export interface IComment {
  id: string
  email: string
  name: string
  text: string
}
