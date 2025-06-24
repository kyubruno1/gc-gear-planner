import styles from './Header.module.css'

interface HeaderProps { }

export function Header(props: HeaderProps) {
  return (
    <nav>
      <ul className={styles.nav}>
        <li>Equip</li>
        <li>Visual</li>
        <li>Pet</li>
        <li>Runas</li>
        <li>Títulos</li>
        <li>Coleção</li>
      </ul>
    </nav>
  )
}