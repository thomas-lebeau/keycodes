workflow "Build and Publish" {
  on = "push"
  resolves = "Build"
}

action "Unit Test" {
  uses = "docker://node:10"
  runs = "npm test"
}

action "Build" {
  needs = "Unit Test"
  uses = "docker://node:10"
  runs = "npm run build"
}
