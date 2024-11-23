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
        <div className="flex px-24 py-4 gap-[40px] items-center">
          <Link to="/Property">
            <FontAwesomeIcon icon={faArrowLeftLong} className="mt-[50px] text-[black] text-[20px]" />
          </Link>
          <h1 className="text-[15px] text-[grey] font-bold mt-[50px] font-medium">{product.name ?? 'No Label'}</h1>
        </div>
        <div className="flex gap-[30px] px-24">
          <div className="pt-10 pl-[100px]">
            <img src={product.imageUrl ?? 'default-image.jpg'} alt={product.name ?? 'No Name'} className="rounded-lg shadow-lg block w-[350px] h-[400px] mr-[150px] object-cover" />
          </div>
          <div className="flex flex-col gap-[20px] pt-13">
            <h1 className="text-[27px]">{product.name}</h1>
            <span className="text-[25px] font-medium">{formatToIDRCurrency(product.price) ?? `Not For Sale`}</span>

            {/* Menampilkan Rating */}
            <div className="flex items-center">
              {renderStars(product.rating)} {/* Menampilkan bintang */}
              <span className="ml-2 text-sm text-gray-600">({product.rating})</span> {/* Menampilkan nilai rating */}
            </div>

            <span className="text-grey-800">{product.category ?? 'Uncategorized'}</span>

            <span className="font-medium">
              <b>Description</b>
            </span>
            <p className="max-w-[500px] text-justify">{product.description ?? 'No description.'}</p>
          </div>
        </div>
      </div>
    </>
  );
}
