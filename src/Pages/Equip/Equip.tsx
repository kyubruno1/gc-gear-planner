import styles from '../../App.module.css';
import characterImage from '../../assets/images/characters/elesis_1.png';
import { Header } from '../../components/Header/Header';
import { Items } from '../../components/Items';
import { PageContainer } from '../../components/Page-container/Page-container';
import { Status } from '../../components/Status/Status';
import '../../global.css';

export function Equip() {
  const equipmentLeft = ['helmet', 'upper-armor', 'lower-armor', 'gloves', 'shoes', 'mantle'];
  const equipmentRight = ['weapon', 'upper-head', 'lower-head', 'upper-back', 'lower-back', 'arms', 'weapon-change', 'ring', 'necklace', 'bracelet', 'earring1', 'earring2'];

  return (
    <>
      <Header />
      <PageContainer>
        {/* <div className={styles.characterLayout}> */}
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
        {/* </div> */}
        <div />
      </PageContainer>
    </>
  )
}