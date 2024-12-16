import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FilmCategory } from "./FilmCategory";

@Index("category_pkey", ["categoryId"], { unique: true })
@Entity("category", { schema: "public" })
export class Category {
  @PrimaryGeneratedColumn({ type: "integer", name: "category_id" })
  categoryId: number;

  @Column("character varying", { name: "name", length: 25 })
  name: string;

  @Column("timestamp without time zone", {
    name: "last_update",
    default: () => "now()",
  })
  lastUpdate: Date;

  @OneToMany(() => FilmCategory, (filmCategory) => filmCategory.category)
  filmCategories: FilmCategory[];
}
