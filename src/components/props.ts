export default interface ComponentProps {
	children?: React.ReactNode;
	id?: string;
	className?: string;
	style?: React.CSSProperties;
	icon?: [string, number];
}