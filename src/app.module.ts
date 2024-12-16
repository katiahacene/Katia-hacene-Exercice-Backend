import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/Customer';
import { Language } from './entities/Language';

import { Film } from './entities/Film';
import { Rental } from './entities/Rental';

import { Actor } from './entities/Actor';
import { Address } from './entities/Address';
import { Category } from './entities/Category';
import { City } from './entities/City';
import { Country } from './entities/Country';
import { FilmActor } from './entities/FilmActor';
import { FilmCategory } from './entities/FilmCategory';
import { Inventory } from './entities/Inventory';
import { Staff } from './entities/Staff';
import { Store } from './entities/Store';



import { CustomerController } from './controllers/customer.controller';
import { RentalController } from './controllers/rental.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleService } from './services/schedule.service';
import { EmailService } from './services/email.service';
import { FilmController } from './controllers/film.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',         // Adresse de  serveur PostgreSQL
      port: 5432,                // Port de PostgreSQL
      username: 'postgres',      // Nom d'utilisateur
      password: '@Katiakatia99@', // Mot de passe
      database: 'sakila',        // Base de données
      entities: [Customer, Film, Rental,Language,Actor,Address,Category,City,Country,FilmActor,FilmCategory,Inventory,Staff,Store], // Ajoutez ici vos entités
      synchronize: false,         // Permet de synchroniser automatiquement les entités avec la base de données
      autoLoadEntities: true,    // Charge automatiquement les entités        // Ne modifie pas automatiquement votre schéma de base de données, assure la stabilité
    }),
    TypeOrmModule.forFeature([Customer, Film, Rental]), // Charge les entités
    ScheduleModule.forRoot(), // Ajouter le module ici
  ],
  controllers: [AppController, CustomerController, FilmController, RentalController],
  providers: [AppService, ScheduleService,EmailService],
})
export class AppModule {}
