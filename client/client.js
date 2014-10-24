Template.character.events = {
  'keydown' : function (event) {
    if (event.which == 13) { // Enter key

      // Declare variables
      var attributes = ["str","dex","con","int","wis","cha"];

      // Update attribute mods
      attributes.forEach(function (attribute) {
        var attribute_score = document.getElementById(attribute);
        var attribute_mod = Math.floor((Number(attribute_score.value) - 10) / 2);
        if (attribute_mod >= 0)
          attribute_mod = "+" + attribute_mod;
        document.getElementById(attribute + "_mod").value = attribute_mod;
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
      [0,300,900,2700,6500,14000,23000,34000,48000,64000,85000,100000,120000,140000,165000,195000,225000,265000,305000,355000].reverse().some(function (levelrange, index, array) {
        current_level = 20 - index;
        return Number(current_exp.value) >= levelrange;
      });
      document.getElementById("level").value = current_level;

      // Set proficiency bonus
      var proficiency_bonus = (Math.floor((Number(current_level) - 1) / 4)) + 2;
      document.getElementById("proficiency_bonus").value = proficiency_bonus;

      // Set saving throws bonuses
      attributes.forEach(function (attribute) {
        var attribute_mod = document.getElementById(attribute + "_mod").value;
        var proficient_attribute = document.getElementById(attribute + "_save").checked;
        var save_throw = Number(attribute_mod);
        if (proficient_attribute)
          save_throw += Number(proficiency_bonus);
        if (save_throw >= 0)
          save_throw = "+" + save_throw;
        document.getElementById(attribute + "_save_bonus").value = save_throw;
      });
    }
  }
}
