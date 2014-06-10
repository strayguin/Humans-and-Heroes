//TODO: sort the JSON and changeData
//TODO: has text repeats some of default text hash. should be using concat instead
//TODO: make a create once function for some of changeData
const AbilityData = {names: ['Strength', 'Agility', 'Fighting', 'Awareness', 'Stamina', 'Dexterity', 'Intellect', 'Presence']};
const AdvantageData =
   {
       maxRanks: Hash.makeFromArray([['Attractive', 2], ['Benefit', Infinity], ['Close Attack', Infinity], ['Daze', 2], ['Defensive Roll', Infinity], ['Equipment', Infinity], ['Evasion', 2], ['Fascinate', Infinity], ['Improved Critical', 4], ['Improved Initiative', 5], ['Improvised Weapon', Infinity], ['Inspire', 5], ['Languages', Infinity], ['Luck', Infinity], ['Lucky', 3], ['Minion', Infinity], ['Omnipresent', 3], ['Omniscient', 5], ['Precise Attack', 4], ['Ranged Attack', Infinity], ['Second Chance', Infinity], ['Set-up', Infinity], ['Sidekick', Infinity], ['Supreme', Infinity], ['Takedown', 2], ['Throwing Mastery', Infinity]], 1),
       costPerRank: Hash.makeFromArray([['Beyond Mortal', 50], ['Let There Be', 40], ['Luck of the Gods', 5], ['Lucky', 5], ['Omnipresent', 5], ['Omniscient', 5], ['Sidekick', 2], ['Stay Like That', 15], ['Variable Modifier', 35], ['Your Petty Rules Don\'t Apply to Me', 50]], 1),
       hashText: ['Benefit', 'Favored Environment', 'Favored Foe', 'Improved Critical', 'Languages', 'Minion', 'Precise Attack', 'Second Chance', 'Sidekick', 'Skill Mastery', 'Stay Like That', 'Supreme', 'Ultimate Effort'],
       defaultText: Hash.makeFromArray([['Favored Environment', 'Environment'], ['Favored Foe', 'Foe type'], ['Languages', 'Languages Known'], ['Minion', 'Helper Name'], ['Sidekick', 'Helper Name'], ['Stay Like That', 'Power Modified'], ['Supreme', 'Power Gained']], 'Advantage Subtype')
   };
const DefenseData =
   {
       names:       [  'Dodge', 'Fortitude',    'Parry',     'Will', 'Toughness'],  //Toughness (Stamina) is listed for completeness
       abilityUsed: ['Agility',   'Stamina', 'Fighting', 'Presence',   'Stamina']
   };
