# jquery.xps.js
Provide a workaround to allow JavaScript to be executed cross pages, or pass value object to other pages.
This jquery plugin requires jquery.cookie.js

## Code Sample
--------------
### Store value:
To store a value which could be fetched only once in next few pages.
```js
//arg1 is the object id
//arg2 is the object value 
$.xps('obj_id', {
  msg:'hello, world',
  array:[true, 1]
});
```

### Fetch value:
To fetch a stored value, a value could only be fetched only once. 
Once a value is fetched, it will be removed from stored list automatically.
```js
//arg1 is the object id
var stored_value = $.xps('obj_id');
```

--------------
### Excute defined function:
Setup an function which should be defined in the next page and excute it after page is ready.
(If auto-run is disabled in source code, you may excute it manully.)
```js
//arg1 is the function name
//arg2... are arguments for this function 
$.xps('alert', 'Hello, page is ready.');

$.xps('$.util.somefunction', arg1, arg2);
```

### Excute un-defined function:
Setup an anoymous function to be excuted in the next page after page is ready.
(If auto-run is disabled in source code, you may excute it manully.)
```js
//arg1 is anoymous function
//arg2... are arguments for this anoymous function 
$.xps('function(msg){alert(msg);}', 'someanoymous function arguments');
```

--------------
### Excuete all stored functions:
This option is only usefull when auto-run is disabled in source code.
```js
$.xps();
```
