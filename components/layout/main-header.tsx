import Link from 'next/link'

import classes from './main-header.module.css'

function MainHeader() {
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <div className={classes.logo}>
          <Link href='/'>NextEvents</Link>
        </div>
        <nav className={classes.navigation}>
          <ul>
            <li>
              <Link href='/events'>Browse All Events</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default MainHeader
