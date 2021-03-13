import classes from './error-alert.module.css'

function ErrorAlert(props: { children: any }) {
  return <div className={classes.alert}>{props.children}</div>
}

export default ErrorAlert
