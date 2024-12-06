import './App.css'
import { Items } from './components/Items'

export function App() {
  return (
    <>
  <div className="page-layout">
    <div className="character-layout">
      <div className="equipment-left">
        <img src="/assets/img/equip-clean/helmet.png" alt="Item 1"/>
        <img src="/assets/img/equip-clean/upper-armor.png" alt="Item 2"/>
        <img src="/assets/img/equip-clean/lower-armor.png" alt="Item 3"/>
        <img src="/assets/img/equip-clean/gloves.png" alt="Item 1"/>
        <img src="/assets/img/equip-clean/shoes.png" alt="Item 2"/>
        <img src="/assets/img/equip-clean/mantle.png" alt="Item 3"/>
      </div>

      <div className="character-display">
        <img src="/assets/img/characters/mari_4.png" alt="Character"/>
      </div>

      <div className="equipment-right">
        <img src="/assets/img/equip-clean/weapon.png" alt="Item 1"/>
        <img src="/assets/img/equip-clean/upper-head.png" alt="Item 2"/>
        <img src="/assets/img/equip-clean/lower-head.png" alt="Item 3"/>
        <img src="/assets/img/equip-clean/upper-back.png" alt="Item 4"/>
        <img src="/assets/img/equip-clean/lower-back.png" alt="Item 5"/>
        <img src="/assets/img/equip-clean/arms.png" alt="Item 6"/>
        <img src="/assets/img/equip-clean/weapon.png" alt="Item 7"/>
        <img src="/assets/img/equip-clean/ring.png" alt="Item 8"/>
        <img src="/assets/img/equip-clean/necklace.png" alt="Item 9"/>
        <img src="/assets/img/equip-clean/bracelet.png" alt="Item 10"/>
        <img src="/assets/img/equip-clean/earring.png" alt="Item 11"/>
        <img src="/assets/img/equip-clean/earring.png" alt="Item 12"/>
      </div>

      <div className="status-container">
        <div className="status-column">
          <div className="status-text">
            <p className="ataque-total">Ataque Total</p>
            <p>TestehellohellohellohelloAtaque</p>
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