import characterImage from '../../../public/assets/images/characters/elesis_1.png';
import styles from '../../App.module.css';
import { Header } from '../../components/Header/Header';
import { Items } from '../../components/Items';
import { PageContainer } from '../../components/Page-container/Page-container';
import { Status } from '../../components/Status/Status';
import { useEquip } from '../../context/EquipContext';
import '../../global.css';

export function Equip() {
  const equipmentLeft = ['helmet', 'upper-armor', 'lower-armor', 'gloves', 'shoes', 'mantle'];
  const equipmentRight = ['weapon', 'upper-head', 'lower-head', 'upper-back', 'lower-back', 'arms', 'weapon-change', 'ring', 'necklace', 'bracelet', 'earring1', 'earring2'];

  const { calculateBonusExtras } = useEquip()
  const bonusExtras = calculateBonusExtras()

  console.log(bonusExtras)
  return (
    <>
      <Header />
      <PageContainer>
        <div className={styles.equipmentLeft}>
          {equipmentLeft.map((slot) => {
            return <Items name={slot} key={slot} />
          })}
        </div>

        <div className={styles.characterDisplay}>
          <img src={characterImage} alt="Character" />
        </div>

        <div className={styles.equipmentRight}>
          {equipmentRight.map((slot) => {
            return <Items name={slot} key={slot} />
          })}
        </div>

        <Status />

        {/* BÔNUS DE SETS APLICADOS */}
        <div style={{ marginTop: '2rem', color: 'white' }}>
          <h2>Bônus de Set Ativos:</h2>
          <ul>
            {Object.entries(bonusExtras).map(([key, stats]) => (
              <li key={key}>
                <strong>{key}:</strong>
                <ul>
                  {Object.entries(stats).map(([statKey, statValue]) => (
                    <li key={statKey}>
                      {statKey}: {statValue}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div />
      </PageContainer>
    </>
  )
}