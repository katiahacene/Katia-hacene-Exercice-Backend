import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Category } from "./Category";
import { Film } from "./Film";

@Index("film_category_pkey", ["categoryId", "filmId"], { unique: true })
@Entity("film_category", { schema: "public" })
export class FilmCategory {
  @Column("integer", { primary: true, name: "film_id" })
  filmId: number;

  @Column("integer", { primary: true, name: "category_id" })
  categoryId: number;

  @Column("timestamp without time zone", {
    name: "last_update",
    default: () => "now()",
  })
  lastUpdate: Date;

  @ManyToOne(() => Category, (category) => category.filmCategories, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Category;

  @ManyToOne(() => Film, (film) => film.filmCategories, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "film_id", referencedColumnName: "filmId" }])
  film: Film;
}
