module.exports = { 
    type: 'postgres',                  // Type de base de données
    host: 'localhost',                // Hôte de la base de données
    port: 5432,                       // Port de la base de données
    username: 'postgres',            // Nom d'utilisateur de la base
    password: '@Katiakatia99@',        // Mot de passe de l'utilisateur
    database: 'sakila',               // Nom de la base de données
    entities: ['dist/**/*.entity.js'], // Entités utilisées par TypeORM
    migrations: ['dist/migrations/*.js'], // Dossier des migrations
    cli: {
      migrationsDir: 'src/migrations', // Dossier où créer de nouvelles migrations
    },
  };
  