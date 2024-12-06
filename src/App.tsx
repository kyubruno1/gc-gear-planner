import './App.css'
import { Items } from './components/Items'
import characterImage from './assets/images/characters/elesis_1.png';


export function App() {
  return (
    <>
  <div className="page-layout">
    <div className="character-layout">
      <div className="equipment-left">
        <Items name="helmet"/>
        <Items name="upper-armor"/>
        <Items name="lower-armor"/>
        <Items name="gloves"/>
        <Items name="shoes"/>
        <Items name="mantle"/>
      </div>

      <div className="character-display">
        <img src={characterImage} alt="Character"/>
         {/* <img src="src/assets/images/characters/elesis_1.png" alt="Character" /> */}
      </div>

      <div className="equipment-right">
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

      <div className="status-container">
        <div className="status-column">
          <div className="status-text">
            <p className="ataque-total">Ataque Total</p>
            <p>Ataque</p>
            <p>Crítico</p>
            <p>Dano Crítico</p>
            <p>Ataque Especial</p>
            <p>Recuperar MP</p>
            <p>Chance de Lança Infernal</p>
            <p>Lança Infernal</p>
            <p>Resistência a Contaminação</p>
          </div>
          <div className="status-numbers">
            <p className="ataque-total">503341</p>
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
        <div className="status-column">
          <div className="status-text">
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
          <div className="status-numbers">
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


       <div className="tabs">
        <button className="tab-button">Missão</button>
        <button className="tab-button">PvP</button>
      </div>
    </div>
    <div className="equips-status-description">
      <div className="column">
        <h3>Equipamentos</h3>
        <div>
          <div className="equips-props">
            <p>Armor</p>
            <p>prop</p>
            <p>prop</p>
            <p>prop</p>
            <p>prop</p>
          </div>
          <div className="equips-props">
            <p>Armor</p>
            <p>prop</p>
            <p>prop</p>
            <p>prop</p>
            <p>prop</p>
          </div>
          <div className="equips-props">
            <p>Armor</p>
            <p>prop</p>
            <p>prop</p>
            <p>prop</p>
            <p>prop</p>
          </div>
          <div className="equips-props">
            <p>Armor</p>
            <p>prop</p>
            <p>prop</p>
            <p>prop</p>
            <p>prop</p>
          </div>
          <div className="equips-props">
            <p>Armor</p>
            <p>prop</p>
            <p>prop</p>
            <p>prop</p>
            <p>prop</p>
          </div>
          <div className="equips-props">
            <p>Armor</p>
            <p>prop</p>
            <p>prop</p>
            <p>prop</p>
            <p>prop</p>
          </div>
        </div>
      </div>
      <div className="column">
        <h3>Efeito de conjunto</h3>
        <div>
          <div className="equips-props">
            <p>Conjunto</p>
            <p className="checked-conjunto">Efeito: <span>valor 1234</span></p>
            <p className="checked-conjunto">Efeito: <span>valor 1234</span></p>
            <p className="checked-conjunto">Efeito: <span>valor 1234</span></p>
            <p className="checked-conjunto">Efeito: <span>valor 1234</span></p>
            <p className="checked-conjunto">Efeito: <span>valor 1234</span></p>
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