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
    console.log(`${chalk.green('PASSPORT 🛂:')} ${chalk.yellow(message)}`);
  },
  account: (message) => {
    console.log(`${chalk.green('ACCOUNTS 👥:')}$ ${chalk.yellow(message)}`);
  },
  account_simple: (message) => {
    console.log(`${chalk.green('👥:')} ${chalk.yellow(message)}`);
  },
  app: (message) => {
    console.log(`${chalk.blue('[')}${chalk.green('APP')}${chalk.blue(']')} ${chalk.yellow(message)}`);
  },
  server: (message) => {
    console.log(`${chalk.yellow('SERVER 💻:')} ${chalk.bgBlack.white(message)}`);
  },
  server_simple: (message) => {
    console.log(`${chalk.yellow('💻:')} ${chalk.bgBlack.white(message)}`);
  }
}