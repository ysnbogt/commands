import OpenAI from 'openai';
import { configDotenv } from 'dotenv';

import { prompt } from 'enquirer';
import { pbcopy } from '../utils/pbcopy';

configDotenv();

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

async function chat(issueName: string): Promise<string[]> {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: `
    Issue Name: ${issueName}

    Please use the following constraints to suggest a branch name from the above Issue name.
    NOTE: Do not output anything other than candidates.

    Constraints:
    - branch prefix
      - feature
      - refactor
      - release
      - bugfix
      - hotfix
      - docs
    - output
      - markdown list format
    `,
      },
    ],
    model: 'gpt-4-0613',
  });
  const result = chatCompletion.choices[0].message.content || '';
  return result?.split('\n').map(line => line.replace(/^- /, ''));
}

export async function main() {
  const issueName = await prompt<{ issueName: string }>({
    type: 'input',
    name: 'issueName',
    message: 'Input issue name',
  }).then(answer => {
    return answer.issueName;
  });

  const suggestedBranchNames = await chat(issueName);
  const selectedBranchName = await prompt<{ branchName: string }>({
    type: 'select',
    name: 'branchName',
    message: 'Select branch name',
    choices: suggestedBranchNames,
  }).then(answer => {
    return answer.branchName;
  });

  pbcopy(selectedBranchName);
}

main();
