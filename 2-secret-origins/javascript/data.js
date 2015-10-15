const AbilityData = {names: ['Strength', 'Agility', 'Fighting', 'Awareness', 'Stamina', 'Dexterity', 'Intellect', 'Presence']};
const AdvantageData =
   {
       costPerRank: MapDefault.makeFromArray([['Beyond Mortal', 50], ['Let There Be', 40], ['Luck of the Gods', 5], ['Lucky', 5],
          ['Omnipresent', 5], ['Omniscient', 5], ['Sidekick', 2], ['Stay Like That', 15], ['Variable Modifier', 35],
          ['Your Petty Rules Don\'t Apply to Me', 50]], 1),
       defaultText: MapDefault.makeFromArray([['Favored Environment', 'Environment'], ['Favored Foe', 'Foe type'], ['Languages', 'Languages Known'],
          ['Minion', 'Helper Name'], ['Sidekick', 'Helper Name'], ['Stay Like That', 'Power Modified'], ['Supreme', 'Power Gained']], 'Advantage Subtype'),
       godhoodNames: ['Beyond Mortal', 'Let There Be', 'Luck of the Gods', 'Omnipresent', 'Omniscient', 'Perfect Focus',
          'Stay Like That', 'Supreme', 'Variable Modifier', 'Your Petty Rules Don\'t Apply to Me'],
       mapThese: ['Close Attack', 'Defensive Roll', 'Improved Critical', 'Improved Initiative', 'Ranged Attack', 'Seize Initiative'],
       maxRanks: MapDefault.makeFromArray([['Attractive', 2], ['Benefit', Infinity], ['Close Attack', Infinity], ['Daze', 2],
          ['Defensive Roll', Infinity], ['Equipment', Infinity], ['Evasion', 2], ['Fascinate', Infinity], ['Improved Critical', 4],
          ['Improved Initiative', 5], ['Improvised Weapon', Infinity], ['Inspire', 5], ['Languages', Infinity], ['Luck', Infinity],
          ['Lucky', 3], ['Minion', Infinity], ['Omnipresent', 3], ['Omniscient', 5], ['Precise Attack', 4],
          ['Ranged Attack', Infinity], ['Second Chance', Infinity], ['Set-up', Infinity], ['Sidekick', Infinity],
          ['Supreme', Infinity], ['Takedown', 2], ['Throwing Mastery', Infinity]], 1)
       //names is defined in changeData
   };
AdvantageData.hasText=AdvantageData.defaultText.getAllKeys().concat(['Benefit', 'Improved Critical', 'Precise Attack', 'Second Chance', 'Skill Mastery', 'Ultimate Effort']);
const DefenseData =
   {
       names:       [  'Dodge', 'Fortitude',    'Parry',     'Will', 'Toughness'],  //Toughness (Stamina) is listed for completeness (it isn't used)
       abilityUsed: ['Agility',   'Stamina', 'Fighting', 'Presence',   'Stamina']   //this could be a map but it is only used in 1 place so I didn't bother
   };
