//=============================jquery Cross Page Script plugin=============================
(function ($) {

    function parseStringToJs(target) {
        var array = target.split('.'), result = window;
        if (array[0] == 'window') array.shift();
        for (var i = 0; i < array.length; i++) {
            if (result) result = result[array[i]];
        }
        return result;
    }

    function isAnonymousFunction(jsString) {
        var pattern = /^function\s*\(.*\)\s*\{.*\}\s*$/;
        return pattern.test(jsString);
    }

    /**
    * Excute javascript in different page.
    *
    * To store a value: 
    * @example $.xps('obj_id', {msg:'hello, world', array:[true, 1]});
    * To store a autorun js: 
    * @example $.xps('$.util.somefunction', arg1, arg2);
    * @example $.xps('function(msg){alert(msg);}', 'someanoymous function arguments');
    * 
    * To fetch stored value:
    * @example var value = $.xps('obj_id');
    * To auto run all stored functions
    * @example $.xps();
    */
    $.xps = function () {
        if (!$.cookie) throw "Cross Page Script: jQuery cookie plugin not included.";
        var isFunction = $.isFunction(arguments[0]),
            name = isFunction ? arguments[0].toString() : arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            arr = JSON.parse($.cookie('cross_js')) || [],
            retVal;
        if (arguments.length > 0 && typeof name != 'string') throw 'Invalid argument type!';

        var m = {
            fetch: function () {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i][0] == name) {
                        var data = arr.splice(i, 1)[0].slice(1);
                        return data.length > 1 ? data : data[0];
                    }
                }
                return undefined;
            },
            store: function () {
                return arr.push([].concat(name, args));
            },
            excute: function () {
                for (var i = arr.reverse().length - 1; i >= 0; i--) {
                    name = arr[i][0];
                    var isAnonymousFn = isAnonymousFunction(name),
                        isNamedFn = $.isFunction(parseStringToJs(name));
                    if (isAnonymousFn) {
                        eval('fn=' + name).apply(null, arr.splice(i, 1)[0].slice(1));
                    } else if (isNamedFn) {
                        var pos = name.lastIndexOf('.'),
                            thisArg = pos > 0 ? parseStringToJs(name.substr(0, pos)) : null;
                        parseStringToJs(name).apply(thisArg, arr.splice(i, 1)[0].slice(1));
                    }
                }
                return arr.reverse().length;
            }
        };

        if (!name) {
            retVal = m.excute();
        } else {
            isFunction = isFunction || isAnonymousFunction(name) || $.isFunction(parseStringToJs(name));
            retVal = (isFunction || args.length > 0) ? m.store() : m.fetch();
        }
        $.cookie('cross_js', arr.length ? JSON.stringify(arr) : null, { path: '/' });
        return retVal;
    };

    //auto-run after page is ready. Comment it to disable auto-run
    $(function () { $.xps(); });

})(jQuery);

