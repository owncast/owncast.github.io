export interface StoreItem {
  name: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  url: string;
  popular?: boolean;
}

export const storeItems: StoreItem[] = [
  {
    name: "Straight Cut Logo T-Shirt",
    image: "/images/store/straight-cut-logo-t-shirt.webp",
    imageWidth: 256,
    imageHeight: 256,
    url: "https://merch.owncast.online/product/straight-cut-logo-t-shirt",
  },
  {
    name: "Enamel Pin",
    image: "/images/store/enamel-pin.webp",
    imageWidth: 256,
    imageHeight: 256,
    url: "https://merch.owncast.online/product/enamel-pin",
    popular: true,
  },
  {
    name: "Embroidered Zip Up Hoodie",
    image: "/images/store/embroidered-zip-up-hoodie.webp",
    imageWidth: 256,
    imageHeight: 256,
    url: "https://merch.owncast.online/product/owncast-embroidered-logo-zip-up-hoodie",
    popular: true,
  },
  {
    name: "Logo Mug",
    image: "/images/store/logo-mug.webp",
    imageWidth: 256,
    imageHeight: 256,
    url: "https://merch.owncast.online/product/owncast-logo-mug",
  },
  {
    name: "Assorted Stickers",
    image: "/images/store/assorted-stickers.webp",
    imageWidth: 256,
    imageHeight: 256,
    url: "https://merch.owncast.online/product/stickers",
    popular: true,
  },
  {
    name: "Owncat Vibes Mug",
    image: "/images/store/owncat-vibes-mug.webp",
    imageWidth: 256,
    imageHeight: 256,
    url: "https://merch.owncast.online/product/cat-vibes",
  },
  {
    name: "Owncat Pullover Hoodie",
    image: "/images/store/owncat-pullover-hoodie.webp",
    imageWidth: 256,
    imageHeight: 256,
    url: "https://merch.owncast.online/product/owncat-unisex-hoodie",
  },
];