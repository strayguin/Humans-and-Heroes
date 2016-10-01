/**Call List onChange
Ability: change();

Also updates:
Main.skillSection.calculateValues();
Main.skillSection.generate();
Main.updateInitiative();
Main.updateOffense();
Main.defenseSection.calculateValues();
*/
function AbilityList()
{
   //private variable section:
    var total = 0;
    const abilityArray = [];

   //Single line function section
    //getByName is not validated because I want an error thrown so I can debug
    /**Get the ability row based on its name. Will return undefined if not found so that an error will occur.*/
    this.getByName=function(nameOfAbility){return abilityArray[Data.Ability.names.indexOf(nameOfAbility)];};
    this.getTotal=function(){return total;};

   //public functions section
   /**Counts totals etc. All values that are not user set or final are created by this method*/
   this.calculateValues=function()
   {
       total = 0;
      for (var i=0; i < abilityArray.length; i++)
      {
          if(Main.getActiveRuleset().major > 1 && abilityArray[i].isAbsent() && Data.Ability.names[i] === 'Stamina') total+=30;
          else if(abilityArray[i].isAbsent()) total-=10;  //old rules no Stamina costs the same as other absent ones
          else total+=(abilityArray[i].getValue()*2);
      }
   };
   /**Resets all values then updates*/
   this.clear=function()
   {
       for(var i=0; i < abilityArray.length; i++){abilityArray[i].set(0);}
       this.update();
   };
   /**Sets data from a json object given then updates*/
   this.load=function(jsonSection)
   {
      for (var i=0; i < abilityArray.length; i++)
      {
          abilityArray[i].set(jsonSection[Data.Ability.names[i]]);
      }
       this.update();
   };
   /**Creates a map of the zeroed abilities. This is used to reset the max skill rank map.*/
   this.createAbilityMap=function()
   {
       var abilityMap = new MapDefault({}, 0);
      for (var i=0; i < Data.Ability.names.length; i++)
      {
          abilityMap.add(Data.Ability.names[i], abilityArray[i].getZeroedValue());
          //zeroed: because this is for power level, it can't be blank
      }
       return abilityMap;
   };
   /**Returns a json object of this section's data*/
   this.save=function()
   {
       var json = {};
      for (var i=0; i < abilityArray.length; i++)
      {
          json[Data.Ability.names[i]] = abilityArray[i].getValue();
      }
       return json;
   };
   /**Does each step for an onChange*/
   this.update=function()
   {
       this.calculateValues();
       Main.skillSection.calculateValues();
       Main.skillSection.generate();
       Main.updateInitiative();
       Main.updateOffense();
       Main.defenseSection.calculateValues();
       Main.update();  //updates totals and power level
   };
   //constructor:
    for(var i=0; i < Data.Ability.names.length; i++){abilityArray.push(new AbilityObject(Data.Ability.names[i]));}
    Object.freeze(abilityArray);
}
function AbilityObject(abilityName)
{
    var abilityValue = 0;
    /**Onchange function for changing the ability value*/
    this.change=function(){CommonsLibrary.change.call(this, this.set, abilityName, Main.abilitySection, false);};
    /**Returns true if the ability is absent (ie is '--')*/
    this.isAbsent=function(){return (abilityValue === '--');};  //TODO: make AbilityObject.absentValue='--';
       //use it and isAbsent exclusively for readability. possibly remove a getter
    /**Get the value of the ability. Will return either a number or '--'*/
    this.getValue=function(){return abilityValue;};
   /**Get the value of the ability. If its value is absent then 0 is returned instead so that a number is always returned.*/
   this.getZeroedValue=function()
   {
       if(this.isAbsent()) return 0;
       return abilityValue;
   };
   /**Validates and sets this ability to the value given. Because there is no generate the document's value must also be set here.*/
   this.set=function(givenValue)
   {
       abilityValue = (givenValue+'').trim();  //null-safe version of toString
       if(!this.isAbsent()) abilityValue = sanitizeNumber(abilityValue, -5, 0);  //absent can't be sanitized
       document.getElementById(abilityName).value = abilityValue;
   };
}
