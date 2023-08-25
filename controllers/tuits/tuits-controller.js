import posts from "./tuits.js";
let tuits = posts;
import * as tuitsDao from './tuits-dao.js'

const TuitsController = (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}

const createTuit = async (req, res) => {
  console.log(req.body);
  const newTuit = req.body;
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
  const insertedTuit = await tuitsDao.createTuit(newTuit);
  res.json(insertedTuit);
}

const findTuits  = async (req, res) => {
  const tuits = await tuitsDao.findTuits();
    return res.json(tuits);
}

const updateTuit = async (req, res) => {
  const tuitdId = req.params.tid;
  const updates = req.body;
  console.log(tuitdId, updates);
  const status = await tuitsDao.updateTuit(tuitdId, updates);
  res.json(status);
}

const deleteTuit = async (req, res) => {
  const tuitdIdToDelete = req.params.tid;
  const status = await tuitsDao.deleteTuit(tuitdIdToDelete);
  tuits = tuits.filter(t =>t._id !== tuitdIdToDelete);
  res.json(status);
}


export default TuitsController;
