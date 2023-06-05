import dotenv from 'dotenv';
import bunyan from 'bunyan';
import cloudinary from 'cloudinary';

dotenv.config({});

class Config {
  public DATABASE_URL: string | undefined;
  public NODE_ENV: string | undefined;
  public PORT: number | undefined;
  public CLIENT_URL: string | undefined;
  public COOKIE_EXPIRE: string | undefined;
  public JWT_SECRET: string | undefined;
  public JWT_EXPIRE: string | undefined;
  public CLOUDINARY_NAME: string | undefined;
  public CLOUDINARY_API_KEY: string | undefined;
  public CLOUDINARY_API_SECRET: string | undefined;
  public SMPT_HOST: string | undefined;
  public SMPT_PORT: string | undefined;
  public SMPT_SERVICE: string | undefined;
  public SMPT_MAIL: string | undefined;
  public SMPT_PASSWORD: string | undefined;
  public STRIPE_SECRET_KEY: string | undefined;
  public STRIPE_API_KEY: string | undefined;
  public EC2_URL: string | undefined;

  private readonly DEFAULT_DATABASE_URL = 'mongodb://localhost:27017/learnmanagement';
  private readonly DEFAULT_NODE_ENV = 'development';
  private readonly DEFAULT_PORT = 8000;
  private readonly DEFAULT_CLIENT_URL = 'http://localhost:5173';
  private readonly DEFAULT_COOKIE_EXPIRE = '30';
  private readonly DEFAULT_JWT_SECRET = '';
  private readonly DEFAULT_JWT_EXPIRE = '';
  private readonly DEFAULT_CLOUDINARY_NAME = '';
  private readonly DEFAULT_CLOUDINARY_API_KEY = '';
  private readonly DEFAULT_CLOUDINARY_API_SECRET = '';
  private readonly DEFAULT_SMPT_HOST = '';
  private readonly DEFAULT_SMPT_PORT = '';
  private readonly DEFAULT_SMPT_SERVICE = '';
  private readonly DEFAULT_SMPT_MAIL = '';
  private readonly DEFAULT_SMPT_PASSWORD = '';
  private readonly DEFAULT_STRIPE_SECRET_KEY = '';
  private readonly DEFAULT_STRIPE_API_KEY = '';


  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
    this.NODE_ENV = process.env.NODE_ENV || this.DEFAULT_NODE_ENV;
    this.PORT = Number(process.env.PORT) || Number(this.DEFAULT_PORT);
    this.CLIENT_URL = process.env.CLIENT_URL || this.DEFAULT_CLIENT_URL;
    this.COOKIE_EXPIRE = process.env.COOKIE_EXPIRE || this.DEFAULT_COOKIE_EXPIRE;
    this.JWT_SECRET = process.env.JWT_SECRET || this.DEFAULT_JWT_SECRET;
    this.JWT_EXPIRE = process.env.JWT_EXPIRE || this.DEFAULT_JWT_EXPIRE;
    this.CLOUDINARY_NAME = process.env.CLOUDINARY_NAME || this.DEFAULT_CLOUDINARY_NAME;
    this.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || this.DEFAULT_CLOUDINARY_API_KEY;
    this.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || this.DEFAULT_CLOUDINARY_API_SECRET;
    this.SMPT_HOST = process.env.SMPT_HOST || this.DEFAULT_SMPT_HOST;
    this.SMPT_PORT = process.env.SMPT_PORT || this.DEFAULT_SMPT_PORT;
    this.SMPT_SERVICE = process.env.SMPT_SERVICE || this.DEFAULT_SMPT_SERVICE;
    this.SMPT_MAIL = process.env.SMPT_MAIL || this.DEFAULT_SMPT_MAIL;
    this.SMPT_PASSWORD = process.env.SMPT_PASSWORD || this.DEFAULT_SMPT_PASSWORD;
    this.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || this.DEFAULT_STRIPE_SECRET_KEY;
    this.STRIPE_API_KEY = process.env.STRIPE_API_KEY || this.DEFAULT_STRIPE_API_KEY;
    this.EC2_URL = process.env.EC2_URL || '';
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: 'debug' });
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined.`);
      }
    }
  }

  public cloudinaryConfig(): void {
    cloudinary.v2.config({
      cloud_name: this.CLOUDINARY_NAME,
      api_key: this.CLOUDINARY_API_KEY,
      api_secret: this.CLOUDINARY_API_SECRET
    });
  }
}

export const config: Config = new Config();
