export default function flex(css) {
    let args = css.arguments,
        set = {},
        column;

    args.map(([prop, value]) => {
        switch (prop) {
            case "row":
            case "column":
                set["display"] = set["display"] || "flex";

                column = prop === "column";

                set["flex-direction"] = set["flex-direction"]
                    ? set["flex-direction"] === "-reverse"
                        ? prop + "-reverse"
                        : prop
                    : prop;

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
                set["position"] = prop;
                break;

            case "box":
                set["box-sizing"] = "border-box";
                break;

            case "around":
            case "between":
            case "evenly":
                set["justify-content"] = "space-" + prop;
                break;
            case "size":
                css.parse(value).some(([value], index) => {
                    if (index) {
                        set["height"] = value;
                    } else {
                        set["width"] = value;
                    }
                });
                break;
            case "flex":
                let [flex] = css.parse(value)[0] || [];

                value =
                    flex === "split"
                        ? "1 1 0%"
                        : flex === "reset" ? "0 0 auto" : value;

                if (value) set["flex"] = value;
                break;
        }
    });

    css.set(set);

    css.remove();
}
