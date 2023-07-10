class AppConfig {
  port = process.env.PORT || 3001; // server port
  imagesAPI =
    "https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q="; // default external API
}

// Development config:
class DevelopmentConfig extends AppConfig {
  isDevelopment = true;
  isProduction = false;
}

// Production config:
class ProductionConfig extends AppConfig {
  isDevelopment = false;
  isProduction = true;
}

const appConfig =
  process.env.NODE_ENV === "production"
    ? new ProductionConfig()
    : new DevelopmentConfig();

export default appConfig;
