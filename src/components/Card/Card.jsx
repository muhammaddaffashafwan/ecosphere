import Button from '../Button/Button';
import PropTypes from 'prop-types';
import formatToIDRCurrency from '../../utils/formatToIDRCurrency';
import { Link } from 'react-router-dom';

export default function Card({ product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="flex flex-col max-w-[370px] flex-wrap p-[16px] bg-[#ffffff] hover:ring-opacity-40 active:ring-5 active:ring-[#739646] hover:ring-4 active:ring-2 active:ring-opacity-90 rounded-[20px] shadow-xl hover:shadow-xxl transition-shadow duration-200 ease-in-out"
    >
      <div className="flex flex-col max-w-[370px] flex-wrap p-[16px] bg-[#ffffff] rounded-[40px]">
        <img src={product.imageUrl ?? ''} alt={product.name ?? 'No name'} className="block max-h-[300px] mb-4 object-cover" />
        <div className="flex flex-col gap-2">
          <h4 className="font-medium text-[16px] text-[#000000]">{product.name ?? 'No Name'}</h4>
          <span className="block font-medium text-[12px] text-[#3C4563]">{product.category ?? 'Uncatagorized'}</span>
          <span className="block font-medium text-[16px] text-[#000000]">{formatToIDRCurrency(product.price) ?? 'Not for sale'}</span>
          <div>
            <Button type="button" className="inline-flex items-center justify-center text-[14px] pt-2 pb-2 pl-10 pr-10 bg-[#739646] text-center hover:bg-[#739646] text-white active:bg-[#739646] rounded-[40px]">
              <span>More information</span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

Card.propTypes = {
  product: PropTypes.object,
};
