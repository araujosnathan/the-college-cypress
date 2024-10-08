const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'results/my-results-[hash].xml',
  },
  e2e: {
    setupNodeEvents(on, config) {
      config.baseUrl = config.env[config.env['env']].baseUrl
      config.env.backendUrl = config.env[config.env['env']].backendUrl
      allureCypress(on);
      return config;
      // implement node event listeners here
    },
  },
});
