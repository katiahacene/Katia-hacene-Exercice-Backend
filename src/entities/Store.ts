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
import { Customer } from "./Customer";
import { Inventory } from "./Inventory";
import { Staff } from "./Staff";
import { Address } from "./Address";

@Index("idx_unq_manager_staff_id", ["managerStaffId"], { unique: true })
@Index("store_pkey", ["storeId"], { unique: true })
@Entity("store", { schema: "public" })
export class Store {
  @PrimaryGeneratedColumn({ type: "integer", name: "store_id" })
  storeId: number;

  @Column("integer", { name: "manager_staff_id" })
  managerStaffId: number;

  @Column("timestamp without time zone", {
    name: "last_update",
    default: () => "now()",
  })
  lastUpdate: Date;

  @OneToMany(() => Customer, (customer) => customer.store)
  customers: Customer[];

  @OneToMany(() => Inventory, (inventory) => inventory.store)
  inventories: Inventory[];

  @OneToMany(() => Staff, (staff) => staff.store_2)
  staff: Staff[];

  @ManyToOne(() => Address, (address) => address.stores, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "address_id", referencedColumnName: "addressId" }])
  address: Address;

  @OneToOne(() => Staff, (staff) => staff.store, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "manager_staff_id", referencedColumnName: "staffId" }])
  managerStaff: Staff;
}