const ModifierData =
   {
       maxRank: Hash.makeFromArray([['Accurate', Infinity], ['Activation', 2], ['Affects Corporeal', Infinity], ['Affects Insubstantial', 2], ['Ammunition', 2], ['Area', Infinity], ['Check Required', Infinity], ['Decreased Duration', 3], ['Dimensional', 3], ['Diminished Range', 1], ['Extended Range', Infinity], ['Faster Action', 6], ['Fragile', Infinity], ['Homing', Infinity], ['Impervious', Infinity], ['Inaccurate', Infinity], ['Increased Duration', 3], ['Increased Mass', Infinity], ['Increased Range', 4], ['Indirect', 4], ['Limited', 2], ['Other Flat Extra', Infinity], ['Other Flat Flaw', Infinity], ['Other Rank Extra', Infinity], ['Other Rank Flaw', Infinity], ['Penetrating', Infinity], ['Reach', Infinity], ['Reduced Range', 4], ['Ricochet', Infinity], ['Side Effect', 2], ['Slower Action', 6], ['Split', Infinity], ['Subtle', 2], ['Triggered', Infinity], ['Variable Descriptor', 2]], 1),
       type: Hash.makeFromArray([['Accurate', 'Flat'], ['Activation', 'Flat'], ['Affects Corporeal', 'Flat'], ['Affects Insubstantial', 'Flat'], ['Affects Objects Only', 'Free'], ['Affects Others Only', 'Free'], ['Alternate Effect', 'Flat'], ['Alternate Resistance (Free)', 'Free'], ['Attack', 'Rank'], ['Check Required', 'Flat'], ['Dimensional', 'Flat'], ['Diminished Range', 'Flat'], ['Dynamic Alternate Effect', 'Flat'], ['Easily Removable', 'Flat'], ['Existence Dependent', 'Free'], ['Extended Range', 'Flat'], ['Feature', 'Flat'], ['Fragile', 'Flat'], ['Homing', 'Flat'], ['Impervious', 'Flat'], ['Inaccurate', 'Flat'], ['Increased Mass', 'Flat'], ['Incurable', 'Flat'], ['Indirect', 'Flat'], ['Innate', 'Rank'], ['Insidious', 'Flat'], ['Linked', 'Free'], ['Noticeable', 'Flat'], ['Other Flat Extra', 'Flat'], ['Other Flat Flaw', 'Flat'], ['Other Free Modifier', 'Free'], ['Penetrating', 'Flat'], ['Precise', 'Flat'], ['Quirk', 'Flat'], ['Reach', 'Flat'], ['Removable', 'Flat'], ['Reversible', 'Flat'], ['Ricochet', 'Flat'], ['Sleep', 'Free'], ['Split', 'Flat'], ['Subtle', 'Flat'], ['System Dependent', 'Flat'], ['Triggered', 'Flat'], ['Variable Descriptor', 'Flat']], 'Rank'),
       cost: Hash.makeFromArray([['Activation', -1], ['Affects Objects Only', 0], ['Affects Others Only', 0], ['Alternate Effect', -1], ['Alternate Resistance (Free)', 0], ['Ammunition', -1], ['Attack', 1], ['Decreased Duration', -1], ['Diminished Range', -1], ['Distracting', -1], ['Dynamic Alternate Effect', -1], ['Easily Removable', -1], ['Existence Dependent', 0], ['Fades', -1], ['Feedback', -1], ['Fragile', -1], ['Grab-Based', -1], ['Impervious', 2], ['Inaccurate', -1], ['Increased Mass', 3], ['Limited', -1], ['Linked', 0], ['Noticeable', -1], ['Other Flat Flaw', -1], ['Other Free Modifier', 0], ['Other Rank Flaw', -1], ['Penetrating', 2], ['Quirk', -1], ['Reduced Range', -1], ['Removable', -1], ['Resistible', -1], ['Sense-Dependent', -1], ['Side Effect', -1], ['Sleep', 0], ['Slower Action', -1], ['System Dependent', -2], ['Tiring', -1], ['Uncontrollable Entirely', -5], ['Uncontrollable Result', -1], ['Uncontrollable Target', -1], ['Uncontrolled', -1], ['Unreliable', -1]], 1),
       defaultText: Hash.makeFromArray([['Activation', 'Action Required'], ['Alternate Effect', 'To What'], ['Alternate Resistance (Cost)', 'Name of Resistance'], ['Alternate Resistance (Free)', 'Name of Resistance'], ['Ammunition', 'Usage Per time or reload'], ['Area', 'Shape'], ['Check Required', 'What Check'], ['Contagious', 'Method of Spreading'], ['Dimensional', 'Which Dimensions'], ['Dynamic Alternate Effect', 'To What'], ['Easily Removable', 'Type of item'], ['Extended Range', 'Total Ranges'], ['Fragile', 'Total Toughness'], ['Homing', 'Description or Method of targeting'], ['Increased Mass', 'Total Mass'], ['Indirect', 'Direction'], ['Linked', 'To What'], ['Reach', 'Total Attack Distance'], ['Removable', 'Type of item'], ['Resistible', 'Name of Resistance'], ['Sense-Dependent', 'Name of Sense'], ['Variable Descriptor', 'Category']], 'Description'),
       hasText: ['Activation', 'Alternate Effect', 'Alternate Resistance (Cost)', 'Alternate Resistance (Free)', 'Ammunition', 'Area', 'Check Required', 'Contagious', 'Dimensional', 'Dynamic Alternate Effect', 'Easily Removable', 'Extended Range', 'Feature', 'Fragile', 'Homing', 'Increased Mass', 'Indirect', 'Limited', 'Linked', 'Noticeable', 'Other Flat Extra', 'Other Flat Flaw', 'Other Free Modifier', 'Other Rank Extra', 'Other Rank Flaw', 'Quirk', 'Reach', 'Removable', 'Resistible', 'Sense-Dependent', 'Side Effect', 'Subtle', 'Triggered', 'Variable Descriptor'],
       hasAutoTotal: ['Alternate Effect', 'Dynamic Alternate Effect', 'Easily Removable', 'Removable'],
       actionRangeDuration: ['Decreased Duration', 'Faster Action', 'Increased Duration', 'Increased Range', 'Reduced Range', 'Slower Action']
   };
