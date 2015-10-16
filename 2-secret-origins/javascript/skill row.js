/**Call List onChange
Select Skill: select(rowIndex);
Text: changeText(rowIndex);
Rank: changeRank(rowIndex);
Select Ability: selectAbility(rowIndex);  //needs to be saved for generating reasons
*/
function SkillObject(rowIndex)
{
   //private variable section:
    var name, rank, hasText, text, abilityName, totalBonus;

   //Basic getter section (all single line)
    this.doesHaveText=function(){return hasText;};
    this.getAbilityName=function(){return abilityName;};
    this.getName=function(){return name;};
    this.getRank=function(){return rank;};
    this.getText=function(){return text;};
    this.getTotalBonus=function(){return totalBonus;};

   //Single line function section (ignoring isBlank check)
    this.isBlank=function(){return (name === undefined);};
   /**Simple setter for totalBonus which is the sum of the ability value and skill rank. Or a string indicator if the ability is --.*/
   this.setTotalBonus=function(bonusGiven)
   {
       if(this.isBlank()) return;
       totalBonus = bonusGiven;  //number or string
   };
    this.setRowIndex=function(indexGiven){rowIndex=indexGiven;};

   //Onchange section
    /**Onchange function for selecting a skill*/
    this.select=function(){CommonsLibrary.select.call(this, this.setSkill, ('skillChoices'+rowIndex), Main.skillSection);};
    /**Onchange function for changing the text*/
    this.changeText=function(){CommonsLibrary.change.call(this, this.setText, ('skillText'+rowIndex), Main.skillSection);};
    /**Onchange function for changing the rank*/
    this.changeRank=function(){CommonsLibrary.change.call(this, this.setRank, ('skillRank'+rowIndex), Main.skillSection);};
    /**Onchange function for selecting an ability*/
    this.selectAbility=function(){CommonsLibrary.select.call(this, this.setAbility, ('skillAbility'+rowIndex), Main.skillSection);};

   //Value setting section
   /**Populates data of the skill by using the name (which is validated).
   This must be called before any other data of this row is set.
   The data set is independent of the document and doesn't call update.*/
   this.setSkill=function(nameGiven)
   {
       if(!Data.Skill.names.contains(nameGiven)){this.constructor(); return;}
       name = nameGiven;
       rank = 1;
       abilityName = Data.Skill.abilityMap.get(name);
       hasText = Data.Skill.hasText.contains(name);
       if(name === 'Other') text = 'Skill Name and Subtype';  //doesn't exist in old rules
       else if(hasText) text = 'Skill Subtype';
       else text = undefined;
   };
   /**Used to set data independent of the document and without calling update*/
   this.setText=function(textGiven)
   {
       if(this.isBlank()) return;
       if(!hasText) return;  //can only happen when loading
       text = textGiven.trim();  //trimmed in case it needs to match up with something else
   };
   /**Used to set data independent of the document and without calling update*/
   this.setRank=function(rankGiven)
   {
       if(this.isBlank()) return;
       rank = sanitizeNumber(rankGiven, 1, 1);
   };
   /**Used to set data independent of the document and without calling update. This function takes the ability's name*/
   this.setAbility=function(abilityNameGiven)
   {
       if(this.isBlank()) return;
       if(!Data.Ability.names.contains(abilityNameGiven)) return;  //only happens when loading bad data
       abilityName = abilityNameGiven;
   };

   //public function section
   /**This creates the page's html (for the row). called by skill section only*/
   this.generate=function()
   {
       var htmlString = '';
       htmlString+='<select id="skillChoices'+rowIndex+'" onChange="Main.skillSection.getRow('+rowIndex+').select();">\n';
       htmlString+='    <option>Select One</option>\n';
      for (var i=0; i < Data.Skill.names.length; i++)
      {
          htmlString+='    <option>'+Data.Skill.names[i]+'</option>\n';
      }
       htmlString+='</select>\n';
       if(this.isBlank()) return htmlString;  //done

       if(hasText) htmlString+='<input type="text" id="skillText'+rowIndex+'" onChange="Main.skillSection.getRow('+rowIndex+').changeText();" />\n';
       htmlString+='Ranks <input type="text" size="1" id="skillRank'+rowIndex+'" onChange="Main.skillSection.getRow('+rowIndex+').changeRank();" />\n';
       htmlString+='+\n';
       htmlString+='<select id="skillAbility'+rowIndex+'" onChange="Main.skillSection.getRow('+rowIndex+').selectAbility();">\n';
       htmlString+='    <option>Strength</option>\n';  //hard coding made more sense then using Data.Ability.names (because loop unrolling)
       htmlString+='    <option>Agility</option>\n';
       htmlString+='    <option>Fighting</option>\n';
       htmlString+='    <option>Awareness</option>\n';
       htmlString+='    <option>Stamina</option>\n';
       htmlString+='    <option>Dexterity</option>\n';
       htmlString+='    <option>Intellect</option>\n';
       htmlString+='    <option>Presence</option>\n';
       htmlString+='</select>\n';
       htmlString+='=\n';
       htmlString+='<span id="skill bonus '+rowIndex+'">0</span>\n';
       htmlString+='<br />\n';
       return htmlString;
   };
   /**Get the name of the skill appended with text to determine redundancy*/
   this.getUniqueName=function()
   {
       if(name === 'Close Combat' || name === 'Ranged Combat') return ('Combat: '+text);  //must not have the same text as each other
       if(hasText) return (name+': '+text);
       return name;
   };
   /**Returns a json object of this row's data*/
   this.save=function()
   {
       var json={};
       json.name=name;
       if(hasText) json.subtype=text;
       json.rank=rank;
       json.ability=abilityName;
       return json;
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
   /**This sets the page's data. called only by section generate*/
   this.setValues=function()
   {
       if(this.isBlank()) return;  //already set (to default)
       SelectUtil.setText(('skillChoices'+rowIndex), name);
       if(hasText) document.getElementById('skillText'+rowIndex).value=text;
       document.getElementById('skillRank'+rowIndex).value = rank;
       SelectUtil.setText(('skillAbility'+rowIndex), abilityName);
       document.getElementById('skill bonus '+rowIndex).innerHTML = totalBonus;
   };
   this.constructor=function()
   {
       name=undefined;
       rank=undefined;
       hasText=undefined;
       text=undefined;
       abilityName=undefined;
       totalBonus=undefined;
   };
   //constructor:
    this.constructor();
}
