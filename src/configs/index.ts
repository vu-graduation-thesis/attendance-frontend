const env = {
  apiEndpoint: import.meta.env.VITE_API_END_POINT as string,
  apiEndpointV2: import.meta.env.VITE_API_END_POINT_V2 as string,
  s3AssetUrl: import.meta.env.VITE_S3_ASSET_URL as string,
  env: import.meta.env.VITE_ENV as string,
};

const configs = {
  env: env.env,
  apiEndpoint: env.apiEndpoint,
  apiEndpointV2: env.apiEndpointV2,
  s3AssetUrl: env.s3AssetUrl,
};

export default configs;
