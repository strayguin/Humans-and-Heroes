//thanks to hasOwnProperty the map is safe from Object.prototype tampering. assuming Object.hasOwnProperty hasn't been changed
/**There are 2 reasons to use this over the built in object.
1) this is strict and therefore safe
2) this allows a default value which is returned by get if the key doesn't exist
If obj is passed in it must be a non-null object. defaultValue can be anything.
If obj has any inherited properties they will be ignored.

Constructor examples:
new MapDefault({'key', 'value'}, 'Default Value');
new MapDefault({1: 'Two', Blue: true, true: 0, 'speak to me': function(){alert('hello');}}, 'Not Found');
new MapDefault({}, -1);
new MapDefault();  //is empty and has a defaultValue of undefined
*/
function MapDefault(obj, defaultValue)  //based on http://www.mojavelinux.com/articles/javascript_hashes.html
{
    var items = {};  //new object (built in hash map)

    this.getDefaultValue=function(){return defaultValue;};
    this.setDefaultValue=function(newDefaultValue){defaultValue=newDefaultValue;};

   /**Adds the key value pair to the map if the key does not yet exist.*/
   this.add=function(key, value)
   {
       if(this.containsKey(key)) return;
       items[key]=value;  //isn't push since items is an object which is so that it is mapped by name
   };

   /**Changes the value of the key if the key already exists (nothing happens otherwise).*/
   this.set=function(key, value)
   {
       if(!this.containsKey(key)) return;
       items[key]=value;
   };

   /**Returns the value of that key or the default value if the key does not exist*/
   this.get=function(key)
   {
       if(this.containsKey(key)) return items[key];
       return defaultValue;  //might be undefined
   };

    /**Returns true if the key exists.*/
    this.containsKey=function(key){return items.hasOwnProperty(key);};
    /**Returns true if no keys exist.*/
    this.isEmpty=function(){return this.getAllKeys().isEmpty();};

    /**Removes a key from the map if it exists*/
   this.remove=function(key)
   {
       if(!this.containsKey(key)) return;
       delete items[key];
   };

   /**Returns an array that contains every key in the map*/
   this.getAllKeys=function()
   {
       var keys=[];
      for (var k in items)
      {
          if(this.containsKey(k)) keys.push(k);  //containsKey is called to ignore any changes done to Object.prototype
      }
       return keys;
   };

   /**Returns an array that contains every value in the map. Duplicates may exist and order is undefined.*/
   this.getAllValues=function()
   {
       var values=[];
      for (var v in items)
      {
          if(this.containsKey(v)) values.push(items[v]);
      }
       return values;
   };

    /**Removes all keys from this map. The default value is unaffected*/
    this.clear=function(){items={};};

   /**Returns a string that represents how this map could be created using MapDefault.makeFromArray. The keys are sorted.*/
   this.toSource=function()
   {
       var output='MapDefault.makeFromArray([';
       var keys=this.getAllKeys().sort();
      for (var i=0; i < keys.length; i++)
      {
          output+='[';
          if(typeof(keys[i]) === 'string') output+='\''+keys[i]+'\'';
          else output+=keys[i];
          output+=', ';

          var value=items[keys[i]];
          if(typeof(value) === 'string') output+='\''+value+'\'';
          else output+=value;
          output+=']';
          if(i+1 < keys.length) output+=', ';  //if not the last then add a comma
      }
       output+='], ';
       if(typeof(defaultValue) === 'string') output+='\''+defaultValue+'\'';
       else output+=defaultValue;
       output+=')';
       return output;
   };

   /**Returns a string that represents how this map could be created using literal map notation in haxe. The keys are sorted and assume the keys are String.*/
   this.toHaxeSource=function()
   {
       var output='new MapDefault<String, ';
       var keys=this.getAllKeys().sort();
       if(typeof(items[keys[0]]) === 'string') output+='String';
       else if(typeof(items[keys[0]]) === 'number') output+='Int';
       else output+='Bool';
       output+='>([';
      for (var i=0; i < keys.length; i++)
      {
          if(typeof(keys[i]) === 'string') output+='\''+keys[i]+'\'';
          else output+=keys[i];
          output+=' => ';

          var value=items[keys[i]];
          if(typeof(value) === 'string') output+='\''+value+'\'';
          else output+=value;
          if(i+1 < keys.length) output+=', ';  //if not the last then add a comma
      }
       output+='], ';
       if(typeof(defaultValue) === 'string') output+='\''+defaultValue+'\'';
       else output+=defaultValue;
       output+=')';
       return output;
   };

   //constructor:
   if (typeof(obj) === 'object' && obj !== null)
   {
      for (var p in obj)  //the reason to loop through like this is so that inherited properties are ignored
      {
          if(obj.hasOwnProperty(p)) items[p]=obj[p];  //since obj is an object it can't have duplicate keys.
      }
   }
}
/**If arrayGiven is not an array it will be ignored and an empty map (with defaultValue) will be returned.
If arrayGiven is an array it must contain entirely and only arrays of length 2 being key and value
(the inner array is not validated and only needs to have the properties 0 and 1).
If there are duplicate keys the first value will be used and the rest ignored.

Usage examples:
MapDefault.makeFromArray([['key', 'value'], ['key', 'value ignored']], 'Default Value');
MapDefault.makeFromArray([[1, 'Two'], ["Blue", true], [true, 0], ['speak to me', function(){alert('hello');}]], 'Not Found');
MapDefault.makeFromArray([], -1);
MapDefault.makeFromArray();  //is empty and has a defaultValue of undefined
*/
MapDefault.makeFromArray=function(arrayGiven, defaultValue)
{
    var values = {};
   if(Array.isArray(arrayGiven))  //includes && arrayGiven != undefined
   for (var i=0; i < arrayGiven.length; i++)
   {
       if(!values.hasOwnProperty(arrayGiven[i][0])) values[arrayGiven[i][0]]=arrayGiven[i][1];
   }
    return new MapDefault(values, defaultValue);
};
