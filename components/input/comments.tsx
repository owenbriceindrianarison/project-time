import { stringify } from 'node:querystring'
import React, { useEffect, useState } from 'react'

import { IComment } from '../../helpers/interfaces'
import CommentList from './comment-list'
import classes from './comments.module.css'
import NewComment from './new-comment'

const Comments: React.FC<{ eventId: string }> = (props) => {
  const { eventId } = props

  const [showComments, setShowComments] = useState<boolean>(false)
  const [comments, setComments] = useState<Array<IComment>>([])

  useEffect(() => {
    fetch('/api/comments/' + eventId)
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments)
      })
  }, [showComments])

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus)
  }

  const addCommentHandler = async (commentData: string) => {
    // send data to API
    const response = await fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    console.log(data)
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  )
}

export default Comments
