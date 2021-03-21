import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from '../../../helpers/db-util'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { eventId } = req.query

  let client
  try {
    client = await connectDatabase()
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' })
    return
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid Input.' })
      client.close()
      return
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    }

    let result
    try {
      result = await insertDocument(client, 'comments', newComment)
      newComment._id = result.insertedId
      res.status(201).json({ message: 'Comment Added.', comment: newComment })
    } catch (error) {
      res.status(500).json({ message: 'Inserting comment failed!' })
      return
    }
  }

  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(client, 'comments', { _id: -1 })
      res.status(200).json({ comments: documents })
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed!' })
      return
    }
  }
}

export default handler
