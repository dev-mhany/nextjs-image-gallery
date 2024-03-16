import type { NextPage } from "next";
import Bridge from "../components/Icons/Bridge";
import images from "../utils/cachedImages.json";
import LazyImage from "../components/LazyImage";

const Home: NextPage = () => {
  return (
    <>
      <main className="mx-auto max-w-[1960px] p-4">
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span className="flex max-h-full max-w-full items-center justify-center">
                <Bridge />
              </span>
              <span className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
            </div>
            <h1 className="mb-4 mt-8 text-base font-bold uppercase tracking-widest">
              2023 Event Photos
            </h1>
          </div>
          {images.map(({ id, name, blur, width, height, faces }) => (
            <LazyImage
              key={id}
              id={id}
              name={name}
              blur={blur}
              width={width}
              height={height}
              faces={faces}
            />
          ))}
        </div>
      </main>
      <footer className="p-6 text-center text-white/80 sm:p-12">
        Thank you to{" "}
        <a
          href="https://ahmedhany.dev/"
          target="_blank"
          className="font-semibold hover:text-white"
          rel="noreferrer"
        >
          Ahmed Hany
        </a>{" "}
        for this app.
        <br />
      </footer>
    </>
  );
};

export default Home;