const ModifierData =
   {
       actionRangeDuration: ['Decreased Duration', 'Faster Action', 'Increased Duration', 'Increased Range', 'Reduced Range', 'Slower Action'],
       cost: MapDefault.makeFromArray([['Activation', -1], ['Affects Objects Only', 0], ['Affects Others Only', 0], ['Alternate Effect', -1],
          ['Alternate Resistance (Free)', 0], ['Ammunition', -1], ['Attack', 1], ['Decreased Duration', -1], ['Diminished Range', -1],
          ['Distracting', -1], ['Dynamic Alternate Effect', -1], ['Easily Removable', -1], ['Existence Dependent', 0], ['Fades', -1],
          ['Feedback', -1], ['Fragile', -1], ['Grab-Based', -1], ['Impervious', 2], ['Inaccurate', -1], ['Increased Mass', 3],
          ['Limited', -1], ['Linked', 0], ['Noticeable', -1], ['Other Flat Flaw', -1], ['Other Free Modifier', 0],
          ['Other Rank Flaw', -1], ['Penetrating', 2], ['Quirk', -1], ['Reduced Range', -1], ['Removable', -1], ['Resistible', -1],
          ['Sense-Dependent', -1], ['Side Effect', -1], ['Sleep', 0], ['Slower Action', -1], ['System Dependent', -2],
          ['Tiring', -1], ['Uncontrollable Entirely', -5], ['Uncontrollable Result', -1], ['Uncontrollable Target', -1],
          ['Uncontrolled', -1], ['Unreliable', -1]], 1),
       defaultText: MapDefault.makeFromArray([['Activation', 'Action Required'], ['Alternate Effect', 'To What'],
          ['Alternate Resistance (Cost)', 'Name of Resistance'], ['Alternate Resistance (Free)', 'Name of Resistance'],
          ['Ammunition', 'Usage Per time or reload'], ['Area', 'Shape'], ['Check Required', 'What Check'], ['Contagious', 'Method of Spreading'],
          ['Dimensional', 'Which Dimensions'], ['Dynamic Alternate Effect', 'To What'], ['Easily Removable', 'Type of item'],
          ['Extended Range', 'Total Ranges'], ['Fragile', 'Total Toughness'], ['Homing', 'Description or Method of targeting'],
          ['Increased Mass', 'Total Mass'], ['Indirect', 'Direction'], ['Linked', 'To What'], ['Reach', 'Total Attack Distance'],
          ['Removable', 'Type of item'], ['Resistible', 'Name of Resistance'], ['Sense-Dependent', 'Name of Sense'], ['Variable Descriptor', 'Category']], 'Description'),
       hasAutoTotal: ['Alternate Effect', 'Dynamic Alternate Effect', 'Easily Removable', 'Removable'],
       maxRank: MapDefault.makeFromArray([['Accurate', Infinity], ['Activation', 2], ['Affects Corporeal', Infinity],
          ['Affects Insubstantial', 2], ['Ammunition', 2], ['Area', Infinity], ['Check Required', Infinity], ['Decreased Duration', 3],
          ['Dimensional', 3], ['Diminished Range', 1], ['Extended Range', Infinity], ['Faster Action', 6], ['Fragile', Infinity],
          ['Homing', Infinity], ['Impervious', Infinity], ['Inaccurate', Infinity], ['Increased Duration', 3],
          ['Increased Mass', Infinity], ['Increased Range', 4], ['Indirect', 4], ['Limited', 2], ['Other Flat Extra', Infinity],
          ['Other Flat Flaw', Infinity], ['Other Rank Extra', Infinity], ['Other Rank Flaw', Infinity], ['Penetrating', Infinity],
          ['Reach', Infinity], ['Reduced Range', 4], ['Ricochet', Infinity], ['Side Effect', 2], ['Slower Action', 6],
          ['Split', Infinity], ['Subtle', 2], ['Triggered', Infinity], ['Variable Descriptor', 2]], 1),
       //names is defined in changeData
       type: MapDefault.makeFromArray([['Accurate', 'Flat'], ['Activation', 'Flat'], ['Affects Corporeal', 'Flat'],
          ['Affects Insubstantial', 'Flat'], ['Affects Objects Only', 'Free'], ['Affects Others Only', 'Free'], ['Alternate Effect', 'Flat'],
          ['Alternate Resistance (Free)', 'Free'], ['Attack', 'Rank'], ['Check Required', 'Flat'], ['Dimensional', 'Flat'],
          ['Diminished Range', 'Flat'], ['Dynamic Alternate Effect', 'Flat'], ['Easily Removable', 'Flat'], ['Existence Dependent', 'Free'],
          ['Extended Range', 'Flat'], ['Feature', 'Flat'], ['Fragile', 'Flat'], ['Homing', 'Flat'], ['Impervious', 'Flat'],
          ['Inaccurate', 'Flat'], ['Increased Mass', 'Flat'], ['Incurable', 'Flat'], ['Indirect', 'Flat'], ['Innate', 'Rank'],
          ['Insidious', 'Flat'], ['Linked', 'Free'], ['Noticeable', 'Flat'], ['Other Flat Extra', 'Flat'], ['Other Flat Flaw', 'Flat'],
          ['Other Free Modifier', 'Free'], ['Penetrating', 'Flat'], ['Precise', 'Flat'], ['Quirk', 'Flat'], ['Reach', 'Flat'],
          ['Removable', 'Flat'], ['Reversible', 'Flat'], ['Ricochet', 'Flat'], ['Sleep', 'Free'], ['Split', 'Flat'], ['Subtle', 'Flat'],
          ['System Dependent', 'Flat'], ['Triggered', 'Flat'], ['Variable Descriptor', 'Flat']], 'Rank')
   };
