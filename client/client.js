// TODO: Clear death saves
// TODO: Only show weapons available with current proficiencies

// Declare variables
var experience_per_level = [0,300,900,2700,6500,14000,23000,34000,48000,64000,85000,100000,120000,140000,165000,195000,225000,265000,305000,355000];
var attributes = ["str","dex","con","int","wis","cha"];
var skills = [{name: "athletics",       attribute: "str"},
              {name: "acrobatics",      attribute: "dex"},
              {name: "sleight_of_hand", attribute: "dex"},
              {name: "stealth",         attribute: "dex"},
              {name: "arcana",          attribute: "int"},
              {name: "history",         attribute: "int"},
              {name: "investigation",   attribute: "int"},
              {name: "nature",          attribute: "int"},
              {name: "religion",        attribute: "int"},
              {name: "animal_handling", attribute: "wis"},
              {name: "insight",         attribute: "wis"},
              {name: "medicine",        attribute: "wis"},
              {name: "perception",      attribute: "wis"},
              {name: "survival",        attribute: "wis"},
              {name: "deception",       attribute: "cha"},
              {name: "intimidation",    attribute: "cha"},
              {name: "performance",     attribute: "cha"},
              {name: "persuasion",      attribute: "cha"}];
var races_stats =   {"Dwarf":      { speed: 25},
                     "Elf":        { speed: 30},
                     "Halfling":   { speed: 25},
                     "Human":      { speed: 30},
                     "Dragonborn": { speed: 30},
                     "Gnome":      { speed: 25},
                     "Half-Elf":   { speed: 30},
                     "Half-Orc":   { speed: 30},
                     "Tiefling":   { speed: 30}};
var classes_stats = {"Barbarian":  { hp: 12},
                     "Bard":       { hp: 8},
                     "Cleric":     { hp: 8},
                     "Druid":      { hp: 8},
                     "Fighter":    { hp: 10},
                     "Monk":       { hp: 8},
                     "Paladin":    { hp: 10},
                     "Ranger":     { hp: 10},
                     "Rogue":      { hp: 8},
                     "Sorcerer":   { hp: 6},
                     "Warlock":    { hp: 8},
                     "Wizard":     { hp: 6}};
var weapons = {"Club": { cost: "1 sp", damage: "1d4", damage_type: "bludgeoning", weight: 2, light: true, weapon_type: "Simple Melee Weapon"},
               "Dagger": { cost: "2 gp", damage: "1d4", damage_type: "piercing", weight: 1, finesse: true, light: true, thrown: true, range_normal: 20, range_max: 60, weapon_type: "Simple Melee Weapon"},
               "Crossbow, light": { cost: "25 gp", damage: "1d8", damage_type: "piercing", weight: 5, ammunition: true, range_normal: 80, range_max: 320, loading: true, twohanded: true, weapon_type: "Simple Ranged Weapon"},
               "Greataxe": { cost: "30 gp", damage: "1d12", damage_type: "slashing", weight: 7, heavy: true, twohanded: true, weapon_type: "Martial Melee Weapon"},
               "Longbow":  { cost: "50 gp", damage: "1d10", damage_type: "piercing", weight: 2, ammunition: true, range_normal: 150, range_max: 600, heavy: true, twohanded: true, weapon_type: "Martial Ranged Weapon"}};

function update_proficiency(field, attribute) {
  var attribute_mod = document.getElementById(attribute + "_mod").value;
  var proficient_skill = document.getElementById(field).checked;
  var skill_bonus = Number(attribute_mod);
  if (proficient_skill)
    skill_bonus += Number(proficiency_bonus);
  document.getElementById(field + "_bonus").value = prepend_plus(skill_bonus);
}

function prepend_plus(variable) {
  if (variable >= 0)
    variable = "+" + variable;
  return variable;
}

Template.character.events = {
  'keydown' : function (event) {
    if (event.which == 13) { // Enter key

      // Update attribute mods
      attributes.forEach(function (attribute) {
        var attribute_score = document.getElementById(attribute);
        var attribute_mod = Math.floor((Number(attribute_score.value) - 10) / 2);
        document.getElementById(attribute + "_mod").value = prepend_plus(attribute_mod);
      });

      // Update experience points
      var add_exp = document.getElementById("add_experience_points");
      var current_exp = document.getElementById("experience_points");
      if (current_exp.value == '')
        current_exp.value = Number(0);
      if (add_exp.value > 0 || add_exp.value < 0)
        current_exp.value = Number(current_exp.value) + Number(add_exp.value);
      add_exp.value = '';

      // Calculate current level
      var current_level = 0;
      var exp_per_level = experience_per_level.slice(0);
      exp_per_level.reverse().some(function (levelrange, index, array) {
        current_level = exp_per_level.length - index;
        return Number(current_exp.value) >= levelrange;
      });
      document.getElementById("level").value = current_level;

      // Set proficiency bonus
      proficiency_bonus = (Math.floor((Number(current_level) - 1) / 4)) + 2;
      document.getElementById("proficiency_bonus").value = proficiency_bonus;

      // Set saving throws bonuses
      attributes.forEach(function (attribute) {
        update_proficiency(attribute + "_save", attribute);
      });

      // Set skill bonuses
      skills.forEach(function (skill) {
        update_proficiency(skill.name + "_skill", skill.attribute);
      });

      // Set passive wisdom
      document.getElementById("passive_wisdom").value = 10 + Number(document.getElementById("perception_skill_bonus").value);

      // Set armor class
      // TODO: Take into account gear/skills. Make writable but keep suggestion?
      document.getElementById("armor_class").value = 10 + Number(document.getElementById("dex_mod").value);

      // Set initiative
      // TODO: Take into account class, race, other features.
      document.getElementById("initiative").value = Number(document.getElementById("dex_mod").value);

      // Set speed
      var speed = 0;
      if (typeof races_stats[document.getElementById("race").value] !== 'undefined') {
        speed = races_stats[document.getElementById("race").value].speed;
      }
      document.getElementById("speed").value = speed;

      // Set max hp
      var max_hp_level = 0;
      if (typeof classes_stats[document.getElementById("class").value] !== 'undefined') {
        max_hp_level = classes_stats[document.getElementById("class").value].hp;
      }
      document.getElementById("max_hitpoints_from_level").value = max_hp_level;
      document.getElementById("max_hitpoints").value = Number(document.getElementById("max_hitpoints_from_level").value) + Number(document.getElementById("max_hitpoints_from_roll").value)

      // Set weapon info
      var mod_type = "str";
      var weap = document.getElementById("weapons").value;
      if (typeof weapons[weap] !== 'undefined' && (weapons[weap].finesse || weapons[weap].thrown || weapons[weap].weapon_type == "Simple Ranged Weapon" || weapons[weap].weapon_type == "Martial Ranged Weapon")) {
        mod_type = "dex";
      }

      if (typeof weapons[document.getElementById("weapons").value] !== 'undefined') {
        document.getElementById("attacks_and_spellcasting_weapons_attack_bonus").value = document.getElementById(mod_type + "_save_bonus").value;
      }
      if (typeof weapons[document.getElementById("weapons").value] !== 'undefined') {
        document.getElementById("attacks_and_spellcasting_weapons_damage").value = weapons[document.getElementById("weapons").value].damage + " " + weapons[document.getElementById("weapons").value].damage_type;
      }
    }
  }
}

Template.character.helpers({
  races: function () {
    return Object.keys(races_stats);
  },
  classes: function () {
    return Object.keys(classes_stats);
  },
  weapons: function () {
    return Object.keys(weapons);
  },
});
