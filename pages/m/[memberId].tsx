import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Bridge from "../../components/Icons/Bridge";
import cachedImages from "../../utils/cachedImages.json";
import faceData from "../../utils/faceData.json";
import { ImageProps } from "../../utils/types";

const Home: NextPage = ({images}:{images:ImageProps[]}) => {

    const handleImageError = (event) => {
      const image = event.target;
      fetch(image.src, {
        method: 'GET',
      }).then((response) => {
        if(response.url.endsWith('password-protect')) {
          window.location.href = '/password-protect'
        } 
      })
    };
  
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
            {images.map(({ id, name, blur, width, height,faces }) => (
              <div key={id} className="relative">
                <Link
                  href={`/p/${id}`}
                  id={`${id}`}
                  className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                >
                  <Image
                    alt="photo"
                    className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    placeholder="blur"
                    blurDataURL={blur}
                    src={`/images/${name}`}
                    width={720}
                    height={720 * (height / width)}
                    sizes="(max-width: 640px) 100vw,
                    (max-width: 1280px) 50vw,
                    (max-width: 1536px) 33vw,
                    25vw"
                    onError={handleImageError}
                  />
                </Link>
                {faces.length < 20 && faces.map(({k,n}, i) => (
                  <Link
                    key={n}
                    href={`/m/${k}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="photo"
                      className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                      style={{
                        position: "absolute",
                        bottom: "5px",
                        left: `${5 + 20 * i}px`,
                        borderRadius: "50%",
                        border: "1px solid #fff",
                        width: "32px",
                        height: "32px",
                      }}
                      src={`/faces/${n}.jpg`}
                      onError={handleImageError}
                    />
                  </Link>
                ))}
              </div>
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


export const getStaticProps: GetStaticProps = async (context) => {

  const names = faceData[context.params.memberId.toString()]

 const filteredImages = cachedImages.filter((item) => names.includes(item.name))

  return {
    props: {
      images: filteredImages,
    },
  }
}

export async function getStaticPaths() {
  let fullPaths = []
  Object.keys(faceData).map((key)=>{
    fullPaths.push({ params: { memberId: key } })
  });

  return {
    paths: fullPaths,
    fallback: false,
  }
}
