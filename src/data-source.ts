import { DataSource } from 'typeorm';
import { Customer } from './entities/Customer';
import { Film } from './entities/Film';
import { Rental } from './entities/Rental';

export const AppDataSource = new DataSource({
  type: 'postgres', // Utilisez PostgreSQL
  host: 'localhost', // Adresse de votre serveur
  port: 5432, // Port PostgreSQL
  username: 'postgres', // Nom d'utilisateur PostgreSQL
  password: '@Katiakatia99@', // Mot de passe PostgreSQL
  database: 'sakila', // Nom de la base de données
  entities: [Customer, Film, Rental], // Liste des entités
  synchronize: false, // NE PAS activer en production pour éviter les conflits
  logging: true,
});
