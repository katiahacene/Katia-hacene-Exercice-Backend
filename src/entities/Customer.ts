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
import { Store } from "./Store";

import { Rental } from "./Rental";

@Index("idx_fk_address_id", ["addressId"], {})
@Index("customer_pkey", ["customerId"], { unique: true })
@Index("idx_last_name", ["lastName"], {})
@Index("idx_fk_store_id", ["storeId"], {})
@Entity("customer", { schema: "public" })
export class Customer {
  @PrimaryGeneratedColumn({ type: "integer", name: "customer_id" })
  customerId: number;

  @Column("integer", { name: "store_id" })
  storeId: number;

  @Column("character varying", { name: "first_name", length: 45 })
  firstName: string;

  @Column("character varying", { name: "last_name", length: 45 })
  lastName: string;
  @Column("character varying", { name: "timezone", length: 100 })
  timezone: string;
  @Column("character varying", { name: "email", nullable: true, length: 50 })
  email: string | null;
  
  @Column("integer", { name: "address_id" })
  addressId: number;

  @Column("boolean", { name: "activebool", default: () => "true" })
  activebool: boolean;

  @Column("date", { name: "create_date", default: () => "('now')::date" })
  createDate: string;

  @Column("timestamp without time zone", {
    name: "last_update",
    nullable: true,
    default: () => "now()",
  })
  lastUpdate: Date | null;

  @Column("integer", { name: "active", nullable: true })
  active: number | null;

  @ManyToOne(() => Address, (address) => address.customers, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "address_id", referencedColumnName: "addressId" }])
  address: Address;

  @ManyToOne(() => Store, (store) => store.customers, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "store_id", referencedColumnName: "storeId" }])
  store: Store;

  
  @OneToMany(() => Rental, (rental) => rental.customer)
  rentals: Rental[];
}
