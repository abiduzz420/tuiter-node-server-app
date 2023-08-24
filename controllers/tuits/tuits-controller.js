import posts from "./tuits.js";
let tuits = posts;


const TuitsController = (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}

const createTuit = (req, res) => {
  console.log(req.body);
  const newTuit = req.body;
  newTuit._id = (new Date()).getTime()+'';
  newTuit.likes = 0;
  newTuit.liked = false;
  newTuit.dislikes = 0;
  newTuit.disliked = false;
  newTuit.username = "NASA";
  newTuit.handle = "@nasa";
  newTuit.image = "nasa.png";
  newTuit.topic = "Space";
  newTuit.time = "2h";
  newTuit.replies = 0;
  newTuit.retuits = 0;
  tuits.push(newTuit);
  res.json(newTuit);
}

const findTuits  = (req, res) => {
    return res.json(tuits);
}

const updateTuit = (req, res) => {
  const tuitdId = req.params.tid;
  const updates = req.body;
  console.log(updates);
  const tuitIndex = tuits.findIndex((t) => t._id === tuitdId)
  tuits[tuitIndex] = {...tuits[tuitIndex], ...updates};
  res.sendStatus(200);
}

const deleteTuit = (req, res) => {
  const tuitdIdToDelete = req.params.tid;
  tuits = tuits.filter((t) =>
    t._id !== tuitdIdToDelete);
  res.sendStatus(200);
}


export default TuitsController;