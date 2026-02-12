import { FrameProps, SizeHelper, WeightHelper } from "@/Components/Types";
export default function Frame<T extends React.ElementType = "div">(props: FrameProps<T>) {
    const { as, p, px, py, border, borderColor, borderWidth, radius, maxWidth, fillWidth, fillHeight, className, style, children, ...frameProps } = props;
    const classNames =
        "app-frame" +
        (className ? " " + className : "") +
        (fillWidth ? " fill-width" : "") +
        (fillHeight ? " fill-height" : "");

    const styles = {
        ...style,
        padding: p ? SizeHelper[p] : undefined,
        paddingLeft: px ? SizeHelper[px] : undefined,
        paddingRight: px ? SizeHelper[px] : undefined,
        paddingTop: py ? SizeHelper[py] : undefined,
        paddingBottom: py ? SizeHelper[py] : undefined,
        borderStyle: border ? "solid" : undefined,
        borderColor: borderColor,
        borderWidth: borderWidth ? WeightHelper[borderWidth] : undefined,
        borderRadius: radius === "full" ? "9999px" : radius ? SizeHelper[radius] : undefined,
        maxWidth: maxWidth === "content" ? "fit-content" : maxWidth === "wide" ? "800px" : maxWidth === "full" ? "100%" : undefined
    }

    const Component = (as || "div") as React.ElementType;
    return (
        <Component {...frameProps} className={classNames} style={styles}>
            { children }
        </Component>
    );
}