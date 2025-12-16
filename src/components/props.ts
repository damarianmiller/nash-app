export default interface ComponentProps {
    children?: React.ReactNode,
    className?: string,
    style?: React.CSSProperties,
    size?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl",
}