function TestObject(){
    var passTotal=0;
    var typeTotal=0;
    var failTotal=0;
   this.resetTotals = function(){
       Main.clear();
       passTotal=0;
       typeTotal=0;
       failTotal=0;
   };
   this.optionContainsText = function(optionID, textToFind){
       var element=document.getElementById(optionID);
      for (var i=0; i < element.options.length; i++)
      {
          if(element.options[i].text==textToFind) return true;
      }
       return false;
   };
   this.setOptionText = function(optionID, textToSet){
       var element=document.getElementById(optionID);
      for (var i=0; i < element.options.length; i++)
      {
          if(element.options[i].text==textToSet){element.selectedIndex=i; element.onchange(); return;}  //onChange doesn't auto trigger when set like this
      }
       return "Not Found";
   };
   this.setValue = function(elementID, valueToSet){
       document.getElementById(elementID).value=valueToSet;
       document.getElementById(elementID).onchange();
   };
   this.compareResults = function(allValues, testSection){
       var sectionPassTotal=0;
       var sectionTypeTotal=0;
       var sectionFailTotal=0;
       var resultsString="<table border=\"1\" width='100%'>\n";
       resultsString+="<tr><td colspan=\"4\" style='text-align:center'>Test Section: "+testSection+"</td></tr>\n";
       resultsString+="<tr>\n<td style='text-align:center;width:40%;'>Name of test</td>\n<td style='text-align:center;width:25%;'>Expected</td>\n";
       resultsString+="<td style='text-align:center;width:25%;'>Got</td>\n<td style='text-align:center;width:10%;'>Result</td>\n</tr>\n";
      for (var i=0; i < allValues.length; i++)
      {
          resultsString+="<tr>\n<td>"+allValues[i][2]+"</td>\n";
         if (allValues[i][0].length > 80)  //string.length for expected value
         {
             resultsString+="<td><pre>(Too Long)</pre></td>\n";  //a whole xml's worth of text
             resultsString+="<td><pre>(Too Long)</pre></td>\n<td>";
         }
         else
         {
             resultsString+="<td>"+allValues[i][0]+"</td>\n";
             resultsString+="<td>"+allValues[i][1]+"</td>\n<td>";
         }
          if(allValues[i][0]===allValues[i][1]){resultsString+="Pass"; sectionPassTotal++;}
          else if(allValues[i][0]==allValues[i][1]){resultsString+="Type doesn't match but equal values\n"; sectionTypeTotal++;}
          else{resultsString+="Failure\n"; sectionFailTotal++;}
          resultsString+="</td>\n</tr>\n";
      }
       Main.clear();  //every test needs to clear out for the other test to start clean
       resultsString+="<tr><td colspan='4'>Section Totals. Pass: "+sectionPassTotal+", Type Error: "+sectionTypeTotal+", Fail: "+sectionFailTotal+"</td></tr>\n";
       resultsString+="</table>\n";
       passTotal+=sectionPassTotal;
       typeTotal+=sectionTypeTotal;
       failTotal+=sectionFailTotal;
       return resultsString;
   };
   //TODO move these to their objects. compareAll and compareInput maybe. it will be much easier to compare to the object then data fields... but should check data fields too...
   this.compareAllAbilities = function(testName, strength, agility, fighting, awareness, stamina, dexterity, intellect, presence){
       var allValues=[];
       /*allValues.push([name, getOption(rowType+"Choices"+rowIndex).text, testName+" Name"]);
       allValues.push([baseCost, parseInt(document.getElementById(rowType+"BaseCost"+rowIndex).value), testName+" Base Cost"]);
       allValues.push([text, document.getElementById(rowType+"Text"+rowIndex).value, testName+" Text"]);
       allValues.push([action, getOption(rowType+"SelectAction"+rowIndex).text, testName+" Action"]);
       allValues.push([range, getOption(rowType+"SelectRange"+rowIndex).text, testName+" Range"]);
       allValues.push([duration, getOption(rowType+"SelectDuration"+rowIndex).text, testName+" Duration"]);
       allValues.push([rank, parseInt(document.getElementById(rowType+"Rank"+rowIndex).value), testName+" Rank"]);*/
       return allValues;
   };
   this.compareInputPowerRowAgnostic = function(testName, rowType, rowIndex, name, baseCost, text, action, range, duration, rank){
       var allValues=[];
       allValues.push([name, getOption(rowType+"Choices"+rowIndex, "text"), testName+" Name"]);
       allValues.push([baseCost, parseInt(document.getElementById(rowType+"BaseCost"+rowIndex).value), testName+" Base Cost"]);
       allValues.push([text, document.getElementById(rowType+"Text"+rowIndex).value, testName+" Text"]);
       allValues.push([action, getOption(rowType+"SelectAction"+rowIndex, "text"), testName+" Action"]);
       allValues.push([range, getOption(rowType+"SelectRange"+rowIndex, "text"), testName+" Range"]);
       allValues.push([duration, getOption(rowType+"SelectDuration"+rowIndex, "text"), testName+" Duration"]);
       allValues.push([rank, parseInt(document.getElementById(rowType+"Rank"+rowIndex).value), testName+" Rank"]);
       return allValues;
   };
   this.compareInputModifierRowAgnostic = function(testName, rowType, rowTotalIndex, name, rank, text){
       var allValues=[];
       /*allValues.push([name, getOption(rowType+"Choices"+rowIndex).text, testName+" Name"]);
       allValues.push([baseCost, parseInt(document.getElementById(rowType+"BaseCost"+rowIndex).value), testName+" Base Cost"]);
       allValues.push([text, document.getElementById(rowType+"Text"+rowIndex).value, testName+" Text"]);
       allValues.push([action, getOption(rowType+"SelectAction"+rowIndex).text, testName+" Action"]);
       allValues.push([range, getOption(rowType+"SelectRange"+rowIndex).text, testName+" Range"]);
       allValues.push([duration, getOption(rowType+"SelectDuration"+rowIndex).text, testName+" Duration"]);
       allValues.push([rank, parseInt(document.getElementById(rowType+"Rank"+rowIndex).value), testName+" Rank"]);*/
       return allValues;
   };
   this.compareInputAdvantageRow = function(testName, rowIndex, name, rank, subtype){
       var allValues=[];
       /*allValues.push([name, getOption(rowType+"Choices"+rowIndex).text, testName+" Name"]);
       allValues.push([baseCost, parseInt(document.getElementById(rowType+"BaseCost"+rowIndex).value), testName+" Base Cost"]);
       allValues.push([text, document.getElementById(rowType+"Text"+rowIndex).value, testName+" Text"]);
       allValues.push([action, getOption(rowType+"SelectAction"+rowIndex).text, testName+" Action"]);
       allValues.push([range, getOption(rowType+"SelectRange"+rowIndex).text, testName+" Range"]);
       allValues.push([duration, getOption(rowType+"SelectDuration"+rowIndex).text, testName+" Duration"]);
       allValues.push([rank, parseInt(document.getElementById(rowType+"Rank"+rowIndex).value), testName+" Rank"]);*/
       return allValues;
   };
   this.compareInputSkillRow = function(testName, rowIndex, name, subtype, rank, ability){
       var allValues=[];
       /*allValues.push([name, getOption(rowType+"Choices"+rowIndex).text, testName+" Name"]);
       allValues.push([baseCost, parseInt(document.getElementById(rowType+"BaseCost"+rowIndex).value), testName+" Base Cost"]);
       allValues.push([text, document.getElementById(rowType+"Text"+rowIndex).value, testName+" Text"]);
       allValues.push([action, getOption(rowType+"SelectAction"+rowIndex).text, testName+" Action"]);
       allValues.push([range, getOption(rowType+"SelectRange"+rowIndex).text, testName+" Range"]);
       allValues.push([duration, getOption(rowType+"SelectDuration"+rowIndex).text, testName+" Duration"]);
       allValues.push([rank, parseInt(document.getElementById(rowType+"Rank"+rowIndex).value), testName+" Rank"]);*/
       return allValues;
   };
   this.compareAllOffense = function(testName, unarmedAttack, unarmedDamage, allAttacks, allDamages){
       var allValues=[];
       /*allValues.push([name, getOption(rowType+"Choices"+rowIndex).text, testName+" Name"]);
       allValues.push([baseCost, parseInt(document.getElementById(rowType+"BaseCost"+rowIndex).value), testName+" Base Cost"]);
       allValues.push([text, document.getElementById(rowType+"Text"+rowIndex).value, testName+" Text"]);
       allValues.push([action, getOption(rowType+"SelectAction"+rowIndex).text, testName+" Action"]);
       allValues.push([range, getOption(rowType+"SelectRange"+rowIndex).text, testName+" Range"]);
       allValues.push([duration, getOption(rowType+"SelectDuration"+rowIndex).text, testName+" Duration"]);
       allValues.push([rank, parseInt(document.getElementById(rowType+"Rank"+rowIndex).value), testName+" Rank"]);*/
       return allValues;
   };
   this.compareAllDefensesInput = function(testName, dodge, fortitude, parry, will){
       var allValues=[];
       /*allValues.push([name, getOption(rowType+"Choices"+rowIndex).text, testName+" Name"]);
       allValues.push([baseCost, parseInt(document.getElementById(rowType+"BaseCost"+rowIndex).value), testName+" Base Cost"]);
       allValues.push([text, document.getElementById(rowType+"Text"+rowIndex).value, testName+" Text"]);
       allValues.push([action, getOption(rowType+"SelectAction"+rowIndex).text, testName+" Action"]);
       allValues.push([range, getOption(rowType+"SelectRange"+rowIndex).text, testName+" Range"]);
       allValues.push([duration, getOption(rowType+"SelectDuration"+rowIndex).text, testName+" Duration"]);
       allValues.push([rank, parseInt(document.getElementById(rowType+"Rank"+rowIndex).value), testName+" Rank"]);*/
       return allValues;
   };
   this.double_test_all = function(){
       Main.useOldRules=true;  //set to true so that I can toggle it to false
       Main.ruleToggle();
       this.testAll();
       var testTable="New Rules:<br />\n"+document.getElementById("test results").innerHTML;  //save this for later
       var testLog="New Rules:\n"+document.getElementById("xml box").value;

       Main.ruleToggle();
       this.testAll();
       testTable+="<br /><br />Old Rules:<br />\n"+document.getElementById("test results").innerHTML;  //append
       testLog+="\n\nOld Rules:\n"+document.getElementById("xml box").value;
       document.getElementById("test results").innerHTML=testTable;
       document.getElementById("xml box").value=testLog;
   };
   this.testAll = function(){
       this.resetTotals();
       var totalString="";
       var functionArray=["auto_set", "manual_set", "duration_quirks", "add_remove_all_rows", "modifier_quirks", "load_text", "change_transcendence_each_section", "action_quirks", "feature_quirks", "range_quirks", "old_rules_differences"];
       //confirm_all_xmls not included becuase it is slow (would double total time) and shouldn't change much
       var logThese=[];
      for (var i=0; i < functionArray.length; i++)
      {
          if(logThese.contains(functionArray[i])) Logger.on();
          totalString+=this[functionArray[i]]()+"<br /><br />";
          Logger.off();  //does nothing if already off
      }
       //TODO: change base cost
       //TODO: cost per rank is fractional and adds up correctly
       //TODO: has text/rank
       //TODO: offense
       //TODO: remove redundant rows
       //TODO: removing a row should set the values back to 0 (modifiers are the only ones it could fail on)
       //TODO: make sure attack modifier does what it should
       //pretty much every function outside this file
       totalString+="Grand Totals. Pass: "+passTotal+", Type Error: "+typeTotal+", Fail: "+failTotal;
       document.getElementById("test results").innerHTML=totalString;
       document.getElementById("xml box").value="Log:\n"+Logger.dump_log();  //must be after so that the log can get filled
       //if xml box stops existing then dump the log at the end with pre tags
   };
   this.testByName = function(testFunctionName){
       this.resetTotals();
       document.getElementById("test results").innerHTML=this[testFunctionName]();
       document.getElementById("xml box").value="Log:\n"+Logger.dump_log();
   };
   this.auto_set = function(){
       var sectionNames=["power", "equipment"];
                     var powersUsed=["Flight",    "Affliction",      "Illusion",          "Damage",             "Flight",             "Flight"];
                    var statChanged=["Action",        "Action",         "Range",           "Range",           "Duration",           "Duration"];
                   var valueChangedTo=["Slow",          "Free",         "Close",      "Perception",      "Concentration",         "Continuous"];
       var modifiersExamined=["Slower Action", "Faster Action", "Reduced Range", "Increased Range", "Decreased Duration", "Increased Duration"];
                          var rankExpected=[4,               2,               3,                 3,                    1,                    1];
                          //should not be 1 but duration can only be 1. not that the 2 ranges also check that perception is +2
       if(Main.useOldRules){valueChangedTo[0]="Standard"; rankExpected[0]=2;}  //since "Slow" doesn't exist
       var allValues=[];
       Logger.log("auto_set()");
       Logger.down();
      for (var sectionNamesIndex=0; sectionNamesIndex < sectionNames.length; sectionNamesIndex++)
      {
         for (var autoIndex=0; autoIndex < powersUsed.length; autoIndex++)
         {
             this.setOptionText(sectionNames[sectionNamesIndex]+"Choices0", powersUsed[autoIndex]);
             Logger.log("powersUsed["+autoIndex+"]="+powersUsed[autoIndex]);

             var changedStatElementId=sectionNames[sectionNamesIndex]+"Select"+statChanged[autoIndex]+"0";
             var defaultValue=getOption(changedStatElementId, "text");
             Logger.log("defaultValue="+defaultValue);
             this.setOptionText(changedStatElementId, valueChangedTo[autoIndex]);
             allValues.push([modifiersExamined[autoIndex], getOption(sectionNames[sectionNamesIndex]+"ModifierChoices0.0", "text"), sectionNames[sectionNamesIndex]+" Add "+modifiersExamined[autoIndex]+" Modifier"]);
             allValues.push([rankExpected[autoIndex], parseInt(document.getElementById(sectionNames[sectionNamesIndex]+"ModifierRank0.0").value), sectionNames[sectionNamesIndex]+" "+modifiersExamined[autoIndex]+" Rank"]);
             if(rankExpected[autoIndex]==1) this.setValue(sectionNames[sectionNamesIndex]+"ModifierRank0.0", 2);
             else this.setValue(sectionNames[sectionNamesIndex]+"ModifierRank0.0", 1);
             allValues.push([rankExpected[autoIndex], parseInt(document.getElementById(sectionNames[sectionNamesIndex]+"ModifierRank0.0").value), sectionNames[sectionNamesIndex]+" Can't manually change "+modifiersExamined[autoIndex]+" Rank"]);
             this.setOptionText(sectionNames[sectionNamesIndex]+"ModifierChoices0.0", "Select One");
             allValues.push([modifiersExamined[autoIndex], getOption(sectionNames[sectionNamesIndex]+"ModifierChoices0.0", "text"), sectionNames[sectionNamesIndex]+" Can't manually Remove "+modifiersExamined[autoIndex]]);
             this.setOptionText(changedStatElementId, defaultValue);
             allValues.push(["Select One", getOption(sectionNames[sectionNamesIndex]+"ModifierChoices0.0", "text"), sectionNames[sectionNamesIndex]+" Remove "+modifiersExamined[autoIndex]]);
             this.setOptionText(sectionNames[sectionNamesIndex]+"Choices0", "Select One");  //reset row
         }

          if(Main.useOldRules) continue;  //doesn't have Triggered as an action
          this.setOptionText(sectionNames[sectionNamesIndex]+"Choices0", "Flight");
          this.setOptionText(sectionNames[sectionNamesIndex]+"SelectAction0", "Triggered");
          allValues.push(["Selective", getOption(sectionNames[sectionNamesIndex]+"ModifierChoices0.1", "text"), sectionNames[sectionNamesIndex]+" Add Selective"]);
          this.setOptionText(sectionNames[sectionNamesIndex]+"SelectAction0", "Free");  //default
          allValues.push(["Selective", getOption(sectionNames[sectionNamesIndex]+"ModifierChoices0.0", "text"), sectionNames[sectionNamesIndex]+" Add Doesn't remove Selective"]);
          this.setOptionText(sectionNames[sectionNamesIndex]+"Choices0", "Select One");
      }
       Logger.up();
       return this.compareResults(allValues, "auto_set");
   };
    //this.godhood_quirks = function(){};
    //TODO: test out "A God I Am" durations (since can be 2 ranks decreased and is non-standard permanent)
   this.manual_set = function(){
       var sectionNames=["power", "equipment"];
       var powersUsed=["Flight", "Affliction", "Illusion", "Damage", "Flight", "Flight"];
       var statChanged=["Action", "Action", "Range", "Range", "Duration", "Duration"];
       var modifiersAttempted=["Slower Action", "Faster Action", "Reduced Range", "Increased Range", "Decreased Duration", "Increased Duration"];
       var allValues=[];
      for (var sectionNamesIndex=0; sectionNamesIndex < sectionNames.length; sectionNamesIndex++)
      {
         for (var autoIndex=0; autoIndex < powersUsed.length; autoIndex++)
         {
             this.setOptionText(sectionNames[sectionNamesIndex]+"Choices0", powersUsed[autoIndex]);

             var changedStatElementId=sectionNames[sectionNamesIndex]+"Select"+statChanged[autoIndex]+"0";
             var defaultValue=getOption(changedStatElementId, "text");
             this.setOptionText(sectionNames[sectionNamesIndex]+"ModifierChoices0.0", modifiersAttempted[autoIndex]);
             allValues.push(["Select One", getOption(sectionNames[sectionNamesIndex]+"ModifierChoices0.0", "text"), sectionNames[sectionNamesIndex]+" Can't Add "+modifiersAttempted[autoIndex]+" Modifier"]);
             allValues.push([defaultValue, getOption(changedStatElementId, "text"), sectionNames[sectionNamesIndex]+" which has no effect"]);
             this.setOptionText(sectionNames[sectionNamesIndex]+"Choices0", "Select One");  //reset row
         }
          //manually changing rank and removing them is in auto_set

          this.setOptionText(sectionNames[sectionNamesIndex]+"Choices0", "Flight");
          this.setOptionText(sectionNames[sectionNamesIndex]+"ModifierChoices0.0", "Selective");
          allValues.push(["Selective", getOption(sectionNames[sectionNamesIndex]+"ModifierChoices0.0", "text"), sectionNames[sectionNamesIndex]+" Can Add Selective"]);

          if(Main.useOldRules) continue;  //doesn't have Triggered as an action
          this.setOptionText(sectionNames[sectionNamesIndex]+"SelectAction0", "Triggered");
          allValues.push(["Faster Action", getOption(sectionNames[sectionNamesIndex]+"ModifierChoices0.1", "text"), sectionNames[sectionNamesIndex]+" Can change to Triggered after"]);
          this.setOptionText(sectionNames[sectionNamesIndex]+"Choices0", "Select One");
      }

       return this.compareResults(allValues, "manual_set");
   };
   this.check_transcendence = function(){
       if(!Main.godHoodSwitch) return false;
       if(!this.optionContainsText("powerChoices0", "A God I Am")) return false;
       if(!this.optionContainsText("advantageChoices0", "Beyond Mortal")) return false;
       return true;
   };
   this.change_transcendence_each_section = function(){
       var allValues=[];

       this.setValue("Awareness", 30);
       allValues.push([true, this.check_transcendence(), "Ability Godhood on"]);
       this.setValue("Awareness", 0);
       allValues.push([false, this.check_transcendence(), "Ability Godhood off"]);

       this.setOptionText("powerChoices0", "Flight");
       this.setValue("powerRank0", 200);
       allValues.push([true, this.check_transcendence(), "Power Godhood on"]);
       this.setOptionText("powerChoices0", "Select One");
       allValues.push([false, this.check_transcendence(), "Power Godhood off"]);

       this.setOptionText("equipmentChoices0", "Flight");
       this.setValue("equipmentRank0", 200);
       allValues.push([false, this.check_transcendence(), "Equipment Godhood can't"]);
       this.setOptionText("equipmentChoices0", "Select One");

       this.setOptionText("advantageChoices0", "Defensive Roll");
       this.setValue("advantageRank0", 200);
       allValues.push([true, this.check_transcendence(), "Advantage Godhood on"]);
       this.setOptionText("advantageChoices0", "Select One");
       allValues.push([false, this.check_transcendence(), "Advantage Godhood off"]);

       this.setOptionText("skillChoices0", "Insight");
       this.setValue("skillRank0", 200);
       allValues.push([true, this.check_transcendence(), "Skill Godhood on"]);
       this.setOptionText("skillChoices0", "Select One");
       allValues.push([false, this.check_transcendence(), "Skill Godhood off"]);

       this.setValue("Dodge input", 60);
       allValues.push([true, this.check_transcendence(), "Defense Godhood on"]);
       this.setValue("Dodge input", 0);
       allValues.push([false, this.check_transcendence(), "Defense Godhood off"]);

       return this.compareResults(allValues, "change_transcendence_each_section");
   };
   this.feature_quirks = function(){  //TODO add feature to loops so that anything that isn't covered here is tested with both feature and otherwise
       //TODO: add Feature setting main 3 doesn't auto modifiers and can manual set the autos
       /*and
          if(durationGiven=="Permanent") this.setAction("None");  //set action to None (resets action modifiers)
          else this.setAction("Free");  //set action to Free
       */
       var allValues=[];
       var sectionNames=["power", "equipment"];
       Logger.log("feature_quirks()");
       Logger.down();

      for (var i=0; i < sectionNames.length; i++)
      {
          this.setOptionText(sectionNames[i]+"Choices0", "Feature");

          this.setOptionText(sectionNames[i]+"SelectDuration0", "Concentration");
          allValues.push(["Concentration", getOption(sectionNames[i]+"SelectDuration0", "text"), sectionNames[i]+" Can Change to Concentration Duration"]);
          allValues.push(["Select One", getOption(sectionNames[i]+"ModifierChoices0.0", "text"), sectionNames[i]+" Didn't add modifiers"]);

          this.setOptionText(sectionNames[i]+"SelectDuration0", "Instant");
          allValues.push(["Instant", getOption(sectionNames[i]+"SelectDuration0", "text"), sectionNames[i]+" Can Change to Instant Duration"]);

          this.setOptionText(sectionNames[i]+"SelectDuration0", "Sustained");
          allValues.push(["Sustained", getOption(sectionNames[i]+"SelectDuration0", "text"), sectionNames[i]+" Can change from Instant duration"]);
          allValues.push(["Select One", getOption(sectionNames[i]+"ModifierChoices0.0", "text"), sectionNames[i]+" Still no modifiers for duration"]);

          this.setOptionText(sectionNames[i]+"SelectAction0", "Standard");
          allValues.push(["Standard", getOption(sectionNames[i]+"SelectAction0", "text"), sectionNames[i]+" Can Change to Standard action"]);
          allValues.push(["Select One", getOption(sectionNames[i]+"ModifierChoices0.0", "text"), sectionNames[i]+" Didn't add action modifiers"]);

         if (!Main.useOldRules)
         {
             this.setOptionText(sectionNames[i]+"SelectAction0", "Triggered");
             allValues.push(["Selective", getOption(sectionNames[i]+"ModifierChoices0.0", "text"), sectionNames[i]+" Triggered add selective modifier"]);
             this.setOptionText(sectionNames[i]+"SelectAction0", "Free");
             allValues.push(["Selective", getOption(sectionNames[i]+"ModifierChoices0.0", "text"), sectionNames[i]+" action doesn't remove selective modifier"]);
             this.setOptionText(sectionNames[i]+"ModifierChoices0.0", "Select One");
         }

          this.setOptionText(sectionNames[i]+"SelectRange0", "Close");
          allValues.push(["Close", getOption(sectionNames[i]+"SelectRange0", "text"), sectionNames[i]+" Can Change to Close range"]);
          allValues.push(["Select One", getOption(sectionNames[i]+"ModifierChoices0.0", "text"), sectionNames[i]+" Didn't add range modifiers"]);

          this.setOptionText(sectionNames[i]+"SelectRange0", "Perception");
          allValues.push(["Perception", getOption(sectionNames[i]+"SelectRange0", "text"), sectionNames[i]+" Can Change to Perception range"]);
          allValues.push(["Select One", getOption(sectionNames[i]+"ModifierChoices0.0", "text"), sectionNames[i]+" Didn't add range modifiers"]);

          this.setOptionText(sectionNames[i]+"SelectRange0", "Personal");
          allValues.push(["Personal", getOption(sectionNames[i]+"SelectRange0", "text"), sectionNames[i]+" Can Change back to Personal range"]);

          this.setOptionText(sectionNames[i]+"ModifierChoices0.0", "Attack");
          allValues.push(["Attack", getOption(sectionNames[i]+"ModifierChoices0.0", "text"), sectionNames[i]+" Attack modifier is added"]);
          allValues.push(["Personal", getOption(sectionNames[i]+"SelectRange0", "text"), sectionNames[i]+" Attack modifier but still personal range"]);

          this.setOptionText(sectionNames[i]+"SelectAction0", "Free");
          this.setOptionText(sectionNames[i]+"ModifierChoices0.0", "Faster Action");
          allValues.push(["Faster Action", getOption(sectionNames[i]+"ModifierChoices0.0", "text"), sectionNames[i]+" Faster Action modifier is added"]);
          allValues.push(["Free", getOption(sectionNames[i]+"SelectAction0", "text"), sectionNames[i]+" Faster Action modifier but still Free Action"]);

          Logger.trace(this, this.setOptionText, [sectionNames[i]+"SelectDuration0", "Permanent"]);
          Logger.trace(this, this.setOptionText, [sectionNames[i]+"SelectRange0", "Close"]);
          allValues.push(["Personal", getOption(sectionNames[i]+"SelectRange0", "text"), sectionNames[i]+" Can't Change Permanent durtation to non-Personal Range"]);

          Logger.trace(this, this.setOptionText, [sectionNames[i]+"SelectDuration0", "Sustained"]);
          Logger.trace(this, this.setOptionText, [sectionNames[i]+"SelectRange0", "Close"]);
          Logger.trace(this, this.setOptionText, [sectionNames[i]+"SelectDuration0", "Permanent"]);
          allValues.push(["Sustained", getOption(sectionNames[i]+"SelectDuration0", "text"), sectionNames[i]+" Can't Change non-Personal Range to Permanent durtation"]);

          this.setOptionText(sectionNames[i]+"Choices0", "Select One");
      }
       Logger.up();
       return this.compareResults(allValues, "feature_quirks");
   };
   this.duration_quirks = function(){
       var allValues=[];
       var sectionNames=["power", "equipment"];
       Logger.log("duration_quirks()");
       Logger.down();

      for (var i=0; i < sectionNames.length; i++)
      {
          this.setOptionText(sectionNames[i]+"Choices0", "Flight");
          this.setOptionText(sectionNames[i]+"SelectDuration0", "Instant");  //won't be found unless feature mix up
          allValues.push(["Sustained", getOption(sectionNames[i]+"SelectDuration0", "text"), sectionNames[i]+" Can't Change to Instant Duration"]);
          this.setOptionText(sectionNames[i]+"Choices0", "Select One");

          Logger.log(sectionNames[i]+" Set Damage for "+sectionNames[i]+" Can't change from Instant duration");
          Logger.trace(this, this.setOptionText, [sectionNames[i]+"Choices0", "Damage"]);
          allValues.push([PowerListAgnostic.durationInstantString, document.getElementById(sectionNames[i]+"SelectDurationHolder0").innerHTML, sectionNames[i]+" Can't change from Instant duration"]);
          this.setOptionText(sectionNames[i]+"Choices0", "Select One");

          Logger.log(sectionNames[i]+" Set Flight for "+sectionNames[i]+" Personal range can become permanent");
          Logger.trace(this, this.setOptionText, [sectionNames[i]+"Choices0", "Flight"]);
          Logger.trace(this, this.setOptionText, [sectionNames[i]+"SelectDuration0", "Permanent"]);
          allValues.push(["Permanent", getOption(sectionNames[i]+"SelectDuration0", "text"), sectionNames[i]+" Personal range can become permanent"]);
          this.setOptionText(sectionNames[i]+"Choices0", "Select One");

          Logger.log(sectionNames[i]+" Set Flight for "+sectionNames[i]+" Non-Personal range can't become permanent");
          Logger.trace(this, this.setOptionText, [sectionNames[i]+"Choices0", "Flight"]);
          Logger.trace(this, this.setOptionText, [sectionNames[i]+"ModifierChoices0.0", "Attack"]);
          Logger.trace(this, this.setOptionText, [sectionNames[i]+"SelectDuration0", "Permanent"]);
          allValues.push(["Sustained", getOption(sectionNames[i]+"SelectDuration0", "text"), sectionNames[i]+" Non-Personal range can't become permanent"]);
          this.setOptionText(sectionNames[i]+"Choices0", "Select One");

          Logger.log(sectionNames[i]+" Set Variable for various Sustained durations");
          Logger.trace(this, this.setOptionText, [sectionNames[i]+"Choices0", "Variable"]);
          Logger.log(sectionNames[i]+" Set Variable Permanent");
          Logger.trace(this, this.setOptionText, [sectionNames[i]+"SelectDuration0", "Permanent"]);
          allValues.push([PowerListAgnostic.actionNoneString, document.getElementById(sectionNames[i]+"SelectActionHolder0").innerHTML, sectionNames[i]+" Permanent Auto Set Action"]);
          allValues.push(["Permanent", getOption(sectionNames[i]+"ModifierChoices0.0", "text"), sectionNames[i]+" Permanent Modifier Auto Set"]);
          allValues.push(["Select One", getOption(sectionNames[i]+"ModifierChoices0.1", "text"), sectionNames[i]+" Permanent Didn't Add Any Other Modifiers"]);
          allValues.push([7, parseInt(document.getElementById(sectionNames[i]+"RowTotal0").innerHTML), sectionNames[i]+" Permanent is free"]);
          Logger.log(sectionNames[i]+" Set Variable Sustained");
          Logger.trace(this, this.setOptionText, [sectionNames[i]+"SelectDuration0", "Sustained"]);
          if(Main.useOldRules) allValues.push(["Standard", getOption(sectionNames[i]+"SelectAction0", "text"), sectionNames[i]+" Permanent Auto Reset Action"]);
          else allValues.push(["Full", getOption(sectionNames[i]+"SelectAction0", "text"), sectionNames[i]+" Permanent Auto Reset Action"]);
          allValues.push(["Select One", getOption(sectionNames[i]+"ModifierChoices0.0", "text"), sectionNames[i]+" Permanent Modifier Auto Remove"]);
          this.setOptionText(sectionNames[i]+"Choices0", "Select One");

          Logger.log(sectionNames[i]+" Set Immunity for various Permanent durations");
          Logger.trace(this, this.setOptionText, [sectionNames[i]+"Choices0", "Immunity"]);
          Logger.log(sectionNames[i]+" Set Immunity Sustained");
          Logger.trace(this, this.setOptionText, [sectionNames[i]+"SelectDuration0", "Sustained"]);
          allValues.push(["Free", getOption(sectionNames[i]+"SelectAction0", "text"), sectionNames[i]+" Sustained Auto Set Action"]);
          allValues.push(["Sustained", getOption(sectionNames[i]+"ModifierChoices0.0", "text"), sectionNames[i]+" Sustained Modifier Auto Set"]);
          allValues.push(["Select One", getOption(sectionNames[i]+"ModifierChoices0.1", "text"), sectionNames[i]+" Sustained Didn't Add Any Other Modifiers"]);
          allValues.push([1, parseInt(document.getElementById(sectionNames[i]+"RowTotal0").innerHTML), sectionNames[i]+" Sustained is free"]);
          Logger.log("Set Immunity Permanent");
          Logger.trace(this, this.setOptionText, [sectionNames[i]+"SelectDuration0", "Permanent"]);
          allValues.push([PowerListAgnostic.actionNoneString, document.getElementById(sectionNames[i]+"SelectActionHolder0").innerHTML, sectionNames[i]+" Sustained Auto Reset Action"]);
          allValues.push(["Select One", getOption(sectionNames[i]+"ModifierChoices0.0", "text"), sectionNames[i]+" Sustained Modifier Auto Remove"]);
          this.setOptionText(sectionNames[i]+"Choices0", "Select One");

          this.setOptionText(sectionNames[i]+"Choices0", "Flight");
          this.setOptionText(sectionNames[i]+"SelectDuration0", "Concentration");
          this.setOptionText(sectionNames[i]+"SelectDuration0", "Permanent");
          allValues.push(["Select One", getOption(sectionNames[i]+"ModifierChoices0.1", "text"), sectionNames[i]+" Decreased Duration Replaced"]);
          this.setOptionText(sectionNames[i]+"SelectDuration0", "Continuous");
          this.setOptionText(sectionNames[i]+"SelectDuration0", "Permanent");
          allValues.push(["Select One", getOption(sectionNames[i]+"ModifierChoices0.1", "text"), sectionNames[i]+" Increased Duration Replaced"]);
          this.setOptionText(sectionNames[i]+"Choices0", "Select One");
      }

       Logger.up();
       return this.compareResults(allValues, "duration_quirks");
   };
   this.action_quirks = function(){
       var allValues=[];
       var sectionNames=["power", "equipment"];
       Logger.log("action_quirks()");
       Logger.down();
      for (var i=0; i < sectionNames.length; i++)
      {
          this.setOptionText(sectionNames[i]+"Choices0", "Flight");
          this.setOptionText(sectionNames[i]+"SelectAction0", "Slow");
          this.setOptionText(sectionNames[i]+"SelectDuration0", "Permanent");
          allValues.push(["Select One", getOption(sectionNames[i]+"ModifierChoices0.1", "text"), sectionNames[i]+" Slower Action Replaced"]);
          this.setOptionText(sectionNames[i]+"SelectDuration0", "Sustained");  //reset
          this.setOptionText(sectionNames[i]+"SelectAction0", "Reaction");
          this.setOptionText(sectionNames[i]+"SelectDuration0", "Permanent");
          allValues.push(["Select One", getOption(sectionNames[i]+"ModifierChoices0.1", "text"), sectionNames[i]+" Faster Action Replaced"]);
          this.setOptionText(sectionNames[i]+"Choices0", "Select One");

          //TODO: quirk list: if(baseActionName=="None" && actionGiven!="None") baseActionIndex=PowerListAgnostic.actionArray.indexOf("Free");
          /*this.setOptionText(sectionNames[i]+"Choices0", "Immunity");  //TODO: in/decreased duration math done from free
          this.setOptionText(sectionNames[i]+"SelectDuration0", "Concentration");
          this.setOptionText(sectionNames[i]+"SelectDuration0", "Permanent");
          allValues.push(["Select One", getOption(sectionNames[i]+"ModifierChoices0.0", "text"), sectionNames[i]+" Decreased Duration Replaced"]);
          this.setOptionText(sectionNames[i]+"SelectDuration0", "Continuous");
          this.setOptionText(sectionNames[i]+"SelectDuration0", "Permanent");
          allValues.push(["Select One", getOption(sectionNames[i]+"ModifierChoices0.0", "text"), sectionNames[i]+" Increased Duration Replaced"]);
          this.setOptionText(sectionNames[i]+"Choices0", "Select One");*/
      }
       Logger.up();
       return this.compareResults(allValues, "action_quirks");
   };
   this.range_quirks = function(){
       var allValues=[];
       var sectionNames=["power", "equipment"];
       Logger.log("range_quirks()");
       Logger.down();
      for (var i=0; i < sectionNames.length; i++)
      {
          this.setOptionText(sectionNames[i]+"Choices0", "Damage");
          this.setOptionText(sectionNames[i]+"SelectRange0", "Personal");  //shouldn't be able to find it which means it doesn't get set. if it does find it then there was a feature mix up
          allValues.push(["Close", getOption(sectionNames[i]+"SelectRange0", "text"), sectionNames[i]+" Can't Change Damage to Personal Range"]);
          Logger.trace(this, this.setOptionText, [sectionNames[i]+"ModifierChoices0.0", "Attack"]);
          allValues.push(["Close", getOption(sectionNames[i]+"SelectRange0", "text"), sectionNames[i]+" non-Personal Range defaults can't have attack modifier"]);
          this.setOptionText(sectionNames[i]+"Choices0", "Select One");

          this.setOptionText(sectionNames[i]+"Choices0", "Flight");
          Logger.trace(this, this.setOptionText, [sectionNames[i]+"ModifierChoices0.0", "Attack"]);
          allValues.push(["Close", getOption(sectionNames[i]+"SelectRange0", "text"), sectionNames[i]+" Can change from Personal Range"]);
          Logger.trace(this, this.setOptionText, [sectionNames[i]+"ModifierChoices0.0", "Affects Others Only"]);
          allValues.push(["Close", getOption(sectionNames[i]+"SelectRange0", "text"), sectionNames[i]+" Can switch attack modifiers"]);
          Logger.trace(this, this.setOptionText, [sectionNames[i]+"ModifierChoices0.0", "Select One"]);
          allValues.push([PowerListAgnostic.rangePersonalString, document.getElementById(sectionNames[i]+"SelectRangeHolder0").innerHTML, sectionNames[i]+" Can Change Flight back to Personal Range"]);
          this.setOptionText(sectionNames[i]+"Choices0", "Select One");

          this.setOptionText(sectionNames[i]+"Choices0", "Immunity");
          Logger.trace(this, this.setOptionText, [sectionNames[i]+"ModifierChoices0.0", "Attack"]);
          allValues.push([PowerListAgnostic.rangePersonalString, document.getElementById(sectionNames[i]+"SelectRangeHolder0").innerHTML, sectionNames[i]+" Can't Change Permanent durtation to non-Personal Range"]);
          this.setOptionText(sectionNames[i]+"Choices0", "Select One");
      }

       Logger.up();
       return this.compareResults(allValues, "range_quirks");
   };
   this.add_remove_all_rows = function(){
       var sectionNames=["power", "equipment", "advantage", "skill"];
       var allValues=[];
       this.setValue("Awareness", 30);  //to set godhood (lasting)
      for (var sectionNamesIndex=0; sectionNamesIndex < sectionNames.length; sectionNamesIndex++)
      {
          var savedRowNames=[];
          document.getElementById(sectionNames[sectionNamesIndex]+"Choices0").selectedIndex=1;
          savedRowNames.push(getOption(sectionNames[sectionNamesIndex]+"Choices0", "text"));
          //document.getElementById(sectionNames[sectionNamesIndex]+"Choices0").selectedIndex=0;  //don't need to reset just call onChange
          document.getElementById(sectionNames[sectionNamesIndex]+"Choices0").onchange();
          allValues.push([false, document.getElementById(sectionNames[sectionNamesIndex]+"Choices1")==undefined, "Add "+sectionNames[sectionNamesIndex]+" Row"]);
          if(document.getElementById(sectionNames[sectionNamesIndex]+"Choices1")==undefined) continue;  //otherwise will crash. assume if 1 is added they will all be
          document.getElementById(sectionNames[sectionNamesIndex]+"Choices1").selectedIndex=2;
          document.getElementById(sectionNames[sectionNamesIndex]+"Choices1").onchange();
          //savedRowNames.push(getOption(sectionNames[sectionNamesIndex]+"Choices1", "text"));  //don't record because it gets removed
          document.getElementById(sectionNames[sectionNamesIndex]+"Choices2").selectedIndex=3;
          document.getElementById(sectionNames[sectionNamesIndex]+"Choices2").onchange();
          savedRowNames.push(getOption(sectionNames[sectionNamesIndex]+"Choices2", "text"));
          if(sectionNames[sectionNamesIndex]=="power") this.setOptionText(sectionNames[sectionNamesIndex]+"Choices1", "A God I Am");  //needs to be set for the onChange event
          else if(sectionNames[sectionNamesIndex]=="advantage") this.setOptionText(sectionNames[sectionNamesIndex]+"Choices1", "Beyond Mortal");
         else
         {
             document.getElementById(sectionNames[sectionNamesIndex]+"Choices3").selectedIndex=4;
             document.getElementById(sectionNames[sectionNamesIndex]+"Choices3").onchange();
         }
          savedRowNames.push(getOption(sectionNames[sectionNamesIndex]+"Choices3", "text"));
          this.setOptionText(sectionNames[sectionNamesIndex]+"Choices1", "Select One");  //needs to be set for the onChange event
          allValues.push([true, document.getElementById(sectionNames[sectionNamesIndex]+"Choices4")==undefined, "Remove "+sectionNames[sectionNamesIndex]+" Row"]);
          allValues.push([savedRowNames[0], getOption(sectionNames[sectionNamesIndex]+"Choices0", "text"), "Shifted "+sectionNames[sectionNamesIndex]+" Row 0"]);
          allValues.push([savedRowNames[1], getOption(sectionNames[sectionNamesIndex]+"Choices1", "text"), "Shifted "+sectionNames[sectionNamesIndex]+" Row 1"]);
          allValues.push([savedRowNames[2], getOption(sectionNames[sectionNamesIndex]+"Choices2", "text"), "Shifted "+sectionNames[sectionNamesIndex]+" Row 2"]);
      }
       Main.powerSection.clear();
       Main.equipmentSection.clear();
       sectionNames=["power", "equipment"];  //for modifiers
      for (var sectionNamesIndex=0; sectionNamesIndex < sectionNames.length; sectionNamesIndex++)
      {
          this.setOptionText(sectionNames[sectionNamesIndex]+"Choices0", "Flight");  //so that the row exists
          var savedRowNames=[];
          this.setOptionText(sectionNames[sectionNamesIndex]+"ModifierChoices0.0", "Accurate");
          savedRowNames.push("Accurate");
          allValues.push([true, document.getElementById(sectionNames[sectionNamesIndex]+"ModifierChoices0.1")!=undefined, "Add "+sectionNames[sectionNamesIndex]+" Modifier Row"]);
          if(document.getElementById(sectionNames[sectionNamesIndex]+"ModifierChoices0.1")==undefined) continue;  //otherwise will crash. assume if 1 is added they will all be
          this.setOptionText(sectionNames[sectionNamesIndex]+"ModifierChoices0.1", "Area");
          //savedRowNames.push("Area");  //don't record because it gets removed
          this.setOptionText(sectionNames[sectionNamesIndex]+"ModifierChoices0.2", "Feature");
          savedRowNames.push("Feature");
          this.setOptionText(sectionNames[sectionNamesIndex]+"ModifierChoices0.3", "Innate");
          savedRowNames.push("Innate");
          this.setOptionText(sectionNames[sectionNamesIndex]+"ModifierChoices0.1", "Select One");  //needs to be set for the onChange event
          allValues.push([true, document.getElementById(sectionNames[sectionNamesIndex]+"ModifierChoices0.4")==undefined, "Remove "+sectionNames[sectionNamesIndex]+" Modifier Row"]);
          allValues.push([savedRowNames[0], getOption(sectionNames[sectionNamesIndex]+"ModifierChoices0.0", "text"), "Shifted "+sectionNames[sectionNamesIndex]+" Modifier Row 0"]);
          allValues.push([savedRowNames[1], getOption(sectionNames[sectionNamesIndex]+"ModifierChoices0.1", "text"), "Shifted "+sectionNames[sectionNamesIndex]+" Modifier Row 1"]);
          allValues.push([savedRowNames[2], getOption(sectionNames[sectionNamesIndex]+"ModifierChoices0.2", "text"), "Shifted "+sectionNames[sectionNamesIndex]+" Modifier Row 2"]);
          this.setOptionText(sectionNames[sectionNamesIndex]+"Choices0", "Select One");
      }
       sectionNames=["power", "equipment"];  //something more crafty
      for (var sectionNamesIndex=0; sectionNamesIndex < sectionNames.length; sectionNamesIndex++)
      {
          this.setOptionText(sectionNames[sectionNamesIndex]+"Choices0", "Flight");  //so that the row exists
          var savedRowNames=[];
          this.setOptionText(sectionNames[sectionNamesIndex]+"ModifierChoices0.0", "Attack");
          //savedRowNames.push("Attack");  //don't record because it gets removed
          allValues.push([true, document.getElementById(sectionNames[sectionNamesIndex]+"ModifierChoices0.1")!=undefined, "Add "+sectionNames[sectionNamesIndex]+" Modifier Row"]);
          if(document.getElementById(sectionNames[sectionNamesIndex]+"ModifierChoices0.1")==undefined) continue;  //otherwise will crash. assume if 1 is added they will all be
          this.setOptionText(sectionNames[sectionNamesIndex]+"SelectRange0", "Ranged");
          //savedRowNames.push("Increased Range");  //don't record because it should also be removed
          this.setOptionText(sectionNames[sectionNamesIndex]+"ModifierChoices0.2", "Feature");
          savedRowNames.push("Feature");
          this.setOptionText(sectionNames[sectionNamesIndex]+"ModifierChoices0.3", "Innate");
          savedRowNames.push("Innate");
          this.setOptionText(sectionNames[sectionNamesIndex]+"ModifierChoices0.0", "Select One");  //needs to be set for the onChange event
          allValues.push([true, document.getElementById(sectionNames[sectionNamesIndex]+"ModifierChoices0.4")==undefined, "Remove "+sectionNames[sectionNamesIndex]+" Modifier attack Row"]);
          allValues.push([true, document.getElementById(sectionNames[sectionNamesIndex]+"ModifierChoices0.3")==undefined, "Remove "+sectionNames[sectionNamesIndex]+" Modifier increased range Row"]);
          allValues.push([savedRowNames[0], getOption(sectionNames[sectionNamesIndex]+"ModifierChoices0.0", "text"), "Shifted "+sectionNames[sectionNamesIndex]+" Modifier Row 0"]);
          allValues.push([savedRowNames[1], getOption(sectionNames[sectionNamesIndex]+"ModifierChoices0.1", "text"), "Shifted "+sectionNames[sectionNamesIndex]+" Modifier Row 1"]);
          this.setOptionText(sectionNames[sectionNamesIndex]+"Choices0", "Select One");
      }
       return this.compareResults(allValues, "add_remove_all_rows");
   };
   this.old_rules_differences = function(){  //TODO: more
       var allValues=[];
       var sectionNames=["power", "equipment"];
       var powerChecked=["Immunity", "Feature"];
       Main.useOldRules=false;  //set to false so that I can toggle it to true
       Main.ruleToggle();
      for (var sectionNamesIndex=0; sectionNamesIndex < sectionNames.length; sectionNamesIndex++)
      {
         for (var powerCheckedIndex=0; powerCheckedIndex < powerChecked.length; powerCheckedIndex++)
         {
             this.setOptionText(sectionNames[sectionNamesIndex]+"Choices0", powerChecked[powerCheckedIndex]);
             this.setOptionText(sectionNames[sectionNamesIndex]+"SelectDuration0", "Sustained");
             this.setOptionText(sectionNames[sectionNamesIndex]+"SelectAction0", "Slow");
             allValues.push([false, getOption(sectionNames[sectionNamesIndex]+"SelectAction0", "text")=="Slow", sectionNames[sectionNamesIndex]+" "+powerChecked[powerCheckedIndex]+" Slow action doesn't exist"]);
             this.setValue(sectionNames[sectionNamesIndex]+"Rank0", 24);
             this.setOptionText(sectionNames[sectionNamesIndex]+"ModifierChoices0.0", "Sustained");  //Immunity already has this but feature needs it
             this.setOptionText(sectionNames[sectionNamesIndex]+"ModifierChoices0.1", "Dynamic Alternate Effect");
             allValues.push([22, parseInt(document.getElementById(sectionNames[sectionNamesIndex]+"ModifierRankInputHolder0.1").innerHTML), sectionNames[sectionNamesIndex]+" "+powerChecked[powerCheckedIndex]+" Dynamic Alternate Effect rank"]);
                //2 less than power rank
             this.setOptionText(sectionNames[sectionNamesIndex]+"ModifierChoices0.2", "Triggered");
             allValues.push(["Triggered", getOption(sectionNames[sectionNamesIndex]+"ModifierChoices0.2", "text"), sectionNames[sectionNamesIndex]+" "+powerChecked[powerCheckedIndex]+" Triggered modifier does exist"]);
             this.setOptionText(sectionNames[sectionNamesIndex]+"Choices0", "Select One");
         }
      }
       Main.ruleToggle();  //change back to new rules
       return this.compareResults(allValues, "old_rules_differences");
   };
   this.modifier_quirks = function(){
       var allValues=[];
       var sectionNames=["power", "equipment"];
       var powerChecked=["Immunity", "Feature"];
      for (var sectionNamesIndex=0; sectionNamesIndex < sectionNames.length; sectionNamesIndex++)
      {
         for (var powerCheckedIndex=0; powerCheckedIndex < powerChecked.length; powerCheckedIndex++)
         {
             this.setOptionText(sectionNames[sectionNamesIndex]+"Choices0", powerChecked[powerCheckedIndex]);
             this.setOptionText(sectionNames[sectionNamesIndex]+"ModifierChoices0.0", "Other Flat Flaw");
             allValues.push([2, parseInt(document.getElementById(sectionNames[sectionNamesIndex]+"Rank0").value), sectionNames[sectionNamesIndex]+" "+powerChecked[powerCheckedIndex]+" Flat flaw Auto Adjust from select"]);
             this.setValue(sectionNames[sectionNamesIndex]+"ModifierRank0.0", 5);
             allValues.push([6, parseInt(document.getElementById(sectionNames[sectionNamesIndex]+"Rank0").value), sectionNames[sectionNamesIndex]+" "+powerChecked[powerCheckedIndex]+" Flat flaw Auto Adjust Rank"]);
             this.setValue(sectionNames[sectionNamesIndex]+"Rank0", 24);
             this.setOptionText(sectionNames[sectionNamesIndex]+"ModifierChoices0.0", "Removable");
             allValues.push([4, parseInt(document.getElementById(sectionNames[sectionNamesIndex]+"ModifierRankInputHolder0.0").innerHTML), sectionNames[sectionNamesIndex]+" "+powerChecked[powerCheckedIndex]+" removable rank"]);
             this.setOptionText(sectionNames[sectionNamesIndex]+"ModifierChoices0.0", "Easily Removable");
             allValues.push([9, parseInt(document.getElementById(sectionNames[sectionNamesIndex]+"ModifierRankInputHolder0.0").innerHTML), sectionNames[sectionNamesIndex]+" "+powerChecked[powerCheckedIndex]+" easily removable rank"]);
             this.setOptionText(sectionNames[sectionNamesIndex]+"ModifierChoices0.1", "Alternate Effect");
             if(Main.useOldRules) allValues.push([14, parseInt(document.getElementById(sectionNames[sectionNamesIndex]+"ModifierRankInputHolder0.1").innerHTML), sectionNames[sectionNamesIndex]+" "+powerChecked[powerCheckedIndex]+" Alternate Effect rank"]);
                //one less than total cost so that the total is 1
             else allValues.push([7, parseInt(document.getElementById(sectionNames[sectionNamesIndex]+"ModifierRankInputHolder0.1").innerHTML), sectionNames[sectionNamesIndex]+" "+powerChecked[powerCheckedIndex]+" Alternate Effect rank"]);
             this.setOptionText(sectionNames[sectionNamesIndex]+"ModifierChoices0.1", "Select One");  //just because
             this.setOptionText(sectionNames[sectionNamesIndex]+"ModifierChoices0.0", "Split");
             this.setValue(sectionNames[sectionNamesIndex]+"ModifierRank0.0", 156165);  //way too high
             allValues.push([24, parseInt(document.getElementById(sectionNames[sectionNamesIndex]+"ModifierRank0.0").value), sectionNames[sectionNamesIndex]+" "+powerChecked[powerCheckedIndex]+" Split max Rank"]);
             this.setOptionText(sectionNames[sectionNamesIndex]+"Choices0", "Select One");
         }
      }
       return this.compareResults(allValues, "modifier_quirks");
   };
    //this.load_bad_text = function(){};  //TODO: copy below except all the data is bad such as range="12" and dodge="foo". equipment advantage without section
   this.load_text = function(){  //load file can't be tested (ditto for both images). TODO make sure this has lots of possible data, all valid, but most not default
       var textToLoad="";
       textToLoad+="<?xml version=\"1.0\"?>\n";
       textToLoad+="\n";
       textToLoad+="<Document>\n";
       textToLoad+="    <Hero name=\"Mimic\" transcendence=\"0\" image=\"../images/TCP Manimal 909b3.jpg\" />\n";
       textToLoad+="    <Information>Insert Complications, background and other information here</Information>\n";
       textToLoad+="   <Abilities>\n";
       textToLoad+="       <Strength value=\"1\" />\n";
       textToLoad+="       <Agility value=\"1\" />\n";
       textToLoad+="       <Fighting value=\"8\" />\n";
       textToLoad+="       <Awareness value=\"1\" />\n";
       textToLoad+="       <Stamina value=\"1\" />\n";
       textToLoad+="       <Dexterity value=\"1\" />\n";
       textToLoad+="       <Intellect value=\"1\" />\n";
       textToLoad+="       <Presence value=\"1\" />\n";
       textToLoad+="   </Abilities>\n";
       textToLoad+="   <Powers>\n";
       textToLoad+="      <Row name=\"Variable\" text=\"Mimic: 50 points for duplicating a subject's traits\" action=\"Move\" range=\"Close\" duration=\"Continuous\" rank=\"10\">\n";
       textToLoad+="          <Modifier name=\"Increased Range\" applications=\"1\" />\n";
       textToLoad+="          <Modifier name=\"Faster Action\" applications=\"2\" />\n";
       textToLoad+="          <Modifier name=\"Increased Duration\" applications=\"1\" />\n";
       textToLoad+="          <Modifier name=\"Limited\" applications=\"2\" text=\"to one trait at a time\" />\n";
       textToLoad+="      </Row>\n";
       textToLoad+="       <Row name=\"Flight\" text=\"fast\" action=\"Free\" range=\"Personal\" duration=\"Sustained\" rank=\"3\" />\n";
       textToLoad+="   </Powers>\n";
       textToLoad+="   <Equipment>\n";
       textToLoad+="      <Row name=\"Senses\" cost=\"1\" text=\"Power Sense: Detect Powers (Vision)\" action=\"None\" range=\"Personal\" duration=\"Permanent\" rank=\"1\">\n";
       textToLoad+="          <Modifier name=\"Other Flat Extra\" applications=\"2\" text=\"Accurate\" />\n";
       textToLoad+="          <Modifier name=\"Other Flat Extra\" applications=\"2\" text=\"Analytical (this includes Acute (1))\" />\n";
       textToLoad+="      </Row>\n";
       textToLoad+="       <Row name=\"Protection\" text=\"Armor\" action=\"None\" range=\"Personal\" duration=\"Permanent\" rank=\"3\" />\n";
       textToLoad+="   </Equipment>\n";
       textToLoad+="   <Advantages>\n";
       textToLoad+="       <Row name=\"Equipment\" rank=\"2\" />\n";
       textToLoad+="       <Row name=\"Defensive Roll\" rank=\"1\" />\n";
       textToLoad+="       <Row name=\"Improved Critical\" rank=\"2\" text=\"Guns\" />\n";
       textToLoad+="   </Advantages>\n";
       textToLoad+="   <Skills>\n";
       if(Main.useOldRules) textToLoad+="       <Row name=\"Deception\" rank=\"6\" ability=\"Strength\" />\n";
       else textToLoad+="       <Row name=\"Deception\" subtype=\"\" rank=\"6\" ability=\"Strength\" />\n";
       textToLoad+="       <Row name=\"Expertise\" subtype=\"(Choose One)\" rank=\"4\" ability=\"Intellect\" />\n";
       if(!Main.useOldRules) textToLoad+="       <Row name=\"Memory\" rank=\"1\" ability=\"Intellect\" />\n";
       textToLoad+="   </Skills>\n";
       textToLoad+="   <Defenses>\n";
       textToLoad+="       <Dodge value=\"7\" />\n";
       textToLoad+="       <Fortitude value=\"7\" />\n";
       textToLoad+="       <Parry value=\"1\" />\n";
       textToLoad+="       <Will value=\"6\" />\n";
       textToLoad+="   </Defenses>\n";
       textToLoad+="</Document>\n";
       document.getElementById("xml box").value=textToLoad;
       Main.load();

       var allValues=[];
       //textToLoad+="      <Row name=\"Variable\" text=\"Mimic: 50 points for duplicating a subject's traits\" action=\"Move\" range=\"Close\" duration=\"Continuous\" rank=\"10\">\n";
       allValues.push(["Variable", getOption("powerChoices0", "text"), "Variable Power"]);
       allValues.push(["Move", getOption("powerSelectAction0", "text"), "Variable Action"]);
       allValues.push(["Close", getOption("powerSelectRange0", "text"), "Variable Range"]);
       allValues.push(["Continuous", getOption("powerSelectDuration0", "text"), "Variable Duration"]);
       //TODO: this will take forever: check every feild given and spans
       Main.save();
       allValues.push([textToLoad, document.getElementById("xml box").value, "Saved Text"]);
       return this.compareResults(allValues, "load_text");
   };
   this.confirm_all_xmls = function(){  //doesn't work in chrome. doesn't take as long as I thought but still leave it out of testAll()
       var allValues=[];
       var basePath="xml\\";  //relaitve is required always plus it is the only one that is portable. is relative to the .html file
       var allFolders=["", "Constructs\\", "Secret Origins Hero Archtypes\\", "Gamemaster\\Animals\\", "Gamemaster\\Civilians\\", "Gamemaster\\Public Servants\\", "Gamemaster\\Trained Combatants\\", "Gamemaster\\Underworld Archetypes\\"];
       var allFiles=[["All Equipment.xml"],
          ["Gaint Robot.xml", "Robot.xml", "Zombie.xml"],
          ["Battlesuit.xml", "Construct.xml", "Crime Fighter.xml", "Energy Controller.xml", "Gadgeteer.xml", "Martial Artist.xml", "Mimic.xml", "Mystic.xml", "Paragon.xml", "Powerhouse.xml", "Psychic.xml", "Shapeshifter.xml", "Speedster.xml", "Warrior.xml", "Weapon Master.xml"],
          ["Ape.xml", "Dolphin.xml", "Hawk.xml", "Lion.xml", "Shark.xml", "Whale.xml", "Wolf.xml"],
          ["Bystander.xml", "Reporter.xml", "Scientist.xml"],
          ["Government Agent.xml", "Police Chief.xml", "Police Officer.xml", "SWAT Officer.xml"],
          ["Militant.xml", "Soldier.xml"],
          ["Crime Lord.xml", "Criminal.xml", "Gang Leader.xml", "Street Informant.xml", "Thug.xml"]];

      for (var folderIndex=0; folderIndex < allFolders.length; folderIndex++)
      {
         for (var fileIndex=0; fileIndex < allFiles[folderIndex].length; fileIndex++)
         {
             var originalContents=readXMLAsString(basePath+allFolders[folderIndex]+allFiles[folderIndex][fileIndex]);
             document.getElementById("xml box").value=originalContents;  //should conform the endlines (plus can only load from here)
             originalContents=document.getElementById("xml box").value;  //must be on seperate lines for some reason
             originalContents=originalContents.replace(/\/>/g, ' />');
             originalContents=originalContents.replace(/ encoding="UTF-8"/, '');  //remove (since I can't get it to use ANSI otherwise I would...)
             originalContents=originalContents.replace(/<\?xml version="1.0"\?>/, '<?xml version="1.0"?>\n');  //add a blank line
             originalContents=originalContents.replace(/<Powers \/>/, '<Powers></Powers>');  //make empty group instead of self closing
             originalContents=originalContents.replace(/<Equipment \/>/, '<Equipment></Equipment>');
             originalContents=originalContents.replace(/<Advantages \/>/, '<Advantages></Advantages>');
             originalContents=originalContents.replace(/<Skills \/>/, '<Skills></Skills>');
             originalContents+='\n';  //ends with a blank line
             originalContents=originalContents.replace(/\s+<!--[\s\S]*?-->/g, '');  //remove comments when comparing
             Main.load();
             Main.save();
             var newContents=document.getElementById("xml box").value;
             document.getElementById("xml box").value=newContents;
             newContents=document.getElementById("xml box").value;
             allValues.push([originalContents, newContents, "Confirm "+allFolders[folderIndex]+allFiles[folderIndex][fileIndex]]);
             //document.getElementById("xml box").value=originalContents;
             //document.getElementById("xml box").value+=strinDiffDisplay(originalContents, newContents);
         }
      }

       return this.compareResults(allValues, "confirm_all_xmls");
   };
    //try this free javascript debugger: http://www.aptana.com/products/studio3
       //it doesn't work (doesn't run) use chrome or firefox instead
    //http://docs.seleniumhq.org/ and http://www.eclipse.org/webtools/jsdt/
};
