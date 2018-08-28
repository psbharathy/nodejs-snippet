console.log("Before");

// Example for CallBack
getUser(1, getRepository);
console.log("After");

function getRepositories(user) {
  getRepository(user.username, getCommits);
}

function getCommits(repos) {
  getCommits(repos, displayCommits);
}

function displayCommits(Commits) {
  console.log(commits);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading User from DB");
    callback({ id: id, username: "psbharathy" });
  }, 2000);

  return 1;
}

function getRepository(username, callback) {
  setTimeout(() => {
    console.log("Reading User Repos from API");
    // callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
