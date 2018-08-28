console.log("Before");

// Example for CallBack
getUser(1, user => {
  getRepository(user.username, repos => {
    getCommits(repos, commits => {});
  });
});

console.log("After");

// Synchronous example
console.log("Syn Before");
// const user = getUser(1);
// const repos = getRepository(user.username);
// const commits = getCommits(repos);
console.log("Async After");

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
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

function getCommits(repos, callback) {
  setTimeout(() => {
    console.log("Reading Repos Commits from API");
    callback(["Cmt1", "Cmt2", "Cmt3"]);
  }, 2000);
}
