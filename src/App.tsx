import styles from './App.module.css'
import { Items } from './components/Items'
import characterImage from './assets/images/characters/elesis_1.png';
import { Container } from './components/Container';



import './global.css'

export function App() {
  return (
    <>
  <div className={styles.pageLayout}>
    <div className={styles.characterLayout}>
      <div className={styles.equipmentLeft}>
        <Items name="helmet"/>
        <Items name="upper-armor"/>
        <Items name="lower-armor"/>
        <Items name="gloves"/>
        <Items name="shoes"/>
        <Items name="mantle"/>
      </div>

      <div className={styles.characterDisplay}>
        <img src={characterImage} alt="Character"/>
         {/* <img src="src/assets/images/characters/elesis_1.png" alt="Character" /> */}
      </div>

      <div className={styles.equipmentRight}>
        <Items name="weapon"/>
        <Items name="upper-head"/>
        <Items name="lower-head"/>
        <Items name="upper-back"/>
        <Items name="lower-back"/>
        <Items name="arms"/>
        <Items name="weapon"/>
        <Items name="ring"/>
        <Items name="necklace"/>
        <Items name="bracelet"/>
        <Items name="earring"/>
        <Items name="earring"/>
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
            <p className={styles.ataqueTotal}>503341</p>
            <p>29541</p>
            <p>73.11%</p>
            <p>697.69%</p>
            <p>12927</p>
            <p>114.89%</p>
            <p>11.57%</p>
            <p>1535</p>
            <p>22.76%</p>
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
            <p>12458</p>
            <p>7434</p>
            <p>45.00%</p>
            <p>3079</p>
            <p>67.40%</p>
            <p>21.00%</p>
            <p>102.50%</p>
            <p>0.62%</p>
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