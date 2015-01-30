# jquery.xp.js
Provide a option for JavaScript to be executed in other pages, or pass value object to other pages.
This jquery plugin requires jquery.cookie.js

## Code Sample
--------------
### To store a value which could be fetched only once in next few pages.

```js
//arg1 is the object id
//arg2 is the object value 
$.xps('obj_id', {
  msg:'hello, world',
  array:[true, 1]
});
```

### To fetch a stored value(a value could only be fetched once):

```js
//arg1 is the object id
var stored_value = $.xps('obj_id');
```

### Setup an function which should be existing in the next page and excute it after page is ready.

```js
//arg1 is the function name
//arg2... are arguments for this function 
$.xps('alert', 'Hello, page is ready.');

$.xps('$.util.somefunction', arg1, arg2);
```

### Setup an anoymous function to be excuted in the next page after page is ready.

```js
//arg1 is anoymous function
//arg2... are arguments for this anoymous function 
$.xps('function(msg){alert(msg);}', 'someanoymous function arguments');
```

### To excuete all stored functions. 
This option is only usefull when auto-run is disabled js source code.
```js
$.xps();
```
