module.exports = {
  name: "default",
  type: "postgres",
  url: process.env.DATABASE_URL,
  migrations: [
    process.env.DATABASE_MIGRATIONS
  ],
  entities: [
    process.env.DATABASE_ENTITIES
  ],
  cli: {
    "migrationsDir": "./src/database/migrations"
  }
}
