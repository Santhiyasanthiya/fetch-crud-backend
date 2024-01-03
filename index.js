import express from "express";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

const app = express();
const PORT = 5000;

const url = "mongodb+srv://santhiya:santhiya2525@cluster0.mejii.mongodb.net";

const client = new MongoClient(url);

await client.connect();
console.log("connected mongodb");

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.post("/post", express.json(), async function (req, res) {
  const postMethod = req.body;

  const POSTMETHOD = await client
    .db("FETCH-CRUD")
    .collection("table")
    .insertMany([postMethod]);
  res.status(200).send(POSTMETHOD);
});

//---------------get method --------------------

app.get("/get", async function (req, res) {
  const GetMethod = await client
    .db("FETCH-CRUD")
    .collection("table")
    .find({})
    .toArray();
  res.status(200).send(GetMethod);
});

//---------single data get method -------------------------
app.get("/get/:singleId", async function (req, res) {
  const { singleId } = req.params;

  const SingleIdGetMethod = await client
    .db("FETCH-CRUD")
    .collection("table")
    .findOne({ _id: new ObjectId(singleId) });
  res.status(200).send(SingleIdGetMethod);
});

//---------------------------------Update method-------------------------------------------------------------
app.put("/update/:singlePut", express.json(), async function (req, res) {
  const { singlePut } = req.params;
  const UpdateMethod = req.body;
  const singleId = await client
    .db("FETCH-CRUD")
    .collection("table")
    .updateOne({ _id: new ObjectId(singlePut) }, { $set: UpdateMethod });

  console.log(singleId);

  res.status(200).send(singleId);
});

//----------------------------Delete method -----------------

app.delete("/delete/:deleteMethod", async function (req, res) {
  const { deleteMethod } = req.params;

  const DELETEMETHOD = await client
    .db("FETCH-CRUD")
    .collection("table")
    .deleteOne({ _id: new ObjectId(deleteMethod) });

  console.log(DELETEMETHOD, "delate agiduchi");

  res.status(200).send(DELETEMETHOD);
});

app.listen(PORT, () => {
  console.log("Example app listening on port", PORT);
});
