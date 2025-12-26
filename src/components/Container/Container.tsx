
import "./Container.css";
import BaseProps from "../props"

interface ContainerProps extends BaseProps {
    flow: "row" | "column";
    gap?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
    mainAxisAlign: "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly";
    crossAxisAlign: "start" | "center" | "end" | "stretch" | "baseline";
}

export default function Container({ children, id, className, style, flow, gap, mainAxisAlign, crossAxisAlign }: ContainerProps) {
    const classNames = "app-container" + (flow ? " flow-" + flow : "") + (gap ? " gap-" + gap : "") + (mainAxisAlign ? " main-axis-align-" + mainAxisAlign : "") + (crossAxisAlign ? " cross-axis-align-" + crossAxisAlign : "") + (className ? " " + className : "");
    
    return (
        <div id={id} className={classNames} style={style}>
            {children}
        </div>
    );
}