const PowerData =
   {
       hasInputBaseCost: ['Attain Knowledge', 'Concealment', 'Enhanced Trait', 'Environment', 'Feature', 'Illusion', 'Remote Sensing', 'Senses', 'Transform'],
       defaultAction: Hash.makeFromArray([['A God I Am', 'Triggered'], ['Burrowing', 'Free'], ['Communication', 'Free'], ['Comprehend', 'None'], ['Concealment', 'Free'], ['Elongation', 'Free'], ['Enhanced Trait', 'Free'], ['Extra Limbs', 'None'], ['Feature', 'None'], ['Flight', 'Free'], ['Growth', 'Free'], ['Immortality', 'None'], ['Immunity', 'None'], ['Insubstantial', 'Free'], ['Leaping', 'Free'], ['Luck Control', 'Reaction'], ['Morph', 'Free'], ['Movement', 'Free'], ['Permeate', 'Free'], ['Phantom Ranks', 'Free'], ['Protection', 'None'], ['Quickness', 'Free'], ['Reality Warp', 'Free'], ['Regeneration', 'None'], ['Remote Sensing', 'Free'], ['Resistance', 'None'], ['Senses', 'None'], ['Shrinking', 'Free'], ['Speed', 'Free'], ['Swimming', 'Free'], ['Teleport', 'Move'], ['Variable', 'Full']], 'Standard'),
       baseCost: Hash.makeFromArray([['A God I Am', 5], ['Attain Knowledge', 2], ['Communication', 4], ['Comprehend', 2], ['Concealment', 2], ['Create', 2], ['Enhanced Trait', 2], ['Flight', 2], ['Growth', 6], ['Healing', 2], ['Immortality', 5], ['Insubstantial', 5], ['Luck Control', 3], ['Mental Transform', 2], ['Mind Reading', 2], ['Mind Switch', 7], ['Morph', 1], ['Move Object', 2], ['Movement', 2], ['Nullify', 3], ['Phantom Ranks', 5], ['Reality Warp', 5], ['Regeneration', 3], ['Resistance', 3], ['Shrinking', 3], ['Summon', 2], ['Summon Minion', 5], ['Summon Object', 2], ['Teleport', 2], ['Transform', 2], ['Variable', 7]], 1),
          //do not remove Morph, despite being default it needs to exist so I can set it when rules are not old
       ranges: ['Close', 'Ranged', 'Perception', 'Personal'],  //Personal isn't a choice
       durations: ['Concentration', 'Sustained', 'Continuous', 'Permanent', 'Instant'],  //Instant isn't a choice and Permanent cost weird
       godhoodNames: ['A God I Am', 'Reality Warp'],
       defaultRange: Hash.makeFromArray([['Affliction', 'Close'], ['Create', 'Ranged'], ['Damage', 'Close'], ['Deflect', 'Ranged'], ['Environment', 'Close'], ['Healing', 'Close'], ['Illusion', 'Perception'], ['Luck Control', 'Perception'], ['Mental Transform', 'Close'], ['Mind Reading', 'Perception'], ['Mind Switch', 'Close'], ['Move Object', 'Ranged'], ['Nullify', 'Ranged'], ['Reality Warp', 'Perception'], ['Summon', 'Close'], ['Summon Minion', 'Close'], ['Summon Object', 'Close'], ['Transform', 'Close'], ['Weaken', 'Close']], 'Personal'),
       defaultDuration: Hash.makeFromArray([['A God I Am', 'Continuous'], ['Affliction', 'Instant'], ['Attain Knowledge', 'Instant'], ['Comprehend', 'Permanent'], ['Damage', 'Instant'], ['Deflect', 'Instant'], ['Extra Limbs', 'Permanent'], ['Feature', 'Permanent'], ['Healing', 'Instant'], ['Immortality', 'Permanent'], ['Immunity', 'Permanent'], ['Leaping', 'Instant'], ['Luck Control', 'Instant'], ['Mental Transform', 'Instant'], ['Mind Switch', 'Continuous'], ['Nullify', 'Instant'], ['Protection', 'Permanent'], ['Reality Warp', 'Continuous'], ['Regeneration', 'Permanent'], ['Resistance', 'Permanent'], ['Senses', 'Permanent'], ['Teleport', 'Instant'], ['Weaken', 'Instant']], 'Sustained'),
       isAttack: ['Affliction', 'Damage', 'Illusion', 'Mental Transform', 'Mind Reading', 'Mind Switch', 'Move Object', 'Nullify', 'Weaken']
   };
