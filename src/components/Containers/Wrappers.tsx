import { RowProps, ColumnProps } from "@/Components/Types";

export function Row<T extends React.ElementType = "div">(props: RowProps<T>) {
    const {
        as,
        wrap,
        gap,
        mainAxis,
        crossAxis,
        fillWidth,
        fillHeight,
        className,
        children,
        ...rowProps
    } = props;

    const classNames =
        "app-wrapper" +
        (className ? " " + className : "") +
        " flow-row" +
        (wrap ? " wrap-" + wrap : "") +
        (gap ? " gap-" + gap : "") +
        (mainAxis ? " main-axis-align-" + mainAxis : "") +
        (crossAxis ? " cross-axis-align-" + crossAxis : "") +
        (fillWidth ? " fill-width" : "") +
        (fillHeight ? " fill-height" : "");

    const Component = (as || "div") as React.ElementType;
    return(
        <Component className={classNames} {...rowProps}>
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
        fillWidth,
        fillHeight,
        className,
        children,
        ...columnProps
    } = props;

    const Component = as || "div" as React.ElementType;
    const classNames =
        "app-wrapper" +
        (className ? " " + className : "") +
        " flow-column" +
        (wrap ? " wrap-" + wrap : "") +
        (gap ? " gap-" + gap : "") +
        (mainAxis ? " main-axis-align-" + mainAxis : "") +
        (crossAxis ? " cross-axis-align-" + crossAxis : "") +
        (fillWidth ? " fill-width" : "") +
        (fillHeight ? " fill-height" : "");

    return (
        <Component className={classNames} {...columnProps}>
            {children}
        </Component>
    );
}