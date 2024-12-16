import { DataSource } from 'typeorm';
import { Customer } from './src/entities/Customer';
import { Rental } from './src/entities/Rental';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '@Katiakatia99@',
  database: 'sakila',
  entities: [Customer, Rental],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
