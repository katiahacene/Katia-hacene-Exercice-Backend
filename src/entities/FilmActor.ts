import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Actor } from "./Actor";
import { Film } from "./Film";

@Index("film_actor_pkey", ["actorId", "filmId"], { unique: true })
@Index("idx_fk_film_id", ["filmId"], {})
@Entity("film_actor", { schema: "public" })
export class FilmActor {
  @Column("integer", { primary: true, name: "actor_id" })
  actorId: number;

  @Column("integer", { primary: true, name: "film_id" })
  filmId: number;

  @Column("timestamp without time zone", {
    name: "last_update",
    default: () => "now()",
  })
  lastUpdate: Date;

  @ManyToOne(() => Actor, (actor) => actor.filmActors, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "actor_id", referencedColumnName: "actorId" }])
  actor: Actor;

  @ManyToOne(() => Film, (film) => film.filmActors, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "film_id", referencedColumnName: "filmId" }])
  film: Film;
}
