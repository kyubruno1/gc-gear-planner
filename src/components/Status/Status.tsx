import { useAtkTotal } from '../../context/AtkTotalContext';
import { formatStatValue } from '../../utils/StatusLabel';

export function Status() {
  const { atkTotal, characterStatus } = useAtkTotal();

  if (!characterStatus) return null;

  return (
    <div className="col-span-3 grid grid-cols-2 bg-bgdarkblue gap-2.5 rounded-lg border-3 border-primary shadow-darkblue mt-5">
      <p className="bg-bgtextdark font-bold px-5 py-2.5 rounded-lg text-gold col-span-3 gap-2.5 flex justify-center text-2xl text-outline">
        <span>Ataque Total</span>
        <span>{atkTotal.toFixed(0)}</span>
      </p>
      <div className="grid grid-cols-2 gap-[5px]">
        <div className="bg-bgtextdark text-textlight font-bold p-[10px_20px] rounded-[10px]">
          <p className="p-[3px] text-outline">Ataque</p>
          <p className="p-[3px] text-outline">Chance de Acerto Crítico</p>
          <p className="p-[3px] text-outline">Dano Crítico</p>
          <p className="p-[3px] text-outline">Ataque Especial</p>
          <p className="p-[3px] text-outline">Recuperar MP</p>
          <p className="p-[3px] text-outline">Chance de Lança Infernal</p>
          <p className="p-[3px] text-outline">Lança Infernal</p>
          <p className="p-[3px] text-outline">Resistência a Contaminação</p>
        </div>

        <div className="bg-bgtextdark text-textlight font-bold p-[10px_20px] rounded-[10px] text-right">
          <p className="p-[3px] text-outline">{formatStatValue('attack', characterStatus.attack)}</p>
          <p className="p-[3px] text-outline">{formatStatValue('crit_chance', characterStatus.crit_chance)}</p>
          <p className="p-[3px] text-outline">{formatStatValue('crit_damage', characterStatus.crit_damage)}</p>
          <p className="p-[3px] text-outline">{formatStatValue('sp_attack', characterStatus.sp_attack)}</p>
          <p className="p-[3px] text-outline">{formatStatValue('mp_rec', characterStatus.mp_rec)}</p>
          <p className="p-[3px] text-outline">{formatStatValue('hell_spear_chance', characterStatus.hell_spear_chance)}</p>
          <p className="p-[3px] text-outline">{formatStatValue('hell_spear', characterStatus.hell_spear)}</p>
          <p className="p-[3px] text-outline">{formatStatValue('taint_resistance', characterStatus.taint_resistance)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[5px]">
        <div className="bg-bgtextdark text-textlight font-bold p-[10px_20px] rounded-[10px]">
          <p className="p-[3px] text-outline">Defesa</p>
          <p className="p-[3px] text-outline">HP</p>
          <p className="p-[3px] text-outline">Resistência a Dano Crítico</p>
          <p className="p-[3px] text-outline">Defesa Especial</p>
          <p className="p-[3px] text-outline">Recuperar HP</p>
          <p className="p-[3px] text-outline">Resistência</p>
          <p className="p-[3px] text-outline">EXP</p>
          <p className="p-[3px] text-outline">GP</p>
        </div>

        <div className="bg-bgtextdark text-textlight font-bold p-[10px_20px] rounded-[10px] text-right">
          <p className="p-[3px] text-outline">{formatStatValue('defense', characterStatus.defense)}</p>
          <p className="p-[3px] text-outline">{formatStatValue('hp', characterStatus.hp)}</p>
          <p className="p-[3px] text-outline">{formatStatValue('crit_resistance', characterStatus.crit_resistance)}</p>
          <p className="p-[3px] text-outline">{formatStatValue('sp_def', characterStatus.sp_def)}</p>
          <p className="p-[3px] text-outline">{formatStatValue('hp_rec', characterStatus.hp_rec)}</p>
          <p className="p-[3px] text-outline">{formatStatValue('counter_attack_resistance', characterStatus.counter_attack_resistance)}</p>
          <p className="p-[3px] text-outline">{formatStatValue('exp', characterStatus.exp)}</p>
          <p className="p-[3px] text-outline">{formatStatValue('gp', characterStatus.gp)}</p>
        </div>
      </div>
    </div>
  );
}
