[![Build Status](https://travis-ci.org/riyadhalnur/mongoose-softdelete.svg)](https://travis-ci.org/riyadhalnur/mongoose-softdelete)

Mongoose Soft Delete Plugin
============================

Mongoose plugin that enables soft deletion of Models/Documents.  

This plugin is based on the work of [Yi](https://github.com/yi).  

## What's Different  
In the original plugin, models were deleted with a date reference only. This version takes that and uses a Boolean flag to to mark models deleted/restored. Now, whoever deleted the data will be recorded in the DB. Additionally, it removes a lot of overhead from the original code and doesn't use Coffeescript for the original code. Also included is an example express app to see if the plugin works.  

## License  
This plugin is licensed under the MIT license and can ve viewed in the LICENSE file.  

## Installation  
Install using [npm](https://npmjs.org)  
```
npm install mongoose-softdelete --save
```  

## Tests  
IMPORTANT: You need to have MongoDB running to run tests  

```
npm test
```

## Usage  

**models/test.js**  

```js
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    soft_delete = require('mongoose-softdelete');

var TestSchema = new Schema({
  somefield: { type: String, default: 'Hello World!'}
});

TestSchema.plugin(soft_delete);  
```  

**controllers/test.js**  

```js  
var Test = mongoose.model('Test', TestSchema);
var test = new Test();

test.softdelete(function(err, newTest) {
  if (err) { callback(err); }  
  callback(null, newTest);
});

test.restore(function(err, newTest) {
  if (err) { callback(err); }  
  callback(null, newTest);
});  
```  
 
Built with love in Dhaka, Bangladesh by [Riyadh Al Nur](https://twitter.com/riyadhalnur)
