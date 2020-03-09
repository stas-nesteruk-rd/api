export const ENVIRONMENTS = {
    DEV: 'development',
    TEST: 'test',
    PROD: 'production',
};

export function getCurrentEnvironment() {
    switch (process.env.NODE_ENV) {
      case 'production':
        return ENVIRONMENTS.PROD;
      case 'test':
        return ENVIRONMENTS.TEST;
      case 'development':
      case 'development-local':
      default:
        return ENVIRONMENTS.DEV;
    }
}