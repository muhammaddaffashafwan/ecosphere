import styles from './article1.module.css';

export function Article1 () {
  return (
    <>
    		<div className="article">
        <header className="header">
          <div className="logo">
            <img src="asset/logo.jpg" alt="Logo" />
          </div>
        </header>

        {/* In-depth article */}
        <div className="txt">
          <div className="in-depth-article">
            In-Depth Articles for a Future-Friendly Home.
          </div>
          <div className="explore">
            Explore our in-depth articles and unlock the secrets to creating a
            future-friendly home. Start reading now and transform your living
            space into a greener sanctuary!
          </div>
          <a href="#" className="cta-button">
            More Information
          </a>
        </div>
        <img className="img-article1" alt="" src="asset/imgarticle1.jpg" />
        <img className="img-article2" alt="" src="asset/imgarticle2.jpg" />

        {/* All categories */}
        <img
          className="article-item"
          alt=""
          src="asset/imgarticle4.jpg"
          id="img-article4"
        />
        <div className="article-categories-parent" id="AllCategories">
          <div
            className="article-Allcategorie eco-tech1"
            onClick={() => handleRedirect("article2.html")}
            style={{ cursor: "pointer" }}
          >
            All Categories
          </div>
          <div
            className="article-EcoEssentials eco-tech1"
            onClick={() => handleRedirect("article2.html")}
            style={{ cursor: "pointer" }}
          >
            Eco Essentials
          </div>
          <div
            className="article-GreenLiving eco-tech1"
            onClick={() => handleRedirect("article2.html")}
            style={{ cursor: "pointer" }}
          >
            Green Living
          </div>
          <div
            className="article-EcoTech eco-tech1"
            onClick={() => handleRedirect("article2.html")}
            style={{ cursor: "pointer" }}
          >
            ECO TECH
          </div>
        </div>
        <div className="news" id="news-img">
          <div className="image-content">
            <img
              src="asset/imgarticle3.jpg"
              alt="Eco Green House Image"
              className="img-article3"
            />
          </div>
        </div>

        <div className="text" id="textContainer">
          <div className="headline">
            <div className="bullets">
              <div className="calendar">
                <img
                  className="icons-calendar"
                  alt=""
                  src="./asset/calendar.png"
                />
                <div className="danastra">Jan 12, 2023</div>
              </div>
              <div className="category">
                <img
                  className="icons-calendar"
                  alt=""
                  src="./asset/imgarticle3.jpg"
                />
                <div className="advices">Advices</div>
              </div>
              <div className="calendar">
                <img
                  className="icons-calendar"
                  alt=""
                  src="./asset/account.png"
                />
                <div className="danastra">Danastra</div>
              </div>
            </div>
            <a
              className="eco-house-environmentally"
              href="https://www.fifgroup.co.id/danastra/eco-house-rumah-ramah-lingkungan-dan-hemat-biaya"
              target="_blank"
              rel="noopener noreferrer"
            >
              Eco House: Environmentally Friendly and Cost-Effective Home
            </a>
          </div>
          <div className="have-you-ever">
            Have you ever heard of sustainable development? Sustainable
            development starts from strategies to practices to meet daily needs
            without sacrificing or damaging nature. Of course, to achieve
            sustainability goals and implement them, [...]
          </div>
        </div>
        <img
          className="article-inner"
          alt=""
          src="asset/imgarticle5.jpg"
          id="frameImage1"
        />

        {/* Additional sections omitted for brevity */}
      </div>
    </>
  );
}  