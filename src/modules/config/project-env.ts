export interface ProjectEnv {
  POSTGRES_DB: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: number;
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;

  REDIS_HOST: string;
  REDIS_PORT: number;
}
