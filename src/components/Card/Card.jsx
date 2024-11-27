import Button from '../Button/Button';
import PropTypes from 'prop-types';
import formatToIDRCurrency from '../../utils/formatToIDRCurrency';
import { Link } from 'react-router-dom';

export default function Card({ product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="flex flex-col max-w-[370px] flex-wrap p-[16px] bg-[#ffffff] hover:ring-opacity-40 active:ring-5 active:ring-[#739646] rounded-[20px] shadow-xl hover:shadow-xxl transition-shadow duration-200 ease-in-out"
    >
      <div className=" flex-col max-w-[370px] flex-wrap p-[16px] bg-[#ffffff] rounded-[40px]">
        <img src={product.imageUrl ?? ''} alt={product.name ?? 'No name'} className="block max-h-[300px] mb-4 object-cover" />
        <div className="flex flex-col gap-2">
          <div className="font-medium text-[16px] text-[#000000] text-left"
          style={{ textDecoration: 'none !important' }}>{product.name ?? 'No Name'}</div>
          <div className="block font-medium text-[12px] text-[#3C4563]">{product.category ?? 'Uncatagorized'}</div>
          <div className="block font-medium text-[16px] text-[#000000]">{formatToIDRCurrency(product.price) ?? 'Not for sale'}</div>
          <div>
            <Button
              type="button"
              className="inline-flex items-center justify-center text-[13px] pt-2 pb-2 px-[44px] bg-[#739646] border-[#5f7f33] text-[#ffffff] hover:text-[#739646] hover:bg-[#ffffff] hover:border-[#5f7f33] active:bg-[#ffffff] hover:ring-[#739646] hover:ring-2 active:ring-2 active:border-[#5f7f33] rounded-[40px] transition-all"
            >
              <span className="text-center">More information</span>
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
