import { CharacterStatus } from "../context/AtkTotalContext";

export const statusLabels: Record<string, string> = {
  total_attack: "Ataque Total",
  attack: "Ataque",
  crit_chance: "Chance de acerto crítico",
  crit_damage: "Dano Crítico",
  sp_attack: "Ataque Especial",
  mp_rec: "Recuperação de MP",
  hell_spear_chance: "Chance de Lança Infernal",
  hell_spear: "Lança Infernal",
  taint_resistance: "Resistência à Contaminação",
  defense: "Defesa",
  hp: "HP",
  crit_resistance: "Resistência a Crítico",
  sp_def: "Defesa Especial",
  hp_rec: "Recuperação de HP",
  counter_attack_resistance: "Resistência a Contra-ataque",
  exp: "EXP",
  gp: "GP",
  back_attack: "Dano pelas Costas",
  prop_level: "Nível da Prop",
  fortify_bonus: "Aumento de chance de sucesso de fortificação",
  protect_destruction: "Chance de proteção de destruição"
};

// Inverte o objeto: valores viram chaves e chaves viram valores
function invertLabels(labels: Record<string, string>): Record<string, string> {
  const inverted: Record<string, string> = {};
  for (const key in labels) {
    const val = labels[key];
    inverted[val] = key;
  }
  return inverted;
}

// Mapa invertido: nome legível => chave interna
const invertedStatusLabels = invertLabels(statusLabels);

// Função para mapear nome legível para chave
export function mapEffectNameToStatusKey(name: string): keyof CharacterStatus | null {
  return (invertedStatusLabels[name] as keyof CharacterStatus) ?? null;
}
