// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hksneiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     await client.connect();
//     const coffeeCollection = client.db('coffeeDB').collection('coffee');
//     const userCollection = client.db('coffeeDB').collection('user');

//     // Coffee-related endpoints
//     app.get('/coffee', async (req, res) => {
//       try {
//         const cursor = coffeeCollection.find();
//         const result = await cursor.toArray();
//         res.send(result);
//       } catch (error) {
//         res.status(500).send({ error: 'Failed to fetch coffee data' });
//       }
//     });

//     app.get('/coffee/:id', async (req, res) => {
//       try {
//         const id = req.params.id;
//         const query = { _id: new ObjectId(id) };
//         const result = await coffeeCollection.findOne(query);
//         res.send(result);
//       } catch (error) {
//         res.status(500).send({ error: 'Failed to fetch coffee data' });
//       }
//     });

//     app.post('/coffee', async (req, res) => {
//       try {
//         const newCoffee = req.body;
//         const result = await coffeeCollection.insertOne(newCoffee);
//         res.send(result);
//       } catch (error) {
//         res.status(500).send({ error: 'Failed to add coffee' });
//       }
//     });

//     app.put('/coffee/:id', async (req, res) => {
//       try {
//         const id = req.params.id;
//         const filter = { _id: new ObjectId(id) };
//         const options = { upsert: true };
//         const updatedCoffee = req.body;
//         const coffee = {
//           $set: {
//             name: updatedCoffee.name,
//             quantity: updatedCoffee.quantity,
//             supplier: updatedCoffee.supplier,
//             taste: updatedCoffee.taste,
//             category: updatedCoffee.category,
//             details: updatedCoffee.details,
//             photo: updatedCoffee.photo,
//           },
//         };
//         const result = await coffeeCollection.updateOne(filter, coffee, options);
//         res.send(result);
//       } catch (error) {
//         res.status(500).send({ error: 'Failed to update coffee' });
//       }
//     });

//     app.delete('/coffee/:id', async (req, res) => {
//       try {
//         const id = req.params.id;
//         const query = { _id: new ObjectId(id) };
//         const result = await coffeeCollection.deleteOne(query);
//         res.send(result);
//       } catch (error) {
//         res.status(500).send({ error: 'Failed to delete coffee' });
//       }
//     });

//     // User-related endpoints
//     app.patch('/user', async (req, res) => {
//       try {
//         const user = req.body;
//         const filter = { email: user.email };
//         const updatedDoc = {
//           $set: {
//             lastLoggedAt: user.lastLoggedAt,
//           },
//         };
//         const result = await userCollection.updateOne(filter, updatedDoc);
//         res.send(result);
//       } catch (error) {
//         res.status(500).send({ error: 'Failed to update user' });
//       }
//     });

//     app.post('/user', async (req, res) => {
//       try {
//         const user = req.body;
//         const result = await userCollection.insertOne(user);
//         res.send(result);
//       } catch (error) {
//         res.status(500).send({ error: 'Failed to add user' });
//       }
//     });

//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);

// app.get('/', (req, res) => {
//   res.send('Ainan coffee shop server is running');
// });

// app.listen(port, () => {
//   console.log(`Ainan coffee shop is running on port ${port}`);

// });

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cors({
  origin: 'https://coffee-shop-server-2dfcl0a4j-iftekhar-mahmuds-projects.vercel.app/' // Replace with your client's origin
}));


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hksneiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const coffeeCollection = client.db('coffeeDB').collection('coffee');
    const userCollection = client.db('coffeeDB').collection('user');

    // Coffee-related endpoints
    app.get('/coffee', async (req, res) => {
      try {
        const cursor = coffeeCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: 'Failed to fetch coffee data' });
      }
    });

    app.get('/coffee/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await coffeeCollection.findOne(query);
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: 'Failed to fetch coffee data' });
      }
    });

    app.post('/coffee', async (req, res) => {
      try {
        const newCoffee = req.body;
        const result = await coffeeCollection.insertOne(newCoffee);
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: 'Failed to add coffee' });
      }
    });

    app.put('/coffee/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updatedCoffee = req.body;
        const coffee = {
          $set: {
            name: updatedCoffee.name,
            quantity: updatedCoffee.quantity,
            supplier: updatedCoffee.supplier,
            taste: updatedCoffee.taste,
            category: updatedCoffee.category,
            details: updatedCoffee.details,
            photo: updatedCoffee.photo,
          },
        };
        const result = await coffeeCollection.updateOne(filter, coffee, options);
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: 'Failed to update coffee' });
      }
    });

    app.delete('/coffee/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await coffeeCollection.deleteOne(query);
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: 'Failed to delete coffee' });
      }
    });

    // User-related endpoints
    app.patch('/user', async (req, res) => {
      try {
        const user = req.body;
        const filter = { email: user.email };
        const updatedDoc = {
          $set: {
            lastLoggedAt: user.lastLoggedAt,
          },
        };
        const result = await userCollection.updateOne(filter, updatedDoc);
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: 'Failed to update user' });
      }
    });

    app.post('/user', async (req, res) => {
      try {
        const user = req.body;
        const result = await userCollection.insertOne(user);
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: 'Failed to add user' });
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Ainan coffee shop server is running');
});

app.listen(port, () => {
  console.log(`Ainan coffee shop is running on port ${port}`);
});















