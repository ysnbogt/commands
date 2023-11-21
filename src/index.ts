import { prompt } from 'enquirer';
import { readdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

export async function main() {
  const commandsDir = join(__dirname, 'commands');
  const files = readdirSync(commandsDir).filter(file => file.endsWith('.ts'));

  const selectedFile = await prompt<{ file: string }>({
    type: 'select',
    name: 'file',
    message: 'Select a file to execute',
    choices: files,
  }).then(answer => answer.file);

  execSync(`ts-node ${join(commandsDir, selectedFile)}`, { stdio: 'inherit' });
}

main();
