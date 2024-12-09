import { useState, useEffect, useRef } from 'react';
import getAllProducts from '../../services/getAllProducts';
import CardList from '../../components/CardList/CardList';
import RadioButton from '../../components/RadioButton/RadioButton';
import getAllProductCategories from '../../services/getAllProductCategories';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
// import { useInitializeCarousel } from "../../components/Carousel/propertyCarousel";

export default function Property() {
  // useInitializeCarousel();
  useEffect(() => {
    $('#partnersCarousel').carousel({
      interval: 1000, // Carousel interval in milliseconds
      ride: 'carousel', // Automatically start cycling
    });
  }, []);

  const [products, setProducts] = useState([]);
  const [setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const radioButtonOpts = useRef([
    {
      label: 'All',
      value: 'all',
    },
  ]);
  const originalProducts = useRef([]);

  useEffect(() => {
    // Fetch Products and Categories
    async function fetchData() {
      try {
        const allProducts = await getAllProducts();
        console.log('Fetched Products:', allProducts);
        originalProducts.current = allProducts.length > 0 ? allProducts : [];
        setProducts(allProducts);

        const allCategories = await getAllProductCategories();
        console.log('Fetched Categories:', allCategories);
        const newCategories = allCategories
          .map((cat) => ({
            label: cat.name,
            value: cat.slug,
          }))
          .filter((newCat) => !radioButtonOpts.current.some((existingCat) => existingCat.value === newCat.value));

        radioButtonOpts.current = [...radioButtonOpts.current, ...newCategories];
      } catch (error) {
        console.error('Error fetching data', error);
        setProducts([]); // Fallback to empty list if there's an error
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [setIsLoading]);

  useEffect(() => {
    // Filter products based on selected category
    const filtered = originalProducts.current.filter((product) => {
      return selectedCategory === 'all' || product.categorySlug === selectedCategory;
    });
    setProducts(filtered);
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="absolute top-[100px] lg:left-[20px] lg:w-full sm:w-[768px] h-auto sm:h-[411.8px] text-left text-black font-[Optician Sans]">
        <div className="discovery flex flex-col sm:flex-row items-center">
          <div className="mt-[-20px] tracking-[-0.02em] pt-[30px] leading-[20px] text-black px-4 sm:px-0">
          <h1 className="font text-[32px] sm:text-[35px] sm:text-center sm:pb-[15px] lg:text-left lg:w-[550px] lg:ml-[55px] lg:mt-[35px] lg:text-[45px]">DISCOVER ECO-FRIENDLY HOMES AND PRODUCTS</h1>
          <img className="lg:absolute relative ml-0 mobile:w-[400px]  top-0 left-0 z-0 w-[200px] sm:w-[544px] lg:ml-[800px] lg:w-[600px] h-auto" alt="Eco Discovery" src="assets/prop_illus.jpg" />
          
            
            <p className="text-sm sm:text-base sm:text-[20px] sm:leading-[25px] sm:pt-[15px] sm:px-[50px] lg:ml-[5px] lg:w-[600px] lg:text-[18px]">
              We offer a comprehensive range of eco-friendly homes and goods, coupled with cutting-edge technology. Our product range includes solar panels, home energy management systems, and smart LED lights, all designed to create a
              greener, more efficient home.
            </p>
          </div>
        </div>

        <div className="numbers mt-12 flex flex-wrap mobile:justify-center mobile:gap-[20px] md:px-[70px] md:justify-between text-center lg:justify-start">
          {/* Property Return Rate */}
          <div className="property-return-rate flex flex-col items-center space-y-4">
            <img className="icon lg:h-[50px] mobile:h-[50px] md:h-[80px] w-auto" alt="Property Icon" src="assets/Icon_prop.jpg" />
            <div className="text-[12px] sm:text-sm md:text-base">
              <p className="b text-xl md:text-[22px] text-center font-bold">7.4%</p>
              <p className="property-return-rate1 text-black font-medium text-center">Property Return Rate</p>
            </div>
          </div>

          {/* Years of Experience in Real Estate */}
          <div className="daily-completed-transactions flex flex-col items-center space-y-4">
            <img className="icon1 lg:h-[50px] mobile:h-[50px] md:h-[80px] w-auto" alt="Experience Icon" src="assets/Icon_estate.jpg" />
            <div className="text-[12px] sm:text-sm md:text-base">
              <p className="b1 text-xl md:text-[22px] text-center font-bold">10</p>
              <p className="years-experience-in text-black font-medium text-center">Years experience in real estate</p>
            </div>
          </div>

          {/* Happy Customers */}
          <div className="property-in-sell-rent flex flex-col items-center space-y-4">
            <img className="icon2 lg:h-[50px] mobile:h-[50px] md:h-[80px] w-auto" alt="Customer Icon" src="assets/Icon_customers.jpg" />
            <div className="text-[12px] sm:text-sm md:text-base">
              <p className="b2 text-xl md:text-[22px] text-center font-bold">3,856</p>
              <p className="text-black font-medium text-center">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="relative lg:top-[700px] mobile:top-[950px] sm:top-[1130px] lg:left-[calc(50%-670px)] mobile:w-[450px] sm:w-[780px] lg:w-[1340px] flex flex-col items-center gap-[30px]">
        <h1 className=" font-bold  lg:text-[30px] relative flex flex-col  items-center gap-[35px]">OUR PARTNERS</h1>
        <div id="partnersCarousel" className="carousel slide relative">
          <div className="carousel-inner">
            <div className="carousel-item active flex justify-center  space-x-8">
              <div className="flex justify-center gap-[15px]">
                <img className="partner-logo w-auto lg:h-16 mobile:h-5 sm:h-8" src="assets/patner_1.jpg" alt="Partner 1" />
                <img className="partner-logo w-auto lg:h-16 mobile:h-5 sm:h-8" src="assets/LG.jpg" alt="Partner 2" />
                <img className="partner-logo w-auto lg:h-16 mobile:h-5 sm:h-8" src="assets/xiaomi.jpg" alt="Partner 3" />
                <img className="partner-logo w-auto lg:h-16 mobile:h-5 sm:h-8" src="assets/patner_4.jpg" alt="Partner 4" />
                <img className="partner-logo w-auto lg:h-16 mobile:h-5 sm:h-8" src="assets/patner_2.jpg" alt="Partner 2" />
              </div>
            </div>
            <div className="carousel-item active flex justify-center space-x-8">
              <div className="flex justify-center gap-[15px]">
                <img className="partner-logo w-auto h-16 mobile:h-5 sm:h-8" src="assets/patner_3.jpg" alt="Partner 3" />
                <img className="partner-logo w-auto lg:h-16 mobile:h-5 sm:h-8" src="assets/ciputra.jpg" alt="Partner 2" />
                <img className="partner-logo w-auto lg:h-16 mobile:h-5 sm:h-8" src="assets/99co.jpg" alt="Partner 3" />
                <img className="partner-logo w-auto lg:h-16 mobile:h-5 sm:h-8" src="assets/agungsaha.jpg" alt="Partner 4" />
                <img className="partner-logo w-auto lg:h-16 mobile:h-5 sm:h-8" src="/assets/pakuwon.jpg" alt="Partner 5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mobile:pt-[1010px] sm:pt-[1200px] md:px-16 lg:px-24 lg:pt-[800px] pb-[4px] gap-4 mt-4 flex-wrap">
        <h1 className="text-center text-[24px] md:text-[30px] font-bold">PROPERTY RECOMMENDATION</h1>
        <p className="mt-2 md:mt-4 mb-2 md:mb-4 text-center text-sm md:text-base">We&apos;re all about smart innovation for a greener life</p>
        <h3 className="mobile:text-[15px] sm:text-[20px] lg:ml-[20px] px-4 md:px-16 lg:px-24 font-medium text-black mt-6">Filter</h3>
        <div className="mobile:text-[12px] sm:text-[15px] lg:ml-[50px] px-4 md:px-16 lg:px-24 flex gap-2 flex-wrap">
          <RadioButton options={radioButtonOpts.current} defaultValue={'all'} onChange={handleCategoryChange} />
        </div>
      </div>
      <section className="mb-[125px] container px-[200px] md:px-55 lg:px-24 py-4">
        <main className="grid grid-cols-1 mobile:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <CardList products={products} />
        </main>
      </section>
    </div>
  );
}
