import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Carousel from '../../components/Carousel'
import results from '../../utils/cachedImages.json'
import type { ImageProps, SharedModalProps } from '../../utils/types'
import { range } from '../../utils/range'

const Home: NextPage = ({ currentPhoto, nextImages }: SharedModalProps) => {
  const router = useRouter()
  const { photoId } = router.query
  let index = Number(photoId)

  return (
    <>
      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={currentPhoto} nextImages={nextImages} />
      </main>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
  const index = Number(context.params.photoId)
  const currentPhoto = results.find(
    (img) => img.id === index
  )
  let nextImages = results?.filter((img: ImageProps) =>
  range(index - 7, index + 7).includes(img.id)
);
  return {
    props: {
      currentPhoto,
      nextImages,
    },
  }
}

export async function getStaticPaths() {

  let fullPaths = []
  for (let i = 0; i < results.length; i++) {
    fullPaths.push({ params: { photoId: i.toString() } })
  }

  return {
    paths: fullPaths,
    fallback: false,
  }
}
