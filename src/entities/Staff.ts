import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Rental } from "./Rental";
import { Address } from "./Address";
import { Store } from "./Store";

@Index("staff_pkey", ["staffId"], { unique: true })
@Entity("staff", { schema: "public" })
export class Staff {
  @PrimaryGeneratedColumn({ type: "integer", name: "staff_id" })
  staffId: number;

  @Column("character varying", { name: "first_name", length: 45 })
  firstName: string;

  @Column("character varying", { name: "last_name", length: 45 })
  lastName: string;

  @Column("character varying", { name: "email", nullable: true, length: 50 })
  email: string | null;

  @Column("boolean", { name: "active", default: () => "true" })
  active: boolean;

  @Column("character varying", { name: "username", length: 16 })
  username: string;

  @Column("character varying", { name: "password", nullable: true, length: 40 })
  password: string | null;

  @Column("timestamp without time zone", {
    name: "last_update",
    default: () => "now()",
  })
  lastUpdate: Date;

  @Column("bytea", { name: "picture", nullable: true })
  picture: Buffer | null;



  @OneToMany(() => Rental, (rental) => rental.staff)
  rentals: Rental[];

  @ManyToOne(() => Address, (address) => address.staff, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "address_id", referencedColumnName: "addressId" }])
  address: Address;

  @ManyToOne(() => Store, (store) => store.staff)
  @JoinColumn([{ name: "store_id", referencedColumnName: "storeId" }])
  store_2: Store;

  @OneToOne(() => Store, (store) => store.managerStaff)
  store: Store;
}
