import { useEffect } from 'react';
import styles from './App.module.css';
import characterImage from './assets/images/characters/elesis_1.png';
import { Items } from './components/Items';
// import { Container } from './components/Container';


import { CharacterStatus, useAtkTotal } from './context/AtkTotalContext';
import './global.css';


function sumStatusFromAllSources() {

  const baseStatus: CharacterStatus = {
    total_attack: 717440,
    attack: 31113,
    crit_chance: 85.81, //%
    crit_damage: 783.25, //%
    sp_attack: 11054,
    mp_rec: 156.18, //%
    hell_spear_chance: 14.38, //%
    hell_spear: 311,
    taint_resistance: 46.06, //%
    defense: 12217,
    hp: 8244,
    crit_resistance: 30.00, //%
    sp_def: 1721,
    hp_rec: 20.90, //%
    counter_attack_resistance: 22.59, //%
    exp: 107.50, //%
    gp: 3.17, //%
  }

  const extraStatus: CharacterStatus = {
    total_attack: 717440,
    attack: 31113,
    crit_chance: 85.81, //%
    crit_damage: 783.25, //%
    sp_attack: 11054,
    mp_rec: 156.18, //%
    hell_spear_chance: 14.38, //%
    hell_spear: 311,
    taint_resistance: 46.06, //%
    defense: 12217,
    hp: 8244,
    crit_resistance: 30.00, //%
    sp_def: 1721,
    hp_rec: 20.90, //%
    counter_attack_resistance: 22.59, //%
    exp: 107.50, //%
    gp: 3.17, //%
  }


  // const finalStatus = baseStatus + extraStatus

  const finalStatus: CharacterStatus = {} as CharacterStatus

  for (const key in baseStatus) {
    // @ts-ignore
    finalStatus[key] = baseStatus[key] + extraStatus[key]
  }

  return finalStatus
}

// const characterStatus: CharacterStatus = {
//   total_attack: 717440,
//   attack: 31113,
//   crit_chance: 85.81, //%
//   crit_damage: 783.25, //%
//   sp_attack: 11054,
//   mp_rec: 156.18, //%
//   hell_spear_chance: 14.38, //%
//   hell_spear: 311,
//   taint_resistance: 46.06, //%
//   defense: 12217,
//   hp: 8244,
//   crit_resistance: 30.00, //%
//   sp_def: 1721,
//   hp_rec: 20.90, //%
//   counter_attack_resistance: 22.59, //%
//   exp: 107.50, //%
//   gp: 3.17, //%
// }

const characterStatus = sumStatusFromAllSources();

export function App() {

  const { atkTotal, updateStatus } = useAtkTotal()

  useEffect(() => {
    updateStatus(characterStatus);
  }, []);


  return (
    <>
      <div className={styles.pageLayout}>
        <div className={styles.characterLayout}>
          <div className={styles.equipmentLeft}>
            <Items name="helmet" />
            <Items name="upper-armor" />
            <Items name="lower-armor" />
            <Items name="gloves" />
            <Items name="shoes" />
            <Items name="mantle" />
          </div>

          <div className={styles.characterDisplay}>
            <img src={characterImage} alt="Character" />
            {/* <img src="src/assets/images/characters/elesis_1.png" alt="Character" /> */}
          </div>

          <div className={styles.equipmentRight}>
            <Items name="weapon" />
            <Items name="upper-head" />
            <Items name="lower-head" />
            <Items name="upper-back" />
            <Items name="lower-back" />
            <Items name="arms" />
            <Items name="weapon" />
            <Items name="ring" />
            <Items name="necklace" />
            <Items name="bracelet" />
            <Items name="earring" />
            <Items name="earring" />
          </div>

          <div className={styles.statusContainer}>
            <div className={styles.statusColumn}>
              <div className={styles.statusText}>
                <p className={styles.ataqueTotal}>Ataque Total</p>
                <p>Ataque</p>
                <p>Crítico</p>
                <p>Dano Crítico</p>
                <p>Ataque Especial</p>
                <p>Recuperar MP</p>
                <p>Chance de Lança Infernal</p>
                <p>Lança Infernal</p>
                <p>Resistência a Contaminação</p>
              </div>
              <div className={styles.statusNumbers}>
                <p className={styles.ataqueTotal}>{atkTotal.toFixed(0)}</p>
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
                <p>-</p>
                <p>Defesa</p>
                <p>HP</p>
                <p>Resistência a Dano Crítico</p>
                <p>Defesa Especial</p>
                <p>Recuperar HP</p>
                <p>Resistência</p>
                <p>EXP</p>
                <p>GP</p>
              </div>
              <div className={styles.statusNumbers}>
                <p>-</p>
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


          <div className={styles.tabs}>
            <button className={styles.tabButton}>Missão</button>
            <button className={styles.tabButton}>PvP</button>
          </div>
        </div>
        <div className={styles.equipsStatusDescription}>
          <div className={styles.column}>
            <h3>Equipamentos</h3>
            <div>
              <div className={styles.equipsProps}>
                <p>Armor</p>
                <p>prop</p>
                <p>prop</p>
                <p>prop</p>
                <p>prop</p>
              </div>
              <div className={styles.equipsProps}>
                <p>Armor</p>
                <p>prop</p>
                <p>prop</p>
                <p>prop</p>
                <p>prop</p>
              </div>
              <div className={styles.equipsProps}>
                <p>Armor</p>
                <p>prop</p>
                <p>prop</p>
                <p>prop</p>
                <p>prop</p>
              </div>
              <div className={styles.equipsProps}>
                <p>Armor</p>
                <p>prop</p>
                <p>prop</p>
                <p>prop</p>
                <p>prop</p>
              </div>
              <div className={styles.equipsProps}>
                <p>Armor</p>
                <p>prop</p>
                <p>prop</p>
                <p>prop</p>
                <p>prop</p>
              </div>
              <div className={styles.equipsProps}>
                <p>Armor</p>
                <p>prop</p>
                <p>prop</p>
                <p>prop</p>
                <p>prop</p>
              </div>
            </div>
          </div>
          <div className={styles.column}>
            <h3>Efeito de conjunto</h3>
            <div>
              <div className={styles.equipsProps}>
                <p>Conjunto</p>
                <p className={styles.checkedConjunto}>Efeito: <span>valor 1234</span></p>
                <p className={styles.checkedConjunto}>Efeito: <span>valor 1234</span></p>
                <p className={styles.checkedConjunto}>Efeito: <span>valor 1234</span></p>
                <p className={styles.checkedConjunto}>Efeito: <span>valor 1234</span></p>
                <p className={styles.checkedConjunto}>Efeito: <span>valor 1234</span></p>
                <p>Efeito: <span>valor 1234</span></p>
                <p>Efeito: <span>valor 1234</span></p>
                <p>Efeito: <span>valor 1234</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}