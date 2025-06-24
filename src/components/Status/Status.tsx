import { useAtkTotal } from '../../context/AtkTotalContext'



export function Status() {

  const { atkTotal, characterStatus } = useAtkTotal()

  return (
    <div className="col-span-3 grid grid-cols-2 bg-bgdarkblue gap-2.5 rounded-lg border-3 border-primary shadow-darkblue">
      <p className="bg-bgtextdark font-bold px-5 py-2.5 rounded-lg text-gold col-span-3 gap-2.5 flex justify-center text-2xl">
        <span>Ataque Total</span>
        <span>{atkTotal.toFixed(0)}</span>
      </p>
      <div className="grid grid-cols-2 gap-[5px]">
        <div className="bg-bgtextdark text-textlight font-bold p-[10px_20px] rounded-[10px]">
          <p className="p-[3px]">Ataque</p>
          <p className="p-[3px]">Crítico</p>
          <p className="p-[3px]">Dano Crítico</p>
          <p className="p-[3px]">Ataque Especial</p>
          <p className="p-[3px]">Recuperar MP</p>
          <p className="p-[3px]">Chance de Lança Infernal</p>
          <p className="p-[3px]">Lança Infernal</p>
          <p className="p-[3px]">Resistência a Contaminação</p>
        </div>

        <div className="bg-bgtextdark text-textlight font-bold p-[10px_20px] rounded-[10px] text-right">
          <p className="p-[3px]">{characterStatus.attack}</p>
          <p className="p-[3px]">{characterStatus.crit_chance}</p>
          <p className="p-[3px]">{characterStatus.crit_damage}</p>
          <p className="p-[3px]">{characterStatus.sp_attack}</p>
          <p className="p-[3px]">{characterStatus.mp_rec}</p>
          <p className="p-[3px]">{characterStatus.hell_spear_chance}</p>
          <p className="p-[3px]">{characterStatus.hell_spear}</p>
          <p className="p-[3px]">{characterStatus.taint_resistance}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[5px]">
        <div className="bg-bgtextdark text-textlight font-bold p-[10px_20px] rounded-[10px]">
          <p className="p-[3px]">Defesa</p>
          <p className="p-[3px]">HP</p>
          <p className="p-[3px]">Resistência a Dano Crítico</p>
          <p className="p-[3px]">Defesa Especial</p>
          <p className="p-[3px]">Recuperar HP</p>
          <p className="p-[3px]">Resistência</p>
          <p className="p-[3px]">EXP</p>
          <p className="p-[3px]">GP</p>
        </div>

        <div className="bg-bgtextdark text-textlight font-bold p-[10px_20px] rounded-[10px] text-right">
          <p className="p-[3px]">{characterStatus.defense}</p>
          <p className="p-[3px]">{characterStatus.hp}</p>
          <p className="p-[3px]">{characterStatus.crit_resistance}</p>
          <p className="p-[3px]">{characterStatus.sp_def}</p>
          <p className="p-[3px]">{characterStatus.hp_rec}</p>
          <p className="p-[3px]">{characterStatus.counter_attack_resistance}</p>
          <p className="p-[3px]">{characterStatus.exp}</p>
          <p className="p-[3px]">{characterStatus.gp}</p>
        </div>
      </div>
    </div>
  )
}