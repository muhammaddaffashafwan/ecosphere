import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import formatToIDRCurrency from "../../utils/formatToIDRCurrency";
import getAllProducts from "../../services/getAllProducts";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const allProducts = getAllProducts();
    const product = allProducts.find((prod) => prod.slug === slug);
    setProduct(product);
  }, [slug]);

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
          <Link to="/">
            <FontAwesomeIcon icon={faArrowLeftLong} className="mb-0 text-[30px]" />
          </Link>
          <h4 className="text-[32px] font-medium">{product.name ?? 'No Label'}</h4>
        </div>
        <div className="flex gap-[30px] px-24 ">
          <div className="pt-10 pl-[100px]">
            {/* <img src={product.imageUrl ?? (product.name ?? 'No Name')} alt={product.name ?? 'No Name'} className='block spect-[138/100] max-w-[400px] object-cover'/> */}
            <img src={product.imageUrl ?? product.name ?? 'No Name'} alt={product.name ?? 'No Name'} className="rounded-lg shadow-lg block w-[350px] h-[400px] mr-[150px] object-cover" />
          </div>
          <div className="flex flex-col gap-[20px] pt-10">
            <span className="text-[30px] font-medium">{formatToIDRCurrency(product.price) ?? `Not For Sale`}</span>
            {/* {product.stock > 0 ? (
              product.stock <= 25 ? (
                <span className="font-medium text-yellow-500">Available, almost out of stock</span>
              ) : (
                <span className="font-medium text-green-500">Available</span>
              )
            ) : (
              <span className="font-medium text-red-500">Out of stock</span>
            )} */}

            <span className="text-grey-800">{product.category ?? 'Uncategorized'}</span>

            <span className="font-medium ">
              <b>Description</b>
            </span>
            <p className="max-w-[500px] text-justify">{product.description ?? 'No description.'}</p>
          </div>
        </div>
      </div>
    </>
  );
}
