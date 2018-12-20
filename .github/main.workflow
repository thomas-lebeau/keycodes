workflow "Build and Publish" {
  on = "push"
  resolves = [
    "Deploy",
    "Build",
  ]
}

action "Install" {
  uses = "actions/npm@master"
  args = "install"
}

action "Test" {
  uses = "actions/npm@master"
  args = "test"
  needs = ["Install"]
}

action "Master branch" {
  uses = "actions/bin/filter@master"
  needs = ["Build"]
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
  needs = ["Test"]
  args = "run build"
}

workflow "test" {
  on = "push"
  resolves = ["docker://node:current"]
}

action "docker://node:current" {
  uses = "docker://node:current"
  runs = "npm"
  args = "-v"
  secrets = ["GITHUB_TOKEN"]
}
