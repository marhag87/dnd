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

function update_proficiency(character, field, attribute) {
  var attribute_mod = character[attribute + "_mod"];
  var proficient_skill = character[field];
  var skill_bonus = Number(attribute_mod);
  if (proficient_skill)
    skill_bonus += Number(proficiency_bonus);
  character[field + "_bonus"] = prepend_plus(skill_bonus);
  return character;
}

function prepend_plus(variable) {
  if (variable >= 0)
    variable = "+" + variable;
  return variable;
}

function update_weapons() {
  if ($("#equipment_weapons_new").val() !== '') {
    var weapon = Weapons.findOne({name: $("#equipment_weapons_new").val()},{"fields":{"_id": false}});
    var character = Characters.findOne({_id: "jzZfNjRecszsFHQ67"});
    weapon["attack_bonus"] = character[weapon.mod + "_save_bonus"];
    Characters.update({_id: "jzZfNjRecszsFHQ67"},{$addToSet: {weapons: weapon }});
    $("#equipment_weapons_new").val('');
  }
}

function update_character_DB() {
  // Update character in DB
  var character = {
    character_name:          $("#character_name").val(),
    race:                    $("#race").val(),
    subrace:                 $("#subrace").val(),
    alignment:               $("#alignment").val(),
    background:              $("#background").val(),
    player_name:             $("#player_name").val(),
    class:                   $("#class").val(),
    subclass:                $("#subclass").val(),
    experience_points:       $("#experience_points").val(),
    str:                     $("#str").val(),
    dex:                     $("#dex").val(),
    con:                     $("#con").val(),
    int:                     $("#int").val(),
    wis:                     $("#wis").val(),
    cha:                     $("#cha").val(),
    inspiration:             $("#inspiration").val(),
    str_save:                $("#str_save").prop('checked'),
    dex_save:                $("#dex_save").prop('checked'),
    con_save:                $("#con_save").prop('checked'),
    int_save:                $("#int_save").prop('checked'),
    wis_save:                $("#wis_save").prop('checked'),
    cha_save:                $("#cha_save").prop('checked'),
    acrobatics_skill:        $("#acrobatics_skill").prop('checked'),
    animal_handling_skill:   $("#animal_handling_skill").prop('checked'),
    arcana_skill:            $("#arcana_skill").prop('checked'),
    athletics_skill:         $("#athletics_skill").prop('checked'),
    deception_skill:         $("#deception_skill").prop('checked'),
    history_skill:           $("#history_skill").prop('checked'),
    insight_skill:           $("#insight_skill").prop('checked'),
    intimidation_skill:      $("#intimidation_skill").prop('checked'),
    investigation_skill:     $("#investigation_skill").prop('checked'),
    medicine_skill:          $("#medicine_skill").prop('checked'),
    nature_skill:            $("#nature_skill").prop('checked'),
    perception_skill:        $("#perception_skill").prop('checked'),
    performance_skill:       $("#performance_skill").prop('checked'),
    persuasion_skill:        $("#persuasion_skill").prop('checked'),
    religion_skill:          $("#religion_skill").prop('checked'),
    sleight_of_hand_skill:   $("#sleight_of_hand_skill").prop('checked'),
    stealth_skill:           $("#stealth_skill").prop('checked'),
    survival_skill:          $("#survival_skill").prop('checked'),
    other_proficiencies:     $("#other_proficiencies").val(),
    max_hitpoints_from_roll: $("#max_hitpoints_from_roll").val(),
    current_hitpoints:       $("#current_hitpoints").val(),
    temporary_hitpoints:     $("#temporary_hitpoints").val(),
    hit_dice_current:        $("#hit_dice_current").val(),
    death_saves_successes_1: $("#death_saves_successes_1").prop('checked'),
    death_saves_successes_2: $("#death_saves_successes_2").prop('checked'),
    death_saves_successes_3: $("#death_saves_successes_3").prop('checked'),
    death_saves_failures_1:  $("#death_saves_failures_1").prop('checked'),
    death_saves_failures_2:  $("#death_saves_failures_2").prop('checked'),
    death_saves_failures_3:  $("#death_saves_failures_3").prop('checked'),
    spells:                  $("#spells").val(),
    cp:                      $("#cp").val(),
    sp:                      $("#sp").val(),
    ep:                      $("#ep").val(),
    gp:                      $("#gp").val(),
    pp:                      $("#pp").val(),
    features_and_traits:     $("#features_and_traits").val(),
  };

  // Update attribute mods
  attributes.forEach(function (attribute) {
    character[attribute + "_mod"] = prepend_plus(Math.floor((character[attribute] - 10) / 2));
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
  character["experience_points"] = current_exp.value;
  character["level"] = current_level;

  // Set proficiency bonus
  proficiency_bonus = (Math.floor((Number(current_level) - 1) / 4)) + 2;
  character["proficiency_bonus"] = proficiency_bonus;

  // Set saving throws bonuses
  attributes.forEach(function (attribute) {
    character = update_proficiency(character, attribute + "_save", attribute);
  });

  // Set skill bonuses
  skills.forEach(function (skill) {
    character = update_proficiency(character, skill.name + "_skill", skill.attribute);
  });

  // Set passive wisdom
  character["passive_wisdom"] = (10 + Number(character["perception_skill_bonus"]));

  // Set armor class
  // TODO: Take into account gear/skills. Make writable but keep suggestion?
  character["armor_class"] = (10 + Number(character["dex_mod"]));

  // Set initiative
  // TODO: Take into account class, race, other features.
  character["initiative"] = Number(character["dex_mod"]);

  // Set speed
  var race_data = Races.findOne({name: $("#race").val()});
  if (typeof race_data !== 'undefined') {
    character["speed"] = race_data.speed;
  }

  // Set max hp
  var class_data = Classes.findOne({name: $("#class").val()});
  if (typeof class_data !== 'undefined') {
    character["max_hitpoints_from_level"] = class_data.hp;
    character["max_hitpoints"] = Number(character["max_hitpoints_from_level"]) + Number(character["max_hitpoints_from_roll"]);
  }

  // Set hit dice
  character["hit_dice_total"] = character["level"] + "d" + class_data.hp;

  Characters.update({_id: "jzZfNjRecszsFHQ67"},{$set: character});
}

Template.character.events = {
  'change': function(event) {
    update_weapons();
    update_character_DB();
  },
  'click .equipped_weapon_remove': function() {
    Characters.update({_id: "jzZfNjRecszsFHQ67"},{$pull: {weapons: this}});
  },
  'click .death_saves_reset': function() {
    $(".death_saves").prop('checked', false);
  },
}

Template.character.helpers({
  character: function () {
    // TODO: Make this dynamic
    return Characters.findOne({_id: "jzZfNjRecszsFHQ67"});
  },
  races: function () {
    var character = Characters.findOne({_id: "jzZfNjRecszsFHQ67"});
    var races = [];
    if (typeof character !== 'undefined') {
      Races.find().forEach(function(race){
        race["character_race"] = (race.name === character.race);
        races.push(race);
      });
      return races;
    } else {
      return Races.find();
    }
  },
  subraces: function () {
    // TODO: Make this dynamic
    var character = Characters.findOne({_id: "jzZfNjRecszsFHQ67"});
    var subraces = [];
    if (typeof character !== 'undefined') {
      var race = Races.findOne({name: character.race});
      if (typeof race.subraces !== 'undefined') {
        race.subraces.forEach(function(subrace){
          var sr = {name: subrace}
          sr["character_subrace"] = (subrace === character.subrace);
          subraces.push(sr);
        });
        return subraces;
      }
    }
  },
  classes: function () {
    var character = Characters.findOne({_id: "jzZfNjRecszsFHQ67"});
    var classes = [];
    if (typeof character !== 'undefined') {
      Classes.find().forEach(function(dndclass){
        dndclass["character_class"] = (dndclass.name === character.class);
        classes.push(dndclass);
      });
      return classes;
    } else {
      return Classes.find();
    }
  },
  subclasses: function () {
    // TODO: Make this dynamic
    var character = Characters.findOne({_id: "jzZfNjRecszsFHQ67"});
    var subclasses = [];
    if (typeof character !== 'undefined') {
      var dndclass = Classes.findOne({name: character.class});
      if (typeof dndclass.subclasses !== 'undefined') {
        dndclass.subclasses.forEach(function(subclass){
          var sc = {name: subclass}
          sc["character_subclass"] = (subclass === character.subclass);
          subclasses.push(sc);
        });
        return subclasses;
      }
    }
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
  attributes: function () {
    var character = Characters.findOne({_id: "jzZfNjRecszsFHQ67"});
    if (typeof character === 'undefined')
      return
    var attrs = [{name: "Strength",     attribute: "str", save: character["str_save"], save_bonus: character["str_save_bonus"]},
                 {name: "Dexterity",    attribute: "dex", save: character["dex_save"], save_bonus: character["dex_save_bonus"]},
                 {name: "Constitution", attribute: "con", save: character["con_save"], save_bonus: character["con_save_bonus"]},
                 {name: "Intelligence", attribute: "int", save: character["int_save"], save_bonus: character["int_save_bonus"]},
                 {name: "Wisdom",       attribute: "wis", save: character["wis_save"], save_bonus: character["wis_save_bonus"]},
                 {name: "Charisma",     attribute: "cha", save: character["cha_save"], save_bonus: character["cha_save_bonus"]}];
    return attrs;
  },
  skills: function () {
    var character = Characters.findOne({_id: "jzZfNjRecszsFHQ67"});
    if (typeof character === 'undefined')
      return
    var skills = [{name: "acrobatics",      attribute: "dex", nicename: "Acrobatics"},
                  {name: "animal_handling", attribute: "wis", nicename: "Animal Handling"},
                  {name: "arcana",          attribute: "int", nicename: "Arcana"},
                  {name: "athletics",       attribute: "str", nicename: "Athletics"},
                  {name: "deception",       attribute: "cha", nicename: "Deception"},
                  {name: "history",         attribute: "int", nicename: "History"},
                  {name: "insight",         attribute: "wis", nicename: "Insight"},
                  {name: "intimidation",    attribute: "cha", nicename: "Intimidation"},
                  {name: "investigation",   attribute: "int", nicename: "Investigation"},
                  {name: "medicine",        attribute: "wis", nicename: "Medicine"},
                  {name: "nature",          attribute: "int", nicename: "Nature"},
                  {name: "perception",      attribute: "wis", nicename: "Perception"},
                  {name: "performance",     attribute: "cha", nicename: "Performance"},
                  {name: "persuasion",      attribute: "cha", nicename: "Persuasion"},
                  {name: "religion",        attribute: "int", nicename: "Religion"},
                  {name: "sleight_of_hand", attribute: "dex", nicename: "Sleight of Hand"},
                  {name: "stealth",         attribute: "dex", nicename: "Stealth"},
                  {name: "survival",        attribute: "wis", nicename: "Survival"}];
    skills.forEach(function(skill) {
      skill["skill"] = character[skill.name + "_skill"]
      skill["skill_bonus"] = character[skill.name + "_skill_bonus"]
    });
    return skills;
  },
});
