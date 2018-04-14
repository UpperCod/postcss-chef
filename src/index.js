import postcss from "postcss";
import Props from "./utils/Props";

import flexBox from "./properties/flex";

export default postcss.plugin("chef-flex", config => (css, result) => {
    css = new Props(css);
    css.map("chef-flex", flexBox);
});
