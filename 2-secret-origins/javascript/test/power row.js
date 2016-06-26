TestSuite.powerRow={};
TestSuite.powerRow.disableValidationForActivationInfo=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var dataToLoad;
    var testResults=[];
    //these tests are things that wouldn't be valid if loaded in order: action, range, duration

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Close","duration":"Sustained",
       "Modifiers":[{"name":"Affects Others Only"}],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Personal to close Range: Effect'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Personal to close Range: 1 row'});
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Personal to close Range: getRange'});
    } catch(e){testResults.push({Error: e, Description: 'Personal to close Range'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"None","range":"Personal","duration":"Permanent",
       "Modifiers":[{"name":"Increased Duration","applications":2}],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Action None: Effect'});
    testResults.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Action None: 1 row'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Action None: getAction'});
    } catch(e){testResults.push({Error: e, Description: 'Action None'});}

    return TestRunner.displayResults('TestSuite.powerRow.disableValidationForActivationInfo', testResults, isFirst);
};
TestSuite.powerRow.validateActivationInfo=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var dataToLoad;
    var testResults=[];

    Main.setMockMessenger(Messages.errorCapture);

    //none of these tests will have modifiers because they should be ignored and recreated
    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"None","range":"Personal","duration":"Permanent","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Valid 1: power was loaded'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Valid 1: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Valid 1: getRange'});
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Valid 1: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Description: 'Valid 1: no errors'});
    } catch(e){testResults.push({Error: e, Description: 'Valid 1'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Valid 2: power was loaded'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Valid 2: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Valid 2: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Valid 2: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Description: 'Valid 2: no errors'});
    } catch(e){testResults.push({Error: e, Description: 'Valid 2'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Teleport","text":"","action":"Move","range":"Personal","duration":"Instant","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Teleport', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Valid 3: power was loaded'});
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Valid 3: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Valid 3: getRange'});
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Valid 3: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Description: 'Valid 3: no errors'});
    } catch(e){testResults.push({Error: e, Description: 'Valid 3'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Close","duration":"Sustained","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Valid 4: power was loaded'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Valid 4: getAction'});
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Valid 4: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Valid 4: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Description: 'Valid 4: no errors'});
    } catch(e){testResults.push({Error: e, Description: 'Valid 4'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Teleport","text":"","action":"Move","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Teleport', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Valid 5: power was loaded'});
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Valid 5: getAction'});
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Valid 5: getRange'});
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Valid 5: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Description: 'Valid 5: no errors'});
    } catch(e){testResults.push({Error: e, Description: 'Valid 5'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"None","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Change action 1: power was loaded'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change action 1: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change action 1: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change action 1: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.notNone'), Description: 'Change action 1: error'});
    } catch(e){testResults.push({Error: e, Description: 'Change action 1'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Teleport","text":"","action":"None","range":"Personal","duration":"Instant","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Teleport', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Change action 2: power was loaded'});
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change action 2: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change action 2: getRange'});
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change action 2: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.notNone'), Description: 'Change action 2: error'});
    } catch(e){testResults.push({Error: e, Description: 'Change action 2'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"None","range":"Close","duration":"Sustained","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Change action 3: power was loaded'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change action 3: getAction'});
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change action 3: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change action 3: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.notNone'), Description: 'Change action 3: error'});
    } catch(e){testResults.push({Error: e, Description: 'Change action 3'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Teleport","text":"","action":"None","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Teleport', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Change action 4: power was loaded'});
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change action 4: getAction'});
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change action 4: getRange'});
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change action 4: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.notNone'), Description: 'Change action 4: error'});
    } catch(e){testResults.push({Error: e, Description: 'Change action 4'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Permanent","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Change action to none: power was loaded'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change action to none: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change action to none: getRange'});
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change action to none: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.onlyNone'), Description: 'Change action to none: error'});
    } catch(e){testResults.push({Error: e, Description: 'Change action to none'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Create","text":"","action":"Standard","range":"Ranged","duration":"Permanent","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Create', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Change duration: power was loaded'});
    testResults.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change duration: getAction'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change duration: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change duration: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.notPermanent'), Description: 'Change duration: error'});
    } catch(e){testResults.push({Error: e, Description: 'Change duration'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Create","text":"","action":"None","range":"Ranged","duration":"Permanent","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Create', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Change both: power was loaded'});
    testResults.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change both: getAction'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change both: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change both: getDuration'});
    testResults.push({Expected: true,
       Actual: Messages.isOnlyErrorCodes(['PowerObjectAgnostic.validateActivationInfo.notPermanent', 'PowerObjectAgnostic.validateActivationInfo.notNone']),
       Description: 'Change both: error'});
    } catch(e){testResults.push({Error: e, Description: 'Change both'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Create","text":"","action":"invalid action","range":"Ranged","duration":"Permanent","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Create', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Action does not exist: power was loaded'});
    testResults.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Action does not exist: getAction'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Action does not exist: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Action does not exist: getDuration'});
    testResults.push({Expected: true,
       Actual: Messages.isOnlyErrorCodes(['PowerObjectAgnostic.setAction.notExist', 'PowerObjectAgnostic.validateActivationInfo.notPermanent']),
       Description: 'Action does not exist: error'});
    } catch(e){testResults.push({Error: e, Description: 'Action does not exist'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"invalid range","duration":"Permanent","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Range does not exist: power was loaded'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Range does not exist: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Range does not exist: getRange'});
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Range does not exist: getDuration'});
    testResults.push({Expected: true,
       Actual: Messages.isOnlyErrorCodes(['PowerObjectAgnostic.setRange.notExist', 'PowerObjectAgnostic.validateActivationInfo.onlyNone']),
       Description: 'Range does not exist: error'});
    } catch(e){testResults.push({Error: e, Description: 'Range does not exist'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Protection","text":"","action":"Free","range":"Personal","duration":"invalid duration","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Protection', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Duration does not exist: power was loaded'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Duration does not exist: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Duration does not exist: getRange'});
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Duration does not exist: getDuration'});
    testResults.push({Expected: true,
       Actual: Messages.isOnlyErrorCodes(['PowerObjectAgnostic.setDuration.notExist', 'PowerObjectAgnostic.validateActivationInfo.onlyNone']),
       Description: 'Duration does not exist: error'});
    } catch(e){testResults.push({Error: e, Description: 'Duration does not exist'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Create","text":"","action":"Standard","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Create', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Can\'t change to personal: power was loaded'});
    testResults.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Can\'t change to personal: getAction'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Can\'t change to personal: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Can\'t change to personal: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.notPersonal'), Description: 'Can\'t change to personal: error'});
    } catch(e){testResults.push({Error: e, Description: 'Can\'t change to personal'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Create","text":"","action":"Standard","range":"Ranged","duration":"Instant","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Create', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Can\'t change to Instant: power was loaded'});
    testResults.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Can\'t change to Instant: getAction'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Can\'t change to Instant: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Can\'t change to Instant: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.notInstant'), Description: 'Can\'t change to Instant: error'});
    } catch(e){testResults.push({Error: e, Description: 'Can\'t change to Instant'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Teleport","text":"","action":"Move","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Teleport', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Can\'t change from Instant: power was loaded'});
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Can\'t change from Instant: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Can\'t change from Instant: getRange'});
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Can\'t change from Instant: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.onlyInstant'), Description: 'Can\'t change from Instant: error'});
    } catch(e){testResults.push({Error: e, Description: 'Can\'t change from Instant'});}

    //next redo most of the tests for Feature
    //because although Feature is special these tests still apply

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"None","range":"Personal","duration":"Permanent","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Valid 1: power was loaded'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Valid 1: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Valid 1: getRange'});
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Valid 1: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Description: 'Feature Valid 1: no errors'});
    } catch(e){testResults.push({Error: e, Description: 'Feature Valid 1'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Valid 2: power was loaded'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Valid 2: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Valid 2: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Valid 2: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Description: 'Feature Valid 2: no errors'});
    } catch(e){testResults.push({Error: e, Description: 'Feature Valid 2'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Move","range":"Personal","duration":"Instant","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Valid 3: power was loaded'});
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Valid 3: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Valid 3: getRange'});
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Valid 3: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Description: 'Feature Valid 3: no errors'});
    } catch(e){testResults.push({Error: e, Description: 'Feature Valid 3'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"Close","duration":"Sustained","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Valid 4: power was loaded'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Valid 4: getAction'});
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Valid 4: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Valid 4: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Description: 'Feature Valid 4: no errors'});
    } catch(e){testResults.push({Error: e, Description: 'Feature Valid 4'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Move","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Valid 5: power was loaded'});
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Valid 5: getAction'});
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Valid 5: getRange'});
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Valid 5: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Description: 'Feature Valid 5: no errors'});
    } catch(e){testResults.push({Error: e, Description: 'Feature Valid 5'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"None","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Change action 1: power was loaded'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Change action 1: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Change action 1: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Change action 1: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.notNone'), Description: 'Feature Change action 1: error'});
    } catch(e){testResults.push({Error: e, Description: 'Feature Change action 1'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"None","range":"Personal","duration":"Instant","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Change action 2: power was loaded'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Change action 2: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Change action 2: getRange'});
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Change action 2: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.notNone'), Description: 'Feature Change action 2: error'});
    } catch(e){testResults.push({Error: e, Description: 'Feature Change action 2'}});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"None","range":"Close","duration":"Sustained","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Change action 3: power was loaded'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Change action 3: getAction'});
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Change action 3: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Change action 3: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.notNone'), Description: 'Feature Change action 3: error'});
    } catch(e){testResults.push({Error: e, Description: 'Feature Change action 3'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"None","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Change action 4: power was loaded'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Change action 4: getAction'});
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Change action 4: getRange'});
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Change action 4: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.notNone'), Description: 'Feature Change action 4: error'});
    } catch(e){testResults.push({Error: e, Description: 'Feature Change action 4'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"Personal","duration":"Permanent","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Change action to none: power was loaded'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Change action to none: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Change action to none: getRange'});
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Change action to none: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.onlyNone'), Description: 'Feature Change action to none: error'});
    } catch(e){testResults.push({Error: e, Description: 'Feature Change action to none'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Standard","range":"Ranged","duration":"Permanent","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Change duration: power was loaded'});
    testResults.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Change duration: getAction'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Change duration: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Change duration: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isOnlyErrorCodes('PowerObjectAgnostic.validateActivationInfo.notPermanent'), Description: 'Feature Change duration: error'});
    } catch(e){testResults.push({Error: e, Description: 'Feature Change duration'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"None","range":"Ranged","duration":"Permanent","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Change both: power was loaded'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Change both: getAction'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Change both: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Change both: getDuration'});
    testResults.push({Expected: true,
       Actual: Messages.isOnlyErrorCodes(['PowerObjectAgnostic.validateActivationInfo.notPermanent', 'PowerObjectAgnostic.validateActivationInfo.notNone']),
       Description: 'Feature Change both: error'});
    } catch(e){testResults.push({Error: e, Description: 'Feature Change both'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"invalid action","range":"Ranged","duration":"Permanent","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Action does not exist: power was loaded'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Action does not exist: getAction'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Action does not exist: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Action does not exist: getDuration'});
    testResults.push({Expected: true,
       Actual: Messages.isOnlyErrorCodes(['PowerObjectAgnostic.setAction.notExist', 'PowerObjectAgnostic.validateActivationInfo.notPermanent', 'PowerObjectAgnostic.validateActivationInfo.notNone']),
       Description: 'Feature Action does not exist: error'});
    } catch(e){testResults.push({Error: e, Description: 'Feature Action does not exist'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"invalid range","duration":"Permanent","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Range does not exist: power was loaded'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Range does not exist: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Range does not exist: getRange'});
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Range does not exist: getDuration'});
    testResults.push({Expected: true,
       Actual: Messages.isOnlyErrorCodes(['PowerObjectAgnostic.setRange.notExist', 'PowerObjectAgnostic.validateActivationInfo.onlyNone']),
       Description: 'Feature Range does not exist: error'});
    } catch(e){testResults.push({Error: e, Description: 'Feature Range does not exist'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"Personal","duration":"invalid duration","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Duration does not exist: power was loaded'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Duration does not exist: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Duration does not exist: getRange'});
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Duration does not exist: getDuration'});
    testResults.push({Expected: true,
       Actual: Messages.isOnlyErrorCodes(['PowerObjectAgnostic.setDuration.notExist', 'PowerObjectAgnostic.validateActivationInfo.onlyNone']),
       Description: 'Feature Duration does not exist: error'});
    } catch(e){testResults.push({Error: e, Description: 'Feature Duration does not exist'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Standard","range":"Ranged","duration":"Instant","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Can change to Instant on load: power was loaded'});
    testResults.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Can change to Instant on load: getAction'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Can change to Instant on load: getRange'});
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Can change to Instant on load: getDuration'});
    testResults.push({Expected: true, Actual: Messages.isValid(), Description: 'Feature Can change to Instant on load: no errors'});
    } catch(e){testResults.push({Error: e, Description: 'Feature Can change to Instant on load'});}

    Main.clearMockMessenger();  //restore default behavior
    return TestRunner.displayResults('TestSuite.powerRow.validateActivationInfo', testResults, isFirst);
};
TestSuite.powerRow.setDuration=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var testResults=[];

    //TODO: test that the gui doesn't allow instant for non-feature. and none, personal, permanent
    try{
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectDuration0', 'Instant');
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Can change to Instant: power'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Can change to Instant: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Can change to Instant: getRange'});
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Can change to Instant: getDuration'});
    } catch(e){testResults.push({Error: e, Description: 'Feature Can change to Instant'});}

    try{
    SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Can change from Instant: power'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Can change from Instant: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Can change from Instant: getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Can change from Instant: getDuration'});
    } catch(e){testResults.push({Error: e, Description: 'Feature Can change from Instant'});}

    try{
    SelectUtil.changeText('powerChoices0', 'Flight');
    SelectUtil.changeText('powerSelectDuration0', 'Permanent');
    testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Change to permanent (non-permanent default): power'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change to permanent (non-permanent default): getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change to permanent (non-permanent default): getRange'});
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change to permanent (non-permanent default): getDuration'});
    } catch(e){testResults.push({Error: e, Description: 'Change to permanent (non-permanent default)'});}

    try{
    SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change from permanent (non-permanent default): getAction'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change from permanent (non-permanent default): getDuration'});
    } catch(e){testResults.push({Error: e, Description: 'Change from permanent (non-permanent default)'});}

    try{
    SelectUtil.changeText('powerChoices0', 'Protection');
    SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: 'Protection', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Change from permanent (permanent default): power'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change from permanent (permanent default): getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change from permanent (permanent default): getRange'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change from permanent (permanent default): getDuration'});
    } catch(e){testResults.push({Error: e, Description: 'Change from permanent (permanent default)'});}

    try{
    SelectUtil.changeText('powerSelectDuration0', 'Permanent');
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change to permanent (permanent default): getAction'});
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change to permanent (permanent default): getDuration'});
    } catch(e){testResults.push({Error: e, Description: 'Change to permanent (permanent default)'});}

    return TestRunner.displayResults('TestSuite.powerRow.setDuration', testResults, isFirst);
};
TestSuite.powerRow.updateDurationModifiers=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var testResults=[];

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature does\'t auto gain Increased Duration: getDuration'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Feature does\'t auto gain Increased Duration: before is blank'});
    SelectUtil.changeText('powerSelectDuration0', 'Continuous');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Feature does\'t auto gain Increased Duration: after is still blank'});
    } catch(e){testResults.push({Error: e, Description: 'Feature does\'t auto gain Increased Duration'});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Feature does\'t auto gain Decreased Duration: before is blank'});
    SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Feature does\'t auto gain Decreased Duration: after is still blank'});
    } catch(e){testResults.push({Error: e, Description: 'Feature does\'t auto gain Decreased Duration'});}

    try{
    SelectUtil.changeText('powerChoices0', 'Flight'); SelectUtil.changeText('powerSelectDuration0', 'Continuous');
    testResults.push({Expected: 'Continuous', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Increased Duration: duration'});
    testResults.push({Expected: 'Increased Duration', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Increased Duration: was auto created'});
    testResults.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Description: 'Increased Duration: is rank 1'});

    SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Increased Duration: setting the duration back'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Increased Duration: was auto removed'});

    SelectUtil.changeText('powerSelectDuration0', 'Continuous'); SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    testResults.push({Expected: 'Concentration', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Increased Duration: setting duration up then down'});
    testResults.push({Expected: 'Decreased Duration', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Increased Duration: was auto replaced with Decreased Duration'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Increased Duration: was in fact removed'});
    } catch(e){testResults.push({Error: e, Description: 'Increased Duration'});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Flight'); SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    testResults.push({Expected: 'Concentration', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Decreased Duration: duration'});
    testResults.push({Expected: 'Decreased Duration', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Decreased Duration: was auto created'});
    testResults.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Description: 'Decreased Duration: is rank 1'});

    SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Decreased Duration: setting the duration back'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Decreased Duration: was auto removed'});

    SelectUtil.changeText('powerSelectDuration0', 'Concentration'); SelectUtil.changeText('powerSelectDuration0', 'Continuous');
    testResults.push({Expected: 'Continuous', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Decreased Duration: setting duration up then down'});
    testResults.push({Expected: 'Increased Duration', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Decreased Duration: was auto replaced with Increased Duration'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Decreased Duration: was in fact removed'});
    } catch(e){testResults.push({Error: e, Description: 'Decreased Duration'});}

    return TestRunner.displayResults('TestSuite.powerRow.updateDurationModifiers', testResults, isFirst);
};
TestSuite.powerRow.setPower=function(isFirst)
{
    return {tableName: 'unmade', testResults: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(isFirst);

    var testResults=[];
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: 'Equipment Row is not created'});
    try{
    SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: 'Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: 'Equipment Row is not created'});}

    return TestRunner.displayResults('TestSuite.powerRow.setPower', testResults, isFirst);
};
TestSuite.powerRow.updateActionModifiers=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    //testing for setting to None exists in setDuration tests
    var testResults=[];

    try{
    SelectUtil.changeText('powerChoices0', 'Teleport'); SelectUtil.changeText('powerSelectAction0', 'Reaction');
    testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Faster Description: action'});
    testResults.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Faster Description: was auto created'});
    testResults.push({Expected: 2, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Description: 'Faster Description: rank'});

    SelectUtil.changeText('powerSelectAction0', 'Move');
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Faster Description: setting the action back'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Faster Description: was auto removed'});

    SelectUtil.changeText('powerSelectAction0', 'Reaction'); SelectUtil.changeText('powerSelectAction0', 'Full');
    testResults.push({Expected: 'Full', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Faster Description: setting action up then down'});
    testResults.push({Expected: 'Slower Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Faster Description: was auto replaced with Slower Action'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Faster Description: was in fact removed'});
    } catch(e){testResults.push({Error: e, Description: 'Faster Description'});}

    try{
    SelectUtil.changeText('powerSelectAction0', 'Full');
    testResults.push({Expected: 'Full', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Slower Description: action'});
    testResults.push({Expected: 'Slower Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Slower Description: was auto created'});
    testResults.push({Expected: 2, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Description: 'Slower Description: is rank 1'});

    SelectUtil.changeText('powerSelectAction0', 'Move');
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Slower Description: setting the action back'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Slower Description: was auto removed'});

    SelectUtil.changeText('powerSelectAction0', 'Full'); SelectUtil.changeText('powerSelectAction0', 'Reaction');
    testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Slower Description: setting action down then up'});
    testResults.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Slower Description: was auto replaced with Faster Action'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Slower Description: was in fact removed'});
    } catch(e){testResults.push({Error: e, Description: 'Slower Description'});}

    try{
    SelectUtil.changeText('powerSelectAction0', 'Triggered');
    testResults.push({Expected: 'Triggered', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Add Selective: action'});
    testResults.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Add Selective: Faster Action was auto created'});
    testResults.push({Expected: 3, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Description: 'Add Selective: Faster Action rank 3'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0, 1).getName(), Description: 'Add Selective: Selective was auto created'});
    } catch(e){testResults.push({Error: e, Description: 'Add Selective'});}

    try{
    SelectUtil.changeText('powerSelectAction0', 'Move');
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Keep Selective: action'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Keep Selective: Selective still there'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Keep Selective: no other modifiers'});
    } catch(e){testResults.push({Error: e, Description: 'Keep Selective'});}

    try{
    SelectUtil.changeText('powerSelectAction0', 'Triggered');
    testResults.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Only 1 Selective: Faster Action was auto created'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0, 1).getName(), Description: 'Only 1 Selective: Selective still there'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 2).isBlank(), Description: 'Only 1 Selective: no other modifiers'});
    } catch(e){testResults.push({Error: e, Description: 'Only 1 Selective'});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature doesn\'t auto gain Faster Description: getAction'});
    SelectUtil.changeText('powerSelectAction0', 'Reaction');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Feature doesn\'t auto gain Faster Description: after'});
    } catch(e){testResults.push({Error: e, Description: 'Feature doesn\'t auto gain Faster Description'});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    SelectUtil.changeText('powerSelectAction0', 'Slow');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Feature doesn\'t auto gain Slower Description: after'});
    } catch(e){testResults.push({Error: e, Description: 'Feature doesn\'t auto gain Slower Description'});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    SelectUtil.changeText('powerSelectAction0', 'Triggered');
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Feature auto gains Selective: Selective added'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Feature auto gains Selective: no other modifiers'});
    } catch(e){testResults.push({Error: e, Description: 'Feature auto gains Selective'});}

    return TestRunner.displayResults('TestSuite.powerRow.updateActionModifiers', testResults, isFirst);
};
TestSuite.powerRow.setRange=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var testResults=[];

    try{
    SelectUtil.changeText('powerChoices0', 'Damage');
    testResults.push({Expected: 'Damage', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Change to Perception: power'});
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change to Perception: getRange before'});
    testResults.push({Expected: 'Power 1 Damage', Actual: Main.powerSection.getRow(0).getName(), Description: 'Change to Perception: getName before'});
    testResults.push({Expected: 'Skill used for attack', Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Change to Perception: getSkillUsed before'});

    SelectUtil.changeText('powerSelectRange0', 'Perception');
    testResults.push({Expected: 'Perception', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change to Perception: getRange after'});
    testResults.push({Expected: 'Power 1 Damage', Actual: Main.powerSection.getRow(0).getName(), Description: 'Change to Perception: getName after'});
    testResults.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Change to Perception: getSkillUsed after'});
    } catch(e){testResults.push({Error: e, Description: 'Change to Perception'});}

    try{
    SelectUtil.changeText('powerSelectRange0', 'Close');
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change from Perception: getRange'});
    testResults.push({Expected: 'Power 1 Damage', Actual: Main.powerSection.getRow(0).getName(), Description: 'Change from Perception: getName'});
    testResults.push({Expected: 'Skill used for attack', Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Change from Perception: getSkillUsed'});
    } catch(e){testResults.push({Error: e, Description: 'Change from Perception'});}

    try{
    SelectUtil.changeText('powerChoices0', 'Protection');
    testResults.push({Expected: 'Protection', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Change from personal: power'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change from personal: getAction before'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change from personal: getRange before'});
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change from personal: getDuration before'});

    SelectUtil.changeText('powerModifierChoices0.0', 'Affects Others Only');
    testResults.push({Expected: 'Affects Others Only', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Change from personal: modifier'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Change from personal: no other modifiers'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change from personal: getAction after'});
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change from personal: getRange after'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change from personal: getDuration after'});
    } catch(e){testResults.push({Error: e, Description: 'Change from personal'});}

    try{
    SelectUtil.changeText('powerSelectAction0', 'Move');
    SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    SelectUtil.changeText('powerModifierChoices0.2', 'Select One');  //removes Affects Others (first 2 are for action and duration)
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change to personal changes nothing: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change to personal changes nothing: getRange'});
    testResults.push({Expected: 'Concentration', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change to personal changes nothing: getDuration'});
    } catch(e){testResults.push({Error: e, Description: 'Change to personal changes nothing'});}

    try{
    SelectUtil.changeText('powerChoices0', 'Feature');
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature change from personal: power'});
    testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature change from personal: getAction before'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature change from personal: getRange before'});
    testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature change from personal: getDuration before'});

    SelectUtil.changeText('powerSelectRange0', 'Ranged');
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature change from personal: getAction after'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature change from personal: getRange after'});
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature change from personal: getDuration after'});
    } catch(e){testResults.push({Error: e, Description: 'Feature change from personal'});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectRange0', 'Ranged');
    SelectUtil.changeText('powerSelectAction0', 'Move');
    SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    SelectUtil.changeText('powerSelectRange0', 'Personal');  //must be last here
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature change to personal changes nothing: getAction'});
    testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature change to personal changes nothing: getRange'});
    testResults.push({Expected: 'Concentration', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature change to personal changes nothing: getDuration'});
    } catch(e){testResults.push({Error: e, Description: 'Feature change to personal changes nothing'});}

    return TestRunner.displayResults('TestSuite.powerRow.setRange', testResults, isFirst);
};
TestSuite.powerRow.updateRangeModifiers=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var testResults=[];

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Feature does\'t auto gain Increased Range: before is blank'});
    SelectUtil.changeText('powerSelectRange0', 'Ranged');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Feature does\'t auto gain Increased Range: after is still blank'});
    } catch(e){testResults.push({Error: e, Description: 'Feature does\'t auto gain Increased Range'});}
    //can't test 'Feature does\'t auto gain Decreased Range' because Feature's default range is Personal

    try{
    SelectUtil.changeText('powerChoices0', 'Move Object'); SelectUtil.changeText('powerSelectRange0', 'Perception');
    testResults.push({Expected: 'Perception', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Increased Range: range'});
    testResults.push({Expected: 'Increased Range', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Increased Range: was auto created'});
    testResults.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Description: 'Increased Range: is rank 1'});

    SelectUtil.changeText('powerSelectRange0', 'Ranged');
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Increased Range: setting the range back'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Increased Range: was auto removed'});

    SelectUtil.changeText('powerSelectRange0', 'Perception'); SelectUtil.changeText('powerSelectRange0', 'Close');
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Increased Range: setting range up then down'});
    testResults.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Increased Range: was auto replaced with Reduced Range'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Increased Range: was in fact removed'});
    } catch(e){testResults.push({Error: e, Description: 'Increased Range'});}

    try{
    SelectUtil.changeText('powerSelectRange0', 'Close');
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Reduced Range: range'});
    testResults.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Reduced Range: was auto created'});
    testResults.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Description: 'Reduced Range: is rank 1'});

    SelectUtil.changeText('powerSelectRange0', 'Ranged');
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Reduced Range: setting the range back'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Reduced Range: was auto removed'});

    SelectUtil.changeText('powerSelectRange0', 'Close'); SelectUtil.changeText('powerSelectRange0', 'Perception');
    testResults.push({Expected: 'Perception', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Reduced Range: setting range down then up'});
    testResults.push({Expected: 'Increased Range', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Reduced Range: was auto replaced with Increased Range'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Reduced Range: was in fact removed'});
    } catch(e){testResults.push({Error: e, Description: 'Reduced Range'});}

    return TestRunner.displayResults('TestSuite.powerRow.updateRangeModifiers', testResults, isFirst);
};
TestSuite.powerRow.calculateValues=function(isFirst)
{
    return {tableName: 'unmade', testResults: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(isFirst);

    var testResults=[];
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: 'Equipment Row is not created'});
    try{
    SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: 'Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: 'Equipment Row is not created'});}

    return TestRunner.displayResults('TestSuite.powerRow.calculateValues', testResults, isFirst);
};
TestSuite.powerRow.generate=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var testResults=[];
    try{
    SelectUtil.changeText('powerChoices0', 'Damage');
    testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Set Damage: Damage has a default duration of Instant'});
    testResults.push({Expected: false, Actual: SelectUtil.isSelect('powerSelectDuration0'), Description: 'Set Damage: The user can\'t change the duration'});
    } catch(e){testResults.push({Error: e, Description: 'Set Damage'});}
    //ADD TESTS
    //TODO: TestSuite sections should exist for generate and set all so that the gui logic is tested

    return TestRunner.displayResults('TestSuite.powerRow.generate', testResults, isFirst);

    return;
    TestSuite.powerRow.setDuration(isFirst, 'equipment');

    if(sectionName === undefined) sectionName='power';
    SelectUtil.changeText(sectionName+'Choices0', 'Damage');
    Main[sectionName+'Section'].getRow(0).getDuration();
    return TestRunner.displayResults('TestSuite.'+sectionName+'Row.setDuration', testResults, isFirst);
};
TestSuite.powerRow.setValues=function(isFirst)
{
    return {tableName: 'unmade', testResults: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(isFirst);

    var testResults=[];
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: 'Equipment Row is not created'});
    try{
    SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: 'Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: 'Equipment Row is not created'});}

    return TestRunner.displayResults('TestSuite.powerRow.setValues', testResults, isFirst);
};
