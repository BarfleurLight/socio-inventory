import cn from 'classnames'
import styles from './style.module.css'

const Button = ({
  children,
  href,
  clickHandler,
  className,
  disabled,
}) => {
  const classNames = cn(styles.button, className, {
    [styles.button_disabled]: disabled
  })
  return <button
    className={classNames}
    disabled={disabled}
    onClick={_ => clickHandler && clickHandler()}
  >
    {children}
  </button>
}


export default Button