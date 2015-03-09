Meteor.startup(function () {
  if (Classes.find().count() === 0) {
    var data       = [ {name: "Barbarian",  hp: 12, subclasses: ["Berserker", "Totem Warrior"]},
                       {name: "Bard",       hp: 8,  subclasses: ["College of Lore", "College of Valor"]},
                       {name: "Cleric",     hp: 8,  subclasses: ["Knowledge Domain", "Life Domain", "Light Domain", "Nature Domain", "Tempest Domain", "Trickery Domain", "War Domain"]},
                       {name: "Druid",      hp: 8,  subclasses: ["Circle of the Land", "Circle of the Moon"]},
                       {name: "Fighter",    hp: 10, subclasses: ["Champion", "Battle Master", "Eldritch Knight"]},
                       {name: "Monk",       hp: 8,  subclasses: ["Way of the Open Hand", "Way of Shadow", "Way of the Four Elements"]},
                       {name: "Paladin",    hp: 10, subclasses: ["Oath of Devotion", "Oath of the Ancients", "Oath of Vengeance"]},
                       {name: "Ranger",     hp: 10, subclasses: ["Hunter", "Beast Master"]},
                       {name: "Rogue",      hp: 8,  subclasses: ["Thief", "Assassin", "Arcane Trickster"]},
                       {name: "Sorcerer",   hp: 6,  subclasses: ["Draconic Bloodline", "Wild Magic"]},
                       {name: "Warlock",    hp: 8,  subclasses: ["The Archfey", "The Fiend", "The Great Old One"]},
                       {name: "Wizard",     hp: 6,  subclasses: ["Abjuration", "Conjuration", "Divination", "Enchantment", "Evocation", "Illusion", "Necromancy", "Transmutation"]}];
    _.each(data,function(dndclass) {
      Classes.insert(dndclass); 
    });
  }

  if (Races.find().count() === 0) {
    var data = [  {name: "Dwarf",      speed: 25, subraces: ["Mountain Dwarf", "Hill Dwarf"]},
                  {name: "Elf",        speed: 30, subraces: ["High Elf", "Wood Elf", "Dark Elf (Drow)"]},
                  {name: "Halfling",   speed: 25, subraces: ["Lightfoot", "Stout"]},
                  {name: "Human",      speed: 30},
                  {name: "Dragonborn", speed: 30, subraces: ["Black", "Blue", "Brass", "Bronze", "Copper", "Gold", "Green", "Red", "Silver", "White"]},
                  {name: "Gnome",      speed: 25, subraces: ["Forest Gnome", "Rock Gnome"]},
                  {name: "Half-Elf",   speed: 30},
                  {name: "Half-Orc",   speed: 30},
                  {name: "Tiefling",   speed: 30}];
    _.each(data,function(race) {
      Races.insert(race); 
    });
  }

  if (Weapons.find().count() === 0) {
    var data = [ {name: "Club",            cost: "1 sp", damage: "1d4", damage_type: "bludgeoning", weight: 2, light: true, mod: "str", weapon_type: "Simple Melee Weapon"},
                 {name: "Dagger",          cost: "2 gp", damage: "1d4", damage_type: "piercing", weight: 1, finesse: true, light: true, thrown: true, range_normal: 20, range_max: 60, mod: "dex", weapon_type: "Simple Melee Weapon"},
                 {name: "Crossbow, light", cost: "25 gp", damage: "1d8", damage_type: "piercing", weight: 5, ammunition: true, range_normal: 80, range_max: 320, loading: true, twohanded: true, mod: "dex", weapon_type: "Simple Ranged Weapon"},
                 {name: "Greataxe",        cost: "30 gp", damage: "1d12", damage_type: "slashing", weight: 7, heavy: true, twohanded: true, mod: "str", weapon_type: "Martial Melee Weapon"},
                 {name: "Longbow",         cost: "50 gp", damage: "1d10", damage_type: "piercing", weight: 2, ammunition: true, range_normal: 150, range_max: 600, heavy: true, twohanded: true, mod: "dex", weapon_type: "Martial Ranged Weapon"}];
    _.each(data,function(weapon) {
      Weapons.insert(weapon); 
    });
  }

  if (Armors.find().count() === 0) {
    var data = [ {name: "Padded",     cost: "5 gp",  ac: 11, ac_mod: "dex", stealth_disadvantage: true, weight: 8, type: "Light Armor"},
                 {name: "Hide",       cost: "10 gp", ac: 12, ac_mod: "dex", ac_mod_max: 2, weight: 12, type: "Medium Armor"},
                 {name: "Chain mail", cost: "75 gp", ac: 16, str: 13, steath_disadvantage: true, weight: 55, type: "Heavy Armor"},
                 {name: "Shield",     cost: "10 gp", ac: 2,  weight: 6, type: "Shield"}];
    _.each(data,function(armor) {
      Armors.insert(armor); 
    });
  }

  if (Items.find().count() === 0) {
    var data = [ {name: "Abacus", cost: "2 gp", weight: 2},
                 {name: "Arrows", cost: "1 gp", ammunition: true, ammount: 20, weight: 1},
                 {name: "Backpack", cost: "2 gp", weight: 5}];
    _.each(data,function(item) {
      Items.insert(item); 
    });
  }

  if (Characters.find({_id: "jzZfNjRecszsFHQ67"}).count() === 0) {
    var data = [ {_id: "jzZfNjRecszsFHQ67", character_name: "Draupnir", createdAt: new Date().getTime()} ];
    _.each(data,function(character) {
      Characters.insert(character);
    });
  }
});

