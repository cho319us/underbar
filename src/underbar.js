(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if(n === undefined){
      return array[array.length-1];
    }else if(n <= array.length){
      return array.slice(array.length-n, array.length);
    }else{ // n > array.length
      return array;
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    // if collection is an array
    if(Array.isArray(collection)){
      //iterate the collection (array)
      for(var i=0; i<collection.length; i++){
        // Call iterator(value, key, collection) for current element of collection (array).
        iterator(collection[i], i, collection);
      }
    // else collection is an object
    }else{
      //iterate the collection (object)
      for(var key in collection){
        // Call iterator(value, key, collection) for current element of collection (object).
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      // if the current item is matching to the target value
      // and the current item is the first match in the array (so the result === -1)
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result; //return -1 if the conditional statement is not true
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var filterArr = [];
    _.each(collection, function(element) {
      // push the element if the return value of test result of the element is true
      if (test(element)) {
        filterArr.push(element);
      }
    });
    return filterArr;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(element){
      // this function is the same "test" function that passed to _filter(),
      // but this time return the opposite test result in each element of the collection
      return !test(element);
    });
  };

  // Produce a duplicate-free version of the array.
  // iterator = function(value) { return value === 1; };
  _.uniq = function(array, isSorted, iterator) {
    var uniqArr = [];
    var booleanArr = [];
    // should handle iterators that work with a sorted array
    // For example, [1, 2, 2, 3, 4, 4] -> [1, 2]
    if(isSorted){
      _.each(array, function(element) {
        // if the element in the array (target) returned by iterator function is not in booleanArr
        if(_.indexOf(booleanArr, iterator(element)) === -1){ // true, false, false, false, false, false // -1, -1, 0, 0, 0, 0
          booleanArr.push(iterator(element)); // true, false
          uniqArr.push(element); // 1, 2
        }
      });
    // should return all unique values contained in an unsorted array
    // For example, [1, 2, 1, 3, 1, 4] -> [1, 2, 3, 4]
    }else{
      _.each(array, function(element) {
        // if the element in the array (target) is not in uniqArr
        if(_.indexOf(uniqArr, element) === -1){ // -1, -1, 0, -1, 0, -1
          uniqArr.push(element); // 1, 2, 3, 4
        }
      });
    }
    return uniqArr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var resultArr = [];
    _.each(collection, function(element) {
      // push the element returned by iterator function
      resultArr.push(iterator(element));
    });
    return resultArr;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    // if accumulator is undefined
    if(accumulator === undefined){
      // then set accumulator to be equal to the first element of the collection
      accumulator = collection[0];
      // iteration to start with the second element
      collection = collection.slice(1);
    }
    // iterate over the collection and excute iterator() in each element of the collection
    _.each(collection, function(element) {
      // returned value of the iterator function assigned to the accumulator
      accumulator = iterator(accumulator, element);
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  // iterator return true if even or false if not even
  // TIP: Try re-using reduce() here.
  _.every = function(collection, iterator) {
    // passes by default for an empty collection
    if(collection.length === 0){
      return true;
    }
    // should work when no callback is provided
    // ex. [true, true, false] -> false
    if (iterator === undefined) {
      iterator = _.identity;
    }

    var passNum = 0;
    return _.reduce(collection, function(allPass, element) {
      // if the element match a truth test, passNum add one
      if(iterator(element)){
        passNum++;
      }
      // return true if all the elements are passed, else return false
      return passNum === collection.length;
    }, false);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  // TIP: There's a very clever way to re-use every() here.
  _.some = function(collection, iterator) {
    // fail by default for an empty collection
    if(collection.length === 0){
      return false;
    }
    // should work when no callback is provided
    // ex. [true, true, false] -> true
    if (iterator === undefined) {
      iterator = _.identity;
    }

    var passNum = 0;
    return _.reduce(collection, function(onePass, element) {
      // if the element match a truth test, passNum add one
      if(iterator(element)){
        passNum++;
      }
      // return true if there is one element is passed, else return false
      return passNum >= 1;
    }, false);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    // As the arguments object is not an real Array, arguments.slice(1) will not work
    // Converted to a real Array and slice
    var slicedArgs = Array.prototype.slice.call(arguments, 1);
    // iterate over the objects in the argument array which start from index 1
    _.each(slicedArgs, function(element){
      // iterate over the properties in the current object
      _.each(element, function(value, key){
        obj[key] = value;
      });
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    // As the arguments object is not an real Array, arguments.slice(1) will not work
    // Converted to a real Array and slice
    var slicedArgs = Array.prototype.slice.call(arguments, 1);
    // iterate over the objects in the argument array which start from index 1
    _.each(slicedArgs, function(element){
      // iterate over the properties in the current object
      _.each(element, function(value, key){
        if(obj[key] === undefined){
          obj[key] = value;
        }
      });
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var memory = {};
    return function(){
      var key = JSON.stringify(arguments);
      // if it has not computed the result for the given argument yet
      if(!memory[key]){
        memory[key] = func.apply(this, arguments);
      }
      // return the value if it has already computed the result for the given argument
      return memory[key];
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    // As the arguments object is not an real Array, arguments.slice(2) will not work
    // Converted to a real Array and start from index 3
    var slicedArgs = Array.prototype.slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, slicedArgs);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var randomArr = [];
    // get a copied array
    var copyArr = array.slice();
    // iterate over the input array
    _.each(array, function(){
      // Getting a random index number // copyArr.length(exclusive)
      var randomIndexNum = Math.floor(Math.random() * Math.floor(copyArr.length));
      // push the element of the random index number from copyArr
      randomArr.push(copyArr[randomIndexNum]);
      // remove the pushed element in the copyArr
      copyArr.splice(randomIndexNum, 1);
    });
    return randomArr;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
