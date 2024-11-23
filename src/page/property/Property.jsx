import { useState, useEffect, useRef } from 'react';
import getAllProducts from '../../services/getAllProducts';
import CardList from '../../components/CardList/CardList';
import RadioButton from '../../components/RadioButton/RadioButton';
import getAllProductCategories from '../../services/getAllProductCategories';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Property() {
  const [products, setProducts] = useState([]);
  const radioButtonOpts = useRef([
    {
      label: 'All',
      value: 'all',
    },
  ]);

  const originalProducts = useRef([]);

  useEffect(() => {
    function fetchAllProducts() {
      const allProducts = getAllProducts();
      originalProducts.current = allProducts.length > 0 ? allProducts : [];
      setProducts(originalProducts.current);
    }

    function fetchCategories() {
      const allCategories = getAllProductCategories();
      const newCategories = allCategories.map((cat) => ({ label: cat.name, value: cat.slug })).filter((newCat) => !radioButtonOpts.current.some((existingCat) => existingCat.value === newCat.value));
      radioButtonOpts.current = [...radioButtonOpts.current, ...newCategories];
    }

    fetchCategories();
    fetchAllProducts();
  }, []);

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="absolute top-[100px] left-[150px] w-[544.1px] h-[411.8px] text-left text-black font-[Optician Sans]">
        <div className="discovery flex flex-col md:flex-row items-center">
          <img className=" absolute ml-[725px] top-0 left-0 z-0" alt="Eco Discovery" src="assets/prop_illus.jpg" />
          <div className="mt-[-20px] tracking-[-0.02em] pt-[30px] leading-[20px] text-black ">
            <h1 className=" font-bold  text-[30px]">DISCOVER ECO-FRIENDLY HOMES AND PRODUCTS</h1>
            <p className="mt-4 ">
              We offer a comprehensive range of eco-friendly homes and goods, coupled with cutting-edge technology. Our product range includes solar panels, home energy management systems, and smart LED lights, all designed to create a
              greener, more efficient home.
            </p>
          </div>
        </div>
        <div className="numbers mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Property Return Rate */}
          <div className="property-return-rate flex flex-col items-center space-y-4">
            <img className="icon h-[60px] " alt="Property Icon" src="assets/Icon_prop.jpg" />
            <div className="text-[12px]">
              <p className="b text-xl text-center font-bold">7.4%</p>
              <p className="property-return-rate1 text-black font-medium">Property Return Rate</p>
            </div>
          </div>

          {/* Years of Experience in Real Estate */}
          <div className="daily-completed-transactions flex flex-col items-center space-y-4">
            <img className="icon1 h-[60px] " alt="Experience Icon" src="assets/Icon_estate.jpg" />
            <div className="text-[12px]">
              <p className="b1 text-xl text-center font-bold">10</p>
              <p className="years-experience-in text-black font-medium">Years experience in real estate</p>
            </div>
          </div>

          {/* Happy Customers */}
          <div className="property-in-sell-rent flex flex-col items-center space-y-4">
            <img className="icon2 h-[60px]" alt="Customer Icon" src="assets/Icon_customers.jpg" />
            <div className="text-[12px]">
              <p className="b2 text-xl text-center font-bold">3,856</p>
              <p className="text-black font-medium">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className=" absolute top-[650px] left-[calc(50%-670px)] w-[1340px] flex flex-col items-center gap-[30px]">
        <h1 className=" font-bold  text-[30px] relative flex flex-col  items-center gap-[35px]">OUR PARTNERS</h1>
        <div id="partnersCarousel" className="carousel slide relative">
          <div className="carousel-inner">
            <div className="carousel-item active flex justify-center  space-x-8">
              <div className="flex justify-center gap-[15px]">
                <img className="partner-logo w-auto h-16 " src="assets/patner_1.jpg" alt="Partner 1" />
                <img className="partner-logo w-auto h-16 " src="assets/LG.jpg" alt="Partner 2" />
                <img className="partner-logo w-auto h-16 " src="assets/xiaomi.jpg" alt="Partner 3" />
                <img className="partner-logo w-auto h-16 " src="assets/patner_4.jpg" alt="Partner 4" />
                <img className="partner-logo w-auto h-16 " src="assets/patner_2.jpg" alt="Partner 2" />
                <img className="partner-logo w-auto h-16 " src="assets/patner_3.jpg" alt="Partner 3" />
              </div>
            </div>
            <div className="carousel-item flex justify-center gap-[15px] space-x-4">
              <img className="partner-logo w-auto h-16 " src="assets/.jpg" alt="Partner 2" />
              <img className="partner-logo w-auto h-16 " src="assets/.jpg" alt="Partner 3" />
              <img className="partner-logo w-auto h-16 " src="assets/agungsaha.jpg" alt="Partner 4" />
              <img className="partner-logo w-auto h-16 " src="/assets/pakuwon.jpg" alt="Partner 5" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-24 pt-[900px] pb-[4px] gap-4 mt-4 flex-wrap">
        <h1 className="text-center text-[30px] font-bold">PROPERTY RECOMMENDATION</h1>
        <p className="mt-4 mb-4 text-center">We're all about smart innovation for a greener life</p>
        <h3 className="font-medium text-black">Filter</h3>
        <div className="flex gap-2 flex-wrap">
          <RadioButton options={radioButtonOpts.current} defaultValue={'all'} />
        </div>
      </div>
      <section className="mb-[125px] container px-24 py-4">
        <main className="grid grid-cols-4 gap-4">
          <CardList products={products} />
        </main>
      </section>
    </div>
  );
}
