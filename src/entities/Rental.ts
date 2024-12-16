import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Customer } from "./Customer";
import { Inventory } from "./Inventory";
import { Staff } from "./Staff";

@Index(
  "idx_unq_rental_rental_date_inventory_id_customer_id",
  ["customerId", "inventoryId", "rentalDate"],
  { unique: true }
)
@Index("idx_fk_inventory_id", ["inventoryId"], {})
@Index("rental_pkey", ["rentalId"], { unique: true })
@Entity("rental", { schema: "public" })
export class Rental {
  @PrimaryGeneratedColumn({ type: "integer", name: "rental_id" })
  rentalId: number;

  @Column("timestamp without time zone", { name: "rental_date" })
  rentalDate: Date;

  @Column("integer", { name: "inventory_id" })
  inventoryId: number;

  @Column("integer", { name: "customer_id" })
  customerId: number;
  @Column("integer", { name: "staff_id" })
  staffId: number;
  @Column("timestamp without time zone", {
    name: "return_date",
    nullable: true,
  })
  returnDate: Date | null;

  @Column("timestamp without time zone", {
    name: "last_update",
    default: () => "now()",
  })
  lastUpdate: Date;

 

  @ManyToOne(() => Customer, (customer) => customer.rentals, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "customer_id", referencedColumnName: "customerId" }])
  customer: Customer;

  @ManyToOne(() => Inventory, (inventory) => inventory.rentals, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "inventory_id", referencedColumnName: "inventoryId" }])
  inventory: Inventory;

  @ManyToOne(() => Staff, (staff) => staff.rentals, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "staff_id", referencedColumnName: "staffId" }])
  staff: Staff;
}
