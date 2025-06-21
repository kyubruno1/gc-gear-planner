import styles from './header.module.css'

interface HeaderProps { }

export function Header(props: HeaderProps) {
  return (
    <nav>
      <ul className={styles.nav}>
        <li>Equip</li>
        <li>Visual</li>
        <li>Pet</li>
        <li>Runas</li>
      </ul>
    </nav>
  )
}