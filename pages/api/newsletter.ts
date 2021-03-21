import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import { connectDatabase, insertDocument } from '../../helpers/db-util'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    const userEmail = req.body.email

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' })
      return
    }

    let client

    try {
      client = await connectDatabase()
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' })
      return
    }

    try {
      await insertDocument(client, 'newsletter', { email: userEmail })
      client.close()
    } catch (error) {
      res.status(201).json({ message: 'Signed Up!' })
      return
    }
  }
}

export default handler
