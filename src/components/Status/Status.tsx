import { CharacterStatus, useAtkTotal } from '../../context/AtkTotalContext'
import styles from './Status.module.css'

interface StatusProps {
  characterStatus: CharacterStatus,
  totalAtk: number,
}



export function Status() {

  const { atkTotal, characterStatus } = useAtkTotal()

  return (
    <div className={styles.statusContainer}>
      <p className={`${styles.statusText} ${styles.totalAtk1} `}>
        <span>Ataque Total</span>
        <span>{atkTotal.toFixed(0)}</span>
      </p>
      <div className={styles.statusColumn}>
        <div className={styles.statusText}>
          {/* <p className={styles.totalAtk}>Ataque Total</p> */}
          <p>Ataque</p>
          <p>Crítico</p>
          <p>Dano Crítico</p>
          <p>Ataque Especial</p>
          <p>Recuperar MP</p>
          <p>Chance de Lança Infernal</p>
          <p>Lança Infernal</p>
          <p>Resistência a Contaminação</p>
        </div>
        <div className={styles.statusText}>
          {/* <p className={styles.totalAtk}>{totalAtk.toFixed(0)}</p> */}
          <p>{characterStatus.attack}</p>
          <p>{characterStatus.crit_chance}</p>
          <p>{characterStatus.crit_damage}</p>
          <p>{characterStatus.sp_attack}</p>
          <p>{characterStatus.mp_rec}</p>
          <p>{characterStatus.hell_spear_chance}</p>
          <p>{characterStatus.hell_spear}</p>
          <p>{characterStatus.taint_resistance}</p>
        </div>
      </div>
      <div className={styles.statusColumn}>
        <div className={styles.statusText}>
          {/* <p>-</p> */}
          <p>Defesa</p>
          <p>HP</p>
          <p>Resistência a Dano Crítico</p>
          <p>Defesa Especial</p>
          <p>Recuperar HP</p>
          <p>Resistência</p>
          <p>EXP</p>
          <p>GP</p>
        </div>
        <div className={styles.statusText}>
          {/* <p>-</p> */}
          <p>{characterStatus.defense}</p>
          <p>{characterStatus.hp}</p>
          <p>{characterStatus.crit_resistance}</p>
          <p>{characterStatus.sp_def}</p>
          <p>{characterStatus.hp_rec}</p>
          <p>{characterStatus.counter_attack_resistance}</p>
          <p>{characterStatus.exp}</p>
          <p>{characterStatus.gp}</p>
        </div>
      </div>
    </div>
  )
}