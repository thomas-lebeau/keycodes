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
