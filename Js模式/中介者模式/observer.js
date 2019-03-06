var observer = (function () {
    var obj = {};
    return {
        add: function (parameter) {
            var val = obj[parameter.name];
            if (val) {
                val.push(parameter.backCall);
            }
            else {
                obj[parameter.name] = [];
                obj[parameter.name].push(parameter.backCall);
            }
            // <Array<any>>val ? obj[parameter.name].push(parameter.backCall) : obj[parameter.name] = [], obj[parameter.name].push(parameter.backCall)
        },
        run: function (runComman) {
            var val = obj[runComman];
            if (val) {
                for (var _i = 0, val_1 = val; _i < val_1.length; _i++) {
                    var key = val_1[_i];
                    key();
                }
            }
        }
    };
})();
