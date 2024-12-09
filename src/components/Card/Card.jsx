import Button from '../Button/Button';
import PropTypes from 'prop-types';
import formatToIDRCurrency from '../../utils/formatToIDRCurrency';
import { Link } from 'react-router-dom';

export default function Card({ product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="justify-center flex flex-col lg:p-[20px] lg:w-[240px] lg:py-[10px] md:max-w-[520px] max-w-[220px] flex-wrap p-[12px] md:p-[25px] bg-[#ffffff] hover:ring-opacity-40 active:ring-5 active:ring-[#739646] rounded-[20px] shadow-xl hover:shadow-xxl transition-shadow duration-200 ease-in-out transform scale-90"
    >
      <div className="flex-col max-w-[210px] w-[200px] flex-wrap p-[12px] bg-[#ffffff] rounded-[20px]">
        <img src={product.imageUrl ?? ''} alt={product.name ?? 'No name'} className="block max-h-[250px] mb-4 object-cover" />
        <div className="flex flex-col gap-2">
          <div className="font-medium text-[14px] text-[#000000] text-left">{product.name ?? 'No Name'}</div>
          <div className="block font-medium text-[10px] text-[#3C4563]">{product.category ?? 'Uncategorized'}</div>
          <div className="block font-medium text-[14px] text-[#000000]">{formatToIDRCurrency(product.price) ?? 'Not for sale'}</div>
          <div>
            <Button
              type="button"
              className="inline-flex items-center justify-center text-[11px] pt-1 pb-1 px-[36px] bg-[#739646] border-[#5f7f33] text-[#ffffff] hover:text-[#739646] hover:bg-[#ffffff] hover:border-[#5f7f33] active:bg-[#ffffff] hover:ring-[#739646] hover:ring-2 active:ring-2 active:border-[#5f7f33] rounded-[40px] transition-all"
            >
              <span className="text-center">More information</span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
