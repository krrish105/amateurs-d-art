import { Link } from "react-router-dom";
import { useFetch } from "../useFetch";

export const ArtistComponent = ({ agent_id, title }) => {
	const GetId = ({ id }) => {
		const {
			data: dataArtwork,
			loading: loadingArtwork,
			error: errorArtwork,
		} = useFetch(`https://api.artic.edu/api/v1/artworks/${id}?fields=image_id`);
		if (errorArtwork) {
			return <DefaultArtistImage />;
		}
		if (loadingArtwork) {
			return <div>Loading...</div>;
		} else {
			if (dataArtwork?.image_id) {
				const imgUrl = `https://www.artic.edu/iiif/2/${dataArtwork.image_id}/full/843,/0/default.jpg`;
				return (
					<>
						<img src={imgUrl} alt="" className="w-full h-[inherit] absolute" />
					</>
				);
			} else {
				return <DefaultArtistImage />;
			}
		}
	};

	const GetImgAgent = ({ id }) => {
		const {
			data: dataAgent,
			loading: loadingAgent,
			error: errorAgent,
		} = useFetch(
			`https://api.artic.edu/api/v1/agents/${id}?fields=artwork_ids`
		);
		if (errorAgent) {
			return <div>Error...</div>;
		} else if (loadingAgent) {
			return <div>Loading...</div>;
		} else {
			if (dataAgent?.artwork_ids?.length > 0) {
				return (
					<>
						{dataAgent.artwork_ids[0] && (
							<GetId id={dataAgent.artwork_ids[0]} />
						)}
					</>
				);
			} else {
				return <DefaultArtistImage />;
			}
		}
	};

	return (
		<div className="border border-white h-[24rem]">
			{agent_id && (
				<Link
					to={"/artist/" + agent_id}
					className="block relative cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out w-full h-full"
				>
					{agent_id && <GetImgAgent id={agent_id} />}
					{title && (
						<div className="absolute bottom-3 left-3 text-lg bg-black p-3 max-w-sm">
							<h3>{title}</h3>
						</div>
					)}
				</Link>
			)}
		</div>
	);
};

const DefaultArtistImage = () => {
	return (
		<div className="flex justify-center items-center w-full h-[inherit] absolute default-artist-image">
			<span className="text-5xl">Artist</span>
		</div>
	);
};
