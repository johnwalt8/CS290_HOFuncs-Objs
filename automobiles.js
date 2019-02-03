// Walter Johnson
// Week 4 HW Assignment: Higher-Order Functions and Objects

"use strict";

const X = Number.MIN_SAFE_INTEGER;

function Automobile(year, make, model, type) {
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
    this.logMe = function (typeFlag) {
        var typeText = "";
        if (typeFlag) {
            typeText = " " + type;
        }
        console.log(year + " " + make + " " + model + typeText);
    };
}

// allows logMe method to be used with forEach
var logFunc = function (array, typeFlag) {
    array.forEach(function (item) {
        item.logMe(typeFlag);
    });
};

var automobiles = [
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
];

// used by sortArr (bubble sort)
function swapElms(m, n, array) {
    var temp = array[m];
    array[m] = array[n];
    array[n] = temp;
}

// basic bubble sort
function sortArr(comparator, array) {
    var i, j, arrayLength = array.length;
    for (i = 0; i < arrayLength; i += 1) {
        for (j = 1; j < arrayLength; j += 1) {
            if(comparator(array[j], array[j - 1])) {
                swapElms(j, j - 1, array);
            }
        }
    }
}

// compares integers, used by other comparators
function exComparator(int1, int2) {
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

// This compares two automobiles based on their year. Newer cars are "greater" than older cars.
// returns true if auto1 > auto2
function yearComparator(auto1, auto2) {
     return exComparator(auto1.year, auto2.year || X);
}

// This compares two automobiles based on their make.
// It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.
function makeComparator(auto1, auto2) {
    return auto1.make.localeCompare(auto2.make) === -1;
}

// This compares two automobiles based on their type.
// The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed).
// It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".
function typeComparator(auto1, auto2) {
    var auto1Value, auto2Value, typeArray = ["wagon", "suv", "pickup", "roadster"];
    auto1Value = typeArray.indexOf(auto1.type.toLocaleLowerCase());
    auto2Value = typeArray.indexOf(auto2.type.toLocaleLowerCase());
    if (auto1Value === auto2Value) {
        return yearComparator(auto1, auto2);
    } else {
        return exComparator(auto1Value, auto2Value);
    }
}

console.log("");
console.log("*****");
console.log("The cars sorted by year are:");
sortArr(yearComparator, automobiles);
logFunc(automobiles, false);
console.log("");
console.log("The cars sorted by make are:");
sortArr(makeComparator, automobiles);
logFunc(automobiles, false);
console.log("");
console.log("The cars sorted by type are:");
sortArr(typeComparator, automobiles);
logFunc(automobiles, true);
console.log("*****");
console.log("");
