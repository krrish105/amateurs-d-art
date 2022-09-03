import { useFetch } from "../useFetch";
import { GridHeading } from "./GridHeading";
import { ArtistComponent } from "./ArtistComponent";
import Slider from "react-slick";
import { settings } from "../SliderSetting";

export const ArtistsContainer = () => {
	const { data, loading, error } = useFetch(
		"https://api.artic.edu/api/v1/web-artists?fields=title,agent_id"
	);

	if (error) {
		return <div className="pt-7 container">Error...</div>;
	} else if (loading) {
		return <div className="pt-7 container">Loading...</div>;
	} else {
		return (
			<div className="border-b-violet-50 border-b">
				<section className="container pt-16 pb-8 relative">
					<GridHeading heading="web-artists" />
					<Slider {...settings} className="my-10">
						{data.map((el, i) => {
							return (
								<ArtistComponent
									key={i}
									agent_id={el.agent_id}
									title={el.title}
								/>
							);
						})}
					</Slider>
				</section>
			</div>
		);
	}
};
