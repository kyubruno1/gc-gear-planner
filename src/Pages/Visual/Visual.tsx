import { useState } from "react";
import { Header } from "../../components/Header/Header";
import { Items } from "../../components/Items/Items";
import { PageContainer } from "../../components/Page-container/Page-container";
import { Status } from "../../components/Status/Status";
import { useCharacter } from "../../context/CharacterContext";

interface VisualProps { }

export function Visual(props: VisualProps) {
  const equipmentLeft = [
    'visual-helmet',
    'visual-upper-armor',
    'visual-lower-armor',
    'visual-gloves',
    'visual-shoes',
    'visual-mantle'
  ];

  const equipmentRight = [
    'visual-weapon',
    'visual-upper-head',
    'visual-lower-head',
    'visual-upper-back',
    'visual-lower-back',
    'visual-arms',
    // 'visual-weapon-change',
    // 'visual-ring',
    // 'visual-necklace',
    // 'visual-bracelet',
    // 'visual-earring1',
    // 'visual-earring2'
  ];

  const {
    selectedCharacter,
    selectedJobKey,
    // setSelectedCharacter,
    // setSelectedJobKey,
    // character,
    // saveCharacter,
  } = useCharacter();

  // const { equipped, setFullEquip } = useEquip();
  // const { savedCharacters, removeCharacter, reloadSavedCharacters } = useSavedCharacters();

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  const characterName = selectedCharacter?.name || "elesis";
  const jobKey = selectedJobKey || "first_job";
  const characterImagePath = `/assets/images/characters/arts/${characterName}_${jobKey}.png`;
  // const bonusExtras = character?.combinedSetsEffect || {};

  return (
    <>
      <Header />
      <PageContainer layoutType="dark">
        <div className='grid grid-cols-[8.125rem_2fr_16.25rem] grid-rows-[auto_1fr_auto] gap-4'>

          {/* Lado Esquerdo */}
          <div className="grid grid-flow-col grid-rows-6 gap-2.5 justify-start">
            {equipmentLeft.map((slot) => (
              <Items name={slot} key={slot} equipmentType="visual" />
            ))}
          </div>

          {/* Personagem */}
          <div className="relative flex justify-center items-center">
            <button
              className="absolute top-2 right-2 z-10"
              onClick={() => setIsModalOpen(true)}
              aria-label="Change Character"
            >
              {/* <img src={changeCharacter} className='w-20 h-20 rounded-md' alt="Change Character" /> */}
            </button>
            <img
              src={characterImagePath}
              alt={`${characterName} - ${jobKey}`}
              className="w-[60.25rem] h-[50rem] object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/assets/images/characters/arts/elesis_first_job.png";
              }}
            />
          </div>

          {/* Lado Direito */}
          <div className="grid grid-flow-col grid-rows-6 gap-2.5 justify-end">
            {equipmentRight.map((slot) => (
              <Items name={slot} key={slot} equipmentType="visual" />
            ))}
          </div>

          {/* Status Geral */}
          <Status />
        </div>
      </PageContainer >
    </>
  )
}
