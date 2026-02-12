import { GridProps } from "@/Components/Types";
export default function Grid<T extends React.ElementType = "div">(props: GridProps<T>) {
    const {
        as,
        columns,
        rows,
        gap,
        fillWidth,
        fillHeight,
        className,
        style,
        children,
        ...gridProps
    } = props;
    
    const classNames = 
        "app-grid" +
        (className ? " " + className : "") +
        (gap ? " gap-" + gap : "") +
        (fillWidth ? " fill-width" : "") +
        (fillHeight ? " fill-height" : "");
    
    const styles = {
        gridTemplateRows: rows ? "repeat(" + rows + ", 1fr)" : undefined,
        gridTemplateColumns: columns ? "repeat(" + columns + ", 1fr)" : undefined,
        ...style,
    }

    const Component = (as || "div") as React.ElementType;
    return (
        <Component className={classNames} style={styles} {...gridProps}>
            {children}
        </Component>
    );
}