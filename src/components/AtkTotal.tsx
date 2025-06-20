interface CharacterStatus {
  total_attack: number;
  attack: number;
  crit_chance: number;              // in percentage (%)
  crit_damage: number;              // in percentage (%)
  sp_attack: number;
  mp_rec: number;                   // in percentage (%)
  hell_spear_chance: number;        // in percentage (%)
  hell_spear: number;
  taint_resistance: number;         // in percentage (%)
  defense: number;
  hp: number;
  crit_resistance: number;          // in percentage (%)
  sp_def: number;
  hp_rec: number;                   // in percentage (%)
  counter_attack_resistance: number;// in percentage (%)
  exp: number;                      // in percentage (%)
  gp: number;                       // in percentage (%)
}


const characterStatus: CharacterStatus = {
  total_attack: 717440,
  attack: 31113,
  crit_chance: 85.81, //%
  crit_damage: 783.25, //%
  sp_attack: 11054,
  mp_rec: 156.18, //%
  hell_spear_chance: 14.38, //%
  hell_spear: 311,
  taint_resistance: 46.06, //%
  defense: 12217,
  hp: 8244,
  crit_resistance: 30.00, //%
  sp_def: 1721,
  hp_rec: 20.90, //%
  counter_attack_resistance: 22.59, //%
  exp: 107.50, //%
  gp: 3.17, //%
}

// export function AtkTotal() {

//   const { attack, crit_chance, crit_damage, sp_attack, mp_rec, defense: def, sp_def, hp, hp_rec } = characterStatus

//   const ATK_Total =
//     ((1 - (crit_chance / 100)) + ((crit_chance / 100) * (1.2 + (crit_damage / 100)))) *
//     (((attack * 27) + ((attack + sp_attack) * 20) * (1 + (mp_rec / 100))) / 33.75) +
//     0.7 * (def + (sp_def / 5) + hp * (1 + (hp_rec / 100)));

//   return (
//     // <div>
//     //   <span>{ATK_Total.toFixed(0)}</span>
//     // </div>
//     {
//       atkTotal: ATK_Total,
//       status: characterStatus
//     }

//   )
// }

