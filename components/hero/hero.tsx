import Link from 'next/link';
import Image from 'next/image';
import Button from '../ui/button';

function Hero() {
  return (
    <section id="hero" className="grid place-content-center p-20">
      <div className="flex items-center justify-center gap-2">
        <div className="text-center sm:text-left">
          <h1 className="mb-2 font-serif text-5xl font-semibold md:text-6xl">
            Wishlit.
          </h1>
          <h2 className="mb-6 text-3xl">Find your next literary obsession.</h2>
          <div className="flex justify-center gap-3 sm:justify-start">
            <Button asChild variant="secondary">
              <Link href="/">Explore</Link>
            </Button>
            <Button asChild variety="solid">
              <Link href="/">Sign Up</Link>
            </Button>
          </div>
        </div>
        <div className="shrink-1">
          <Image
            width={500}
            height={500}
            alt="Woman reading"
            className="hidden object-cover md:block"
            src="/images/woman-reading.svg"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
