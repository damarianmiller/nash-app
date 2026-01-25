import "./Wrapper.css";
import { WrapperProps } from "../Props";
export default function Wrapper(props: WrapperProps) {
    const { flow, wrap, xAlign, yAlign, gap, fillWidth, fillHeight, className, style, children, ...containerProps } = props;
    let classNames =
    "app-wrapper" +
    (className ? " " + className : "") +
    (flow ? " flow-" + flow : "") + 
    (wrap ? " wrap-" + wrap : "") +
    (gap ? " gap-" + gap : "") + 
    (fillWidth ? " fill-width" : "") +
    (fillHeight ? " fill-height" : "");

    if (flow === "row") {
        classNames = classNames + (xAlign ? " main-axis-align-" + xAlign: "") + (yAlign ? " cross-axis-align-" + yAlign : "");
    } else if (flow === "column") {
        classNames = classNames + (yAlign ? " main-axis-align-" + yAlign : "") + (xAlign ? " cross-axis-align-" + xAlign : "");
    }

    return (
        <section {...containerProps} className={classNames}>
            { children }
        </section>
    );
}