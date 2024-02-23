'use client';
import { ShopPayButton, ShopifyProvider } from '@shopify/hydrogen-react';
import { Product } from 'lib/shopify/types';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function BuyNowButton({ product }: { product: Product }) {
  const query = useSearchParams();
  const color = query?.get('color');
  const size = query?.get('size');
  const [currentVariant, setCurrentVariant] = useState<string>(null!);
  useEffect(() => {
    if (!color && size) {
      const selectedVariantId = product?.variants.find((v) => v.selectedOptions[0]?.value === size)
        ?.id;

      if (selectedVariantId) {
        setCurrentVariant(selectedVariantId);
      }
    }
    if (color && size) {
      const selectedVariantId = product?.variants.find(
        (v) => v.selectedOptions[0]?.value === color && v.selectedOptions[1]?.value === size
      )?.id;

      if (selectedVariantId) {
        setCurrentVariant(selectedVariantId);
      }
    }
  }, [color, size]);
  console.log(currentVariant);
  return (
    <ShopifyProvider
      storeDomain="https://45bb3b-e1.myshopify.com"
      countryIsoCode="US"
      languageIsoCode="EN"
      storefrontApiVersion={`2024-01`}
      storefrontToken={`${process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN}`}
    >
      <div className=" flex w-full place-content-center p-2">
        {currentVariant && <ShopPayButton variantIds={[currentVariant]} />}
      </div>
    </ShopifyProvider>
  );
}

export default BuyNowButton;
