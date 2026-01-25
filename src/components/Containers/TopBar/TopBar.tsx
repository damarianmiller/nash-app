import "./TopBar.css";
import { TopBarProps } from "@/Components/Props";
import Button from "@/Components/Buttons/Button";
import Container from "@/Components/Containers/Wrapper";
import Text from "@/Components/Text/Text";

export default function TopBar(props: TopBarProps) {
    const { className, ...topBarProps } = props;
    const classNames = "app-topbar" + (className ? " " + className : "");

    return (
        <header {...topBarProps} className={classNames}>
            <Container flow="row" wrap="nowrap" xAlign="start" yAlign="center" gap="none">
                {false && <Button size="m" curve="circular" icon="arrow-left" href="../"/>}
            </Container>
            <Container flow="row" wrap="nowrap" xAlign="center" yAlign="center" gap="none">
                <Text tag="h1" className="app-topbar-brand">Nash</Text>
            </Container>
            <Container flow="row" wrap="nowrap" xAlign="end" yAlign="center" gap="none">
                {false && <Button size="m" curve="circular" icon="user" />}
            </Container>
        </header>
    );
}