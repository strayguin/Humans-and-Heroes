//This script was based on:
//https://github.com/SkySpiral7/Miscellaneous/blob/master/src/javascript%20other/advanced%20rounding.js
function isPow2(x){return ((x & -x) === Math.abs(x));}
/**same as new RoundingMode({magnitude: 2, away: 0});*/
function round(target)
{
    if(typeof(target) !== 'number' || Number.isNaN(target)) return NaN;
    if(Math.abs(target) === Infinity) return target;
    if(isPow2(target)) return target;
    var above = findNextUp(target);
    var below = findNextDown(above);

    var aboveDistance = Math.abs(0 - above);
    var belowDistance = Math.abs(0 - below);
    if(aboveDistance > belowDistance) return above;
    return below;
}
function findNextUp(target)
{
    var result = 1;
    var absTarget = Math.abs(target);
    while(result > absTarget){result >>= 1;}
    while(result < absTarget){result <<= 1;}
    if(target > 0) return result;
    return -(result >> 1);
}
function findNextDown(above)
{
    if(above > 0) return (above >> 1);
    return (above << 1);
}
