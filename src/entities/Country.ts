import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { City } from "./City";

@Index("country_pkey", ["countryId"], { unique: true })
@Entity("country", { schema: "public" })
export class Country {
  @PrimaryGeneratedColumn({ type: "integer", name: "country_id" })
  countryId: number;

  @Column("character varying", { name: "country", length: 50 })
  country: string;

  @Column("timestamp without time zone", {
    name: "last_update",
    default: () => "now()",
  })
  lastUpdate: Date;

  @OneToMany(() => City, (city) => city.country)
  cities: City[];
}
