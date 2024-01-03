import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const PORT = 5000;

const url = "mongodb+srv://santhiya:santhiya2525@cluster0.mejii.mongodb.net";
 const client = new MongoClient(url);

 await client.connect()

app.get("/", function (req, res) {
  res.send("hello world");
});
//-----post method ------------
app.post("/post", express.json(), async function (req, res) {
  const PostData = req.body;
  console.log(PostData);

  const PostMethod = await client
    .db("B-CRUD")
    .collection("table")
    .insertMany([PostData]);

  res.status(200).send(PostMethod);
});

//------------  get method --------------------------------------
app.get("/get", express.json(), async function (req, res) {
  const GetMethod = await client
    .db("B-CRUD")
    .collection("table")
    .find({})
    .toArray();

  res.status(200).send(GetMethod);
});
//------------SINGLE ID GET METHOD ---------------------------
app.get("/get/:singleId", async function (req, res) {
    const { singleId } = req.params;
  
    const SingleIdGetMethod = await client
      .db("B-CRUD")
      .collection("table")
      .findOne({ _id: new ObjectId(singleId) });
    res.status(200).send(SingleIdGetMethod);
  });

//-----------UPDATE METHOD-----------------------------
app.put("/get/:singleIdPut",express.json(), async function (req, res) {
    const { singleIdPut } = req.params;
  const putrequest = req.body

    const SingleIdPUTMethod = await client
      .db("B-CRUD")
      .collection("table")
      .updateOne({ _id: new ObjectId(singleIdPut)},{$set:putrequest});
    res.status(200).send(SingleIdPUTMethod);
  });

  //---delete method ================
app.delete("/delete/:deleteid", async function(req,res){
    const {deleteid} = req.params

const DELETEMETHOD = await client
.db("B-CRUD")
.collection("table")
.deleteOne({ _id: new ObjectId(deleteid)});
res.status(200).send(DELETEMETHOD);
})

app.listen(PORT, () => {
  console.log("server Running Successfullt", PORT);
});
