import "./View.css";
import { ViewProps } from "@/Components/Types"
import { Column } from "@/Components/Containers/Wrappers";

export default function View(props: ViewProps) {
    const { className, children, ...viewProps } = props;
    const classNames =
        "app-view" +
        (className ? " " + className : "");

    return (
        <Column {...viewProps} className={classNames} as="main" wrap="nowrap" mainAxis="start" crossAxis="center" gap="xxl" fillWidth fillHeight>
            {children}
        </Column>
    );
}