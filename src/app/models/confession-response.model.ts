import { Confession } from "./confession.model";

export interface ConfessionResponse {
  status: string;
  data: Confession[];
  meta: {
    total: number;
    page: number;
    last_page: number;
  };
}
