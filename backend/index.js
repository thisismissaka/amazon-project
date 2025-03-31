import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import bodyParser from 'body-parser';


const app = express();
// const corsOptions = {
//   origin: 'http://127.0.0.1:5500', // Configure CORS for specified origin.
// };

//app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1212',
  database: 'amazon-app'
});

if(db){
  console.log('connected db');
}

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM products'; // Replace 'your_table' with your table name

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      res.status(500).send('Database error');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('No data found');
      return;
    }

    res.json(results); // Send the results as JSON
  });
});


app.listen(5000, ()=>{
  console.log('Server is rinning on port 5000');
});

