### Setup

```zsh
$ git clone git@github.com:ysnbogt/commands.git
$ cd ./commands
$ # brew install python@3.11
$ make setup
$ echo "source $(pwd)/commands.sh" >> ~/.zshrc
```

### Create a command

```zsh
$ make generate
```

### Use Environment Variables

**`.zshrc`**

```sh
export API_KEY="****************"
```

**`command.ts`**

```ts
import { configDotenv } from 'dotenv';

configDotenv();

const API_KEY = process.env['API_KEY'];
```
