import "./inspiration.css";

export function Inspiration() {
  return (
    <div className='body-inspiration1'>
      <div className='inspiration-guide-panduan-inner'></div>

      <div className='eco-house-guide-cover'>
        <img src='/images/ecohouseguide.png' />
        <div className='eco-house-guide'>ECO HOUSE GUIDE</div>
      </div>

      <div className='eco-frame'>
        An environmentally friendly house (eco house) is a house designed to minimize environmental
        impact, reduce the use of natural resources and carbon emissions. By utilizing sustainable
        technology and materials, this house creates a healthy living space and maximizes energy and
        water efficiency.
      </div>

      {/* <div className='eco-desc'>
        An environmentally friendly house (eco house) is a house designed to minimize environmental
        impact, reduce the use of natural resources and carbon emissions. By utilizing sustainable
        technology and materials, this house creates a healthy living space and maximizes energy and
        water efficiency.
      </div> */}

      <div className='benefits-wrapper'>
        <div className='benefits-title'>BENEFITS IF YOU APPLY IT</div>

        <div className='card-wrapper'>
          <div className='card-bif-1'>
            <img className='card-bif-1-child' alt='' src='/images/cardbif1.png' />
            <div className='card-bif-1-item'>
              <div className='overlay'>
                <div className='text-bif'>
                  ENERGY
                  <br />
                  AND
                  <br />
                  COST SAVING
                </div>
              </div>
            </div>
          </div>

          <div className='card-bif-2'>
            <img className='card-bif-1-child' alt='' src='/images/cardbif2.png' />
            <div className='card-bif-1-item'>
              <div className='overlay'>
                <div className='text-bif'>
                  OCCUPANT
                  <br />
                  HELP
                </div>
              </div>
            </div>
          </div>

          <div className='card-bif-3'>
            <img className='card-bif-1-child' alt='' src='/images/cardbif3.png' />
            <div className='card-bif-1-item'>
              <div className='overlay'>
                <div className='text-bif'>MINIMAL ENVIRONMENTAL IMPACT</div>
              </div>
            </div>
          </div>

          <div className='card-bif-4'>
            <img className='card-bif-1-child' alt='' src='/images/cardbif4.png' />
            <div className='card-bif-1-item'>
              <div className='overlay'>
                <div className='text-bif'>
                  HIGHER
                  <br />
                  PROPERTY
                  <br />
                  VALUES
                </div>
              </div>
            </div>
          </div>

          <div className='card-bif-5'>
            <img className='card-bif-1-child' alt='' src='/images/cardbif5.png' />
            <div className='card-bif-1-item'>
              <div className='overlay'>
                <div className='text-bif'>
                  SUPPORT LOCAL
                  <br />
                  COMMUNITIES
                  <br />
                  AND ECONOMIES
                </div>
              </div>
            </div>
          </div>

          <div className='card-bif-6'>
            <img className='card-bif-1-child' alt='' src='/images/cardbif6.png' />
            <div className='card-bif-1-item'>
              <div className='overlay'>
                <div className='text-bif'>SUSTAINABLE MATERIALS</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='environmentally-title'>ENVIRONMENTAL FRIENDLY MATERIALS THAT CAN BE USED</div>

      <div className='environment-frame'>
        <div className='environment-categories'>
          <img src='/images/envi1.png' />
          <div className='recycled-wood'>RECYCLED WOOD</div>
        </div>

        <div className='environment-categories0'>
          <img src='/images/envi2.png' />
          <div className='natural-insulation'>
            NATURAL
            <br />
            INSULATION
          </div>
        </div>

        <div className='environment-categories1'>
          <img src='/images/envi3.png' />
          <div className='eco-friendly-paint'>
            ECO-FRIENDLY
            <br />
            PAINT
          </div>
        </div>

        <div className='environment-categories2'>
          <img src='/images/envi4.png' />
          <div className='clay-brick'>CLAY BRICK</div>
        </div>

        <div className='environment-categories3'>
          <img src='/images/envi5.png' />
          <div className='energy-saving-glass'>
            ENERGY-SAVING
            <br />
            GLASS
          </div>
        </div>

        <div className='environment-categories4'>
          <img src='/images/envi6.png' />
          <div className='bamboo'>BAMBOO</div>
        </div>
      </div>

      <div className='renewable-title'>
        3 Renewable Energy Technologies for Environmentally Friendly Homes
      </div>

      <div className='components-1'>
        <img src='/images/comp1.png' />
        <div className='renew-title-wrapper1'>
          <div className='renew-title1'>Solar Panels</div>

          <div className='comp-type1'>
            <div className='comp-type-container1'>
              <b>Types: </b>
              <ol className='renew-list'>
                <li>Monocrystalline panels (high efficiency, durable)</li>
                <li>Polycrystalline panels (slightly lower efficiency, more affordable)</li>
                <li>
                  Thin-film panels (flexible, suitable for large areas but with lower efficiency)
                </li>
              </ol>
            </div>
          </div>
          <div className='renew-how1'>
            <div className='renew-how-ben-container1'>
              <b>How It Works: </b>
              <span className='renew-how-ben-capture'>
                Solar panels capture sunlight and convert it into electricity through photovoltaic
                cells that generate an electric current when exposed to light.
              </span>
            </div>
          </div>
          <div className='renew-ben1'>
            <div className='renew-ben-container1'>
              <b>Benefits: </b>
              <span className='renew-how-ben-capture'>
                Reduces electricity costs, produces eco-friendly energy with no carbon emissions,
                and increases property value.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='components-1'>
        <img src='/images/comp2.png' />
        <div className='renew-title-wrapper1'>
          <div className='renew-title1'>Passive Solar Heating and Cooling</div>

          <div className='comp-type1'>
            <div className='comp-type-container1'>
              <b>Types:</b>
              <ol className='renew-list'>
                <li>
                  Passive Solar Heating: Uses glass or windows to capture solar heat during the
                  winter.
                </li>
                <li>
                  Natural Ventilation: Building design that allows air to flow naturally to keep the
                  temperature cool in summer.
                </li>
              </ol>
            </div>
          </div>
          <div className='renew-how1'>
            <div className='renew-how-ben-container1'>
              <b>How It Works: </b>
              <span className='renew-how-ben-capture'>
                Utilizes house design and window orientation to maximize sunlight during winter and
                minimize heat during summer. Heating or cooling occurs without additional energy.
              </span>
            </div>
          </div>
          <div className='renew-ben1'>
            <div className='renew-ben-container1'>
              <b>Benefits: </b>
              <span className='renew-how-ben-capture'>
                Very low operational costs, reduces the use of AC and electric heating, and takes
                advantage of energy-efficient, eco-friendly design.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='components-1'>
        <img src='/images/comp3.png' />
        <div className='renew-title-wrapper1'>
          <div className='renew-title1'>Rainwater Harvesting Systems</div>

          <div className='comp-type1'>
            <div className='comp-type-container1'>
              <b>Types:</b>
              <ol className='renew-list'>
                <li>
                  Roof Collection System: Channels rainwater from the roof into a storage tank.
                </li>
                <li>Filtration System: Adds filters to purify water for domestic use.</li>
              </ol>
            </div>
          </div>
          <div className='renew-how1'>
            <div className='renew-how-ben-container1'>
              <b>How It Works: </b>
              <span className='renew-how-ben-capture'>
                Rainwater is collected from the roof and stored in a tank for non-potable uses, such
                as watering plants, flushing toilets, and washing vehicles.
              </span>
            </div>
          </div>
          <div className='renew-ben1'>
            <div className='renew-ben-container1'>
              <b>Benefits: </b>
              <span className='renew-how-ben-capture'>
                Reduces the use of clean water, lowers water bills, and helps maintain water supply
                during dry seasons.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='diy-title'>DIY and Inspiration</div>
      <div className='diy-content'>
        <div className='diy-vid'>
          <a href='https://youtu.be/kwajGch9cKA?si=gY1VakIGPPfGOGOU' className='youtube-icon-1'>
            <img src='/images/diy1.png' />
          </a>
          <h3>Making Household Compost</h3>
        </div>
        <div className='diy-vid'>
          <a href='https://youtu.be/3uzXeCnzf0c?si=URrd1x0xZekSxx0T' className='youtube-icon-1'>
            <img src='/images/diy2.png' />
          </a>
          <h3>DIY Simple Water Filter</h3>
        </div>
        <div className='diy-vid'>
          <a href='https://youtu.be/_Q_FMv77fdM?si=k2-r5MEj_fHCqfxj' className='youtube-icon-1'>
            <img src='/images/diy3.png' />
          </a>
          <h3>Mini Vertical Garden</h3>
        </div>
      </div>
      <section className='hover-more-1'>
        <a href='/Inspiration2' className='cta-button2'>
          See More
        </a>
      </section>
    </div>
  );
}
