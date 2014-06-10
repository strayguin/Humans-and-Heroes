/**Call List onChange
Defense: change();
*/
function DefenseList()
{
   //private variable section:
    const defenseArray=[];
    var toughnessMaxValue=0;  //for power level
    var toughnessWithoutDefensiveRoll=0;  //for unit testing
    var total=0;

   //Single line function section
    //getByName is not validated because I want an error thrown so I can debug
    /**Get the defense row based on its name. Will return undefined if not found so that an error will occur.*/
    this.getByName=function(defenseName){return defenseArray[DefenseData.names.indexOf(defenseName)];};
    /**Get the total toughness including defensive roll*/
    this.getMaxToughness=function(){return toughnessMaxValue;};
    this.getTotal=function(){return total;};
    /**Get the total toughness excluding defensive roll. If there is no defensive roll then the value will be the same as getMaxToughness*/
    this.getToughnessWithoutDefensiveRoll=function(){return toughnessWithoutDefensiveRoll;};

   //public functions section
   /**Calculates and sets the initial and final values of each defense and calculates the total cost.*/
   this.calculateValues=function()
   {
       total=0;
      for (var i=0; i < defenseArray.length; i++)  //the array doesn't include toughness
      {
          document.getElementById(DefenseData.names[i]+' start').innerHTML = Main.abilitySection.getByName(DefenseData.abilityUsed[i]).getZeroedValue();
          //Zeroed because you can't lack defense scores
          document.getElementById(DefenseData.names[i]+' final').innerHTML = defenseArray[i].getTotalBonus();
          total+=defenseArray[i].getRank();  //cost is 1:1
      }
       this.calculateToughness();  //split off because it is involved
   };
   /**Resets all values then updates*/
   this.clear=function()
   {
      for(var i=0; i < defenseArray.length; i++)
          {defenseArray[i].set(0);}
       this.update();
   };
   /**Sets data from an xml object given then updates*/
   this.load=function(xmlDoc)
   {
       for(var i=0; i < defenseArray.length; i++)
          {defenseArray[i].set(xmlDoc.getElementsByTagName(DefenseData.names[i])[0].getAttribute('value'));}
       this.update();
   };
   /**Returns an xml string of this section's data*/
   this.save=function()
   {
       var fileString='   <Defenses>\n';
       for(var i=0; i < defenseArray.length; i++)
          {fileString+='       <'+DefenseData.names[i]+' value="'+defenseArray[i].getRank()+'" />\n';}
       fileString+='   </Defenses>\n';
       return fileString;
   };
   /**Does each step for an onChange*/
   this.update=function()
   {
       this.calculateValues();
       Main.update();  //updates totals and power level
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
   /**Calculates and sets the total toughness value. This accounts for all sections that influence toughness (advantages, powers, and equipment).*/
   this.calculateToughness=function()
   {
       //TODO: there is no enhanced toughness. probably need a new power 'Enhanced Toughness' can't set base cost and is detected like protection is
       //make Main.getEnhancedToughness which adds both sections and stamina
       var staminaValue = Main.abilitySection.getByName('Stamina').getZeroedValue();  //Zeroed because you can't lack toughness
       var protectionValue = Main.getProtectionTotal();
       var defensiveRollValue = Main.advantageSection.getRankHash().get('Defensive Roll');

       if(Main.isOldRules()) toughnessWithoutDefensiveRoll = protectionValue + staminaValue;  //in old rules stamina stacked but nothing else
       //TODO: actually in old everything stacked
       else if(protectionValue > staminaValue) toughnessWithoutDefensiveRoll = protectionValue;
       else toughnessWithoutDefensiveRoll = staminaValue;
       toughnessMaxValue = toughnessWithoutDefensiveRoll + defensiveRollValue;  //defensive Roll stacks

       var toughnessString = toughnessMaxValue;
       if(defensiveRollValue > 0) toughnessString+=' ('+toughnessWithoutDefensiveRoll+' without Defensive Roll)';
       document.getElementById('Toughness').innerHTML=toughnessString;
   };
   this.constructor=function()
   {
       for(var i=0; i < DefenseData.names.length-1; i++)  //-1 to avoid toughness
          {defenseArray.push(new DefenseObject(DefenseData.names[i]));}
       Object.freeze(defenseArray);
   };
   //constructor:
    this.constructor();
}
function DefenseObject(defenseName)
{
    var defenseValue=0;
    const abilityNameUsed = DefenseData.abilityUsed[DefenseData.names.indexOf(defenseName)];
   /**Onchange function for changing the defense input*/
   this.change=function()
   {
       this.set(document.getElementById(defenseName+' input').value);
       Main.defenseSection.update();
   };
    this.getRank=function(){return defenseValue;};
   /**Call this to get the final defense value. The ability score is not saved and asks abilitySection for the value each time*/
   this.getTotalBonus=function()
   {
       return (defenseValue + Main.abilitySection.getByName(abilityNameUsed).getZeroedValue());
       //Zeroed because you can't lack defense scores
       //ability value is not saved so that it will never be out of date
   };
   /**Validates and sets this defense to the value given. Because there is no generate the document's value must also be set here.*/
   this.set=function(valueGiven)
   {
       document.getElementById(defenseName+' input').value=defenseValue=sanitizeNumber(valueGiven, 0, 0);
   };
}
