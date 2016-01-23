Tester.powerRow={};
Tester.powerRow.testAll=function(isFirst){TesterUtility.testAll(this, isFirst);};
Tester.powerRow.data={setUp: Tester.data.beforeAll};
Tester.powerRow.disableValidationForActivationInfo=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var dataToLoad;
    var testResults=[];
    var actionTaken='N/A';
    //these tests are things that wouldn't be valid if loaded in order: action, range, duration

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Close","duration":"Sustained",
       "Modifiers":[{"name":"Affects Others Only"}],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Personal to close Range: Effect'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Action: actionTaken, Description: 'Personal to close Range: 1 row'});
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Personal to close Range: getRange'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"None","range":"Personal","duration":"Permanent",
       "Modifiers":[{"name":"Increased Duration","applications":2}],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Action None: Effect'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Action: actionTaken, Description: 'Action None: 1 row'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Action None: getAction'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.powerRow.disableValidationForActivationInfo', testResults, isFirst);
};
Tester.powerRow.validateActivationInfo=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var dataToLoad;
    var testResults=[];
    var actionTaken='N/A';

    Main.setMockMessenger(Messages.errorCapture);

    //none of these tests will have modifiers because they should be ignored and recreated
    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"None","range":"Personal","duration":"Permanent","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Valid 1: power was loaded'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Valid 1: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Valid 1: getRange'});
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Valid 1: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Action: actionTaken, Description: 'Valid 1: no errors'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Valid 2: power was loaded'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Valid 2: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Valid 2: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Valid 2: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Action: actionTaken, Description: 'Valid 2: no errors'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Teleport","text":"","action":"Move","range":"Personal","duration":"Instant","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Teleport', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Valid 3: power was loaded'});
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Valid 3: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Valid 3: getRange'});
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Valid 3: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Action: actionTaken, Description: 'Valid 3: no errors'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Close","duration":"Sustained","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Valid 4: power was loaded'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Valid 4: getAction'});
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Valid 4: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Valid 4: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Action: actionTaken, Description: 'Valid 4: no errors'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Teleport","text":"","action":"Move","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Teleport', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Valid 5: power was loaded'});
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Valid 5: getAction'});
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Valid 5: getRange'});
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Valid 5: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Action: actionTaken, Description: 'Valid 5: no errors'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"None","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Change action 1: power was loaded'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Change action 1: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Change action 1: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Change action 1: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.notNone'), Action: actionTaken, Description: 'Change action 1: error'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Teleport","text":"","action":"None","range":"Personal","duration":"Instant","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Teleport', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Change action 2: power was loaded'});
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Change action 2: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Change action 2: getRange'});
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Change action 2: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.notNone'), Action: actionTaken, Description: 'Change action 2: error'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"None","range":"Close","duration":"Sustained","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Change action 3: power was loaded'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Change action 3: getAction'});
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Change action 3: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Change action 3: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.notNone'), Action: actionTaken, Description: 'Change action 3: error'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Teleport","text":"","action":"None","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Teleport', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Change action 4: power was loaded'});
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Change action 4: getAction'});
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Change action 4: getRange'});
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Change action 4: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.notNone'), Action: actionTaken, Description: 'Change action 4: error'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Permanent","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Change action to none: power was loaded'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Change action to none: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Change action to none: getRange'});
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Change action to none: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.onlyNone'), Action: actionTaken, Description: 'Change action to none: error'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Create","text":"","action":"Standard","range":"Ranged","duration":"Permanent","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Create', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Change duration: power was loaded'});
    testResults.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Change duration: getAction'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Change duration: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Change duration: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.notPermanent'), Action: actionTaken, Description: 'Change duration: error'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Create","text":"","action":"None","range":"Ranged","duration":"Permanent","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Create', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Change both: power was loaded'});
    testResults.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Change both: getAction'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Change both: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Change both: getDuration'});
    testResults.push({Expected: true,
       Actual: Messages.isOnlyErrorCodes(['PowerObjectAgnostic.validateActivationInfo.notPermanent', 'PowerObjectAgnostic.validateActivationInfo.notNone']),
       Action: actionTaken, Description: 'Change both: error'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Create","text":"","action":"invalid action","range":"Ranged","duration":"Permanent","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Create', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Action does not exist: power was loaded'});
    testResults.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Action does not exist: getAction'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Action does not exist: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Action does not exist: getDuration'});
    testResults.push({Expected: true,
       Actual: Messages.isOnlyErrorCodes(['PowerObjectAgnostic.setAction.notExist', 'PowerObjectAgnostic.validateActivationInfo.notPermanent']),
       Action: actionTaken, Description: 'Action does not exist: error'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"invalid range","duration":"Permanent","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Range does not exist: power was loaded'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Range does not exist: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Range does not exist: getRange'});
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Range does not exist: getDuration'});
    testResults.push({Expected: true,
       Actual: Messages.isOnlyErrorCodes(['PowerObjectAgnostic.setRange.notExist', 'PowerObjectAgnostic.validateActivationInfo.onlyNone']),
       Action: actionTaken, Description: 'Range does not exist: error'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Protection","text":"","action":"Free","range":"Personal","duration":"invalid duration","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Protection', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Duration does not exist: power was loaded'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Duration does not exist: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Duration does not exist: getRange'});
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Duration does not exist: getDuration'});
    testResults.push({Expected: true,
       Actual: Messages.isOnlyErrorCodes(['PowerObjectAgnostic.setDuration.notExist', 'PowerObjectAgnostic.validateActivationInfo.onlyNone']),
       Action: actionTaken, Description: 'Duration does not exist: error'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Create","text":"","action":"Standard","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Create', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Can\'t change to personal: power was loaded'});
    testResults.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Can\'t change to personal: getAction'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Can\'t change to personal: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Can\'t change to personal: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.notPersonal'), Action: actionTaken, Description: 'Can\'t change to personal: error'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Create","text":"","action":"Standard","range":"Ranged","duration":"Instant","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Create', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Can\'t change to Instant: power was loaded'});
    testResults.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Can\'t change to Instant: getAction'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Can\'t change to Instant: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Can\'t change to Instant: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.notInstant'), Action: actionTaken, Description: 'Can\'t change to Instant: error'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Teleport","text":"","action":"Move","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Teleport', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Can\'t change from Instant: power was loaded'});
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Can\'t change from Instant: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Can\'t change from Instant: getRange'});
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Can\'t change from Instant: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.onlyInstant'), Action: actionTaken, Description: 'Can\'t change from Instant: error'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    //next redo most of the tests for Feature
    //because although Feature is special these tests still apply

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"None","range":"Personal","duration":"Permanent","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Feature Valid 1: power was loaded'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature Valid 1: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Feature Valid 1: getRange'});
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature Valid 1: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Action: actionTaken, Description: 'Feature Valid 1: no errors'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Feature Valid 2: power was loaded'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature Valid 2: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Feature Valid 2: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature Valid 2: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Action: actionTaken, Description: 'Feature Valid 2: no errors'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Move","range":"Personal","duration":"Instant","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Feature Valid 3: power was loaded'});
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature Valid 3: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Feature Valid 3: getRange'});
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature Valid 3: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Action: actionTaken, Description: 'Feature Valid 3: no errors'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"Close","duration":"Sustained","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Feature Valid 4: power was loaded'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature Valid 4: getAction'});
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Feature Valid 4: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature Valid 4: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Action: actionTaken, Description: 'Feature Valid 4: no errors'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Move","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Feature Valid 5: power was loaded'});
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature Valid 5: getAction'});
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Feature Valid 5: getRange'});
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature Valid 5: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Action: actionTaken, Description: 'Feature Valid 5: no errors'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"None","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Feature Change action 1: power was loaded'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature Change action 1: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Feature Change action 1: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature Change action 1: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.notNone'), Action: actionTaken, Description: 'Feature Change action 1: error'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"None","range":"Personal","duration":"Instant","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Feature Change action 2: power was loaded'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature Change action 2: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Feature Change action 2: getRange'});
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature Change action 2: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.notNone'), Action: actionTaken, Description: 'Feature Change action 2: error'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"None","range":"Close","duration":"Sustained","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Feature Change action 3: power was loaded'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature Change action 3: getAction'});
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Feature Change action 3: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature Change action 3: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.notNone'), Action: actionTaken, Description: 'Feature Change action 3: error'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"None","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Feature Change action 4: power was loaded'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature Change action 4: getAction'});
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Feature Change action 4: getRange'});
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature Change action 4: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.notNone'), Action: actionTaken, Description: 'Feature Change action 4: error'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"Personal","duration":"Permanent","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Feature Change action to none: power was loaded'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature Change action to none: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Feature Change action to none: getRange'});
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature Change action to none: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.onlyNone'), Action: actionTaken, Description: 'Feature Change action to none: error'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Standard","range":"Ranged","duration":"Permanent","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Feature Change duration: power was loaded'});
    testResults.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature Change duration: getAction'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Feature Change duration: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature Change duration: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.notPermanent'), Action: actionTaken, Description: 'Feature Change duration: error'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"None","range":"Ranged","duration":"Permanent","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Feature Change both: power was loaded'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature Change both: getAction'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Feature Change both: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature Change both: getDuration'});
    testResults.push({Expected: true,
       Actual: Messages.isOnlyErrorCodes(['PowerObjectAgnostic.validateActivationInfo.notPermanent', 'PowerObjectAgnostic.validateActivationInfo.notNone']),
       Action: actionTaken, Description: 'Feature Change both: error'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"invalid action","range":"Ranged","duration":"Permanent","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Feature Action does not exist: power was loaded'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature Action does not exist: getAction'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Feature Action does not exist: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature Action does not exist: getDuration'});
    testResults.push({Expected: true,
       Actual: Messages.isOnlyErrorCodes(['PowerObjectAgnostic.setAction.notExist', 'PowerObjectAgnostic.validateActivationInfo.notPermanent', 'PowerObjectAgnostic.validateActivationInfo.notNone']),
       Action: actionTaken, Description: 'Feature Action does not exist: error'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"invalid range","duration":"Permanent","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Feature Range does not exist: power was loaded'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature Range does not exist: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Feature Range does not exist: getRange'});
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature Range does not exist: getDuration'});
    testResults.push({Expected: true,
       Actual: Messages.isOnlyErrorCodes(['PowerObjectAgnostic.setRange.notExist', 'PowerObjectAgnostic.validateActivationInfo.onlyNone']),
       Action: actionTaken, Description: 'Feature Range does not exist: error'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"Personal","duration":"invalid duration","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Feature Duration does not exist: power was loaded'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature Duration does not exist: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Feature Duration does not exist: getRange'});
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature Duration does not exist: getDuration'});
    testResults.push({Expected: true,
       Actual: Messages.isOnlyErrorCodes(['PowerObjectAgnostic.setDuration.notExist', 'PowerObjectAgnostic.validateActivationInfo.onlyNone']),
       Action: actionTaken, Description: 'Feature Duration does not exist: error'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Standard","range":"Ranged","duration":"Instant","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Feature Can change to Instant on load: power was loaded'});
    testResults.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature Can change to Instant on load: getAction'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Feature Can change to Instant on load: getRange'});
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature Can change to Instant on load: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Action: actionTaken, Description: 'Feature Can change to Instant on load: no errors'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    Main.clearMockMessenger();  //restore default behavior
    TesterUtility.displayResults('Tester.powerRow.validateActivationInfo', testResults, isFirst);
};
Tester.powerRow.setDuration=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var testResults=[], actionTaken='N/A';

    //TODO: test that the gui doesn't allow instant for non-feature. and none, personal, permanent
    try{
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectDuration0', 'Instant');
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Feature Can change to Instant: power'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature Can change to Instant: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Feature Can change to Instant: getRange'});
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature Can change to Instant: getDuration'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Feature Can change from Instant: power'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature Can change from Instant: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Feature Can change from Instant: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature Can change from Instant: getDuration'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('powerChoices0', 'Flight');
    SelectUtil.changeText('powerSelectDuration0', 'Permanent');
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Change to permanent (non-permanent default): power'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Change to permanent (non-permanent default): getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Change to permanent (non-permanent default): getRange'});
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Change to permanent (non-permanent default): getDuration'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Change from permanent (non-permanent default): getAction'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Change from permanent (non-permanent default): getDuration'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('powerChoices0', 'Protection');
    SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: 'Protection', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Change from permanent (permanent default): power'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Change from permanent (permanent default): getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Change from permanent (permanent default): getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Change from permanent (permanent default): getDuration'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('powerSelectDuration0', 'Permanent');
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Change to permanent (permanent default): getAction'});
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Change to permanent (permanent default): getDuration'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.powerRow.setDuration', testResults, isFirst);
};
Tester.powerRow.updateDurationModifiers=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var testResults=[], actionTaken='N/A';

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature does\'t auto gain Increased Duration: getDuration'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Feature does\'t auto gain Increased Duration: before is blank'});
    SelectUtil.changeText('powerSelectDuration0', 'Continuous');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Feature does\'t auto gain Increased Duration: after is still blank'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Feature does\'t auto gain Decreased Duration: before is blank'});
    SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Feature does\'t auto gain Decreased Duration: after is still blank'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('powerChoices0', 'Flight'); SelectUtil.changeText('powerSelectDuration0', 'Continuous');
    testResults.push({Expected: 'Continuous', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Increased Duration: duration'});
    testResults.push({Expected: 'Increased Duration', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Increased Duration: was auto created'});
    testResults.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Action: actionTaken, Description: 'Increased Duration: is rank 1'});

    SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Increased Duration: setting the duration back'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Increased Duration: was auto removed'});

    SelectUtil.changeText('powerSelectDuration0', 'Continuous'); SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    testResults.push({Expected: 'Concentration', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Increased Duration: setting duration up then down'});
    testResults.push({Expected: 'Decreased Duration', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Increased Duration: was auto replaced with Decreased Duration'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Action: actionTaken, Description: 'Increased Duration: was in fact removed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Flight'); SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    testResults.push({Expected: 'Concentration', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Decreased Duration: duration'});
    testResults.push({Expected: 'Decreased Duration', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Decreased Duration: was auto created'});
    testResults.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Action: actionTaken, Description: 'Decreased Duration: is rank 1'});

    SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Decreased Duration: setting the duration back'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Decreased Duration: was auto removed'});

    SelectUtil.changeText('powerSelectDuration0', 'Concentration'); SelectUtil.changeText('powerSelectDuration0', 'Continuous');
    testResults.push({Expected: 'Continuous', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Decreased Duration: setting duration up then down'});
    testResults.push({Expected: 'Increased Duration', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Decreased Duration: was auto replaced with Increased Duration'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Action: actionTaken, Description: 'Decreased Duration: was in fact removed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.powerRow.updateDurationModifiers', testResults, isFirst);
};
Tester.powerRow.setPower=function(isFirst)
{
    return;  //remove this when actual tests exist. ADD TESTS
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TesterUtility.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.powerRow.setPower', testResults, isFirst);
};
Tester.powerRow.updateActionModifiers=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    //testing for setting to None exists in setDuration tests
    var testResults=[], actionTaken='N/A';

    try{
    SelectUtil.changeText('powerChoices0', 'Teleport'); SelectUtil.changeText('powerSelectAction0', 'Reaction');
    testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Faster Action: action'});
    testResults.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Faster Action: was auto created'});
    testResults.push({Expected: 2, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Action: actionTaken, Description: 'Faster Action: rank'});

    SelectUtil.changeText('powerSelectAction0', 'Move');
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Faster Action: setting the action back'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Faster Action: was auto removed'});

    SelectUtil.changeText('powerSelectAction0', 'Reaction'); SelectUtil.changeText('powerSelectAction0', 'Full');
    testResults.push({Expected: 'Full', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Faster Action: setting action up then down'});
    testResults.push({Expected: 'Slower Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Faster Action: was auto replaced with Slower Action'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Action: actionTaken, Description: 'Faster Action: was in fact removed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('powerSelectAction0', 'Full');
    testResults.push({Expected: 'Full', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Slower Action: action'});
    testResults.push({Expected: 'Slower Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Slower Action: was auto created'});
    testResults.push({Expected: 2, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Action: actionTaken, Description: 'Slower Action: is rank 1'});

    SelectUtil.changeText('powerSelectAction0', 'Move');
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Slower Action: setting the action back'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Slower Action: was auto removed'});

    SelectUtil.changeText('powerSelectAction0', 'Full'); SelectUtil.changeText('powerSelectAction0', 'Reaction');
    testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Slower Action: setting action down then up'});
    testResults.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Slower Action: was auto replaced with Faster Action'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Action: actionTaken, Description: 'Slower Action: was in fact removed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('powerSelectAction0', 'Triggered');
    testResults.push({Expected: 'Triggered', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Add Selective: action'});
    testResults.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Add Selective: Faster Action was auto created'});
    testResults.push({Expected: 3, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Action: actionTaken, Description: 'Add Selective: Faster Action rank 3'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0, 1).getName(), Action: actionTaken, Description: 'Add Selective: Selective was auto created'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('powerSelectAction0', 'Move');
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Keep Selective: action'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Keep Selective: Selective still there'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Action: actionTaken, Description: 'Keep Selective: no other modifiers'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('powerSelectAction0', 'Triggered');
    testResults.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Only 1 Selective: Faster Action was auto created'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0, 1).getName(), Action: actionTaken, Description: 'Only 1 Selective: Selective still there'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 2).isBlank(), Action: actionTaken, Description: 'Only 1 Selective: no other modifiers'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature doesn\'t auto gain Faster Action: getAction'});
    SelectUtil.changeText('powerSelectAction0', 'Reaction');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Feature doesn\'t auto gain Faster Action: after'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    SelectUtil.changeText('powerSelectAction0', 'Slow');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Feature doesn\'t auto gain Slower Action: after'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    SelectUtil.changeText('powerSelectAction0', 'Triggered');
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Feature auto gains Selective: Selective added'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Action: actionTaken, Description: 'Feature auto gains Selective: no other modifiers'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.powerRow.updateActionModifiers', testResults, isFirst);
};
Tester.powerRow.setRange=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var testResults=[], actionTaken='N/A';

    try{
    SelectUtil.changeText('powerChoices0', 'Damage');
    testResults.push({Expected: 'Damage', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Change to Perception: power'});
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Change to Perception: getRange before'});
    testResults.push({Expected: 'Power 1 Damage', Actual: Main.powerSection.getRow(0).getName(), Action: actionTaken, Description: 'Change to Perception: getName before'});
    testResults.push({Expected: 'Skill used for attack', Actual: Main.powerSection.getRow(0).getSkillUsed(), Action: actionTaken, Description: 'Change to Perception: getSkillUsed before'});

    SelectUtil.changeText('powerSelectRange0', 'Perception');
    testResults.push({Expected: 'Perception', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Change to Perception: getRange after'});
    testResults.push({Expected: 'Power 1 Damage', Actual: Main.powerSection.getRow(0).getName(), Action: actionTaken, Description: 'Change to Perception: getName after'});
    testResults.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getSkillUsed(), Action: actionTaken, Description: 'Change to Perception: getSkillUsed after'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('powerSelectRange0', 'Close');
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Change from Perception: getRange'});
    testResults.push({Expected: 'Power 1 Damage', Actual: Main.powerSection.getRow(0).getName(), Action: actionTaken, Description: 'Change from Perception: getName'});
    testResults.push({Expected: 'Skill used for attack', Actual: Main.powerSection.getRow(0).getSkillUsed(), Action: actionTaken, Description: 'Change from Perception: getSkillUsed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('powerChoices0', 'Protection');
    testResults.push({Expected: 'Protection', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Change from personal: power'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Change from personal: getAction before'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Change from personal: getRange before'});
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Change from personal: getDuration before'});

    SelectUtil.changeText('powerModifierChoices0.0', 'Affects Others Only');
    testResults.push({Expected: 'Affects Others Only', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Change from personal: modifier'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Action: actionTaken, Description: 'Change from personal: no other modifiers'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Change from personal: getAction after'});
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Change from personal: getRange after'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Change from personal: getDuration after'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('powerSelectAction0', 'Move');
    SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    SelectUtil.changeText('powerModifierChoices0.2', 'Select One');  //removes Affects Others (first 2 are for action and duration)
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Change to personal changes nothing: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Change to personal changes nothing: getRange'});
    testResults.push({Expected: 'Concentration', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Change to personal changes nothing: getDuration'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('powerChoices0', 'Feature');
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Action: actionTaken, Description: 'Feature change from personal: power'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature change from personal: getAction before'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Feature change from personal: getRange before'});
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature change from personal: getDuration before'});

    SelectUtil.changeText('powerSelectRange0', 'Ranged');
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature change from personal: getAction after'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Feature change from personal: getRange after'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature change from personal: getDuration after'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectRange0', 'Ranged');
    SelectUtil.changeText('powerSelectAction0', 'Move');
    SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    SelectUtil.changeText('powerSelectRange0', 'Personal');  //must be last here
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Action: actionTaken, Description: 'Feature change to personal changes nothing: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Feature change to personal changes nothing: getRange'});
    testResults.push({Expected: 'Concentration', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Feature change to personal changes nothing: getDuration'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.powerRow.setRange', testResults, isFirst);
};
Tester.powerRow.updateRangeModifiers=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var testResults=[], actionTaken='N/A';

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Feature does\'t auto gain Increased Range: before is blank'});
    SelectUtil.changeText('powerSelectRange0', 'Ranged');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Feature does\'t auto gain Increased Range: after is still blank'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}
    //can't test 'Feature does\'t auto gain Decreased Range' because Feature's default range is Personal

    try{
    SelectUtil.changeText('powerChoices0', 'Move Object'); SelectUtil.changeText('powerSelectRange0', 'Perception');
    testResults.push({Expected: 'Perception', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Increased Range: range'});
    testResults.push({Expected: 'Increased Range', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Increased Range: was auto created'});
    testResults.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Action: actionTaken, Description: 'Increased Range: is rank 1'});

    SelectUtil.changeText('powerSelectRange0', 'Ranged');
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Increased Range: setting the range back'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Increased Range: was auto removed'});

    SelectUtil.changeText('powerSelectRange0', 'Perception'); SelectUtil.changeText('powerSelectRange0', 'Close');
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Increased Range: setting range up then down'});
    testResults.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Increased Range: was auto replaced with Reduced Range'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Action: actionTaken, Description: 'Increased Range: was in fact removed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    try{
    SelectUtil.changeText('powerSelectRange0', 'Close');
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Reduced Range: range'});
    testResults.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Reduced Range: was auto created'});
    testResults.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Action: actionTaken, Description: 'Reduced Range: is rank 1'});

    SelectUtil.changeText('powerSelectRange0', 'Ranged');
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Reduced Range: setting the range back'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Action: actionTaken, Description: 'Reduced Range: was auto removed'});

    SelectUtil.changeText('powerSelectRange0', 'Close'); SelectUtil.changeText('powerSelectRange0', 'Perception');
    testResults.push({Expected: 'Perception', Actual: Main.powerSection.getRow(0).getRange(), Action: actionTaken, Description: 'Reduced Range: setting range down then up'});
    testResults.push({Expected: 'Increased Range', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Action: actionTaken, Description: 'Reduced Range: was auto replaced with Increased Range'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Action: actionTaken, Description: 'Reduced Range: was in fact removed'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.powerRow.updateRangeModifiers', testResults, isFirst);
};
Tester.powerRow.calculateValues=function(isFirst)
{
    return;  //remove this when actual tests exist. ADD TESTS
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TesterUtility.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.powerRow.calculateValues', testResults, isFirst);
};
Tester.powerRow.generate=function(isFirst)
{
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Set Damage';
    try{
    SelectUtil.changeText('powerChoices0', 'Damage');
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Action: actionTaken, Description: 'Damage has a default duration of Instant'});
    testResults.push({Expected: false, Actual: SelectUtil.isSelect('powerSelectDuration0'), Action: actionTaken, Description: 'The user can\'t change the duration'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}
    //ADD TESTS
    //TODO: Tester sections should exist for generate and set all so that the gui logic is tested

    TesterUtility.displayResults('Tester.powerRow.generate', testResults, isFirst);

    return;
    Tester.powerRow.setDuration(isFirst, 'equipment');

    if(sectionName === undefined) sectionName='power';
    SelectUtil.changeText(sectionName+'Choices0', 'Damage');
    Main[sectionName+'Section'].getRow(0).getDuration();
    TesterUtility.displayResults('Tester.'+sectionName+'Row.setDuration', testResults, isFirst);
};
Tester.powerRow.setValues=function(isFirst)
{
    return;  //remove this when actual tests exist. ADD TESTS
    TesterUtility.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TesterUtility.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Action: actionTaken, Description: 'Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Action: actionTaken});}

    TesterUtility.displayResults('Tester.powerRow.setValues', testResults, isFirst);
};
