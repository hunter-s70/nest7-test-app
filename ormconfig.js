module.exports = {
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: Boolean(process.env.DB_SCHEMA_SYNC),
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/migrations/*.js"],
  cli: {
    migrationsDir: "migrations"
  },
  migrationsRun: true
};
