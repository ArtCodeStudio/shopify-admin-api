import * as dotenv from 'dotenv';
dotenv.config();

declare var process: { env: any; };

const env: { [prop: string]: string } = process.env;

// Grab secret keys
export const Config = {
    apiKey: env["API_KEY"] || env["GITHUB_API_KEY"],
    secretKey: env["SECRET_KEY"] || env["GITHUB_SECRET_KEY"],
    shopDomain: env["SHOP_DOMAIN"] || env["GITHUB_SHOP_DOMAIN"],
    accessToken: env["ACCESS_TOKEN"] || env["GITHUB_ACCESS_TOKEN"],
}


if (!Config.apiKey) {
    throw new Error(`Expected 'apiKey' in process.env to exist.`);
}

if (!Config.secretKey) {
    throw new Error(`Expected 'secretKey' in process.env to exist.`);
}

if (!Config.shopDomain) {
    throw new Error(`Expected 'shopDomain' in process.env to exist.`);
}

if (!/https:\/\//.test(Config.shopDomain)) {
    throw new Error(`Expected 'shopDomain' to be a full URL with 'https://' protocol.`);
}

if (!Config.accessToken) {
    throw new Error(`Expected 'accessToken' in process.env to exist.`);
}