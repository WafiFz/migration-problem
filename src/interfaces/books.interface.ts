import { Categories } from "@/entity/Categories";
import { Writers } from "@/entity/Writers";

export interface Book {
  id: number;
  title: string;
  publisher: string;
  price: number;
  email_writer : Writers;
  categories : Categories[];
}
