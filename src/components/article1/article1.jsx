import "./article1.css";

export function Article1() {
	return (
		<>
			<div className="article"> </div>

			<section>
				<div className="txt">
					<div className="in-depth-article">In-Depth Articles for a Future-Friendly Home.</div>
					<div className="explore">
						Explore our in-depth articles and unlock the secrets to creating a future-friendly home. Start reading now
						and transform your living space into a greener sanctuary!
					</div>
					<a href="#" className="cta-button">
						More Information
					</a>
				</div>
				<img className="img-article1" alt="" src="asset/imgarticle1.jpg" />

				<img className="img-article2" alt="" src="asset/imgarticle2.jpg" />
			</section>

			<section>
				<div className="article-categories-parent" id="AllCategories">
					<div className="article-Allcategorie">
						<div
							className="eco-tech1"
							onClick={() => (window.location.href = "article2.html")}
							style={{ cursor: "pointer" }}
						>All Categories</div>
					</div>
				</div>
				<div className="article-EcoEssentials">
        <div
							className="eco-tech1"
							onClick={() => (window.location.href = "article2.html")}
							style={{ cursor: "pointer" }}
						>Eco Essentials</div>
					</div>
				<div className="article-GreenLiving">
        <div
							className="eco-tech1"
							onClick={() => (window.location.href = "article2.html")}
							style={{ cursor: "pointer" }}
						>Green Living</div>
					</div>
				<div className="article-EcoTech">
        <div
							className="eco-tech1"
							onClick={() => (window.location.href = "article2.html")}
							style={{ cursor: "pointer" }}
						>ECO TECH</div>
					</div>
				<div className="news" id="news-img">
					<div className="image-content">
						<img src="asset/imgarticle3.jpg" alt="Eco Green House Image" className="img-article3" />
					</div>
				</div>

				<img className="article-item" alt="" src="asset/imgarticle4.jpg" id="img-article4" />
				<div className="text" id="textContainer">
					<div className="headline">
						<div className="bullets">
							<div className="calendar">
								<img className="icons-calendar" alt="" src="./asset/calendar.png" />

								<div className="danastra">Jan 12, 2023</div>
							</div>
							<div className="category">
								<img className="icons-calendar" alt="" src="./asset/imgarticle3.jpg" />

								<div className="advices">Advices</div>
							</div>
							<div className="calendar">
								<img className="icons-calendar" alt="" src="./asset/account.png" />

								<div className="danastra">Danastra</div>
							</div>
						</div>
						<a
							className="eco-house-environmentally"
							href="https://www.fifgroup.co.id/danastra/eco-house-rumah-ramah-lingkungan-dan-hemat-biaya"
							target="_blank"
						>
							Eco House: Environmentally Friendly and Cost-Effective Home
						</a>
					</div>
					<div className="have-you-ever">
						Have you ever heard of sustainable development? Sustainable development starts from strategies to practices
						to meet daily needs without sacrificing or damaging nature. Of course, to achieve sustainability goals and
						implement them, [...]
					</div>
				</div>

				<img className="article-inner" alt="" src="asset/imgarticle5.jpg" id="frameImage1" />

				<div className="text1" id="textContainer1">
					<div className="headline">
						<div className="bullets">
							<div className="calendar">
								<img className="icons-calendar" alt="" src="asset/calendar.png" />

								<div className="danastra">Mar 30, 2020</div>
							</div>
							<div className="category">
								<img className="icons-calendar" alt="" src="Icons / tag.svg" />

								<div className="advices">Advices</div>
							</div>
							<div className="calendar">
								<img className="icons-calendar" alt="" src="asset/calendar.png" />

								<div className="danastra">Haris Sukarnayudabrata</div>
							</div>
						</div>
						<a className="eco-house-environmentally" href="https://blog.mediasarana.com/__trashed-5/" target="_blank">
							Eco Green House Energy-Saving and Cost-Saving Housing Concept
						</a>
					</div>
					<div className="have-you-ever">
						Currently, our society is very selective in choosing a residence to live in, In addition to the location and
						building specifications, now people are also starting to be sensitive when choosing the concept and design
						of the housing offered, [...]
					</div>
				</div>
				<img className="frame-icon" alt="" src="asset/imgarticle6.jpg" id="frameImage2" />

				<div className="text2" id="textContainer2">
					<div className="headline">
						<div className="bullets">
							<div className="calendar">
								<img className="icons-calendar" alt="" src="asset/calendar.png" />

								<div className="danastra">May 29, 2024</div>
							</div>
							<div className="category">
								<img className="icons-calendar" alt="" src="Icons / tag.svg" />

								<div className="advices">Advices</div>
							</div>
							<div className="calendar">
								<img className="icons-calendar" alt="" src="asset/account.png" />

								<div className="danastra">Biru Cahya Imanda</div>
							</div>
						</div>
						<a
							className="eco-house-environmentally"
							href="https://www.solarkita.com/blog/apa-itu-eco-house-design-ini-pengertian-hingga-manfaatnya"
							target="_blank"
						>
							What is Eco House Design? Here&apos;s the Definition and Benefits!
						</a>
					</div>
					<div className="have-you-ever">
						Unlike housing trends that focus solely on aesthetics, eco-house or environmentally friendly home designs
						offer alternative housing that is not only unique but also sustainable. [...]
					</div>
				</div>
			</section>

			<div className="more-articles">More Articles</div>
			<img className="img-icon" alt="" src="asset/imgarticle7.jpg" id="imgImage" />

			<div className="body" id="bodyContainer">
				<div className="headline3">
					<div className="headline4">
						<a
							className="title"
							href="https://artigianfer.com/en/news/greenhouses-how-to-reduce-pallution-and-waste/"
							target="_blank"
						>
							<p className="eco-greenhouses">Eco-greenhouses:</p>
							<p className="eco-greenhouses">how to reduce environmental impact</p>
						</a>
					</div>
					<div className="bullets3">
						<div className="calendar">
							<img className="icons-calendar" alt="" src="asset/calendar.png" />

							<div className="danastra">Feb 24, 2022</div>
						</div>
						<div className="calendar">
							<img className="icons-calendar" alt="" src="asset/account.png" />

							<div className="danastra">Artigianfer</div>
						</div>
					</div>
				</div>
				<div className="our-age-is">
					Our age is unfortunately marked by worrying climate change. The ever-increasing level of pollution requires
					commitment from everyone to remedy the environmental damage caused in the last century. Eco-greenhouses
					represent a step forward in a virtuous and environmentally friendly direction. Artigianfer has always chosen
					the path of sustainability and has invested many resources in the development of greenhouses that take
					advantage of renewable energy, patenting some innovative and sustainable greenhouse models. [...]
				</div>
			</div>
			<div className="body1" id="bodyContainer1">
				<div className="headline3">
					<div className="headline6">
						<a
							className="title1"
							href="https://upland.psp.pertanian.go.id/public/artikel/1672411257/sistem-smart-green-house-sebagai-pendongkrak-produktivitas-tanaman"
							target="_blank"
						>
							“Smart Green House” System as a Plant Productivity Booster
						</a>
					</div>
					<div className="bullets3">
						<div className="calendar">
							<img className="icons-calendar" alt="" src="asset/calendar.png" />

							<div className="danastra">Dec 19, 2022</div>
						</div>
						<div className="calendar">
							<img className="icons-calendar" alt="" src="asset/account.png" />

							<div className="danastra">UPLAND Project</div>
						</div>
					</div>
				</div>
				<div className="our-age-is">
					Entering the era of the industrial revolution 4.0, Smart Farming is one of the solutions to increase
					agricultural efficiency and productivity in various countries including Indonesia. One of the applications of
					smart farming is Smart Green House which is a hydroponic planting method. Technically Smart Green House is
					controlled automatically to control humidity, temperature, nutrients and weather. With Smart Green House
					agricultural productivity increases, income is also raised. Smart Green House is a tool to help farmers obtain
					better quality and quantity of agricultural products compared to conventional methods. [...]
				</div>
			</div>
			<img className="img-icon1" alt="" src="asset/imgarticle8.jpg" id="imgImage1" />

			<img className="img-icon2" alt="" src="asset/imgarticle9.jpg" id="imgImage2" />

			<div className="body2" id="bodyContainer2">
				<div className="headline3">
					<div className="headline6">
						<a
							className="title1"
							href="https://myeco.id/hemat-energi-eco-green-living-konsep-tepat-membuat-rumah-modern/"
							target="_blank"
						>
							Save Energy! Eco-Green Living The Right Concept to Make a Modern Home
						</a>
					</div>
					<div className="bullets3">
						<div className="calendar">
							<img className="icons-calendar" alt="" src="asset/calendar.png" />

							<div className="danastra">Nov 2, 2023</div>
						</div>
						<div className="calendar">
							<img className="icons-calendar" alt="" src="asset/account.png" />

							<div className="danastra">myeco</div>
						</div>
					</div>
				</div>
				<div className="healthy-living-can-container">
					<span>
						Healthy living can certainly make the body feel better, the same as the house where we live. Saving energy
						is the goal, the better our home, the better the daily life we dream of. Saving electricity is also one of
						the goals, right? But now all that has changed, making the concept of saving energy alone is not enough. But
						it needs a renewable and continuous concept, one of which is Eco-Green Living. What is meant by energy
						conservation? Conservation means using energy when needed so as not to waste energy. If we use less energy,
						it will help us save money and make our planet more environmentally friendly. [...]
					</span>
				</div>
			</div>

			<img className="icon-more" alt="" src="asset/Icon More.png" />
		</>
	);
}
