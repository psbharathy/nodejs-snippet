console.log("Before");
const user = getUser(1);
console.log(user);
console.log("After");

function getUser(id) {
  setTimeout(() => {
    console.log("Reading User from DB");
    return { id: id, user: "Bharathy" };
  }, 2000);

  return 1;
}
