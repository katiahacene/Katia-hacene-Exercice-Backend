import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Film } from "./Film";

@Index("language_pkey", ["languageId"], { unique: true })
@Entity("language", { schema: "public" })
export class Language {
  @PrimaryGeneratedColumn({ type: "integer", name: "language_id" })
  languageId: number;

  @Column("character", { name: "name", length: 20 })
  name: string;

  @Column("timestamp without time zone", {
    name: "last_update",
    default: () => "now()",
  })
  lastUpdate: Date;

  @OneToMany(() => Film, (film) => film.language)
  films: Film[];

  @OneToMany(() => Film, (film) => film.originalLanguage)
  films2: Film[];
}
