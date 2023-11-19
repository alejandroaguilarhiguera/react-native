export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface ImageFormats extends ImageFormat {
  thumbnail: ImageFormat;
  large: ImageFormat;
  medium: ImageFormat;
  small: ImageFormat;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown | null;
  createdAt: string;
  updatedAt: string;
}

export interface ImageAttributes {
  name: string;
  alternativeTest: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: ImageFormats;
  url: string;
}

export interface Image {
  data: {
    id: number;
    attributes: ImageAttributes;
  };
}

export interface Attributes {
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  image: Image;
}

export interface Card {
  id: number;
  attributes: Attributes;
}
