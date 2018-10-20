workflow "Build and Publish" {
  on = "push"
  resolves = "Build"
}

action "Unit Test" {
  uses = "node:10"
  runs = "npm test"
}

action "Build" {
  needs = "Unit Test"
  uses = "node:10"
  runs = "npm test"
}
