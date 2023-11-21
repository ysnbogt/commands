import { prompt } from 'enquirer';
import { promisifyExec } from '../utils/promisifyExec';

type Branch = {
  value: string;
  hint: string;
  disabled: boolean;
};

async function getBranches(): Promise<(Branch | void)[]> {
  const branches = await promisifyExec('git branch -v --sort=committerdate');
  const choices = branches.stdout
    .split(/\n/)
    .filter(branch => branch.trim())
    .map<Branch | undefined>(branch => {
      const pattern = /([* ]) +([^ ]+) +(.+)/;
      const matched = branch.match(pattern);
      if (matched) {
        const [, flag, value, hint] = matched;
        return { value, hint, disabled: flag === '*' };
      }
    });
  return choices;
}

export async function main() {
  const choices = await getBranches();
  const branch = await prompt<{ branch: string }>({
    type: 'select',
    name: 'branch',
    message: 'Select branch',
    choices: choices
      .filter(choice => !choice?.disabled)
      .map(choice => choice?.value || ''),
  }).then(answer => {
    return answer.branch;
  });

  await promisifyExec(`git switch ${branch}`);
}

main();