ModifierData.hasAutoRank = ModifierData.hasAutoTotal.concat(ModifierData.actionRangeDuration);
ModifierData.hasText=ModifierData.defaultText.getAllKeys().concat(['Feature', 'Limited', 'Noticeable', 'Quirk', 'Side Effect', 'Subtle', 'Triggered']);
  //the commonModifierOtherNames are added to hasText at the bottom of changeData
const PowerData =
   {
       //actions is defined in changeData
       baseCost: MapDefault.makeFromArray([['A God I Am', 5], ['Attain Knowledge', 2], ['Communication', 4], ['Comprehend', 2],
          ['Concealment', 2], ['Create', 2], ['Enhanced Trait', 2], ['Flight', 2], ['Growth', 6], ['Healing', 2], ['Immortality', 5],
          ['Insubstantial', 5], ['Luck Control', 3], ['Mental Transform', 2], ['Mind Reading', 2], ['Mind Switch', 8], ['Morph', 5],
          ['Move Object', 2], ['Movement', 2], ['Nullify', 3], ['Phantom Ranks', 5], ['Reality Warp', 5], ['Regeneration', 3],
          ['Resistance', 3], ['Shrinking', 3], ['Summon', 2], ['Summon Minion', 5], ['Summon Object', 2], ['Teleport', 2],
          ['Transform', 2], ['Variable', 7]], 1),
           //Morph has old cost because new cost is 1
       defaultAction: MapDefault.makeFromArray([['A God I Am', 'Triggered'], ['Burrowing', 'Free'], ['Communication', 'Free'],
          ['Comprehend', 'None'], ['Concealment', 'Free'], ['Elongation', 'Free'], ['Enhanced Trait', 'Free'],
          ['Extra Limbs', 'None'], ['Feature', 'None'], ['Flight', 'Free'], ['Growth', 'Free'], ['Immortality', 'None'],
          ['Immunity', 'None'], ['Insubstantial', 'Free'], ['Leaping', 'Free'], ['Luck Control', 'Reaction'], ['Morph', 'Free'],
          ['Movement', 'Free'], ['Permeate', 'Free'], ['Phantom Ranks', 'Free'], ['Protection', 'None'], ['Quickness', 'Free'],
          ['Reality Warp', 'Free'], ['Regeneration', 'None'], ['Remote Sensing', 'Free'], ['Resistance', 'None'], ['Senses', 'None'],
          ['Shrinking', 'Free'], ['Speed', 'Free'], ['Swimming', 'Free'], ['Teleport', 'Move'], ['Variable', 'Full']], 'Standard'),
       defaultDuration: MapDefault.makeFromArray([['A God I Am', 'Continuous'], ['Affliction', 'Instant'], ['Attain Knowledge', 'Instant'],
          ['Comprehend', 'Permanent'], ['Damage', 'Instant'], ['Deflect', 'Instant'], ['Extra Limbs', 'Permanent'], ['Feature', 'Permanent'],
          ['Healing', 'Instant'], ['Immortality', 'Permanent'], ['Immunity', 'Permanent'], ['Leaping', 'Instant'], ['Luck Control', 'Instant'],
          ['Mental Transform', 'Instant'], ['Nullify', 'Instant'], ['Protection', 'Permanent'], ['Reality Warp', 'Continuous'],
          ['Regeneration', 'Permanent'], ['Resistance', 'Permanent'], ['Senses', 'Permanent'], ['Teleport', 'Instant'], ['Weaken', 'Instant']], 'Sustained'),
       defaultRange: MapDefault.makeFromArray([['Affliction', 'Close'], ['Create', 'Ranged'], ['Damage', 'Close'], ['Deflect', 'Ranged'],
          ['Environment', 'Close'], ['Healing', 'Close'], ['Illusion', 'Perception'], ['Luck Control', 'Perception'], ['Mental Transform', 'Close'],
          ['Mind Reading', 'Perception'], ['Mind Switch', 'Close'], ['Move Object', 'Ranged'], ['Nullify', 'Ranged'],
          ['Reality Warp', 'Perception'], ['Summon', 'Close'], ['Summon Minion', 'Close'], ['Summon Object', 'Close'],
          ['Transform', 'Close'], ['Weaken', 'Close']], 'Personal'),
       durations: ['Concentration', 'Sustained', 'Continuous', 'Permanent', 'Instant'],  //Instant isn't a choice and Permanent cost weird
       godhoodNames: ['A God I Am', 'Reality Warp'],
       hasInputBaseCost: ['Attain Knowledge', 'Concealment', 'Enhanced Trait', 'Environment', 'Feature', 'Illusion', 'Remote Sensing', 'Senses', 'Transform'],
       isAttack: ['Affliction', 'Damage', 'Illusion', 'Mental Transform', 'Mind Reading', 'Mind Switch', 'Move Object', 'Nullify', 'Weaken'],
       //names is defined in changeData
       ranges: ['Close', 'Ranged', 'Perception', 'Personal']  //Personal isn't a choice
   };
