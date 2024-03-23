const express = require("express");
const db = require("mongoose");
var cors = require("cors");
var ObjectId = require("mongodb").ObjectId;
const app = express();
app.use(express.json());
db.set("strictQuery", false);
app.use(cors());

//************mongodb connect */
db.connect("mongodb+srv://tarung8504:tarun%40mongodb@cluster0.bgimxer.mongodb.net/project1", {
  useNewURLParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

var conn = db.connection;

//**************insert data to database */

app.post("/ins", function (req, res) {
  const fdata = req.body.fdata;
  conn.collection("form_data").insertOne(fdata, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("inserted");
      res.send("success");
    }
  });
});

app.post("/ins1", function (req, res) {
  const fdata = req.body.fdata;
  conn.collection("form_data1").insertOne(fdata, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("inserted");
      res.send("success");
    }
  });
});

//***************get data from database  */

app.get("/getAll", (req, res) => {
  conn.collection("form_data").find({}).toArray((err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    } else {
      console.log("Documents retrieved successfully:", result);
      res.send(result);
    }
  });
});


// Delete item endpoint
app.post('/delete', (req, res) => {
  const itemId = req.body._id; // Access item ID from request body
    conn.collection("form_data").findOneAndDelete({filter:itemId},(err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("deleted");
        res.status(202).send("success");
      }
    });
  }
);
// get data for updated
app.post("/get", (req, res) => {
  let id = req.body.id;
  console.log("hello", id);
  conn.collection("form_data").findOne({ _id: id }, (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    } else {
      if (result) {
        console.log("Document found:", result);
        res.send("found");
      } else {
        console.log("Document not found for id:", id);
        res.send("notfound");
      }
    }
  });
});

//******update data *********************/
app.post("/update", (req, res) => {
  let itemId=req.body.id;
  let count=req.body.count;
  conn.collection("form_data").findOne({ _id: itemId }, (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    } 
    else {
      if (result) {
        console.log("Document found:", result);
        count+=result.count;
        console.log("In Update");
        conn
          .collection("form_data")
          .findOneAndUpdate(
            { _id: itemId },
            { $set: {count:count}} ,(err,result)=>{
              if(err)
              {
                console.log("Record not found or not updated");
                res.send("failure");
              }
              else
              {
                console.log(result)
                console.log("Record updated successfully");
                res.send("success");
              }
            });
      } else {
        console.log("Document not found for id:", id);
      }
    }
  });
});
app.listen(4000, () => {
  console.log("server running at 4000");
});

