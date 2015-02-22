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
      Classes.insert({name: dndclass.name, hp: dndclass.hp, subclasses: dndclass.subclasses}); 
    });
  }

  if (Races.find().count() === 0) {
    var data = [ {name: "Dwarf",      speed: 25},
                  {name: "Elf",        speed: 30},
                  {name: "Halfling",   speed: 25},
                  {name: "Human",      speed: 30},
                  {name: "Dragonborn", speed: 30},
                  {name: "Gnome",      speed: 25},
                  {name: "Half-Elf",   speed: 30},
                  {name: "Half-Orc",   speed: 30},
                  {name: "Tiefling",   speed: 30}];
    _.each(data,function(race) {
      Races.insert({name: race.name, speed: race.speed}); 
    });
  }
});

