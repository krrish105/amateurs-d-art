import { useParams } from "react-router";
import { useFetch } from "../useFetch";
import { Link } from "react-router-dom";

export const ArtistPage = () => {
	const id = useParams();
	const { data, loading, error } = useFetch(
		`https://api.artic.edu/api/v1/agents/${id.artistId}?fields=title,birth_date,birth_place,description,artwork_ids`
	);

	const ArtistId = ({ id, imgIndex }) => {
		const { data, loading, error } = useFetch(
			`https://api.artic.edu/api/v1/artworks/${id}?fields=title,image_id`
		);
		if (error) {
			return;
		} else if (loading) {
			return <div>Loading...</div>;
		} else {
			const imgUrl = `https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg`;
			return (
				<div
					key={imgIndex}
					className="relative w-full cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out min-h-[16rem] border"
				>
					{data.image_id && (
						<img src={imgUrl} alt="" className="w-ful h-full" />
					)}
					<Link
						to={"/amateurs-d-art/artwork/" + id}
						className="absolute bottom-3 left-2 right-2 text-lg bg-black p-3"
					>
						<h3 className="max-w-sm text-ellipsis whitespace-nowrap overflow-hidden">
							{data.title}
						</h3>
					</Link>
				</div>
			);
		}
	};
	if (error) {
		return <div className="pt-7 container">Error...</div>;
	} else if (loading) {
		return <div className="pt-7 container">Loading...</div>;
	} else {
		return (
			<main className="pt-7 container">
				<div className="flex justify-center gap-8 flex-col lg:flex-row">
					<div className="text-3xl static top-20 h-fit leading-loose min-w-[18rem] lg:sticky">
						<h2>{data.title}</h2>
						{data.birth_date && (
							<div>
								Birth Date: <span className="text-2xl">{data.birth_date}</span>
							</div>
						)}
						{data.birth_place && (
							<div>
								Birth Place:{" "}
								<span className="text-2xl">{data.birth_place}</span>
							</div>
						)}
					</div>
					<div>
						<div>
							<p>
								{data.description
									? data.description
									: "Oops! No description was provided!"}
							</p>
						</div>
						<div className="artist-page-image-grid">
							{data.artwork_ids.map((el, i) => {
								return <ArtistId id={el} key={i} imgIndex={i} />;
							})}
						</div>
					</div>
				</div>
			</main>
		);
	}
};