const SkillData = {abilityHash: Hash.makeFromArray([['Acrobatics', 'Agility'], ['Close Combat', 'Fighting'], ['Common Knowledge', 'Intellect'], ['Deception', 'Presence'], ['Expertise', 'Intellect'], ['Insight', 'Awareness'], ['Intimidation', 'Presence'], ['Investigation', 'Intellect'], ['Knowledge', 'Intellect'], ['Memory', 'Intellect'], ['Perception', 'Awareness'], ['Persuasion', 'Presence'], ['Ranged Combat', 'Dexterity'], ['Sleight of Hand', 'Dexterity'], ['Stealth', 'Agility'], ['Strategy', 'Intellect'], ['Technology', 'Intellect'], ['Tracking', 'Awareness'], ['Treatment', 'Intellect'], ['Vehicles', 'Dexterity']], 'Strength')};
const SharedHtmlData =
   {
       powerName: function(sectionName, rowIndex){return '          Name <input type="text" size="20" id="'+sectionName+'Name'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').changeName();" />\n';},
       powerSkill: function(sectionName, rowIndex){return '          Skill <input type="text" size="20" id="'+sectionName+'Skill'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').changeSkill();" />\n';}
   };
//they are all const so that they can't be assigned

//freeze the only 2 that are never changed so that I don't accidentally change them
Object.freeze(AbilityData);
Object.freeze(SharedHtmlData);

