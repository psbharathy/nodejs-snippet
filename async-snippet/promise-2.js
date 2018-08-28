console.log("Before");

// CallBack Implementation
// getUser(1, user => {
//   getRepositories(user.gitHubUsername, repos => {
//     getCommits(repos[0], commits => {
//       console.log(commits);
//     });
//   });
// });

// Promises Pattern Implementation
getUser(1)
  .then(user => getRepositories(user.gitHubUsername))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log("Commits", commits))
  .catch(err => console.log("Eorror", err.message));

console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Consume User from DB...");
      resolve({ id: id, gitHubUsername: "mosh" });
      // reject(new Error(" Promise User Reject"));
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    console.log("Calling GitHub API...");
    resolve(["repo1", "repo2", "repo3"]);
    // reject(new Error(" Promise Repo Reject"));
  }, 2000);
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    console.log("Calling GitHub API...");
    resolve(["commit"]);
    // reject(new Error(" Promise Commits Reject"));
  }, 2000);
}
