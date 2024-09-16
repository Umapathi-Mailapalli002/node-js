import express from "express";
import Data from "./MOCK_DATA.json" assert { type: "json" };
import fs from "fs"
let usersData = Data;
const app = express();
const port = 5005;

//middleware - Plugin
// the middleware is act like a middle person in between the http requests
// if it found an unusually activity with the password while login in that situation it abort the
//response from their other wise it get the information
//it exicute on every request and the middlewares can be more in one app.
//and its excute from top down approach
app.use(express.urlencoded({ extended: false}));

// app.use((req, res, next) => {
//   console.log("hello from the first middleware");
//   req.name = "ravi";
//   next(); //it transfer it for the next middleware 
//           //or if no middleware exist then the next http
//           //request which present bottom of this middleware
// });
// app.use((req, res, next) => {
//   console.log("hello from the second middleware2 and name:" ,req.name);
//   next();
//   
// });
app.use((req, res, next) => {
fs.appendFile("log.txt", `\n${Date.now()}: ${req.ip} : ${req.method} : ${req.url}`, (err, data)=>{
  next();
});
 
   
});
// Note:- if no next method is given in the middleware then it not jump to the next one
app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${usersData.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});
app.get("/api/users", (req, res) => {
  return res.json(usersData);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = usersData.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    const user = usersData.find((user) => user.id === id)
    const updatedUser = { ...user, ...body };
    updatedUser.id=id;
    usersData[id-1]=updatedUser

   fs.writeFile('MOCK_DATA.json', JSON.stringify(usersData), (err, data) => {
        return res.json({ status: "Success", updatedUser })
    })
  })
  .delete((req, res) => {
 const id = Number(req.params.id);
 usersData = usersData.filter((user) => user.id !== id);
 usersData = usersData.map((user) => {
  if(user.id > id) return {...user, id: user.id - 1};
  return user;
 })
 
 fs.writeFile('MOCK_DATA.json', JSON.stringify(usersData), (err, data) => {
  return res.json({ status: "Success", usersData })
})

  });

app.post("/api/users", (req, res) => {
  //create new user with new id
  const body = req.body;
  usersData.push({id: usersData.length + 1, ...body});
  fs.writeFile("./MOCK_DATA.json",JSON.stringify(usersData), (err, data) => {
    return res.json({ status: "Success" ,body});

  })
});
app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);