function changeData()
{
    var commonSkillNames = ['Acrobatics', 'Athletics', 'Close Combat', 'Deception', 'Expertise', 'Insight', 'Intimidation', 'Investigation', 'Perception', 'Persuasion', 'Ranged Combat', 'Sleight of Hand', 'Stealth', 'Technology', 'Treatment', 'Vehicles'];
    var commonAdvantageNames  =['Accurate Attack', 'All-out Attack', 'Attractive', 'Beginner\'s Luck', 'Benefit', 'Connected', 'Defensive Attack', 'Defensive Roll', 'Diehard', 'Equipment', 'Evasion', 'Extraordinary Effort', 'Fast Grab', 'Improved Aim', 'Improved Critical', 'Improved Defense', 'Improved Disarm', 'Improved Grab', 'Improved Hold', 'Improved Initiative', 'Improved Trip', 'Improvised Tools', 'Inspire', 'Instant Up', 'Interpose', 'Jack of All Trades', 'Languages', 'Minion', 'Move-by Action', 'Power Attack', 'Prone Fighting', 'Quick Draw', 'Seize Initiative', 'Sidekick', 'Skill Mastery', 'Teamwork', 'Trance', 'Ultimate Effort'];
    var commonPowerNames = ['Affliction', 'Communication', 'Comprehend', 'Concealment', 'Create', 'Damage', 'Enhanced Trait', 'Environment', 'Feature', 'Flight', 'Growth', 'Healing', 'Illusion', 'Immortality', 'Immunity', 'Insubstantial', 'Leaping', 'Luck Control', 'Mind Reading', 'Morph', 'Move Object', 'Movement', 'Nullify', 'Protection', 'Quickness', 'Regeneration', 'Remote Sensing', 'Senses', 'Shrinking', 'Teleport', 'Transform', 'Variable', 'Weaken'];
    var commonModifierExtraNames = ['Accurate', 'Affects Corporeal', 'Affects Objects Also', 'Affects Objects Only', 'Affects Others Also', 'Affects Others Only', 'Alternate Effect', 'Alternate Resistance (Cost)', 'Alternate Resistance (Free)', 'Area', 'Attack', 'Contagious', 'Dimensional', 'Extended Range', 'Faster Action', 'Feature', 'Homing', 'Impervious', 'Increased Duration', 'Increased Mass', 'Increased Range', 'Indirect', 'Innate', 'Insidious', 'Linked', 'Multiattack', 'Penetrating', 'Precise', 'Reach', 'Reversible', 'Ricochet', 'Secondary Effect', 'Selective', 'Split', 'Subtle', 'Variable Descriptor'];
    var commonModifierFlawNames = ['Activation', 'Check Required', 'Decreased Duration', 'Diminished Range', 'Distracting', 'Easily Removable', 'Fades', 'Feedback', 'Grab-Based', 'Inaccurate', 'Limited', 'Noticeable', 'Quirk', 'Reduced Range', 'Removable', 'Resistible', 'Sense-Dependent', 'Side Effect', 'Slower Action', 'Tiring', 'Unreliable'];
    var commonModifierOtherNames = ['Other Flat Extra', 'Other Rank Extra', 'Other Free Modifier', 'Other Rank Flaw', 'Other Flat Flaw'];

   if (Main != undefined && Main.isOldRules())
   {
       DefenseData.abilityUsed[DefenseData.names.indexOf('Will')] = 'Awareness';

       SkillData.names = commonSkillNames;
       SkillData.hasText = ['Close Combat', 'Expertise', 'Ranged Combat'];

       AdvantageData.costPerRank.set('Sidekick', 1);  //only one that needs to be changed (since the rest were removed)
       AdvantageData.maxRanks.set('Improved Initiative', Infinity);
       AdvantageData.names = remakeArray(commonAdvantageNames, ['Agile Feint', 'Animal Empathy', 'Artificer', 'Assessment', 'Chokehold', 'Close Attack', 'Contacts', 'Daze', 'Eidetic Memory', 'Fascinate', 'Favored Environment', 'Favored Foe', 'Fearless', 'Grabbing Finesse', 'Great Endurance', 'Hide in Plain Sight', 'Improved Smash', 'Improvised Weapon', 'Inventor', 'Leadership', 'Luck', 'Precise Attack', 'Ranged Attack', 'Redirect', 'Ritualist', 'Second Chance', 'Set-up', 'Startle', 'Takedown', 'Taunt', 'Throwing Mastery', 'Tracking', 'Uncanny Dodge', 'Weapon Bind', 'Weapon Break', 'Well-informed']);
       AdvantageData.godhoodNames = [];

       PowerData.baseCost.set('Growth', 2);
       PowerData.baseCost.set('Immortality', 2);
       PowerData.baseCost.set('Morph', 5);
       PowerData.baseCost.set('Nullify', 1);
       PowerData.baseCost.set('Regeneration', 1);
       PowerData.baseCost.set('Shrinking', 2);
       PowerData.defaultAction.set('Variable', 'Standard');
       PowerData.actions = ['Standard', 'Move', 'Free', 'Reaction', 'None'];  //None isn't a choice
       PowerData.names = remakeArray(commonPowerNames, ['Burrowing', 'Deflect', 'Elongation', 'Extra Limbs', 'Speed', 'Summon', 'Swimming']);

       var oldExtraNames = remakeArray(commonModifierExtraNames, ['Affects Insubstantial', 'Dynamic Alternate Effect', 'Incurable', 'Sleep', 'Triggered']);
       var oldFlawNames = remakeArray(commonModifierFlawNames, ['Uncontrolled']);  //call this instead of push so that it's sorted
       ModifierData.names = oldExtraNames.concat(oldFlawNames);

       ModifierData.cost.set('Attack', 0);
       ModifierData.type.set('Attack', 'Free');
       ModifierData.maxRank.set('Diminished Range', 3);
       ModifierData.cost.set('Impervious', 1);
       ModifierData.maxRank.set('Impervious', 1);
       ModifierData.type.set('Impervious', 'Rank');
       ModifierData.cost.set('Increased Mass', 1);
       ModifierData.type.set('Innate', 'Flat');
       ModifierData.cost.set('Penetrating', 1);
   }
   else
   {
       DefenseData.abilityUsed[DefenseData.names.indexOf('Will')] = 'Presence';

       SkillData.names = remakeArray(commonSkillNames, ['Common Knowledge', 'Knowledge', 'Memory', 'Strategy', 'Tracking']);
       SkillData.names.push('Other');  //must be last instead of sorted
       SkillData.hasText = SkillData.names.copy();
       SkillData.hasText.removeByValue('Memory');
       SkillData.hasText.removeByValue('Perception');
       SkillData.hasText.removeByValue('Persuasion');
       SkillData.hasText.removeByValue('Tracking');

       AdvantageData.costPerRank.set('Sidekick', 2);
       AdvantageData.maxRanks.set('Improved Initiative', 5);
       AdvantageData.names = remakeArray(commonAdvantageNames, ['Lucky', 'Meekness']);
       AdvantageData.godhoodNames = ['Beyond Mortal', 'Let There Be', 'Luck of the Gods', 'Omnipresent', 'Omniscient', 'Stay Like That', 'Supreme', 'Variable Modifier', 'Your Petty Rules Don\'t Apply to Me'];

       PowerData.baseCost.set('Growth', 6);
       PowerData.baseCost.set('Immortality', 5);
       PowerData.baseCost.set('Morph', 1);  //I could add/remove morph but this is nicer
       PowerData.baseCost.set('Nullify', 3);
       PowerData.baseCost.set('Regeneration', 3);
       PowerData.baseCost.set('Shrinking', 3);
       PowerData.defaultAction.set('Variable', 'Full');
       PowerData.actions = ['Slow', 'Full', 'Standard', 'Move', 'Free', 'Reaction', 'Triggered', 'None'];  //None isn't a choice
       PowerData.names = remakeArray(commonPowerNames, ['Attain Knowledge', 'Mental Transform', 'Mind Switch', 'Permeate', 'Phantom Ranks', 'Resistance', 'Summon Minion', 'Summon Object']);

       var newExtraNames = remakeArray(commonModifierExtraNames, ['Existence Dependent']);  //call this instead of push so that it's sorted
       var newFlawNames = remakeArray(commonModifierFlawNames, ['Ammunition', 'Fragile', 'System Dependent', 'Uncontrollable Entirely', 'Uncontrollable Result', 'Uncontrollable Target']);
       ModifierData.names = newExtraNames.concat(newFlawNames);

       ModifierData.cost.set('Attack', 1);
       ModifierData.type.set('Attack', 'Rank');
       ModifierData.maxRank.set('Diminished Range', 1);
       ModifierData.cost.set('Impervious', 2);
       ModifierData.maxRank.set('Impervious', -1);
       ModifierData.type.set('Impervious', 'Flat');
       ModifierData.cost.set('Increased Mass', 3);
       ModifierData.type.set('Innate', 'Rank');
       ModifierData.cost.set('Penetrating', 2);
   }
    ModifierData.names = ModifierData.names.concat(commonModifierOtherNames);
    ModifierData.hasAutoRank = ModifierData.hasAutoTotal.concat(ModifierData.actionRangeDuration);
};