const SkillData = {abilityMap: MapDefault.makeFromArray([['Acrobatics', 'Agility'], ['Close Combat', 'Fighting'], ['Common Knowledge', 'Intellect'],
    ['Deception', 'Presence'], ['Expertise', 'Intellect'], ['Insight', 'Awareness'], ['Intimidation', 'Presence'], ['Investigation', 'Intellect'],
    ['Knowledge', 'Intellect'], ['Memory', 'Intellect'], ['Perception', 'Awareness'], ['Persuasion', 'Presence'], ['Ranged Combat', 'Dexterity'],
    ['Sleight of Hand', 'Dexterity'], ['Stealth', 'Agility'], ['Strategy', 'Intellect'], ['Technology', 'Intellect'], ['Tracking', 'Awareness'],
    ['Treatment', 'Intellect'], ['Vehicles', 'Dexterity']], 'Strength')};
//SkillData.hasText is defined in changeData
//SkillData.names is defined in changeData
const SharedHtmlData =
   {
       powerName: function(sectionName, rowIndex){  return '          Name <input type="text" size="20" id="'+sectionName+ 'Name'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex +').changeName();" />\n';},
       powerSkill: function(sectionName, rowIndex){return '          Skill <input type="text" size="20" id="'+sectionName+'Skill'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').changeSkill();" />\n';}
   };
//they are all const so that they can't be assigned

//freeze the only 2 that are never changed so that I don't accidentally change them
Object.freeze(AbilityData);
Object.freeze(SharedHtmlData);

