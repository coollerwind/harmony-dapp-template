'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

function parsedProjectTitle (title) {
  return title.trim().split(' ').map(word => word.toLowerCase()).join('-');
}

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(
        `The best way to create your ${chalk.green('Harmony')} dapp!!`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'title',
        message: 'Insert project title:',
        default: 'Harmony Dapp'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Insert author name (optional)',
        default: 'Jotagep'
      },
      {
        type: 'input',
        name: 'testnetKey',
        message: 'Add your testnet account private key if you want deploy on testnet (optional)',
      },
      {
        type: 'input',
        name: 'mainnetKey',
        message: 'Add your mainnet account private key if you want deploy on mainnet (optional)',
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = {
        ...props,
        parsedTitle: parsedProjectTitle(props.title)
      };
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(),
      this.props,
      {},
      { globOptions: { dot: true } }
    );
    if (!this.props.testnetKey && !this.props.mainnetKey && this.fs.exists('packages/hardhat/.env')) {
      this.fs.delete('packages/hardhat/.env');
    }
  }

  end() {
    this.spawnCommand('yarn', ['install']);
    console.log(`============================================================`);
    console.log(`======= Welcome to ${chalk.green(this.props.title)} ========`);
    console.log(`============================================================`);
  }
};