//This file has been stripped out. To see the full version: https://github.com/SkySpiral7/Miscellaneous/blob/master/src/advanced%20rounding.js
Number.prototype.ensurePrecision = function()
{
    if(!isFinite(this)) return this.valueOf();
    if(this.valueOf() === 0) return 0;
    var resultWhole = Math.floor(this);
    if(resultWhole > this) return resultWhole;
    resultWhole = simpleTruncate(this);
    var resultDigits = ((this - resultWhole) * Math.pow(10, 14));

    var savedDigits = simpleTruncate(resultDigits);
    var digitsInQuestion = Math.abs(resultDigits - savedDigits);
    if(digitsInQuestion <= 0.5){}
    else if(resultWhole > 0) savedDigits++;
    else savedDigits--;

    savedDigits /= Math.pow(10, 14);
    return (resultWhole+savedDigits);

   function simpleTruncate(num)
   {
       if(num >= 0) return Math.floor(num);
       return Math.ceil(num);
   };
};
Math.logBaseX = function(num, base)
{
    if(typeof(num) !== 'number' || typeof(base) !== 'number') return NaN;
    return (Math.log(num) / Math.log(base));
};
function RoundingMode(options)
{
    var divisible = options.divisible;
    var magnitude = options.magnitude;

    var usesDivisible = (divisible !== undefined);
    var usesMagnitude = (magnitude !== undefined);

   return function(target)
   {
       if(typeof(target) !== 'number' || isNaN(target)) return NaN;
       if(Math.abs(target) === Infinity) return target;
       if(target === 0) return target;
       if(usesDivisible && (target % divisible) === 0) return target;
       if(usesMagnitude && target === 1) return target;
       if(usesMagnitude && (Math.logBaseX(Math.abs(target), magnitude).ensurePrecision() % 1) === 0) return target;
       var above = findNextUp(target);
       var below = findNextDown(above);

       var aboveDistance = Math.abs(0 - above);
       var belowDistance = Math.abs(0 - below);
       if(aboveDistance > belowDistance) return above;
       return below;

      function findNextUp(target)
      {
          var x = 0;
         if (usesDivisible)
         {
             while((x * divisible) > target){x--;}
             while((x * divisible) < target){x++;}
             return (x * divisible);
         }
          var absTarget = Math.abs(target);
          while(Math.pow(magnitude, x) > absTarget){x--;}
          while(Math.pow(magnitude, x) < absTarget){x++;}
          if(target > 0) return Math.pow(magnitude, x);
          return -Math.pow(magnitude, (x-1));
      };

      function findNextDown(above)
      {
         if (usesDivisible)
         {
             var x = (above / divisible);
             x--;
             return (x * divisible);
         }
          var x = Math.logBaseX(Math.abs(above), magnitude).ensurePrecision();
          if(above < 0) return -Math.pow(magnitude, (x+1));
          return Math.pow(magnitude, (x-1));
      };
   };
};
