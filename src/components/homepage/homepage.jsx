
import "./homepage.css";

export function Homepage() {
  return (
    <>
      <div className="home-page">
        <img className="vector-icon" alt="" src="/images/footerHP.png" />

        <img className="color-blur-icon" alt="" src="/images/Color BlurHP.png" />

        

        <div className="home-page-item"></div>
        <img className="home-page-icon" alt="" src="/images/homepage-plant.png" />
        <div className="home-page-title">Smart Living, Greener Future</div>
        <div className="at-ecosmophere">
          "At Ecosmophere, we empower you with the knowledge to create an
          eco-friendly home. Explore smart solutions, sustainable practices, and
          practical tips to reduce your environmental footprint while enhancing
          your living space. Start your journey toward greener living today".
        </div>
        <section className="hover-more-s">
          <a href="#" className="cta-buttons">
            Get To Know Us
          </a>
        </section>
        <img className="vector-icon2" alt="" src="/images/VectorgreenHP.png" />

        <div className="about-us">ABOUT US</div>
        <div className="detail-about-us">
          Ecosmophere was founded with a vision to promote greener living by
          making eco-friendly home information easy to access. We offer
          practical tips, smart solutions, and valuable resources to help you
          adopt sustainable practices in your everyday life. Our passion is to
          inspire a community of environmentally conscious individuals who
          strive to make a positive impact on the world, starting from their
          homes.
        </div>
        <div className="frame-type-1">
          <img className="about-us-1" alt="" src="/images/aboutus1.jpg " />
        </div>
        <div className="frame-type-2">
          <img className="about-us-2" alt="" src="/images/aboutus2.jpg" />
        </div>
        <div className="frame-type-3">
          <img className="about-us-3" alt="" src="/images/aboutus3.jpg" />
        </div>
        <div className="frame-type-4">
          <img className="about-us-4" alt="" src="/images/aboutus4.jpg" />
        </div>

        <img className="vector-icon3" alt="" src="/images/VectorgreenHP.png" />

        <div className="section-3">
          <div className="title">
            <div className="title-1">
              <div className="title-up">
                <div className="title-up-caption">
                  Find knowledge that matters
                </div>
                <div className="title-acc"></div>
              </div>
              <div className="title-down">
                Explore articles to elevate your eco-journey!
              </div>
            </div>
          </div>

          <div className="left-side">
            <div className="article-a">
              <img src="/images/homearticle1.jpg" />
              <div className="article-content">
                <div className="article-title">
                  <div className="article-title">
                    Beginners Guide to Installing Solar Panels at Home
                  </div>
                </div>
                <div className="article-time">
                  <img src="/images/clock.png" />
                  <p>powerstarelectricals | Oct 24, 2024</p>
                </div>
              </div>
            </div>

            <div className="article-b">
              <img src="/images/homearticle2.jpg" />

              <div className="article-content">
                <div className="article-title">
                  <div className="article-title">
                    The Magic of Biophilic Design: Bringing Nature Indoors for a
                    Healthier Living Space
                  </div>
                </div>
                <div className="article-time">
                  <img src="/images/clock.png" />
                  <p>silvotherapy | Jan 31, 2024</p>
                </div>
              </div>
            </div>

            <div className="article-c">
              <img src="/images/homearticle3.jpg" />
              <div className="article-content">
                <div className="article-title">
                  <div className="article-title">
                    How Greywater Systems Can Help You Save Money And Water: An
                    Interview With Leigh Jerrard Of Greywater Corps
                  </div>
                </div>
                <div className="article-time">
                  <img src="/images/clock.png" />
                  <p>forbes | May 31, 2022</p>
                </div>
              </div>
            </div>
          </div>

          <div className="right-side">
            <img src="/images/foto9.jpg" />

            <div className="article-4">
              <div className="article-4-content">
                <b>5 Inexpensive Ideas To Make Your Home More Eco-Friendly</b>
                <div className="article-4-desc">
                  Many assume that being more environmentally conscious means
                  their living expenses will increase. However, you do not have
                  to break the bank to make your home more eco-friendly; there
                  are many simple and cost-effective ways to transform your home
                  into a green haven. Consider five inexpensive ideas to make
                  your home more eco-friendly that will help you turn your home
                  into a sustainable and environmentally responsible living
                  space.
                </div>
              </div>
              <div className="article-time">
                <img src="/images/clock.png" />
                <p>ecoluxlifestyle | Nov 19, 2023</p>
              </div>
            </div>
          </div>
        </div>

        <section className="click-me">
          <a href="#" className="cta-button-2">
            CLICK ME
          </a>
        </section>
        {/* <div className="buttonprimary1" id="buttonPrimaryContainer">
          <b className="label">click me</b>
        </div> */}
      </div>
    </>
  );
}
