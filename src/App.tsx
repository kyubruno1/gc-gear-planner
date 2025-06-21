import { useEffect } from 'react';
import styles from './App.module.css';
import characterImage from './assets/images/characters/elesis_1.png';
import { Items } from './components/Items';
// import { Container } from './components/Container';


import { Header } from './components/header/header';
import { StatusDescription } from './components/status-description/StatusDescription';
import { Status } from './components/status/Status';
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
    // @ts-expect-error error
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
  }, [updateStatus]);


  return (
    <>
      <Header />
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

          <Status characterStatus={characterStatus} totalAtk={atkTotal} />
        </div>
        <StatusDescription />
      </div >
    </>
  )
}