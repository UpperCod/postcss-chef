import parse from "./parse";

export class Modifier {
    constructor(decl) {
        this.decl = decl;
    }

    get prop() {
        return this.decl.prop;
    }

    get value() {
        return this.decl.value;
    }

    get selector() {
        return this.parent.selector;
    }

    get arguments() {
        return parse(this.value);
    }

    get parent() {
        return this.decl.parent;
    }

    set(prop, value) {
        if (typeof prop === "object") {
            for (let key in prop) this.set(key, prop[key]);
        } else {
            this.decl.cloneBefore({
                prop,
                value
            });
        }
        return this;
    }

    get(prop) {
        let exists;
        this.parent &&
            this.parent.walkDecls(prop, decl => {
                exists = decl;
            });
        return exists && new Modifier(exists);
    }

    each(callback) {
        this.parent &&
            this.parent.walkDecls(decl => {
                callback(new Modifier(decl), decl.prop);
            });
        return this;
    }

    remove() {
        this.decl.remove();
        return this;
    }
    parse(value) {
        return parse(value);
    }
}

export default class Props {
    constructor(css) {
        this.css = css;
    }
    map(property, callback) {
        this.css.walkDecls(property, decl => {
            callback(new Modifier(decl));
        });
        return this;
    }
}
