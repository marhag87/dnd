function update_skills(skills) {
  skills.forEach(function (skill) {
    update_proficiency(skill.name + "_skill", skill.attribute);
  });
}

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
      experience_per_level.reverse().some(function (levelrange, index, array) {
        current_level = 20 - index;
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
      update_skills(skills);

      // Set passive wisdom
      document.getElementById("passive_wisdom").value = 10 + Number(document.getElementById("perception_skill_bonus").value);
    }
  }
}
