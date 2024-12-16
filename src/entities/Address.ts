import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { City } from "./City";
import { Customer } from "./Customer";
import { Staff } from "./Staff";
import { Store } from "./Store";

@Index("address_pkey", ["addressId"], { unique: true })
@Index("idx_fk_city_id", ["cityId"], {})
@Entity("address", { schema: "public" })
export class Address {
  @PrimaryGeneratedColumn({ type: "integer", name: "address_id" })
  addressId: number;

  @Column("character varying", { name: "address", length: 50 })
  address: string;

  @Column("character varying", { name: "address2", nullable: true, length: 50 })
  address2: string | null;

  @Column("character varying", { name: "district", length: 20 })
  district: string;

  @Column("integer", { name: "city_id" })
  cityId: number;

  @Column("character varying", {
    name: "postal_code",
    nullable: true,
    length: 10,
  })
  postalCode: string | null;

  @Column("character varying", { name: "phone", length: 20 })
  phone: string;

  @Column("timestamp without time zone", {
    name: "last_update",
    default: () => "now()",
  })
  lastUpdate: Date;

  @ManyToOne(() => City, (city) => city.addresses, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "city_id", referencedColumnName: "cityId" }])
  city: City;

  @OneToMany(() => Customer, (customer) => customer.address)
  customers: Customer[];

  @OneToMany(() => Staff, (staff) => staff.address)
  staff: Staff[];

  @OneToMany(() => Store, (store) => store.address)
  stores: Store[];
}
