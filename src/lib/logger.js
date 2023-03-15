const chalk = require('chalk');

module.exports = {
  info: (message) => {
    console.log(chalk.blue(message));
  },
  warn: (message) => {
    console.log(chalk.yellow(message));
  },
  error: (message) => {
    console.log(chalk.red(message));
  },
  debug: (message) => {
    console.log(chalk.magenta(message));
  },
  db: (message) => {
    console.log(`${chalk.blue('[')}${chalk.green('DB')}${chalk.blue(']')} ${chalk.yellow(message)}`);
  },
  session: (message) => {
    console.log(`${chalk.blue('[')}${chalk.green('SESSION')}${chalk.blue(']')} ${chalk.yellow(message)}`);
  },
  passport: (message) => {
    console.log(`${chalk.blue('[')}${chalk.green('PASSPORT')}${chalk.blue(']')} ${chalk.yellow(message)}`);
  },
  account_service: (message) => {
    console.log(`${chalk.blue('[')}${chalk.green('ACCOUNT_SERVICE')}${chalk.blue(']')} ${chalk.yellow(message)}`);
  },
  app: (message) => {
    console.log(`${chalk.blue('[')}${chalk.green('APP')}${chalk.blue(']')} ${chalk.yellow(message)}`);
  },
  server: (message) => {
    console.log(`${chalk.blue('[')}${chalk.green('SERVER')}${chalk.blue(']')} ${chalk.yellow(message)}`);
  }
}