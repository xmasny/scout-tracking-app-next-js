interface Props {
	readonly children: React.ReactNode;
}
export default function Home({children}: Props): JSX.Element {
	return (
		<main>
			{children}
		</main>
	);
}
