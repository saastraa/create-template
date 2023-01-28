#!/usr/bin/env node

import chalkAnimation from 'chalk-animation';
import { execSync } from 'child_process';
import figlet from 'figlet';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import { rimrafSync } from 'rimraf';

let repoNameFromArgs = process.argv[2];
let nextJsCloneRepoUrl = `git clone --depth 1 https://github.com/saastraa/create-base-next-app ${repoNameFromArgs}`;
const installDependenciesCommand = `cd ${repoNameFromArgs} && npm install`;

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

/** display welcome logo */
async function displaySaastraa() {
  // console.clear();
  figlet(
    `@Saastraa/*\n`,
    {
      font: 'Standard',
    },
    (error, data) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log(gradient.rainbow(`\n${data}\n`));
    }
  );
}

/** Prompt user to select framework */
async function promptFramework() {
  const answer = await inquirer.prompt({
    name: 'framework',
    type: 'list',
    message: 'Which framework would you like to choose?\n',
    default: 'Next.js',
    choices: ['Next.js', 'Remix Run', 'Astro'],
  });

  return handleFrameworkSelection(answer.framework);
}

/** handling command */
async function handleCommandExecution(command: any) {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
    return true;
  } catch (error: any) {
    process.exit(1);
  }
}

async function handleFrameworkSelection(framework: string) {
  switch (framework) {
    case 'Next.js':
      console.log('\n');
      const checkout = handleCommandExecution(nextJsCloneRepoUrl);

      if (!checkout) {
        process.exit(1);
      }

      /** Remove .git from folder */
      rimrafSync(`./${repoNameFromArgs}/.git`);

      const rainbowInstall = chalkAnimation.rainbow(
        `\nInstalling dependencies\n`
      );

      await sleep(2000);
      rainbowInstall.stop();

      const isDependenciesInstalled = handleCommandExecution(
        installDependenciesCommand
      );

      if (!isDependenciesInstalled) {
        process.exit(1);
      }

      const rainbowTitle = chalkAnimation.rainbow(
        `\n✅ Alright, Let's Go\ncd ${repoNameFromArgs} && npm run dev`
      );

      await sleep(1000);
      rainbowTitle.stop();
      process.exit(0);
    default:
      console.log('[ Default ] ', `Template coming soon for ${framework}`);
      break;
  }
}

async function createTemplate() {
  await displaySaastraa();
  await sleep(1000);
  await promptFramework();
}

createTemplate();
