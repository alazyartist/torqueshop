'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from 'lib/shopify/types';

const Price = ({
  amount,
  className,
  currencyCode = 'USD',
  product,
  currencyCodeClassName
}: {
  amount: string;
  product?: Product;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => {
  const query = useSearchParams();
  const color = query?.get('color');
  const size = query?.get('size');
  const [currentPrice, setCurrentPrice] = useState(amount);
  useEffect(() => {
    if (!product) return;
    if (!color && size) {
      const newPrice = product?.variants.find((v) => v.selectedOptions[0]?.value === size)?.price
        .amount;

      if (newPrice) {
        setCurrentPrice(newPrice);
      }
    }
    if (color && size) {
      const newPrice = product?.variants.find(
        (v) => v.selectedOptions[0]?.value === color && v.selectedOptions[1]?.value === size
      )?.price.amount;

      if (newPrice) {
        setCurrentPrice(newPrice);
      }
    }
  }, [color, size]);

  return (
    <p suppressHydrationWarning={true} className={className}>
      {`${new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'narrowSymbol'
      }).format(parseFloat(currentPrice))}`}
      <span className={clsx('ml-1 inline', currencyCodeClassName)}>{`${currencyCode}`}</span>
    </p>
  );
};

export default Price;
