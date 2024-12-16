import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(() => {
    console.log('Connexion réussie à la base Sakila !');
  })
  .catch((error) => console.error('Erreur de connexion :', error));
