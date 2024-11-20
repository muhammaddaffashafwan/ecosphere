import { useState, useEffect, useRef } from 'react';
// import { useState, useEffect, useRef, useTransition } from 'react';
import getAllProducts from '../../services/getAllProducts';
import CardList from '../../components/CardList/CardList';
// import { Navbar } from "../../components/navbar/navbar";
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
  // const [isPending, startTransition] = useTransition();
  // const [selectedCategory, setSelectedCategory] = useState('all');
  // const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    function fetchAllProducts() {
      let allProducts = getAllProducts();
      allProducts = allProducts.length > 0 ? allProducts : [];
      // simpan data produk yg belum difilter
      originalProducts.current = allProducts;
      // simpan data produk yg telah difilter
      setProducts(allProducts);
    }

    function fetchCategories() {
      const allCategories = getAllProductCategories();
      const newCategories = allCategories.map((cat) => ({ label: cat.name, value: cat.slug })).filter((newCat) => !radioButtonOpts.current.some((existingCat) => existingCat.value === newCat.value));
      radioButtonOpts.current = [...radioButtonOpts.current, ...newCategories];
    }
    // console.log(radioButtonOpts.current)
    fetchCategories();
    fetchAllProducts();
  }, []);

  // useEffect(() => {
  //   startTransition(() => {
  //     const filtered = originalProducts.current.filter((product) => {
  //       const matchedCategory = selectedCategory === 'all' || product.categorySlug === selectedCategory;
  //       const matchesSearch = product.name.toLowerCase().includes( searchQuery .toLowerCase());

  //       return matchedCategory && matchesSearch;
  //     });

  //     return setProducts(filtered);
  //   });
  // }, [selectedCategory, searchQuery]);

  // const handleCategoryChange = (category) => {
  //   setSelectedCategory(category);
  // };

  // const handleSearchChange = (query) => {
  //   setSearchQuery(query);
  // };
  // const RadioButtonOpts = [

  //   {
  //     label: 'All',
  //     value: 'all'
  //   },
  //   {
  //     label: 'Men\'s Shoes',
  //     value: 'menshoes'
  //   },
  //   {
  //     label: 'Women\'s Shoes',
  //     value: 'womenshoes'
  //   },
  // ]

  return (
    <div className="bg-white min-h-screen text-white">
      {/* <Navbar onSearchChange={handleSearchChange}></Navbar> */}
      {/* Content Section */}
      <div className="content p-8">
        <div className="discovery flex flex-col md:flex-row items-center">
          <img className="w-full md:w-1/2" alt="Eco Discovery" src="asset/prop_illus.jpg" />
          <div className="md:ml-8 mt-8 md:mt-0 text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">Discover eco-friendly homes and products</h1>
            <p className="mt-4 text-gray-600">
              We offer a comprehensive range of eco-friendly homes and goods, coupled with cutting-edge technology. Our product range includes solar panels, home energy management systems, and smart LED lights, all designed to create a
              greener, more efficient home.
            </p>
          </div>
        </div>

        <div className="numbers mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center space-x-4">
            <img className="h-12" alt="Property Icon" src="asset/Icon_prop.jpg" />
            <div>
              <p className="text-gray-700 font-medium">Property Return Rate</p>
              <p className="text-xl font-bold">7.4%</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <img className="h-12" alt="Experience Icon" src="asset/Icon_estate.jpg" />
            <div>
              <p className="text-xl font-bold">10</p>
              <p className="text-gray-700">Years experience in real estate</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <img className="h-12" alt="Customer Icon" src="asset/Icon_customers.jpg" />
            <div>
              <p className="text-xl font-bold">3,856</p>
              <p className="text-gray-700">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="our-partners-parent p-8">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">OUR PARTNERS</h2>
        <div id="partnersCarousel" className="carousel slide relative" data-ride="carousel">
          {/* Indicators */}
          <ol className="carousel-indicators flex justify-center space-x-2">
            <li data-target="#partnersCarousel" data-slide-to="0" className="w-3 h-3 bg-gray-400 rounded-full"></li>
            <li data-target="#partnersCarousel" data-slide-to="1" className="w-3 h-3 bg-gray-400 rounded-full"></li>
          </ol>

          {/* Slides */}
          <div className="carousel-inner">
            <div className="carousel-item active flex justify-center space-x-4">
              <img className="partner-logo w-16" src="asset/patner_1.jpg" alt="Partner 1" />
              <img className="partner-logo w-16" src="asset/LG.jpg" alt="Partner 2" />
              <img className="partner-logo w-16" src="asset/xiaomi.jpg" alt="Partner 3" />
              <img className="partner-logo w-16" src="asset/patner_4.jpg" alt="Partner 4" />
            </div>
            <div className="carousel-item flex justify-center space-x-4">
              <img className="partner-logo w-16" src="asset/patner_2.jpg" alt="Partner 2" />
              <img className="partner-logo w-16" src="asset/patner_3.jpg" alt="Partner 3" />
              <img className="partner-logo w-16" src="asset/agungsaha.jpg" alt="Partner 4" />
              <img className="partner-logo w-16" src="asset/pakuwon.jpg" alt="Partner 5" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-24 pt-[1000px] pb-[4px] gap-4 mt-4 flex-wrap">
        <h3 className="font-medium text-black">Filter</h3>
        <div className="flex gap-2 flex-wrap ">
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

//   return (
//     <div className="bg-white min-h-screen text-white">
//       {/* <Navbar onSearchChange={handleSearchChange}></Navbar> */}
//       <div className="px-24 py-4 gap-4 mt-4 flex-wrap">
//         <h3 className="font-medium text-black">Filter</h3>
//         <div className="flex gap-2 flex-wrap ">
//           <RadioButton options={radioButtonOpts.current} defaultValue={'all'} onChange={handleCategoryChange} />
//         </div>
//       </div>
//       <section className="container px-24 py-4">
//         <main className="grid grid-cols-4 gap-4">
//           <CardList products={products} isPending={isPending} />
//         </main>
//       </section>
//     </div>
//   );
// }
