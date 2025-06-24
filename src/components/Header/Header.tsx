import { NavLink } from 'react-router'
import styles from './Header.module.css'

interface HeaderProps { }

export function Header(props: HeaderProps) {
  return (
    <nav>
      <ul className={styles.nav}>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>Equip</NavLink>
        </li>
        <li>
          <NavLink to="/visual" className={({ isActive }) => isActive ? styles.active : ''}>Visual</NavLink>
        </li>
        <li>
          <NavLink to="/pet" className={({ isActive }) => isActive ? styles.active : ''}>Pet</NavLink>
        </li>
        <li>
          <NavLink to="/runas" className={({ isActive }) => isActive ? styles.active : ''}>Runas</NavLink>
        </li>
        <li>
          <NavLink to="/titulos" className={({ isActive }) => isActive ? styles.active : ''}>Títulos</NavLink>
        </li>
        <li>
          <NavLink to="/colecao" className={({ isActive }) => isActive ? styles.active : ''}>Coleção</NavLink>
        </li>
      </ul>
    </nav>
  )
}