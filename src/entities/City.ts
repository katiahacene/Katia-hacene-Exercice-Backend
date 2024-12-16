import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./Address";
import { Country } from "./Country";

@Index("city_pkey", ["cityId"], { unique: true })
@Index("idx_fk_country_id", ["countryId"], {})
@Entity("city", { schema: "public" })
export class City {
  @PrimaryGeneratedColumn({ type: "integer", name: "city_id" })
  cityId: number;

  @Column("character varying", { name: "city", length: 50 })
  city: string;

  @Column("integer", { name: "country_id" })
  countryId: number;

  @Column("timestamp without time zone", {
    name: "last_update",
    default: () => "now()",
  })
  lastUpdate: Date;

  @OneToMany(() => Address, (address) => address.city)
  addresses: Address[];

  @ManyToOne(() => Country, (country) => country.cities, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "country_id", referencedColumnName: "countryId" }])
  country: Country;
}
