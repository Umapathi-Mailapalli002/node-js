import express from "express";
import fs from "fs";
import mongoose from "mongoose";
const app = express();
const port = 5005;
// Connection
mongoose
  .connect("mongodb://localhost:27017/dataEmployee")
  .then(() => console.log("mongoDB COnnected"))
  .catch((err) => console.log("Mongo Error", err));
//Scchema
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  job_title: {
    type: String,
    required: true,
  },
  
},{
  timestamps: true,
},);
//Model
const User = mongoose.model("user", userSchema);

//middleware - Plugin
// the middleware is act like a middle person in between the http requests
// if it found an unusually activity with the password while login in that situation it abort the
//response from their other wise it get the information
//it exicute on every request and the middlewares can be more in one app.
//and its excute from top down approach
app.use(express.urlencoded({ extended: false }));

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
const allDbUsers = await User.find({});
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()}: ${req.ip} : ${req.method} : ${req.url}`,
    (err, data) => {
      next();
    }
  );
});
// Note:- if no next exist method is given in the middleware then it not jump to the next one
app.get("/users", async (req, res) => {
  const html = `
    <ul>
    ${allDbUsers.map((user) => `<li>${user.first_name}-${user.email}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});
app.get("/api/users", async (req, res) => {
  return res.json(allDbUsers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "user not exist" });
    }
    return res.json(user);
  })
  .patch(async (req, res) => {
    const body = req.body;
    await User.findByIdAndUpdate(req.params.id, { ...body });
    return res.json({status: "Success"});
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.json({status: "Success"});
  });

app.post("/api/users", async (req, res) => {
  //create new user with new id
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All details are required" });
  }
 
 const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });
  return res.status(201).json({msg: "user created successfully"});
});
app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);
