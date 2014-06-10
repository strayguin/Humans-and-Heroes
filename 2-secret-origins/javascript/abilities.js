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
    var total=0;
    const abilityArray=[];

   //Single line function section
    //getByName is not validated because I want an error thrown so I can debug
    /**Get the ability row based on its name. Will return undefined if not found so that an error will occur.*/
    this.getByName=function(nameOfAbility){return abilityArray[AbilityData.names.indexOf(nameOfAbility)];};
    this.getTotal=function(){return total;};

   //public functions section
   /**Counts totals etc. All values that are not user set or final are created by this method*/
   this.calculateValues=function()
   {
       total=0;
      for (var i=0; i < abilityArray.length; i++)
      {
          var abilityValue=abilityArray[i].getValue();  //not getZero for below
          if(!Main.isOldRules() && abilityValue === '--' && AbilityData.names[i] === 'Stamina') total+=30;
          else if(abilityValue === '--') total-=10;  //old rules no Stamina costs the same as other missing ones
          else total+=(abilityValue*2);
      }
   };
   /**Resets all values then updates*/
   this.clear=function()
   {
       for(var i=0; i < abilityArray.length; i++){abilityArray[i].set(0);}
       this.update();
   };
   /**Sets data from an xml object given then updates*/
   this.load=function(xmlDoc)
   {
      for (var i=0; i < abilityArray.length; i++)
      {
          abilityArray[i].set(xmlDoc.getElementsByTagName(AbilityData.names[i])[0].getAttribute('value'));
      }
       this.update();
   };
   /**Creates a hash of the zeroed abilities. This is used to reset the max skill rank hash.*/
   this.createAbilityHash=function()
   {
       var abilityHash = new Hash({}, 0);
       abilityHash.clear();
      for (var i=0; i < AbilityData.names.length; i++)
      {
          abilityHash.add(AbilityData.names[i], abilityArray[i].getZeroedValue());
          //zeroed: because this is for power level, it can't be blank
      }
       return abilityHash;
   };
   /**Returns an xml string of this section's data*/
   this.save=function()
   {
       var fileString='   <Abilities>\n';
      for (var i=0; i < abilityArray.length; i++)
      {
          fileString+='       <'+AbilityData.names[i]+' value="'+abilityArray[i].getValue()+'" />\n';
      }
       fileString+='   </Abilities>\n';
       return fileString;
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
    for(var i=0; i < AbilityData.names.length; i++){abilityArray.push(new AbilityObject(AbilityData.names[i]));}
    Object.freeze(abilityArray);
}
function AbilityObject(abilityName)
{
    var abilityValue=0;
   /**Onchange function for changing the ability value*/
   this.change=function()
   {
       this.set(document.getElementById(abilityName).value);
       Main.abilitySection.update();
   };
    /**Get the value of the ability. Will return either a number or '--'*/
    this.getValue=function(){return abilityValue;};
   /**Get the value of the ability. If its value is '--' then 0 is returned instead so that a number is always returned.*/
   this.getZeroedValue=function()
   {
       if(abilityValue === '--') return 0;
       return abilityValue;
   };
   /**Validates and sets this ability to the value given. Because there is no generate the document's value must also be set here.*/
   this.set=function(givenValue)
   {
       abilityValue=(givenValue+'').trim();  //null-safe version of toString
       if(abilityValue !== '--') abilityValue = sanitizeNumber(abilityValue, -5, 0);  //sanitize if not missing
       document.getElementById(abilityName).value = abilityValue;
   };
}
