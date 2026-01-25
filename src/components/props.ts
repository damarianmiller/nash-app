type flow = "column" | "row";
type wrap = "wrap" | "nowrap";
type xAlign = "start" | "center" | "end" | "space-between" | "space-around" | "stretch";
type yAlign = "start" | "center" | "end" | "space-between" | "space-around" | "stretch";
type gap = "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "none";
type curve = "rounded" | "circular";
type process = "single-step" | "multi-step";
type textTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "label";
type color = "red" | "orange" | "yellow" | "green" | "blue" | "pink" | "purple" | "light" | "dark" | any;
type iconName = any;

export const SizeHelper = {
    xxs: "0.5rem",
    xs: "0.75rem",
    s: "1rem",
    m: "1.25rem",
    l: "1.5rem",
    xl: "1.75rem",
    xxl: "2rem",
}
type size = keyof typeof SizeHelper;

export const WeightHelper = {
    thin: 200,
    light: 300,
    normal: 500,
    heavy: 700,
    thick: 800,
};
type weight = keyof typeof WeightHelper;







// CONTAINERS
//--------------------------------------------------------------------------------------
type DesignProps = {
    size: size;
    color?: color;
}
type ContainerProps = {
    flow: flow;
    wrap: wrap;
    xAlign: xAlign;
    yAlign: yAlign;
    gap: gap;
    fillWidth?: boolean;
    fillHeight?: boolean;
}
export type WrapperProps = React.ComponentPropsWithoutRef<"section"> & ContainerProps;
export type TopBarProps = React.ComponentPropsWithoutRef<"header">; // !!!!DONE!!!!
export type BottomBarProps = React.ComponentPropsWithoutRef<"nav"> & { // !!!!DONE!!!!
	pages: {
		icon: string;
		label: string;
		href: string;
	}[];
};
export type ViewProps = React.ComponentPropsWithoutRef<"main">; // !!!!DONE!!!!
export type CardProps = React.ComponentPropsWithoutRef<"article"> & ContainerProps & DesignProps; // !!!!DONE!!!!
export type ChipProps = React.ComponentPropsWithoutRef<"span"> & DesignProps; // !!!!DONE!!!!
export type FormProps = Omit<React.ComponentPropsWithoutRef<"form">, "action"> & ContainerProps & {
    action: string | (() => void);
	process: process;
}
export type AccordionProps = Omit<React.ComponentPropsWithRef<"div">, "content"> & {
    header: React.ReactNode;
    content: React.ReactNode; 
    defaultOpen?: boolean;
}
//--------------------------------------------------------------------------------------
// BUTTON
//--------------------------------------------------------------------------------------
export type ButtonProps = // !!!!DONE!!!!
| (React.ComponentPropsWithoutRef<"button"> & {
    varient?: "theme" | "inline" | "slab";
    size: size;
    icon?: iconName;
    text?: string;
    href?: never;
    active?: boolean;
})
| (React.ComponentPropsWithoutRef<"a"> & {
    varient?: "theme" | "inline" | "slab";
    size: size;
    icon?: iconName;
    text?: string;
    href: string;
    active?: boolean;
});
//--------------------------------------------------------------------------------------
export type IconProps = React.ComponentPropsWithRef<"svg"> & {
	name: iconName;
	size: size;
	color?: color;
	width?: 3;
}


export type TextProps =
| (React.ComponentPropsWithRef<"span"> & {
        tag: Exclude<textTag, "label">;
        editable?: boolean;
        size?: size;
        weight?: weight;
        align?: "left" | "center" | "right";
})
| (React.ComponentPropsWithRef<"span"> & {
        tag: "label";
        editable?: boolean;
        size: size;
        weight: weight;
        align?: "left" | "center" | "right";
});



export type InputProps = Omit<React.ComponentPropsWithRef<"input">, "size" | "name" | "type" | "placeholder" | "required"> & {
	size: size;
    type: string;
    name: string;
    placeholder: string;
    icon: iconName;    
    required: boolean;
};

export type ProgressBarProps =
(React.ComponentPropsWithoutRef<"div"> & {
    size: size;
	color: color;
	progress: string;
	barText: string;
	caption?: string;
});