//TODO: rename all of this file to be Data.blah
/**This method changes all of the data based on if the rules are old or not. The constructor of Main also calls this to initialize the rule dependant data.*/
function changeData()
{
    var commonAdvantageNames = ['Accurate Attack', 'All-out Attack', 'Attractive', 'Beginner\'s Luck', 'Benefit', 'Connected',
       'Defensive Attack', 'Defensive Roll', 'Diehard', 'Equipment', 'Evasion', 'Extraordinary Effort', 'Fast Grab', 'Improved Aim',
       'Improved Critical', 'Improved Defense', 'Improved Disarm', 'Improved Grab', 'Improved Hold', 'Improved Initiative', 'Improved Trip',
       'Improvised Tools', 'Inspire', 'Instant Up', 'Interpose', 'Jack of All Trades', 'Languages', 'Minion', 'Move-by Action', 'Power Attack',
       'Prone Fighting', 'Quick Draw', 'Seize Initiative', 'Sidekick', 'Skill Mastery', 'Teamwork', 'Trance', 'Ultimate Effort'];
    var commonModifierExtraNames = ['Accurate', 'Affects Corporeal', 'Affects Objects Also', 'Affects Objects Only', 'Affects Others Also',
       'Affects Others Only', 'Alternate Effect', 'Alternate Resistance (Cost)', 'Alternate Resistance (Free)', 'Area', 'Attack',
       'Contagious', 'Dimensional', 'Extended Range', 'Faster Action', 'Feature', 'Homing', 'Impervious', 'Increased Duration',
       'Increased Mass', 'Increased Range', 'Indirect', 'Innate', 'Insidious', 'Linked', 'Multiattack', 'Penetrating', 'Precise',
       'Reach', 'Reversible', 'Ricochet', 'Secondary Effect', 'Selective', 'Split', 'Subtle', 'Variable Descriptor'];
    var commonModifierFlawNames = ['Activation', 'Check Required', 'Decreased Duration', 'Diminished Range', 'Distracting',
       'Easily Removable', 'Fades', 'Feedback', 'Grab-Based', 'Inaccurate', 'Limited', 'Noticeable', 'Quirk', 'Reduced Range',
       'Removable', 'Resistible', 'Sense-Dependent', 'Side Effect', 'Slower Action', 'Tiring', 'Unreliable'];
    var commonModifierOtherNames = ['Other Flat Extra', 'Other Rank Extra', 'Other Free Modifier', 'Other Rank Flaw', 'Other Flat Flaw'];
    var commonPowerNames = ['Affliction', 'Communication', 'Comprehend', 'Concealment', 'Create', 'Damage', 'Enhanced Trait', 'Environment',
       'Feature', 'Flight', 'Growth', 'Healing', 'Illusion', 'Immortality', 'Immunity', 'Insubstantial', 'Leaping', 'Luck Control',
       'Mind Reading', 'Morph', 'Move Object', 'Movement', 'Nullify', 'Protection', 'Quickness', 'Regeneration', 'Remote Sensing',
       'Senses', 'Shrinking', 'Teleport', 'Transform', 'Variable', 'Weaken'];
    var commonSkillNames = ['Acrobatics', 'Athletics', 'Close Combat', 'Deception', 'Expertise', 'Insight', 'Intimidation',
       'Investigation', 'Perception', 'Persuasion', 'Ranged Combat', 'Sleight of Hand', 'Stealth', 'Technology', 'Treatment', 'Vehicles'];

   if (Main !== undefined && Main.isOldRules())  //this does not execute during the constructor of Main because old rules are false by default
   {
       AdvantageData.costPerRank.set('Sidekick', 1);  //only one that needs to be changed (since the rest were removed)
       AdvantageData.maxRanks.set('Improved Initiative', Infinity);
       AdvantageData.names = commonAdvantageNames.concat(['Agile Feint', 'Animal Empathy', 'Artificer', 'Assessment', 'Chokehold',
          'Close Attack', 'Contacts', 'Daze', 'Eidetic Memory', 'Fascinate', 'Favored Environment', 'Favored Foe', 'Fearless',
          'Grabbing Finesse', 'Great Endurance', 'Hide in Plain Sight', 'Improved Smash', 'Improvised Weapon', 'Inventor',
          'Leadership', 'Luck', 'Precise Attack', 'Ranged Attack', 'Redirect', 'Ritualist', 'Second Chance', 'Set-up', 'Startle',
          'Takedown', 'Taunt', 'Throwing Mastery', 'Tracking', 'Uncanny Dodge', 'Weapon Bind', 'Weapon Break', 'Well-informed']).sort();

       SkillData.hasText = ['Close Combat', 'Expertise', 'Ranged Combat'];
       SkillData.names = commonSkillNames;

       PowerData.actions = ['Standard', 'Move', 'Free', 'Reaction', 'None'];  //None isn't a choice
       PowerData.defaultAction.set('Variable', 'Standard');
       PowerData.baseCost.set('Growth', 2);
       PowerData.baseCost.set('Immortality', 2);
       PowerData.baseCost.set('Morph', 5);
       PowerData.baseCost.set('Nullify', 1);
       PowerData.baseCost.set('Regeneration', 1);
       PowerData.baseCost.set('Shrinking', 2);
       PowerData.names = commonPowerNames.concat(['Burrowing', 'Deflect', 'Elongation', 'Extra Limbs', 'Speed', 'Summon', 'Swimming']).sort();

       var oldExtraNames = commonModifierExtraNames.concat(['Affects Insubstantial', 'Dynamic Alternate Effect', 'Incurable', 'Sleep', 'Triggered']).sort();
       var oldFlawNames = commonModifierFlawNames.concat('Uncontrolled').sort();  //must use concat over push because push doesn't return anything
       ModifierData.names = oldExtraNames.concat(oldFlawNames);  //commonModifierOtherNames are added at the bottom of changeData

       ModifierData.cost.set('Attack', 0);
       ModifierData.type.set('Attack', 'Free');
       ModifierData.maxRank.set('Diminished Range', 3);
       ModifierData.cost.set('Impervious', 1);
       ModifierData.maxRank.set('Impervious', 1);
       ModifierData.type.set('Impervious', 'Rank');
       ModifierData.cost.set('Increased Mass', 1);
       ModifierData.type.set('Innate', 'Flat');
       ModifierData.cost.set('Penetrating', 1);

       DefenseData.abilityUsed[DefenseData.names.indexOf('Will')] = 'Awareness';
   }
   else  //if(Main === undefined || !Main.isOldRules())
   {
       AdvantageData.costPerRank.set('Sidekick', 2);
       AdvantageData.maxRanks.set('Improved Initiative', 5);
       AdvantageData.names = commonAdvantageNames.concat(['Lucky', 'Meekness']).sort();

       SkillData.names = commonSkillNames.concat(['Common Knowledge', 'Knowledge', 'Memory', 'Strategy', 'Tracking']).sort();
       SkillData.names.push('Other');  //must be last instead of sorted
       SkillData.hasText = SkillData.names.copy();
       //in new rules most of them have text except the following:
       SkillData.hasText.removeByValue('Memory');
       SkillData.hasText.removeByValue('Perception');
       SkillData.hasText.removeByValue('Persuasion');
       SkillData.hasText.removeByValue('Tracking');

       PowerData.actions = ['Slow', 'Full', 'Standard', 'Move', 'Free', 'Reaction', 'Triggered', 'None'];  //None isn't a choice
       PowerData.defaultAction.set('Variable', 'Full');
       PowerData.baseCost.set('Growth', 6);
       PowerData.baseCost.set('Immortality', 5);
       PowerData.baseCost.set('Morph', 1);  //I could add/remove morph but this is nicer
       PowerData.baseCost.set('Nullify', 3);
       PowerData.baseCost.set('Regeneration', 3);
       PowerData.baseCost.set('Shrinking', 3);
       PowerData.names = commonPowerNames.concat(['Attain Knowledge', 'Mental Transform', 'Mind Switch', 'Permeate', 'Phantom Ranks',
          'Resistance', 'Summon Minion', 'Summon Object']).sort();

       var newExtraNames = commonModifierExtraNames.concat('Existence Dependent').sort();  //must use concat over push because push doesn't return anything
       var newFlawNames = commonModifierFlawNames.concat(['Ammunition', 'Fragile', 'System Dependent', 'Uncontrollable Entirely',
          'Uncontrollable Result', 'Uncontrollable Target']).sort();
       ModifierData.names = newExtraNames.concat(newFlawNames);  //commonModifierOtherNames are added at the bottom of changeData

       ModifierData.cost.set('Attack', 1);
       ModifierData.type.set('Attack', 'Rank');
       ModifierData.maxRank.set('Diminished Range', 1);
       ModifierData.cost.set('Impervious', 2);
       ModifierData.maxRank.set('Impervious', -1);
       ModifierData.type.set('Impervious', 'Flat');
       ModifierData.cost.set('Increased Mass', 3);
       ModifierData.type.set('Innate', 'Rank');
       ModifierData.cost.set('Penetrating', 2);

       DefenseData.abilityUsed[DefenseData.names.indexOf('Will')] = 'Presence';
   }
    ModifierData.names = ModifierData.names.concat(commonModifierOtherNames);  //both rule sets end with these
    if(Main === undefined) ModifierData.hasText = ModifierData.hasText.concat(commonModifierOtherNames);  //only do this once on page creation
       //it's inside changeData instead of outside in order to have access to commonModifierOtherNames
}
