interface IBook {
  _id: string;
  title: string;
  subtitle?: string;
  author: string;
  synopsis: string;
  genre: string[];
  language: string;
  publisher: string;
  publicationDate: Date;
  pageCount: number;
  format: "Tapa Dura" | "Tapa Blanda" | "Ebook" | "AudioLibro";
  price: number;
  stock: number;
  isAvailable: boolean;
}

export { IBook }