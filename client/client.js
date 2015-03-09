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
  var attribute_mod = $("#" + attribute + "_mod").val();
  var proficient_skill = $("#" + field).prop('checked');
  var skill_bonus = Number(attribute_mod);
  if (proficient_skill)
    skill_bonus += Number(proficiency_bonus);
  $("#" + field + "_bonus").val(prepend_plus(skill_bonus));
}

function prepend_plus(variable) {
  if (variable >= 0)
    variable = "+" + variable;
  return variable;
}

function update_character_DB() {
  // Update character in DB
  Characters.update({_id: "jzZfNjRecszsFHQ67"},{$set: {
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
  }});
}

function update_forms(){
  // Update attribute mods
  attributes.forEach(function (attribute) {
    var attribute_score = document.getElementById(attribute);
    var attribute_mod = Math.floor((Number(attribute_score.value) - 10) / 2);
    $("#" + attribute + "_mod").val(prepend_plus(attribute_mod));
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
  $("#level").val(current_level);

  // Set proficiency bonus
  proficiency_bonus = (Math.floor((Number(current_level) - 1) / 4)) + 2;
  $("#proficiency_bonus").val(proficiency_bonus);

  // Set saving throws bonuses
  attributes.forEach(function (attribute) {
    update_proficiency(attribute + "_save", attribute);
  });

  // Set skill bonuses
  skills.forEach(function (skill) {
    update_proficiency(skill.name + "_skill", skill.attribute);
  });

  // Set passive wisdom
  $("#passive_wisdom").value = 10 + Number($("#perception_skill_bonus").val());

  // Set armor class
  // TODO: Take into account gear/skills. Make writable but keep suggestion?
  $("#armor_class").value = 10 + Number($("#dex_mod").val());

  // Set initiative
  // TODO: Take into account class, race, other features.
  $("#initiative").value = Number($("#dex_mod").val());

  // Set speed
  var race_data = Races.findOne({name: $("#race").val()});
  if (typeof race_data !== 'undefined') {
    $("#speed").val(race_data.speed);
  }

  // Set max hp
  var class_data = Classes.findOne({name: $("#class").val()});
  if (typeof class_data !== 'undefined') {
    $("#max_hitpoints_from_level").val(class_data.hp);
    $("#max_hitpoints").val(Number($("#max_hitpoints_from_level").val()) + Number($("#max_hitpoints_from_roll").val()));
  }

  // Set hit dice
  if (typeof $("#level").val() !== 'undefined' && typeof class_data !== 'undefined') {
    $("#hit_dice_total").val($("#level").val() + "d" + class_data.hp);
  }

  // Set weapon info
  var weapon_data = Weapons.findOne({name: $("#weapons").val()});
  if (typeof weapon_data !== 'undefined') {
    $("#attacks_and_spellcasting_weapons_attack_bonus").val($("#" + weapon_data.mod + "_save_bonus").val());
    $("#attacks_and_spellcasting_weapons_damage").val(weapon_data.damage + " " + weapon_data.damage_type);
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
    //if (typeof $("class").val() !== 'undefined') {
    //  return Classes.find({name: $("class").val()});
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
   $("#race").val(character_data.race)
   $("#class").val(character_data.class)
   $("#subclass").val(character_data.subclass)
   $("#subrace").val(character_data.subrace)
  }
  update_forms();
}, 1000);
