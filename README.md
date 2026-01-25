types:

flow = "column" | "row";
wrap = "wrap" | "nowrap";
xAlign = "start" | "center" | "end" | "space-between" | "space-around" | "stretch";
yAlign = "start" | "center" | "end" | "space-between" | "space-around" | "stretch";
gap = "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";

editable = boolean;
size = "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
weight = "thin" | "light" | "normal" | "heavy" | "thick";

curve = "rounded" | "circular";

process = "single-step" | "multi-step";

Containers
// Flow, Wrap, xAlign, yAlign, gap, size?


**Containers will have a size prop so that any text elements/buttons with undefined sizes will inherit.

    -- TopBar
    -- View
    -- BottomBar

    -- Form
        // process

    -- Card
        // size, curve, color
    -- Chip
        // size, curve, color

Buttons
// size, curve, icon, text

Icons
// name, size, curve, color

Text
// element {h1,h2,h3,h4,h5,h6,p,label}, editable, size?, weight?

Input
// 