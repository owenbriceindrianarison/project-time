import Link from 'next/link'
import classes from './button.module.css'

const Button = (props: {
  link?: string
  children: any
  onClick?: () => {}
}) => {
  if (props.link) {
    return (
      <Link href={props.link}>
        <a className={classes.btn}>{props.children}</a>
      </Link>
    )
  }

  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Button
