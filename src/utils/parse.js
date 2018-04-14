export default function parse(string) {
    let find = {
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
        .reduce((property, letter) => {
            if (find.tagOpen.test(letter)) {
                find.count++;
                if (find.count > 1) current += letter;
                return property;
            }
            if (find.tagClosed.test(letter)) {
                find.count--;
                if (find.count) current += letter;
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
