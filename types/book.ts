interface ProgressReadin {
  startPage: number;
  startReading: string;
  finishPage: number;
  finishReading: string;
  speed: number;
  status: string;
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  recommend?: boolean;
  status?: string;
  owner?: string;
  progress?: ProgressReadin[];
}

export interface RecommendedBooksResponse {
  results: [Book];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface AddBookCredentials {
  title: string;
  author: string;
  totalPages: number;
}
