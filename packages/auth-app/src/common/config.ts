import { config as dotenvConfig } from "dotenv";
if (process.env.NODE_ENV !== "test") {
  dotenvConfig();
}

const getRequiredEnvVar = (name: string) => {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required environment variable ${name}`);
    process.exit(1);
  }
  return value;
};

export const config = {
  db: {
    type: "postgres",
    host: getRequiredEnvVar("POSTGRES_HOST"),
    port: parseInt(getRequiredEnvVar("POSTGRES_PORT")),
    username: getRequiredEnvVar("POSTGRES_USER"),
    password: getRequiredEnvVar("POSTGRES_PASSWORD"),
    database: getRequiredEnvVar("POSTGRES_DB"),
    entities: [
      "dist/**/*.entity{.ts,.js}",
      "src/**/*.entity{.ts,.js}"
    ],
    synchronize: true,
  },
  port: parseInt(process.env.PORT || "8000", 10),
};

export type ConfigType = typeof config;
