import "./TopBar.css";
import { TopBarProps } from "@/Components/Types";

import Button from "@/Components/Buttons/Button";
import { Row } from "@/Components/Containers/Wrappers";
import Grid from "@/Components/Containers/Grid";

export default function TopBar(props: TopBarProps) {
    const { className, ...topBarProps } = props;
    const classNames =
        "app-topbar" +
        (className ? " " + className : "");

    return (
        <Grid {...topBarProps} className={classNames} as="header" columns={3} gap="none" fillWidth>
            <Row wrap="nowrap" mainAxis="start" crossAxis="center" gap="none">
                {false && <Button size="m" icon="arrow-left" href="../" />}
            </Row>
            <Row wrap="nowrap" mainAxis="center" crossAxis="center" gap="none">
                <h1>Nash</h1>
            </Row>
            <Row wrap="nowrap" mainAxis="end" crossAxis="center" gap="none">
                {false && <Button size="m" icon="user" />}
            </Row>
        </Grid>
    );
}