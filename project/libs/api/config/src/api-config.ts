import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 3000;

const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

type Environment = typeof ENVIRONMENTS[number];

export interface ApiConfig {
  environment: string;
  port: number;  
  applicationServiceURL: {
    blog: string;
    fileVault: string;
    notity: string;
    user: string;   
  },
  httpClient: {
    maxRedirect: number;
    timeout: number;
  }
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port().default(DEFAULT_PORT),  
  applicationServiceURL: Joi.object({
    blog: Joi.string().valid(),
    fileVault: Joi.string().valid(),
    notity: Joi.string().valid(),
    user: Joi.string().valid(),    
  }),
  httpClient: {
    maxRedirect: Joi.number(),
    timeout: Joi.number(),
  }
});

function validateConfig(config: ApiConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Api Config Validation Error]: ${error.message}`);
  }
}

export function getConfig(): ApiConfig {
  const config: ApiConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),    
    applicationServiceURL: {
      blog: process.env.BLOG_SERVICE_URL,      
      fileVault: process.env.FILE_VAULT_SERVICE_URL,
      notity: process.env.NOTIFY_SERVICE_URL,
      user: process.env.USER_SERVICE_URL,     
    },
    httpClient: {
      maxRedirect: parseInt(process.env.HTTP_CLIENT_MAX_REDIRECTS, 10),
      timeout: parseInt(process.env.HTTP_CLIENT_TIMEOUT, 10),
    }
  };

  validateConfig(config);  
  return config;
}

export default registerAs('api', getConfig);