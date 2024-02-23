import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import hero from '../components/trickedex_pixel_wide.jpg';
import trickedex from '../components/TrickedexLogo-Black@2x.png';
export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
      <ThreeItemGrid />
      <Suspense>
        <div className="flex w-full flex-col place-items-center p-4 pb-8">
          <Link href="/search" className="rounded-md bg-blue-600 p-4 py-2 text-center text-xl">
            Explore the Shop
          </Link>
        </div>
        <Carousel />
        <TrickedexHero />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}

const TrickedexHero = () => {
  return (
    <a
      href={'https://trickedex.app'}
      target="_blank"
      className="relative h-full min-h-[450px] w-full cursor-pointer text-xl"
    >
      <Image
        src={trickedex}
        alt="trickedex logo"
        className="absolute left-[50vw] top-[25%] w-[60%] translate-x-[-50%] translate-y-[-50%] object-contain"
        width={800}
        height={400}
      />
      <h1 className="absolute bottom-[0px] left-[50vw] translate-x-[-50%] text-[8px] font-normal tracking-widest mix-blend-overlay lg:bottom-[4px] lg:translate-y-[-50%] lg:text-xl">
        Tricking Information at your fingertips
      </h1>
      <Image
        className="h-full w-full object-cover"
        src={hero}
        alt="Hero"
        width={1920}
        height={1080}
      />
    </a>
  );
};
