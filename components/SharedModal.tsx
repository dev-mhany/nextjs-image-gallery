import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import downloadPhoto from "../utils/downloadPhoto";
import type { SharedModalProps } from "../utils/types";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SharedModal({ nextImages, currentPhoto }: SharedModalProps) {
  const id = useRouter().query.photoId;
  const index = id ? Number(id) : 0;

  const lastImage = nextImages[nextImages.length - 1];

  return (
    <>
      <div className="relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center wide:h-full ">
        {/* Main image */}
        <div className="w-full overflow-hidden">
          <div className="relative flex aspect-[3/2] items-center justify-center">
            <Image
              src={`/images/${currentPhoto.name}`}
              fill
              style={{ objectFit: "scale-down" }}
              priority
              alt="image"
              sizes="90vw"
            />
          </div>
        </div>

        {/* Buttons + bottom nav bar */}
        <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
          {/* Buttons */}
          <div className="relative aspect-[3/2] max-h-full w-full">
            <>
              {index > 0 && (
                <Link
                  className="absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  href={`/p/${index - 1}`}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </Link>
              )}
              {index + 1 <= lastImage.id && (
                 <Link
                  className="absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  href={`/p/${index + 1}`}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                  </Link>
              )}
            </>
            <div className="absolute right-0 top-0 flex items-center gap-2 p-3 text-white">
              <a
                href={`/images/${currentPhoto.name}`}
                className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                target="_blank"
                title="Open fullsize version"
                rel="noreferrer"
              >
                <ArrowTopRightOnSquareIcon className="h-5 w-5" />
              </a>
              <button
                onClick={() =>
                  downloadPhoto(`/images/${currentPhoto.name}`, `${index}.jpg`)
                }
                className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                title="Download fullsize version"
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="absolute left-0 top-0 flex items-center gap-2 p-3 text-white">
              <Link
                className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                href={`/`}
              >
                <XMarkIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
          {/* Bottom Nav bar */}
          <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
            <div className="mx-auto mb-6 mt-6 flex aspect-[3/2] h-14 justify-center"
          
            >
                {nextImages.map(({ name, id }) => (
                  <Link
                    href={`/p/${id}`}
                    key={id}
                    className={`${
                      id === index
                        ? "z-20 rounded-md shadow shadow-black/50"
                        : "z-10"
                    } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
                  >
                    <Image
                      alt="small photos on the bottom"
                      width={180}
                      height={120}
                      className={`${
                        id === index
                          ? "brightness-110"
                          : "brightness-50 contrast-125 hover:brightness-75"
                      } h-full transform object-cover`}
                      src={`/images/${name}`}
                    />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
