import styles from './App.module.css';
import characterImage from './assets/images/characters/elesis_1.png';
import { Items } from './components/Items';
import { Header } from './components/header/Header';
import { StatusDescription } from './components/status-description/StatusDescription';
import { Status } from './components/status/Status';
import './global.css';



export function App() {
  const equipmentLeft = ['helmet', 'upper-armor', 'lower-armor', 'gloves', 'shoes', 'mantle'];
  const equipmentRight = ['weapon', 'upper-head', 'lower-head', 'upper-back', 'lower-back', 'arms', 'weapon-change', 'ring', 'necklace', 'bracelet', 'earring1', 'earring2'];

  return (
    <>
      <Header />
      <div className={styles.pageLayout}>
        <div className={styles.characterLayout}>
          <div className={styles.equipmentLeft}>
            {equipmentLeft.map((slot) => {
              return <Items name={slot} key={slot} />
            })}
          </div>

          <div className={styles.characterDisplay}>
            <img src={characterImage} alt="Character" />
            {/* <img src="src/assets/images/characters/elesis_1.png" alt="Character" /> */}
          </div>

          <div className={styles.equipmentRight}>
            {equipmentRight.map((slot) => {
              return <Items name={slot} key={slot} />
            })}
          </div>

          <Status />
        </div>
        <StatusDescription />
      </div>
    </>
  )
}