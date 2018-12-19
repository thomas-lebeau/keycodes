workflow "Build and Publish" {
  on = "push"
  resolves = ["Test"]
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
