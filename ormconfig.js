module.exports = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNCHRONIZE || false, // TODO make it false, this is DESTRUCTIVE
  logging: process.env.DB_LOGGING || false,
  migrationsTableName: "migrations",
  entities: ["src/components/**/*.entity.{js,ts}"],
  migrations: ["migrations/**/*.{js,ts}"],
  subscribers: ["subscribers/**/*.{js,ts}"],
  cli: {
    entitiesDir: "src/components/**/*.entity.{js,ts}",
    migrationsDir: "migrations",
    subscribersDir: "subscribers",
  },
};
