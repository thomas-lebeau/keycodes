workflow "Build and Publish" {
  on = "push"
  resolves = ["GitHub Action for npm-1"]
}

action "GitHub Action for npm" {
  uses = "actions/npm@c555744"
  args = "install"
}

action "GitHub Action for npm-1" {
  uses = "actions/npm@c555744"
  needs = ["GitHub Action for npm"]
  args = "test"
}
