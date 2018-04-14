'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var postcss = _interopDefault(require('postcss'));

function parse(string) {
    var find = {
            count: 0,
            tagOpen: /[\(]/,
            tagClosed: /[\)]/
        },
        current = "",
        map = [];

    (string + " ")
        .replace(/[\s\t\n]+/, " ")
        .replace(/ \(/, "(")
        .split("")
        .reduce(function (property, letter) {
            if (find.tagOpen.test(letter)) {
                find.count++;
                if (find.count > 1) { current += letter; }
                return property;
            }
            if (find.tagClosed.test(letter)) {
                find.count--;
                if (find.count) { current += letter; }
                if (find.count) {
                    return property;
                } else {
                    map.push([property, current]);
                    return (current = "");
                }
            }
            if (find.count > 0) {
                current += letter;
                return property;
            } else {
                if (/[\s\t\n]+/.test(letter)) {
                    property && map.push([property]);
                    return "";
                } else {
                    return (property += letter);
                }
            }
        }, "");
    return map.length ? map : [string];
}

var Modifier = function Modifier(decl) {
    this.decl = decl;
};

var prototypeAccessors = { prop: { configurable: true },value: { configurable: true },selector: { configurable: true },arguments: { configurable: true },parent: { configurable: true } };

prototypeAccessors.prop.get = function () {
    return this.decl.prop;
};

prototypeAccessors.value.get = function () {
    return this.decl.value;
};

prototypeAccessors.selector.get = function () {
    return this.parent.selector;
};

prototypeAccessors.arguments.get = function () {
    return parse(this.value);
};

prototypeAccessors.parent.get = function () {
    return this.decl.parent;
};

Modifier.prototype.set = function set (prop, value) {
        var this$1 = this;

    if (typeof prop === "object") {
        for (var key in prop) { this$1.set(key, prop[key]); }
    } else {
        this.decl.cloneBefore({
            prop: prop,
            value: value
        });
    }
    return this;
};

Modifier.prototype.get = function get (prop) {
    var exists;
    this.parent &&
        this.parent.walkDecls(prop, function (decl) {
            exists = decl;
        });
    return exists && new Modifier(exists);
};

Modifier.prototype.each = function each (callback) {
    this.parent &&
        this.parent.walkDecls(function (decl) {
            callback(new Modifier(decl), decl.prop);
        });
    return this;
};

Modifier.prototype.remove = function remove () {
    this.decl.remove();
    return this;
};

Object.defineProperties( Modifier.prototype, prototypeAccessors );

var Props = function Props(css) {
    this.css = css;
};
Props.prototype.map = function map (property, callback) {
    this.css.walkDecls(property, function (decl) {
        callback(new Modifier(decl));
    });
    return this;
};

function flexBox(css) {
    var args = css.arguments,
        set = {},
        column;

    args.map(function (value) {
        switch (value) {
            case "row":
            case "column":
                set["display"] = set["display"] || "flex";

                column = value === "column";

                set["flex-direction"] = set["flex-direction"]
                    ? set["flex-direction"] === "-reverse"
                        ? value + "-reverse"
                        : value
                    : value;

                set["flex-wrap"] = column ? "nowrap" : "wrap";
                break;

            case "reverse":
                set["flex-direction"] = set["flex-direction"] + "-reverse";
                break;

            case "inline":
                set["display"] = "inline-flex";
                break;

            case "top":
                if (column) {
                    set["justify-content"] = "flex-start";
                } else {
                    set["align-items"] = "flex-start";
                }
                break;

            case "right":
                if (column) {
                    set["align-items"] = "flex-end";
                } else {
                    set["justify-content"] = "flex-end";
                }
                break;

            case "bottom":
                if (column) {
                    set["justify-content"] = "flex-end";
                } else {
                    set["align-items"] = "flex-end";
                }
                break;

            case "left":
                if (column) {
                    set["align-items"] = "flex-start";
                } else {
                    set["justify-content"] = "flex-start";
                }
                break;

            case "center":
                if (column) {
                    set["align-items"] = "center";
                } else {
                    set["justify-content"] = "center";
                }
                break;

            case "middle":
                if (column) {
                    set["justify-content"] = "center";
                } else {
                    set["align-items"] = "center";
                }
                break;

            case "centered":
                set["justify-content"] = "center";
                set["align-items"] = "center";
                break;

            case "absolute":
            case "relative":
            case "fixed":
                set["position"] = value;
                break;

            case "box":
                set["box-sizing"] = "border-box";
                break;

            case "around":
            case "between":
            case "evenly":
                set["justify-content"] = "space-" + value;
                break;
        }
    });

    if (args.max) {
        var ref = args.max.parse();
        var width = ref[0];
        var height = ref[1];
        if (width) { set["max-width"] = width; }
        if (height) { set["max-height"] = height; }
    }

    if (args.min) {
        var ref$1 = args.min.parse();
        var width$1 = ref$1[0];
        var height$1 = ref$1[1];
        if (width$1) { set["min-width"] = width$1; }
        if (height$1) { set["min-height"] = height$1; }
    }

    if (args.size) {
        var ref$2 = args.size.parse();
        var width$2 = ref$2[0];
        var height$2 = ref$2[1]; if ( height$2 === void 0 ) height$2 = width$2;
        if (width$2) { set["width"] = width$2; }
        if (height$2) { set["height"] = height$2; }
    }

    css.set(set);

    css.remove();
}

function parseDiv(value){
    value.replace(/(\d+)\/(\d+)/,function (all,num,div){ return value = 100 * (Number(num) / Number(div)) + '%'; });
    return value;
}

function column(css){
    var set = {},
        args = css.arguments;
    var column = args[0];
    var margin = args[1];
    var box = args[2];
     
        column = parseDiv(column);

        switch( column ){
            case 'auto':
                set['flex-grow']   = '0';
                set['flex-shrink'] = '0';
                set['flex-basis']  = 'auto';
            break;
            case 'split':
                set['flex-grow']   = '1';
                set['flex-shrink'] = '1';
                set['flex-basis']  = '0%';
            break;
            default:
                set['flex-basis']  = margin ? ("calc(" + column + " - " + margin + ")") : ("" + column);
        }
        
        if( box === 'box' ){
            set['box-sizing'] = 'border-box';
        }

        if( margin ) { set['margin'] = "calc(" + margin + " / 2)"; }

        if( args.max ){
            var ref  = args.max.parse();
            var width = ref[0];
            var height = ref[1];
            if( width  ) { set['max-width'] =  width; }
            if( height ) { set['max-height'] =  height; }
        }
    
        if( args.min ){
            var ref$1  = args.min.parse();
            var width$1 = ref$1[0];
            var height$1 = ref$1[1];
            if( width$1  ) { set['min-width'] =  width$1; }
            if( height$1 ) { set['min-height'] =  height$1; }
        }
        
    css.set( set );
    
    css.remove();
}

var index = postcss.plugin("chef", function (config) { return function (css, result) {
    css = new Props(css);
    css.map("chef-box", flexBox);
    css.map("chef-column", column);
}; });

module.exports = index;
