workflow "Build and Publish" {
  on = "push"
  resolves = ["Deploy"]
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
  needs = ["Test"]
  args = "branch master"
}

action "Deploy" {
  uses = "actions/npm@master"
  needs = ["Master branch"]
  secrets = ["SURGE_TOKEN"]
  args = "run deploy"
}
