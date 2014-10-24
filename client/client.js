function update_skills(skills, attribute, prof) {
  skills.forEach(function (skill) {
    update_proficiency(skill + "_skill", attribute);
  });
}

function update_proficiency(field, attribute) {
  var attribute_mod = document.getElementById(attribute + "_mod").value;
  var proficient_skill = document.getElementById(field).checked;
  var skill_bonus = Number(attribute_mod);
  if (proficient_skill)
    skill_bonus += Number(prof);
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
      var str_skills = ["athletics"];
      var dex_skills = ["acrobatics","sleight_of_hand","stealth"];
      var int_skills = ["arcana","history","investigation","nature","religion"];
      var wis_skills = ["animal_handling","insight","medicine","perception","survival"];
      var cha_skills = ["deception","intimidation","performance","persuasion"]

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
      var proficiency_bonus = (Math.floor((Number(current_level) - 1) / 4)) + 2;
      document.getElementById("proficiency_bonus").value = proficiency_bonus;

      // Set saving throws bonuses
      attributes.forEach(function (attribute) {
        update_proficiency(attribute + "_save", attribute);
      });

      // Set skill bonuses
      update_skills(str_skills, "str", proficiency_bonus);
      update_skills(dex_skills, "dex", proficiency_bonus);
      update_skills(int_skills, "int", proficiency_bonus);
      update_skills(wis_skills, "wis", proficiency_bonus);
      update_skills(cha_skills, "cha", proficiency_bonus);

    }
  }
}
