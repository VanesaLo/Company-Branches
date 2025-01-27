const IMAGE_URL = "https://pruebatest.xyz/storage"


export const getImageUrl = (path: string) =>
  path ? `${IMAGE_URL}/${path}` : '/placeholder.png'



