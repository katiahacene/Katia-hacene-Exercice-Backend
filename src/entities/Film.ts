import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Language } from "./Language";
import { FilmActor } from "./FilmActor";
import { FilmCategory } from "./FilmCategory";
import { Inventory } from "./Inventory";

@Index("film_pkey", ["filmId"], { unique: true })
@Index("film_fulltext_idx", ["fulltext"], {})
@Index("idx_fk_language_id", ["languageId"], {})
@Index("idx_fk_original_language_id", ["originalLanguageId"], {})
@Index("idx_title", ["title"], {})
@Entity("film", { schema: "public" })
export class Film {
  @PrimaryGeneratedColumn({ type: "integer", name: "film_id" })
  filmId: number;

  @Column("character varying", { name: "title", length: 255 })
  title: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("integer", { name: "release_year", nullable: true })
  releaseYear: number | null;

  @Column("integer", { name: "language_id" })
  languageId: number;

  @Column("integer", { name: "original_language_id", nullable: true })
  originalLanguageId: number | null;

  @Column("smallint", { name: "rental_duration", default: () => "3" })
  rentalDuration: number;

  @Column("numeric", {
    name: "rental_rate",
    precision: 4,
    scale: 2,
    default: () => "4.99",
  })
  rentalRate: string;

  @Column("smallint", { name: "length", nullable: true })
  length: number | null;

  @Column("numeric", {
    name: "replacement_cost",
    precision: 5,
    scale: 2,
    default: () => "19.99",
  })
  replacementCost: string;

  @Column("enum", {
    name: "rating",
    nullable: true,
    enum: ["G", "PG", "PG-13", "R", "NC-17"],
    default: () => "'G'",
  })
  rating: "G" | "PG" | "PG-13" | "R" | "NC-17" | null;

  @Column("timestamp without time zone", {
    name: "last_update",
    default: () => "now()",
  })
  lastUpdate: Date;

  @Column("text", { name: "special_features", nullable: true, array: true })
  specialFeatures: string[] | null;

  @Column("tsvector", { name: "fulltext" })
  fulltext: string;

  @ManyToOne(() => Language, (language) => language.films, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "language_id", referencedColumnName: "languageId" }])
  language: Language;

  @ManyToOne(() => Language, (language) => language.films2, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "original_language_id", referencedColumnName: "languageId" },
  ])
  originalLanguage: Language;

  @OneToMany(() => FilmActor, (filmActor) => filmActor.film)
  filmActors: FilmActor[];

  @OneToMany(() => FilmCategory, (filmCategory) => filmCategory.film)
  filmCategories: FilmCategory[];

  @OneToMany(() => Inventory, (inventory) => inventory.film)
  inventories: Inventory[];
}
