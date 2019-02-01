workflow "Build and Publish" {
  on = "push"
  resolves = [
    "Build",
    "Deploy",
    "Lint",
  ]
}

action "Install" {
  uses = "actions/npm@master"
  args = "install"
}

action "Lint" {
  uses = "gimenete/eslint-action@bbfd5ba"
  secrets = ["GITHUB_TOKEN"]
}

action "Master branch" {
  uses = "actions/bin/filter@master"
  needs = ["Build", "Lint"]
  args = "branch master"
}

action "Deploy" {
  uses = "actions/npm@master"
  needs = ["Master branch"]
  secrets = [
    "SURGE_TOKEN",
    "SURGE_LOGIN",
  ]
  args = "run deploy"
}

action "Build" {
  uses = "actions/npm@master"
  needs = ["Install"]
  args = "run build"
}
