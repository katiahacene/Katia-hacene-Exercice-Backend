import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Film } from "./Film";
import { Store } from "./Store";
import { Rental } from "./Rental";

@Index("idx_store_id_film_id", ["filmId", "storeId"], {})
@Index("inventory_pkey", ["inventoryId"], { unique: true })
@Entity("inventory", { schema: "public" })
export class Inventory {
  @PrimaryGeneratedColumn({ type: "integer", name: "inventory_id" })
  inventoryId: number;

  @Column("integer", { name: "film_id" })
  filmId: number;

  @Column("integer", { name: "store_id" })
  storeId: number;

  @Column("timestamp without time zone", {
    name: "last_update",
    default: () => "now()",
  })
  lastUpdate: Date;

  @ManyToOne(() => Film, (film) => film.inventories, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "film_id", referencedColumnName: "filmId" }])
  film: Film;

  @ManyToOne(() => Store, (store) => store.inventories, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "store_id", referencedColumnName: "storeId" }])
  store: Store;

  @OneToMany(() => Rental, (rental) => rental.inventory)
  rentals: Rental[];
}
