import { RowProps, ColumnProps } from "@/Components/Types";

export function Row<T extends React.ElementType = "div">(props: RowProps<T>) {
	const {
		as,
		wrap,
		gap,
		mainAxis,
		crossAxis,
		horizontalSelf,
		verticalSelf,
		fillWidth,
		fillHeight,
		size,

		className,
		style,
		children,
		...rowProps
	} = props;

	const Component = (as || "div") as React.ElementType;

	const classNames =
		"app-wrapper" +
		(className ? " " + className : "") +
		" flow-row" +
		(wrap ? " wrap-" + wrap : "") +
		(gap ? " gap-" + gap : "") +
		(mainAxis ? " main-axis-align-" + mainAxis : "") +
		(crossAxis ? " cross-axis-align-" + crossAxis : "") +
		(horizontalSelf ? " justify-self-" + horizontalSelf : "") +
		(verticalSelf ? " align-self-" + verticalSelf : "") +
		(fillWidth ? " fill-width" : "") +
		(fillHeight ? " fill-height" : "") +
		(size ? " size-" + size : "");

	const styles = {
		...style
	}

	return (
		<Component {...rowProps} className={classNames} style={styles}>
			{children}
		</Component>
	);
}

export function Column<T extends React.ElementType = "div">(props: ColumnProps<T>) {
	const {
		as,
		wrap,
		gap,
		mainAxis,
		crossAxis,
		horizontalSelf,
		verticalSelf,
		fillWidth,
		fillHeight,
		size,

		className,
		style,
		children,
		...columnProps
	} = props;

	const Component = (as || "div") as React.ElementType;

	const classNames =
		"app-wrapper" +
		(className ? " " + className : "") +
		" flow-column" +
		(wrap ? " wrap-" + wrap : "") +
		(gap ? " gap-" + gap : "") +
		(mainAxis ? " main-axis-align-" + mainAxis : "") +
		(crossAxis ? " cross-axis-align-" + crossAxis : "") +
		(horizontalSelf ? " justify-self-" + horizontalSelf : "") +
		(verticalSelf ? " align-self-" + verticalSelf : "") +
		(fillWidth ? " fill-width" : "") +
		(fillHeight ? " fill-height" : "") +
		(size ? " size-" + size : "");

	const styles = {
		...style
	}

	return (
		<Component {...columnProps} className={classNames} style={styles}>
			{children}
		</Component>
	);
}