// TODO: Clear death saves
// TODO: Only show weapons available with current proficiencies
// TODO: Dynamically add weapons and spells from equipment / spell list
// TODO: Hover over a disabled field to see reasons for value (long term goal)
// TODO: Add new weapons/armor/equipment to DB from equipment list

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

function update_character_DB() {
  // Update character in DB
  Characters.update({_id: "jzZfNjRecszsFHQ67"},{$set: {
    character_name:          document.getElementById("character_name").value,
    race:                    document.getElementById("race").value,
    subrace:                 document.getElementById("subrace").value,
    alignment:               document.getElementById("alignment").value,
    background:              document.getElementById("background").value,
    player_name:             document.getElementById("player_name").value,
    class:                   document.getElementById("class").value,
    subclass:                document.getElementById("subclass").value,
    experience_points:       document.getElementById("experience_points").value,
    str:                     document.getElementById("str").value,
    dex:                     document.getElementById("dex").value,
    con:                     document.getElementById("con").value,
    int:                     document.getElementById("int").value,
    wis:                     document.getElementById("wis").value,
    cha:                     document.getElementById("cha").value,
    inspiration:             document.getElementById("inspiration").value,
    str_save:                document.getElementById("str_save").checked,
    dex_save:                document.getElementById("dex_save").checked,
    con_save:                document.getElementById("con_save").checked,
    int_save:                document.getElementById("int_save").checked,
    wis_save:                document.getElementById("wis_save").checked,
    cha_save:                document.getElementById("cha_save").checked,
    acrobatics_skill:        document.getElementById("acrobatics_skill").checked,
    animal_handling_skill:   document.getElementById("animal_handling_skill").checked,
    arcana_skill:            document.getElementById("arcana_skill").checked,
    athletics_skill:         document.getElementById("athletics_skill").checked,
    deception_skill:         document.getElementById("deception_skill").checked,
    history_skill:           document.getElementById("history_skill").checked,
    insight_skill:           document.getElementById("insight_skill").checked,
    intimidation_skill:      document.getElementById("intimidation_skill").checked,
    investigation_skill:     document.getElementById("investigation_skill").checked,
    medicine_skill:          document.getElementById("medicine_skill").checked,
    nature_skill:            document.getElementById("nature_skill").checked,
    perception_skill:        document.getElementById("perception_skill").checked,
    performance_skill:       document.getElementById("performance_skill").checked,
    persuasion_skill:        document.getElementById("persuasion_skill").checked,
    religion_skill:          document.getElementById("religion_skill").checked,
    sleight_of_hand_skill:   document.getElementById("sleight_of_hand_skill").checked,
    stealth_skill:           document.getElementById("stealth_skill").checked,
    survival_skill:          document.getElementById("survival_skill").checked,
    other_proficiencies:     document.getElementById("other_proficiencies").value,
    max_hitpoints_from_roll: document.getElementById("max_hitpoints_from_roll").value,
    current_hitpoints:       document.getElementById("current_hitpoints").value,
    temporary_hitpoints:     document.getElementById("temporary_hitpoints").value,
    hit_dice_current:        document.getElementById("hit_dice_current").value,
    death_saves_successes_1: document.getElementById("death_saves_successes_1").checked,
    death_saves_successes_2: document.getElementById("death_saves_successes_2").checked,
    death_saves_successes_3: document.getElementById("death_saves_successes_3").checked,
    death_saves_failures_1:  document.getElementById("death_saves_failures_1").checked,
    death_saves_failures_2:  document.getElementById("death_saves_failures_2").checked,
    death_saves_failures_3:  document.getElementById("death_saves_failures_3").checked,
    spells:                  document.getElementById("spells").value,
    cp:                      document.getElementById("cp").value,
    sp:                      document.getElementById("sp").value,
    ep:                      document.getElementById("ep").value,
    gp:                      document.getElementById("gp").value,
    pp:                      document.getElementById("pp").value,
    features_and_traits:     document.getElementById("features_and_traits").value,
  }});
}

function update_forms(){
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
  var race_data = Races.findOne({name: document.getElementById("race").value});
  if (typeof race_data !== 'undefined') {
    document.getElementById("speed").value = race_data.speed;
  }

  // Set max hp
  var class_data = Classes.findOne({name: document.getElementById("class").value});
  if (typeof class_data !== 'undefined') {
    document.getElementById("max_hitpoints_from_level").value = class_data.hp;
    document.getElementById("max_hitpoints").value = Number(document.getElementById("max_hitpoints_from_level").value) + Number(document.getElementById("max_hitpoints_from_roll").value)
  }

  // Set hit dice
  if (typeof document.getElementById("level").value !== 'undefined' && typeof class_data !== 'undefined') {
    document.getElementById("hit_dice_total").value = document.getElementById("level").value + "d" + class_data.hp;
  }

  // Set weapon info
  var weapon_data = Weapons.findOne({name: document.getElementById("weapons").value});
  if (typeof weapon_data !== 'undefined') {
    document.getElementById("attacks_and_spellcasting_weapons_attack_bonus").value = document.getElementById(weapon_data.mod + "_save_bonus").value;
    document.getElementById("attacks_and_spellcasting_weapons_damage").value = weapon_data.damage + " " + weapon_data.damage_type;
  }

  // Set weapon attack bonus
  $('.equipped_weapon_mod').each(function() {
    $(this).html($("#" + $(this).data("mod") + "_save_bonus").val());
  });
}

Template.character.events = {
  'change': function(event) {
    update_forms();
    update_character_DB();
  },
}

Template.character.helpers({
  character: function () {
    // TODO: Make this dynamic
    return Characters.findOne({_id: "jzZfNjRecszsFHQ67"});
  },
  races: function () {
    return Races.find();
  },
  subraces: function () {
    // TODO: Make this dynamic
    return Races.find({name: "Dwarf"});
  },
  classes: function () {
    return Classes.find();
  },
  subclasses: function () {
    // TODO: Make this dynamic
    //if (typeof document.getElementById("class").value !== 'undefined') {
    //  return Classes.find({name: document.getElementById("class").value});
    //}
    return Classes.find({name: "Barbarian"});
  },
  weapons: function () {
    return Weapons.find();
  },
  armors: function () {
    return Armors.find();
  },
  items: function () {
    return Items.find();
  },
});

setTimeout(function () {
  // TODO: Make this happen on callback/reactively
  var character_data = Characters.findOne({_id: "jzZfNjRecszsFHQ67"});
  if (typeof character_data !== 'undefined') {
   document.getElementById("race").value = character_data.race
   document.getElementById("class").value = character_data.class
   document.getElementById("subclass").value = character_data.subclass
   document.getElementById("subrace").value = character_data.subrace
  }
  update_forms();
}, 1000);
