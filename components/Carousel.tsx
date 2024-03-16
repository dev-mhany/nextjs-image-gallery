import { useRouter } from 'next/router'
import useKeypress from 'react-use-keypress'
import type { SharedModalProps } from '../utils/types'
import SharedModal from './SharedModal'

export default function Carousel({
  currentPhoto,
  nextImages
}: SharedModalProps) {
  const router = useRouter()

  function closeModal() {
    router.push('/')
  }

  function changePhotoId(newVal: number) {
    return newVal
  }

  useKeypress('Escape', () => {
    closeModal()
  })

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <button
        className="absolute inset-0 z-30 cursor-default bg-black backdrop-blur-2xl"
        onClick={closeModal}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentPhoto.blur}
          className="pointer-events-none h-full w-full"
          alt="blurred background"
        />
      </button>
      <SharedModal
        currentPhoto={currentPhoto}
        nextImages={nextImages}
      />
    </div>
  )
}
