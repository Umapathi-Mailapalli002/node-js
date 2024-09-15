import express from "express";
import usersData from "./MOCK_DATA.json" assert { type: "json" };
import fs from "fs"

const app = express();
const port = 5005;
//middleware 
app.use(express.urlencoded({ extended: false}));

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
    console.log(user);
    console.log(body);
    const updatedUser = { ...user, ...body };
    updatedUser.id=id;
    usersData[id-1]=updatedUser

   fs.writeFile('MOCK_DATA.json', JSON.stringify(usersData), (err, data) => {
        return res.json({ status: "Success", updatedUser })
    })
  })
  .delete((req, res) => {
 const id = Number(req.params.id);
 const updatedData = usersData.filter((user) => user.id !== id);

 fs.writeFile('MOCK_DATA.json', JSON.stringify(usersData), (err, data) => {
  return res.json({ status: "Success", updatedData })
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
