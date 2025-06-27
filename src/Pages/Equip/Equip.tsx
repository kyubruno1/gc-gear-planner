import characterImage from '../../../public/assets/images/characters/elesis_1.png';
import { Header } from '../../components/Header/Header';
import { Items } from '../../components/Items/Items';
import { PageContainer } from '../../components/Page-container/Page-container';
import { Status } from '../../components/Status/Status';
import { useEquip } from '../../context/EquipContext';
import { EquipOverview } from '../../EquipOverview';
import '../../global.css';

export function Equip() {
  const equipmentLeft = ['helmet', 'upper-armor', 'lower-armor', 'gloves', 'shoes', 'mantle'];
  const equipmentRight = ['weapon', 'upper-head', 'lower-head', 'upper-back', 'lower-back', 'arms', 'weapon-change', 'ring', 'necklace', 'bracelet', 'earring1', 'earring2'];

  const { calculateBonusExtras } = useEquip()
  const bonusExtras = calculateBonusExtras()

  return (
    <>
      <Header />
      <PageContainer>
        <div className='grid grid-cols-[130px_2fr_260px] grid-rows-[auto_1fr_auto]'>
          <div className="grid grid-flow-col grid-rows-6 gap-2.5 justify-start">
            {equipmentLeft.map((slot) => {
              return <Items name={slot} key={slot} />
            })}
          </div>

          <div className="flex justify-center align-center">
            <img src={characterImage} alt="Character" className='max-w-full h-auto' />
          </div>

          <div className="grid grid-flow-col grid-rows-6 gap-2.5 justify-end">
            {equipmentRight.map((slot) => {
              return <Items name={slot} key={slot} />
            })}
          </div>

          <Status />

          {/* BÔNUS DE SETS APLICADOS */}
          <div className='mt-8 text-white p-4 space-y-4 col-span-3 bg-gray-900'>
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

          <EquipOverview />
        </div>
      </PageContainer>
    </>
  )
}