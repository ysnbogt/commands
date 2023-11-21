import { prompt } from 'enquirer';
import { pbcopy } from '../utils/pbcopy';

export async function main() {
  const keys = await prompt<{ keys: string }>({
    type: 'input',
    name: 'keys',
    message: 'Keys',
  }).then(answer => {
    return answer.keys;
  });

  pbcopy(`<kbd>${keys}</kbd>`);
}

main();
