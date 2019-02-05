// Walter Johnson
// Week 4 HW Assignment: Higher-Order Functions and Objects

//This assignment is graded based on correctness and will require you to use higher-order functions to sort automobiles.
//The description is below and can also be found here  (Links to an external site.)Links to an external site.on jsFiddle.
//You should submit a single .js file called automobile.js which when run with node.js using the command "node automobile.js" produces the described results.
//You must make use of  higher-order functions to sort the cars. You should not, for example, create entirely separate functions each with dedicated loops to sort the cars.
//You will need a loop (or potentially more than one loop depending on your sorting algorithm of choice) in the sortArr function but that is pretty much it. Use prototype whenever needed.

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
// var logFunc = function (array, typeFlag) {
//     array.forEach(function(item) {
//         item.logMe(typeFlag);
//     });
// }

var automobiles = [
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
];

var reverseArr = function (array) {
    var i, tempArray = [], arraylength = array.length;
    for (i = arraylength; i > 0; i -= 1) {
        tempArray.push(array[i]);
    }
};

var selibomotua = reverseArr(automobiles);

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

// compares integers
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

// var logFunc = function (item) {
//     item.logMe(this);
// }

console.log("");
// logFunc(automobiles, false);
// This compares two automobiles based on their make.
// It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.
function makeComparator(auto1, auto2) {
    return auto1.make.localeCompare(auto2.make) === -1;
}

sortArr(makeComparator, automobiles);

console.log("");
// automobiles.forEach(logFunc, false);

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

sortArr(typeComparator, automobiles);

console.log("");
// automobiles.forEach(logFunc);

// Your program should output the following to the console.log, including the opening and closing 5 stars. 
// All values in parenthesis should be replaced with appropriate values. Each line is a seperate call to console.log.

// Each line representing a car should be produced via a logMe function.
// This function should be added to the Automobile class and accept a single boolean argument.
// If the argument is 'true' then it prints "year make model type" with the year, make, model and type being the values appropriate for the automobile.
// If the argument is 'false' then the type is ommited and just the "year make model" is logged.

// *****
// The cars sorted by year are:
// (year make model of the 'greatest' car)
// (...)
// (year make model of the 'least' car)

// The cars sorted by make are:
// (year make model of the 'greatest' car)
// (...)
// (year make model of the 'least' car)

// The cars sorted by type are:
// (year make model type of the 'greatest' car)
// (...)
// (year make model type of the 'least' car)
// *****

// As an example of the content in the parenthesis:
// 1990 Ford F-150
console.log("");
console.log("*****");
console.log("The cars sorted by year are:");
sortArr(yearComparator, automobiles);
// automobiles.forEach(logFunc);
console.log("");
console.log("The cars sorted by make are:");
sortArr(makeComparator, automobiles);
// automobiles.forEach(logFunc);
console.log("");
console.log("The cars sorted by type are:");
sortArr(typeComparator, automobiles);
// automobiles.forEach(logFunc);
console.log("*****");
console.log("");
