do_cli
======



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@abdellah-alaoui/do.svg)](https://npmjs.org/package/@abdellah-alaoui/do)
[![Downloads/week](https://img.shields.io/npm/dw/@abdellah-alaoui/do.svg)](https://npmjs.org/package/@abdellah-alaoui/do)
[![License](https://img.shields.io/npm/l/@abdellah-alaoui/do.svg)](https://github.com/haikyuu/do_cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @abdellah-alaoui/do
$ do_cli COMMAND
running command...
$ do_cli (-v|--version|version)
@abdellah-alaoui/do/0.0.0 darwin-x64 node-v13.8.0
$ do_cli --help [COMMAND]
USAGE
  $ do_cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`do_cli autocomplete [SHELL]`](#do_cli-autocomplete-shell)
* [`do_cli droplet [COMMAND]`](#do_cli-droplet-command)
* [`do_cli hello`](#do_cli-hello)
* [`do_cli help [COMMAND]`](#do_cli-help-command)

## `do_cli autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ do_cli autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ do_cli autocomplete
  $ do_cli autocomplete bash
  $ do_cli autocomplete zsh
  $ do_cli autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.1.5/src/commands/autocomplete/index.ts)_

## `do_cli droplet [COMMAND]`

Describe the command here

```
USAGE
  $ do_cli droplet [COMMAND]

OPTIONS
  -c, --create
  -n, --name=name  name to print

DESCRIPTION
  ...
  Available commands are:
  - create: create a droplet from a snapshot (not working because of an API issue)
  - snapshot: create a snapshot from a running droplet
  - destroy: destroy a snapshot

  Just run the command, we'll guide you through the process smoothly
```

_See code: [src/commands/droplet.js](https://github.com/haikyuu/do_cli/blob/v0.0.0/src/commands/droplet.js)_

## `do_cli hello`

Describe the command here

```
USAGE
  $ do_cli hello

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/hello.js](https://github.com/haikyuu/do_cli/blob/v0.0.0/src/commands/hello.js)_

## `do_cli help [COMMAND]`

display help for do_cli

```
USAGE
  $ do_cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_
<!-- commandsstop -->
