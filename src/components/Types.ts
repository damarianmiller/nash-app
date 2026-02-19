type process = "single-step" | "multi-step";
type iconName = any;

export const SizeHelper = {
    xxs: "0.5rem",
    xs: "0.75rem",
    s: "1rem",
    m: "1.25rem",
    l: "1.5rem",
    xl: "1.75rem",
    xxl: "2rem",
} as const;
type Size = keyof typeof SizeHelper;

export const WeightHelper = {
    thin: 200,
    light: 300,
    normal: 500,
    heavy: 700,
    thick: 800,
} as const;
type Weight = keyof typeof WeightHelper;

type Color = "red" | "orange" | "yellow" | "green" | "blue" | "pink" | "purple" | "light" | "dark";

type PolymorphicProps<T extends React.ElementType, OwnProps> = OwnProps & {
	as?: T;
} & Omit<React.ComponentPropsWithRef<T>, keyof OwnProps | "as">;



//--------------------------------------------------------------------------------------
// CONTAINERS
//--------------------------------------------------------------------------------------

type Wrap = "wrap" | "nowrap";
type MainAxis = "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly";
type CrossAxis = "start" | "center" | "end" | "stretch";
type HorizontalAlign = "start" | "center" | "end" | "stretch";
type VerticalAlign = "start" | "center" | "end" | "stretch";
type JustifySelf = "start" | "center" | "end" | "stretch";
type AlignSelf = "start" | "center" | "end" | "stretch";
type Gap = Size | "none";

type FlexProps = {
	wrap: Wrap;
	gap: Gap;
	mainAxis: MainAxis;
	crossAxis: CrossAxis;
	horizontalSelf?: JustifySelf;
	verticalSelf?: AlignSelf;
	fillWidth?: boolean;
	fillHeight?: boolean;
	size?: Size;
};
export type RowProps<T extends React.ElementType = "div"> = PolymorphicProps<T, FlexProps>;
export type ColumnProps<T extends React.ElementType = "div"> = PolymorphicProps<T, FlexProps>;

type Grid = {
	columns: number;
	rows?: number;
	gap: Gap;
	horizontalAlign: HorizontalAlign;
	verticalAlign: VerticalAlign;
	fillWidth?: boolean;
	fillHeight?: boolean;
};
export type GridProps<T extends React.ElementType = "div"> = PolymorphicProps<T, Grid>;
export type TopBarProps = React.ComponentPropsWithRef<"header">; // !!!!DONE!!!!
export type BottomBarProps = React.ComponentPropsWithRef<"nav"> & { // !!!!DONE!!!!
	pages: {
		icon: string;
		label: string;
		href: string;
	}[];
};
export type ViewProps = React.ComponentPropsWithRef<"main">; // !!!!DONE!!!!
export type AccordionProps = Omit<React.ComponentPropsWithRef<"div">, "content"> & { // !!!!DONE!!!!
    header: React.ReactNode;
    content: React.ReactNode;
    isOpenByDefault?: boolean;
};


export type BottomSheetProps = React.ComponentPropsWithRef<"div"> & {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}; 
export type CardProps = React.ComponentPropsWithRef<"article">
export type ChipProps = React.ComponentPropsWithRef<"span">


export type FormProps = Omit<React.ComponentPropsWithoutRef<"form">, "action"> & {
    action: ((arg0: any) => void);
	process: process;
};
//--------------------------------------------------------------------------------------
// BUTTON
//--------------------------------------------------------------------------------------
type ButtonVariants = "theme" | "slab" | "push";
export type ButtonProps = // !!!!DONE!!!!
| (React.ComponentPropsWithRef<"button"> & {
    variant?: ButtonVariants;
    size: Size;
    icon?: iconName;
    text?: string;
    href?: never;
    active?: boolean;
})
| (React.ComponentPropsWithRef<"a"> & {
    variant?: ButtonVariants;
    size: Size;
    icon?: iconName;
    text?: string;
    href: string;
    active?: boolean;
});

export type SegmentedControllerProps = React.ComponentPropsWithRef<"div"> & {
	options: { label: string; icon: string }[];
	active: string;
	onChange: (label: string) => void;
};

//--------------------------------------------------------------------------------------
// ICON
//--------------------------------------------------------------------------------------
export type IconProps = React.ComponentPropsWithRef<"svg"> & {
	name: iconName;
	size: Size;
	color?: Color;
	width?: 3;
}
//--------------------------------------------------------------------------------------
// INPUT
//--------------------------------------------------------------------------------------
export type InputProps = Omit<React.ComponentPropsWithRef<"input">, "size" | "name" | "type" | "placeholder" | "required"> & {
	size: Size;
	name: string;
	type: string;
	label: string;
	placeholder: string;
	icon: iconName;
	required?: boolean;
};

export type ProgressBarProps =
(React.ComponentPropsWithoutRef<"div"> & {
    size: Size;
	color: Color;
	progress: string;
	barText: string;
	caption?: string;
});
