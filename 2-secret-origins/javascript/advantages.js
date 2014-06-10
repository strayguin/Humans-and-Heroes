/*Call List onChange
Select Advantage: select(rowIndex);
Rank: changeRank(rowIndex);
Text: changeText(rowIndex);
*/
function AdvantageList(){
   //static members:
    AdvantageList.allAdvantagesMaxRanks=convertToHash([["Defensive Roll", -1], ["Evasion", 2], ["Improved Critical", 4], ["Improved Initiative", 5], ["Inspire", 5], ["Lucky", 3], ["Benefit", -1], ["Equipment", -1], ["Minion", -1], ["Sidekick", -1], ["Attractive", 2], ["Languages", -1], ["Supreme", -1], ["Omnipresent", 3], ["Omniscient", 5], ["Luck", -1], ["Close Attack", -1], ["Improvised Weapon", -1], ["Precise Attack", 4], ["Ranged Attack", -1], ["Set-up", -1], ["Takedown", 2], ["Throwing Mastery", -1], ["Second Chance", -1], ["Daze", 2], ["Fascinate", -1]], 1);
    AdvantageList.allAdvantagesCostPerRanks = convertToHash([["Lucky", 5], ["Sidekick", 2], ["Luck of the Gods", 5], ["Your Petty Rules Don't Apply to Me", 50], ["Variable Modifier", 35], ["Beyond Mortal", 50], ["Omnipresent", 5], ["Let There Be", 40], ["Stay Like That", 15], ["Omniscient", 5]], 1);
    AdvantageList.advantagesWithText=["Improved Critical", "Ultimate Effort", "Benefit", "Minion", "Sidekick", "Languages", "Skill Mastery", "Supreme", "Stay Like That", "Favored Environment", "Precise Attack", "Second Chance", "Favored Foe"];
   //private:
    var allAdvantageNames=["Accurate Attack", "All-out Attack", "Defensive Attack", "Defensive Roll", "Evasion", "Fast Grab", "Improved Aim", "Improved Critical", "Improved Defense", "Improved Disarm", "Improved Grab", "Improved Hold", "Improved Initiative", "Improved Trip", "Move-by Action", "Power Attack", "Prone Fighting", "Quick Draw", "Beginner's Luck", "Inspire", "Lucky", "Seize Initiative", "Ultimate Effort", "Benefit", "Diehard", "Equipment", "Extraordinary Effort", "Instant Up", "Interpose", "Meekness", "Minion", "Sidekick", "Teamwork", "Trance", "Attractive", "Connected", "Improvised Tools", "Jack of All Trades", "Languages", "Skill Mastery", "Luck of the Gods", "Supreme", "Your Petty Rules Don't Apply to Me", "Variable Modifier", "Beyond Mortal", "Omnipresent", "Let There Be", "Stay Like That", "Omniscient"];
     //allAdvantageNames will need to be remade if the option order changes
    var allGodhoodAdvantages=["Luck of the Gods", "Supreme", "Your Petty Rules Don't Apply to Me", "Variable Modifier", "Beyond Mortal", "Omnipresent", "Let There Be", "Stay Like That", "Omniscient"];
    var advantageRowParts=["<select id='advantageChoices", "' onChange='Main.advantageSection.select(", ");'><option>Select One</option><option>Accurate Attack</option><option>All-out Attack</option><option>Defensive Attack</option><option>Defensive Roll</option><option>Evasion</option><option>Fast Grab</option><option>Improved Aim</option><option>Improved Critical</option><option>Improved Defense</option><option>Improved Disarm</option><option>Improved Grab</option><option>Improved Hold</option><option>Improved Initiative</option><option>Improved Trip</option><option>Move-by Action</option><option>Power Attack</option><option>Prone Fighting</option><option>Quick Draw</option><option>Beginner's Luck</option><option>Inspire</option><option>Lucky</option><option>Seize Initiative</option><option>Ultimate Effort</option><option>Benefit</option><option>Diehard</option><option>Equipment</option><option>Extraordinary Effort</option><option>Instant Up</option><option>Interpose</option><option>Meekness</option><option>Minion</option><option>Sidekick</option><option>Teamwork</option><option>Trance</option><option>Attractive</option><option>Connected</option><option>Improvised Tools</option><option>Jack of All Trades</option><option>Languages</option><option>Skill Mastery</option></select><span id='advantageRankHolder", "' style='display:none;'> Rank <input type='text' size='1' value='1' id='advantageRank", "' onChange='Main.advantageSection.changeRank(", ");' /></span><span id='advantageTextHolder", "' style='display:none;'><input type='text' value='Advantage Subtype' id='advantageText", "' onChange='Main.advantageSection.changeText(", ");' /></span><span id='advantageRowTotalHolder", "' style='display:none;'> = <span id='advantageRowTotal", "'>0</span></span><br />"];
    var godhoodString="<option>Luck of the Gods</option><option>Supreme</option><option>Your Petty Rules Don't Apply to Me</option><option>Variable Modifier</option><option>Beyond Mortal</option><option>Omnipresent</option><option>Let There Be</option><option>Stay Like That</option><option>Omniscient</option></select>";
    var equipmentRow=-1;
    var rowArray = [new AdvantageObject(0)];
   //public:
   this.total=0;
    this.usingGodhoodAdvantages=false;  //could change these to private get only
    this.pettyRulesApply=true;
    this.rankHash=new Hash({"Seize Initiative": false}, 0);
   this.changeRules = function(){
      if (Main.useOldRules)
      {
          AdvantageList.allAdvantagesCostPerRanks.set("Sidekick", 1);  //only one that needs to be changed (since the rest were removed)
          AdvantageList.allAdvantagesMaxRanks.set("Improved Initiative", -1);
          allAdvantageNames=["Accurate Attack", "All-out Attack", "Chokehold", "Close Attack", "Defensive Attack", "Defensive Roll", "Evasion", "Fast Grab", "Favored Environment", "Grabbing Finesse", "Improved Aim", "Improved Critical", "Improved Defense", "Improved Disarm", "Improved Grab", "Improved Hold", "Improved Initiative", "Improved Smash", "Improved Trip", "Improvised Weapon", "Move-by Action", "Power Attack", "Precise Attack", "Prone Fighting", "Quick Draw", "Ranged Attack", "Redirect", "Set-up", "Takedown", "Throwing Mastery", "Uncanny Dodge", "Weapon Bind", "Weapon Break", "Beginner's Luck", "Inspire", "Leadership", "Luck", "Seize Initiative", "Ultimate Effort", "Assessment", "Benefit", "Diehard", "Eidetic Memory", "Equipment", "Extraordinary Effort", "Fearless", "Great Endurance", "Instant Up", "Interpose", "Minion", "Second Chance", "Sidekick", "Teamwork", "Trance", "Agile Feint", "Animal Empathy", "Artificer", "Attractive", "Connected", "Contacts", "Daze", "Fascinate", "Favored Foe", "Hide in Plain Sight", "Improvised Tools", "Inventor", "Jack of All Trades", "Languages", "Ritualist", "Skill Mastery", "Startle", "Taunt", "Tracking", "Well-informed", "Luck of the Gods", "Supreme", "Your Petty Rules Don't Apply to Me", "Variable Modifier", "Beyond Mortal", "Omnipresent", "Let There Be", "Stay Like That", "Omniscient"];
          advantageRowParts[2]=");'><option>Select One</option><option>Accurate Attack</option><option>All-out Attack</option><option>Chokehold</option><option>Close Attack</option><option>Defensive Attack</option><option>Defensive Roll</option><option>Evasion</option><option>Fast Grab</option><option>Favored Environment</option><option>Grabbing Finesse</option><option>Improved Aim</option><option>Improved Critical</option><option>Improved Defense</option><option>Improved Disarm</option><option>Improved Grab</option><option>Improved Hold</option><option>Improved Initiative</option><option>Improved Smash</option><option>Improved Trip</option><option>Improvised Weapon</option><option>Move-by Action</option><option>Power Attack</option><option>Precise Attack</option><option>Prone Fighting</option><option>Quick Draw</option><option>Ranged Attack</option><option>Redirect</option><option>Set-up</option><option>Takedown</option><option>Throwing Mastery</option><option>Uncanny Dodge</option><option>Weapon Bind</option><option>Weapon Break</option><option>Beginner's Luck</option><option>Inspire</option><option>Leadership</option><option>Luck</option><option>Seize Initiative</option><option>Ultimate Effort</option><option>Assessment</option><option>Benefit</option><option>Diehard</option><option>Eidetic Memory</option><option>Equipment</option><option>Extraordinary Effort</option><option>Fearless</option><option>Great Endurance</option><option>Instant Up</option><option>Interpose</option><option>Minion</option><option>Second Chance</option><option>Sidekick</option><option>Teamwork</option><option>Trance</option><option>Agile Feint</option><option>Animal Empathy</option><option>Artificer</option><option>Attractive</option><option>Connected</option><option>Contacts</option><option>Daze</option><option>Fascinate</option><option>Favored Foe</option><option>Hide in Plain Sight</option><option>Improvised Tools</option><option>Inventor</option><option>Jack of All Trades</option><option>Languages</option><option>Ritualist</option><option>Skill Mastery</option><option>Startle</option><option>Taunt</option><option>Tracking</option><option>Well-informed</option></select><span id='advantageRankHolder";
      }
      else
      {
          AdvantageList.allAdvantagesCostPerRanks.set("Sidekick", 2);
          AdvantageList.allAdvantagesMaxRanks.set("Improved Initiative", 5);
          allAdvantageNames=["Accurate Attack", "All-out Attack", "Defensive Attack", "Defensive Roll", "Evasion", "Fast Grab", "Improved Aim", "Improved Critical", "Improved Defense", "Improved Disarm", "Improved Grab", "Improved Hold", "Improved Initiative", "Improved Trip", "Move-by Action", "Power Attack", "Prone Fighting", "Quick Draw", "Beginner's Luck", "Inspire", "Lucky", "Seize Initiative", "Ultimate Effort", "Benefit", "Diehard", "Equipment", "Extraordinary Effort", "Instant Up", "Interpose", "Meekness", "Minion", "Sidekick", "Teamwork", "Trance", "Attractive", "Connected", "Improvised Tools", "Jack of All Trades", "Languages", "Skill Mastery", "Luck of the Gods", "Supreme", "Your Petty Rules Don't Apply to Me", "Variable Modifier", "Beyond Mortal", "Omnipresent", "Let There Be", "Stay Like That", "Omniscient"];
          advantageRowParts[2]=");'><option>Select One</option><option>Accurate Attack</option><option>All-out Attack</option><option>Defensive Attack</option><option>Defensive Roll</option><option>Evasion</option><option>Fast Grab</option><option>Improved Aim</option><option>Improved Critical</option><option>Improved Defense</option><option>Improved Disarm</option><option>Improved Grab</option><option>Improved Hold</option><option>Improved Initiative</option><option>Improved Trip</option><option>Move-by Action</option><option>Power Attack</option><option>Prone Fighting</option><option>Quick Draw</option><option>Beginner's Luck</option><option>Inspire</option><option>Lucky</option><option>Seize Initiative</option><option>Ultimate Effort</option><option>Benefit</option><option>Diehard</option><option>Equipment</option><option>Extraordinary Effort</option><option>Instant Up</option><option>Interpose</option><option>Meekness</option><option>Minion</option><option>Sidekick</option><option>Teamwork</option><option>Trance</option><option>Attractive</option><option>Connected</option><option>Improvised Tools</option><option>Jack of All Trades</option><option>Languages</option><option>Skill Mastery</option></select><span id='advantageRankHolder";
      }
   };
   this.clear = function(){
       rowArray = [new AdvantageObject(0)];  //reset rows
       this.generate();  //physical reset
       this.update();  //reset all other variables
   };
   this.select = function(rowIndex){
       rowArray[rowIndex].select();
       this.generate();  //in case a physical row is added or removed
       this.update();
   };
   this.changeRank = function(rowIndex){
       rowArray[rowIndex].changeRank();
       this.update();
       //don't need to generate because the rows are the same and that field has already been updated
   };
   this.changeText = function(rowIndex){
       rowArray[rowIndex].changeText();
       this.update();  //will generate if rows are changed due to redundancy
   };
   this.update = function(){
       this.calculateValues();  //recount all varaibles (except total)
       this.total=0;
      for (var i=0; i < rowArray.length-1; i++)  //the last row is always blank
      {
          this.total+=rowArray[i].totalCost;
      }
       Main.defenseSection.calculateValues();
       Main.updateOffense();
       Main.update();  //updates totals and power level
   };
   this.generate = function (){
       var allAdvantageRows="";
      for (var i=0; i < rowArray.length; i++)
      {
          allAdvantageRows+=generateRow(advantageRowParts, i);
      }
      if (rowArray[rowArray.length-1].getSelectIndex()!=0)  //if last row isn't blank add one
      {
          allAdvantageRows+=generateRow(advantageRowParts, rowArray.length);
          rowArray.push(new AdvantageObject(rowArray.length));
      }
       if(Main!=undefined && Main.godHoodSwitch) allAdvantageRows=allAdvantageRows.replace(/<\/select>/g, godhoodString);
       document.getElementById("advantage section").innerHTML=allAdvantageRows;
       this.setAll();
   };
   this.setAll = function(){
      for(var i=0; i < rowArray.length-1; i++)  //the last row (being blank) is already set
         {rowArray[i].setValues();}
   };
   this.save = function(){
       if(rowArray.length==1) return " <Advantages></Advantages>\n";
       var fileString="<Advantages>\n";
      for (var i=0; i < rowArray.length-1; i++)  //the last row is always blank
      {
          var element = document.getElementById("advantageChoices"+i);
          element=element.options[element.selectedIndex].text;
          fileString+="       <Row name=\""+element+"\"";
          if(document.getElementById("advantageRankHolder"+i).style.display!="none") fileString+=" rank=\""+document.getElementById("advantageRank"+i).value+"\"";
          if(document.getElementById("advantageTextHolder"+i).style.display!="none") fileString+=" text=\""+document.getElementById("advantageText"+i).value+"\"";
          fileString+=" />\n";
      }
       fileString+="   </Advantages>\n";
       return fileString;
   };
   this.load = function(allAdvantageRows){
       //rowArray = [new AdvantageObject(0)];  //not needed since Main.load calls Main.clear. and shouldn't be here in case equipment caused an advantage
      for (var i=0; i < allAdvantageRows.length; i++)
      {
          var rowPointer=allAdvantageRows[i];
          var selectName=rowPointer.getAttribute("name");
          var indexToUse=allAdvantageNames.indexOf(selectName);
          if(indexToUse == -1){alert("Load Error: "+selectName+" is not an advantage name."); continue;}  //not found
          if(indexToUse >= allAdvantageNames.indexOf("Luck of the Gods") && !Main.godHoodSwitch){alert("Load Error: "+selectName+" is the selected advantage without transcendence (="+parseInt(document.getElementById("transcendence").value)+")"); continue;}
          indexToUse++;  //to skip the default
          var advantagePointer=rowArray[rowArray.length-1];
          advantagePointer.name=selectName;  //must be before selected index because it is used in setSelectIndex
          advantagePointer.setSelectIndex(indexToUse);
          advantagePointer.setRank(rowPointer.getAttribute("rank"));  //load in the data
          advantagePointer.setText(rowPointer.getAttribute("text"));
          rowArray.push(new AdvantageObject(rowArray.length));  //add a new blank data row
      }
       this.generate();  //create all physical rows
       this.update();
   };
   this.calculateValues = function (){
       this.rankHash=new Hash({"Seize Initiative": false}, 0);  //delete all improve criticals and reset the rest.
       //Seize Initiative is here because the default is false instead of 0
       this.usingGodhoodAdvantages=false;
       this.pettyRulesApply=true;
       Main.equipmentSection.totalMax=0;
       equipmentRow=-1;  //reset all these then recount them
       var advantageTypeList = new Array();

      for (var i=0; i < rowArray.length-1; i++)  //the last row is always blank
      {
          var element = rowArray[i];
          if(element.getSelectIndex()==0){this.removeRow(i); i--; continue;}  //row is blank

          var advantageText=rowArray[i].getUniqueName();
          if(advantageTypeList.contains(advantageText)){this.removeRow(i); i--; continue;}  //row is redundant
          advantageTypeList.push(advantageText);

          var elementRank = element.getRank();  //name is public but rank is not
          if(allGodhoodAdvantages.contains(element.name)) this.usingGodhoodAdvantages=true;
          //do not connected with else since Petty Rules are godhood
          if(element.name=="Your Petty Rules Don't Apply to Me") this.pettyRulesApply=false;
          if(element.name=="Seize Initiative") this.rankHash.set("Seize Initiative", true);  //already in the hash (and not a rank)
          else this.rankHash.add(advantageText, elementRank);  //add these since hash is empty and there are no redundant rows (using unique name)
          if(element.name=="Equipment"){Main.equipmentSection.totalMax=(elementRank*5); equipmentRow=i;}
      }
   };
   this.correctEquipmentRank = function (){
       var newEquipmentRank;
      if (equipmentRow == -1)  //if there is no equipment advantage
      {
          if(Main.equipmentSection.total==0) return;  //I don't need to add a row
          equipmentRow=rowArray.length-1;  //index is at last existing row (which was blank)
          document.getElementById("advantageChoices"+equipmentRow).selectedIndex=(allAdvantageNames.indexOf("Equipment")+1);  //+1 to skip default
          this.select(equipmentRow);  //add a new row that is equipment
      }
       newEquipmentRank=Math.ceil(Main.equipmentSection.total/5);
       if(newEquipmentRank==0) this.removeRow(equipmentRow);  //remove the row
       else{document.getElementById("advantageRank"+equipmentRow).value=newEquipmentRank; rowArray[equipmentRow].changeRank();}
       this.update();
   };
   this.removeRow = function(rowIndex){
       rowArray.splice(rowIndex, 1);  //remove from array
      for(var i=0; i < rowArray.length; i++)
         {rowArray[i].rowIndex=i;}  //correct all indexing
       this.generate();
   };
   //constructor:
    this.generate();
}
function AdvantageObject(rowIndexPassed){
   //public:
    this.rowIndex=rowIndexPassed;
    this.totalCost=0;
    this.name="";
   //private:
    var selectIndex=0;
    var costPerRank=0;
    var hasRank=false;
    var rank=0;
    var hasText=false;
    var text="";
   this.select = function (){
       var element = document.getElementById("advantageChoices"+this.rowIndex);
       this.name = element.options[element.selectedIndex].text;
       this.setSelectIndex(document.getElementById("advantageChoices"+this.rowIndex).selectedIndex);
   };
    this.getSelectIndex = function (){return selectIndex;};
   this.setSelectIndex = function (indexGiven){
       selectIndex=sanitizeNumber(indexGiven, 0, 0);
      if (selectIndex==0)
      {
          this.name="";
          hasRank=false;
          rank=0;
          hasText=false;
          text="";
          costPerRank=0;
          this.totalCost=0;
          return;
      }
       hasRank=(AdvantageList.allAdvantagesMaxRanks.get(this.name)!=1);  //if max ranks is 1 then there are no ranks
       rank=1;
       costPerRank=AdvantageList.allAdvantagesCostPerRanks.get(this.name);
       this.totalCost=costPerRank;  //since it's rank 1
       hasText=AdvantageList.advantagesWithText.contains(this.name);
       text="";
       if(!hasText) return;
       if(this.name=="Languages") text="Languages Known";
       else if(this.name=="Minion" || this.name=="Sidekick") text="Helper Name";
       else if(this.name=="Supreme") text="Power Gained";
       else if(this.name=="Stay Like That") text="Power Modified";
       else text="Advantage Subtype";
   };
   this.changeRank = function (){  //this is not the same as set rank because this assumes the section exists
       this.setRank(document.getElementById("advantageRank"+this.rowIndex).value);
       document.getElementById("advantageRank"+this.rowIndex).value=rank;
       if(costPerRank!=1) document.getElementById("advantageRowTotal"+this.rowIndex).value=this.totalCost;
   };
    this.getRank = function (){return rank;};
   this.setRank = function (rankGiven){
       if(selectIndex==0){alert("Unknown: Advantage.setRank("+this.rowIndex+"); Has selectedIndex == 0"); return;}
       if(!hasRank) return;  //can only happen when loading
       rank=sanitizeNumber(rankGiven, 1, 1);
       var maxRanks=AdvantageList.allAdvantagesMaxRanks.get(this.name);
       if(maxRanks!=-1 && rank > maxRanks) rank = maxRanks;
       this.totalCost=costPerRank*rank;
   };
   this.changeText = function (){
       this.setText(document.getElementById("advantageText"+this.rowIndex).value);
       document.getElementById("advantageText"+this.rowIndex).value=text;
   };
    this.getText = function (){return text;};
   this.setText = function (textGiven){
       if(selectIndex==0){alert("Unknown: Advantage.setText("+this.rowIndex+"); Has selectedIndex == 0"); return;}
       if(!hasText) return;  //can only happen when loading
       text=textGiven.trim();
   };
   this.getUniqueName = function (){
       if(hasText) return this.name+": "+text;
       return this.name;
   };
   this.setValues = function (){  //can only be and is only called after the advantage section has been generated
       document.getElementById("advantageChoices"+this.rowIndex).selectedIndex=selectIndex;
       //display none is default but needs to be set here in case of select change
       if(hasRank){document.getElementById("advantageRankHolder"+this.rowIndex).style.display="inline"; document.getElementById("advantageRank"+this.rowIndex).value=rank;}
       else document.getElementById("advantageRankHolder"+this.rowIndex).style.display="none";
       if(hasText){document.getElementById("advantageTextHolder"+this.rowIndex).style.display="inline"; document.getElementById("advantageText"+this.rowIndex).value=text;}
       else document.getElementById("advantageTextHolder"+this.rowIndex).style.display="none";
       if(costPerRank!=1 && selectIndex!=0){document.getElementById("advantageRowTotalHolder"+this.rowIndex).style.display="inline"; document.getElementById("advantageRowTotal"+this.rowIndex).innerHTML=this.totalCost;}
       else document.getElementById("advantageRowTotalHolder"+this.rowIndex).style.display="none";
   };
}
