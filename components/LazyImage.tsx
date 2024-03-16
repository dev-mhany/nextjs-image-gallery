import Image from "next/image";
import React, { useRef } from "react";
import Link from "next/link";
import { useCallback } from "react";
import useVisibility from "../utils/useVisibility";

export default function LazyImage({ id, name, blur, width, height, faces }) {
  const handleImageError = useCallback((event) => {
    const image = event.target;
    fetch(image.src, {
      method: "GET",
    }).then((response) => {
      if (response.url.endsWith("password-protect")) {
        window.location.href = "/password-protect";
      }
    });
  }, []);

  const [isVisible, ref] = useVisibility<HTMLDivElement>();

  return (
    <div className="relative" ref={ref}>
      <Link
        href={`/p/${id}`}
        id={`${id}`}
        className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
      >
        <Image
          alt=""
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
      {isVisible &&
        faces.length < 20 &&
        faces.map(({ k, n }, i) => (
          <Link key={n} href={`/m/${k}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
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
  );
}
