const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '49ixo5',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
