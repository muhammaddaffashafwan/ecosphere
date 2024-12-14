import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import formatToIDRCurrency from '../../utils/formatToIDRCurrency';
import getAllProducts from '../../services/getAllProducts';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const allProducts = getAllProducts();
    const product = allProducts.find((prod) => prod.slug === slug);
    setProduct(product);
  }, [slug]);

  // Fungsi untuk menampilkan bintang berdasarkan rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Bintang penuh
    const emptyStars = 5 - fullStars; // Bintang kosong

    return (
      <div className="stars flex">
        {Array.from({ length: fullStars }).map((_, index) => (
          <span key={index} className="text-yellow-500">
            ★
          </span> // Bintang penuh
        ))}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <span key={index} className="text-gray-300">
            ★
          </span> // Bintang kosong
        ))}
      </div>
    );
  };

  if (!product) {
    return (
      <>
        <h1 className="flex w-full h-full text-center items-center justify-center text-4xl text-pink-600">PRODUCT NOT FOUND.</h1>
      </>
    );
  }

  return (
    <>
      <div className="pb-10 pt-10">
        <div className="flex items-center md:flex-row px-6 md:px-24 lg:py-4 md:py-4 mobile:pt-20 md:gap-[40px] items-left">
          <Link to="/Property">
            <FontAwesomeIcon icon={faArrowLeftLong} className="text-black lg:text-[20px] md:mt-[50px] lg:w-6 lg:h-6 mobile:w-4 mobile:h-4" />
          </Link>
          <h1 className="mobile:text-[10px] md:text-[12px] text-gray-400 mobile:ml-[20px] md:mt-[50px] md:ml-[1px] mobile:mt-3 font-medium">{product.name ?? 'No Label'}</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-[30px] px-6 md:px-24 lg:gap-[30px] lg:px-24">
          <div className="pt-6 md:pt-10 lg:pt-10 lg:pl-[100px] flex justify-center md:justify-start">
            <img
              src={product.imageUrl ?? 'default-image.jpg'}
              alt={product.name ?? 'No Name'}
              className="rounded-lg shadow-lg block mobile:w-[270px] mobile:h-[300px] md:w-[350px] md:h-[300px] lg:w-[350px] lg:h-[400px] lg:mr-[150px] object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 md:gap-[20px] pt-6 md:pt-13 lg:gap-[20px] lg:pt-13 mobile:px-10">
            <h1 className="text-[16px] md:text-[20px] font-bold lg:text-[27px] mobile:text-center md:text-left">{product.name}</h1>
            <span className="mobile:text-[14px] md:text-[16px] lg:text-[20px] font-medium mobile:text-center md:text-left lg:text-left">{formatToIDRCurrency(product.price) ?? 'Not For Sale'}</span>

            {/* Menampilkan Rating */}
            <div className="flex justify-center md:justify-start items-center">
              {renderStars(product.rating)} {/* Menampilkan bintang */}
              <span className="ml-2 text-[12px] md:text-[14px] lg:text-sm text-gray-600">({product.rating})</span>
            </div>

            <span className="mobile:text-[14px] md:text-[16px] lg:text-grey-800 mobile:text-center md:text-left lg:text-left">{product.category ?? 'Uncategorized'}</span>

            <span className="text-[14px] md:text-[16px] lg:text-[15px] sm:text-center md:text-left lg:text-left ">
              <b>Description</b>
            </span>
            <p className="text-[14px] md:text-[16px] lg:text-[15px] md:max-w-[400px] lg:max-w-[530px] text-justify mx-auto md:mx-0 lg:mx-0">{product.description ?? 'No description.'}</p>
          </div>
        </div>
      </div>
    </>
  );
}
