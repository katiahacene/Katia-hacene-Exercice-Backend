import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FilmActor } from "./FilmActor";

@Index("actor_pkey", ["actorId"], { unique: true })
@Index("idx_actor_last_name", ["lastName"], {})
@Entity("actor", { schema: "public" })
export class Actor {
  @PrimaryGeneratedColumn({ type: "integer", name: "actor_id" })
  actorId: number;

  @Column("character varying", { name: "first_name", length: 45 })
  firstName: string;

  @Column("character varying", { name: "last_name", length: 45 })
  lastName: string;

  @Column("timestamp without time zone", {
    name: "last_update",
    default: () => "now()",
  })
  lastUpdate: Date;

  @OneToMany(() => FilmActor, (filmActor) => filmActor.actor)
  filmActors: FilmActor[];
}
