import { useAtkTotal } from '../../context/AtkTotalContext';
import { formatStatValue } from '../../utils/StatusLabel';

export function Status() {
  const { atkTotal, characterStatus } = useAtkTotal();

  if (!characterStatus) return null;

  return (
    <div className="col-span-3 grid grid-cols-2 bg-bgdarkblue gap-2.5 rounded-lg border-3 border-primary shadow-darkblue mt-5">
      <p className="bg-bgtextdark font-bold px-5 py-2.5 rounded-lg text-gold col-span-3 gap-2.5 flex justify-center text-2xl text-shadow-title">
        <span>Ataque Total</span>
        <span>{atkTotal.toFixed(0)}</span>
      </p>
      <div className="grid grid-cols-2 gap-[5px]">
        <div className="bg-bgtextdark text-textlight font-bold p-[10px_20px] rounded-[10px]">
          <p className="p-[3px] text-shadow-title font-bold">Ataque</p>
          <p className="p-[3px] text-shadow-title font-bold">Chance de Acerto Crítico</p>
          <p className="p-[3px] text-shadow-title font-bold">Dano Crítico</p>
          <p className="p-[3px] text-shadow-title font-bold">Ataque Especial</p>
          <p className="p-[3px] text-shadow-title font-bold">Recuperar MP</p>
          <p className="p-[3px] text-shadow-title font-bold">Chance de Lança Infernal</p>
          <p className="p-[3px] text-shadow-title font-bold">Lança Infernal</p>
          <p className="p-[3px] text-shadow-title font-bold">Resistência a Contaminação</p>
        </div>

        <div className="bg-bgtextdark text-textlight font-bold p-[10px_20px] rounded-[10px] text-right">
          <p className="p-[3px] text-shadow-title font-bold">{formatStatValue('attack', characterStatus.attack)}</p>
          <p className="p-[3px] text-shadow-title font-bold">{formatStatValue('crit_chance', characterStatus.crit_chance)}</p>
          <p className="p-[3px] text-shadow-title font-bold">{formatStatValue('crit_damage', characterStatus.crit_damage)}</p>
          <p className="p-[3px] text-shadow-title font-bold">{formatStatValue('sp_attack', characterStatus.sp_attack)}</p>
          <p className="p-[3px] text-shadow-title font-bold">{formatStatValue('mp_rec', characterStatus.mp_rec)}</p>
          <p className="p-[3px] text-shadow-title font-bold">{formatStatValue('hell_spear_chance', characterStatus.hell_spear_chance)}</p>
          <p className="p-[3px] text-shadow-title font-bold">{formatStatValue('hell_spear', characterStatus.hell_spear)}</p>
          <p className="p-[3px] text-shadow-title font-bold">{formatStatValue('taint_resistance', characterStatus.taint_resistance)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[5px]">
        <div className="bg-bgtextdark text-textlight font-bold p-[10px_20px] rounded-[10px]">
          <p className="p-[3px] text-shadow-title font-bold">Defesa</p>
          <p className="p-[3px] text-shadow-title font-bold">HP</p>
          <p className="p-[3px] text-shadow-title font-bold">Resistência a Dano Crítico</p>
          <p className="p-[3px] text-shadow-title font-bold">Defesa Especial</p>
          <p className="p-[3px] text-shadow-title font-bold">Recuperar HP</p>
          <p className="p-[3px] text-shadow-title font-bold">Resistência</p>
          <p className="p-[3px] text-shadow-title font-bold">EXP</p>
          <p className="p-[3px] text-shadow-title font-bold">GP</p>
        </div>

        <div className="bg-bgtextdark text-textlight font-bold p-[10px_20px] rounded-[10px] text-right">
          <p className="p-[3px] text-shadow-title font-bold">{formatStatValue('defense', characterStatus.defense)}</p>
          <p className="p-[3px] text-shadow-title font-bold">{formatStatValue('hp', characterStatus.hp)}</p>
          <p className="p-[3px] text-shadow-title font-bold">{formatStatValue('crit_resistance', characterStatus.crit_resistance)}</p>
          <p className="p-[3px] text-shadow-title font-bold">{formatStatValue('sp_def', characterStatus.sp_def)}</p>
          <p className="p-[3px] text-shadow-title font-bold">{formatStatValue('hp_rec', characterStatus.hp_rec)}</p>
          <p className="p-[3px] text-shadow-title font-bold">{formatStatValue('counter_attack_resistance', characterStatus.counter_attack_resistance)}</p>
          <p className="p-[3px] text-shadow-title font-bold">{formatStatValue('exp', characterStatus.exp)}</p>
          <p className="p-[3px] text-shadow-title font-bold">{formatStatValue('gp', characterStatus.gp)}</p>
        </div>
      </div>
    </div>
  );
}
