import React, { useRef } from 'react'

import classes from './newsletter-registration.module.css'

const NewsletterRegistration: React.FC = () => {
  const emailInputRef = useRef()

  const registrationHandler = async (event) => {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value

    const response = await fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    console.log(data)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            ref={emailInputRef}
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  )
}

export default NewsletterRegistration
