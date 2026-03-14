export interface ProgressReading {
  _id: string;
  startPage: number;
  startReading: string;
  finishPage: number;
  finishReading: string;
  speed: number;
  status: string;
}

type BookStatus = "unread" | "in-progress" | "done";

export interface Book {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  recommend?: boolean;
  status?: BookStatus;
  owner?: string;
  progress?: ProgressReading[];
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

export interface ReadingParams {
  id: string;
  page: number;
}
