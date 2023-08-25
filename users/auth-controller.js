import * as usersDao from "./users-dao.js";


const AuthController = (app) => {

  const register = async (req, res) => {
  const username = req.body.username;
  const user = await usersDao.findUserByUsername(username);
   if (user) {
     res.sendStatus(409);
     return;
   }
   const newUser = await usersDao.createUser(req.body);
   req.session["currentUser"] = newUser;
   console.log("register 2: ", newUser);

   res.json(newUser);
 };

 const login = async (req, res) => {
   const username = req.body.username;
   const password = req.body.password;
   const user = await usersDao.findUserByCredentials(username, password);
   if (user) {
     req.session["currentUser"] = user;
     console.log("login", user);
     res.json(user);
   } else {
     console.log("login failed");
      res.sendStatus(409).json({err: "Username" + username + "does not exist"});

   }
 };

const profile = (req, res) => {
   const currentUser = req.session["currentUser"];
   console.log("profile", currentUser);
    if (!currentUser) {
        res.sendStatus(404);
        return;
    }
   res.json(currentUser);
};

const logout = async (req, res) => {
  console.log("logout");
   req.session.destroy();
   res.sendStatus(200);
 };


 const update   = async (req, res) => {
    console.log("update", req.body);
    const {_id, username, password, firstName, lastName} = req.body;
    const user = {username, password, firstName, lastName};
    const updatedUser = await usersDao.updateUser(_id, user);
    console.log("update 2", updatedUser);
    req.session["currentUser"] = user;

    res.json(updatedUser);
 };

 app.put ("/api/users",          update);
 app.post("/api/users/register", register);
 app.post("/api/users/login",    login);
 app.post("/api/users/profile",  profile);
 app.post("/api/users/logout",   logout);
};



export default AuthController;
