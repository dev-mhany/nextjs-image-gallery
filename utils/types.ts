/* eslint-disable no-unused-vars */
export interface ImageProps {
  id: number
  name: string
  blur: string
  width: number
  height: number
  faces: FaceProps[]
}

export interface FaceProps {
  k: number
  n: string
}

export interface SharedModalProps {
  nextImages: ImageProps[]
  currentPhoto?: ImageProps
}
