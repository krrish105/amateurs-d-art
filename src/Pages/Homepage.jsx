import { Header } from "../components/Header";
import { ArtistsContainer } from "../components/ArtistsContainer";
import { ArtworksContainer } from "../components/ArtworksContainer";

export const Homepage = () => {
	return (
		<main>
			<Header />
			<ArtworksContainer />
			<ArtistsContainer />
		</main>
	);
};
