//this file is currently not used
function UpdateMediator(sectionPointer, fieldName)
{
   switch (sectionPointer)
   {
      case Main.abilitySection:
      {
          this.calculateValues();
          Main.skillSection.calculateValues();
          Main.skillSection.generate();
          Main.updateInitiative();
          Main.updateOffense();
          Main.defenseSection.calculateValues();
          Main.update();  //updates totals and power level
          break;
      }
      case Main.advantageSection:
      {
          if(fieldName === 'text') return;  //ignore text updates
          Main.updateInitiative();
          Main.updateOffense();  //some old advantages might affect this so it needs to be updated
          Main.defenseSection.calculateValues();
          break;
      }
      case Main.equipmentSection:
      {
          Main.advantageSection.calculateValues();  //in case of too low or too high equipment advantage rank
          Main.advantageSection.generate();  //in case a new equipment row needs to be added (or removed)
          //do not call advantageSection.update. It isn't needed: equipment doesn't affect defense and the rest is covered below
          /* falls through */
      }
      case Main.powerSection:
      {
          Main.updateOffense();
          Main.defenseSection.calculateValues();
          break;
      }
      case Main.skillSection:
      {
          Main.updateOffense();
          break;
      }
      case Main:
      {
         if (fieldName === 'transcendence')
         {
             Main.powerSection.update();  //transcendence changed so update these
             Main.advantageSection.update();
         }
          throw new Error('Main default bug: '+fieldName);
          //break;
      }
      default:
      {
          throw new Error('Default bug: '+fieldName);
      }
   }
}
