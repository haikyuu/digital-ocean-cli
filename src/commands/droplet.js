const { Command, flags } = require("@oclif/command");
const { prompt } = require("inquirer");
const { format } = require("javascript-time-ago");

const fetch = require("../api");

class DropletCommand extends Command {
  static args = [{ name: "command" }];
  commands = ["create", "snapshot", "destroy"];
  ssh_keys = [];
  async run() {
    const { flags, args } = this.parse(DropletCommand);
    const name = flags.name || "world";
    const { ssh_keys } = await fetch("/account/keys");
    this.log("SSH keys loaded successfully.");
    this.ssh_keys = ssh_keys.map(({ id }) => id);

    if (this.commands.indexOf(args.command) > -1) {
      try {
        await this[args.command]();
      } catch (e) {
        this.error(e);
      }
    } else {
      this.error(
        `No command with name ${args.command} exists. Did you add it to the commands property?`
      );
    }
  }
  async destroy(id) {
    let dropletId = id;
    if (!dropletId) {
      const { droplets } = await fetch(`/droplets`);
      if (droplets.length === 0) {
        this.log("⚠️ No droplets are available.");
        return;
      }
      const { droplet } = await prompt([
        {
          name: "droplet",
          message: "Select the droplet to destroy",
          type: "list",
          choices: droplets.map(({ name }) => name)
        }
      ]);
      const { id: dropletIdToDelete } = droplets.find(({ name }) => droplet);
      dropletId = dropletIdToDelete;
    }
    // check for snapshots from this droplet
    this.log("Looking for snapshots created from this droplet ...");
    const { snapshots } = await fetch(`/droplets/${dropletId}/snapshots`);
    if (snapshots.length > 0) {
      this.log(
        snapshots.map(
          ({ name, created_at }) => `- ${name}. created ${format(created_at)}`
        )
      );
    } else {
      this.log("⚠️ No snapshot was created from this droplet");
      const { shouldContinue } = await prompt([
        {
          name: "shouldContinue",
          message: "Do you want to continue deleting this droplet?",
          type: "confirm"
        }
      ]);
      if (!shouldContinue) {
        return;
      }
    }
    const res = await fetch(`/droplets/${dropletId}`, {
      method: "delete",
      noResponse: true
    });
    this.log(res);
  }
  async snapshot(id) {
    let dropletId = id;
    if (!id) {
      const { droplets } = await fetch(`/droplets`);
      const { droplet } = await prompt([
        {
          name: "droplet",
          message: "Select a droplet to create a snapshot from",
          type: "list",
          choices: droplets.map(({ name }) => name)
        }
      ]);
      const { id: dropletIdToSnapshot } = droplets.find(({ name }) => droplet);
      dropletId = dropletIdToSnapshot;
    }
    this.log(`Snapshotting Droplet ${dropletId}`);
    const result = await fetch(`/droplets/${dropletId}/actions?type=snapshot`);
    this.log(result);
  }
  async create() {
    const { images } = await fetch(`/images?type=snapshot&private=true`);
    const { snapshot } = await prompt([
      {
        name: "snapshot",
        message: "Select a snapshot",
        type: "list",
        choices: images.map(({ name }) => name)
      }
    ]);
    const { id: snapshotId } = images.find(({ name }) => name === snapshot);
    // check if snapshot has a droplet
    this.log(
      "Checking to see if there is a droplet that's using this snapshot ..."
    );
    const { droplets } = await fetch(`/droplets?image=${snapshotId}`);
    if (droplets.length === 0) {
      this.log("✅ no droplet is using this snapshot");
    } else {
      this.log("⚠️ The following droplets are using this snapshot");
      this.log(droplets.map(({ name }) => `- ${name}`).join("/n"));
      const { shouldContinue } = await prompt([
        {
          name: "shouldContinue",
          message: "Do you want to continue creating this droplet?",
          type: "confirm"
        }
      ]);
      if (!shouldContinue) {
        return;
      }
    }
    // create a droplet
    const { name } = await prompt([
      {
        name: "name",
        message: "What's the name of the droplet?",
        type: "input"
      }
    ]);
    try {
      this.log("Creating the droplet ...");
      this.log("Snapshot ID", snapshotId);
      const result = await fetch(`/droplets`, {
        method: "post",
        body: JSON.stringify({
          name,
          image: snapshotId,
          region: "nyc3",
          size: "s-1vcpu-1gb",
          ssh_keys: this.ssh_keys,
        })
      });
      if(res.ok){
        this.log('Droplet destroyed successfully')
      }else{
        this.log(res)
      }
    } catch (e) {
      this.error("error creating droplet", e);
    }
  }
}

DropletCommand.description = `Describe the command here
...
Available commands are:
- create: create a droplet from a snapshot (not working because of an API issue)
- snapshot: create a snapshot from a running droplet
- destroy: destroy a snapshot

Just run the command, we'll guide you through the process smoothly
`;

DropletCommand.flags = {
  name: flags.string({ char: "n", description: "name to print" }),
  create: flags.boolean({ char: "c" })
};

module.exports = DropletCommand;
