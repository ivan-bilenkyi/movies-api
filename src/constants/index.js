import path from 'path';

export const ENV_VARS = {
    PORT: 'PORT',
    JWT_SECRET: 'JWT_SECRET',
    FRONTEND_HOST: 'FRONTEND_HOST',
    BACKEND_HOST: 'BACKEND_HOST',
};

export const MONGO_VARS = {
    MONGO_DB_USER: 'MONGO_DB_USER',
    MONGO_DB_PASSWORD: 'MONGO_DB_PASSWORD',
    MONGO_DB_URI: 'MONGO_DB_URI',
    MONGO_DB_COLLECTION: 'MONGO_DB_COLLECTION',
};

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'upload');