import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import bodyParser from 'body-parser';
import cartRouter from './routes/cartRoute.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

export const db = await mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1212',
  database: 'amazon-app'
});

if(db){
  console.log('connected db');
}

app.get('/', async (req, res) => {
    try {
      const sql = 'SELECT * FROM products';
      const [results] = await db.execute(sql); 
      res.json(results);
    } catch (err) {
      console.error('Error querying database: ', err);
      res.status(500).send('Database error');
    }
  });
  
app.use('/cart', cartRouter);
  

app.listen(5000, ()=>{
  console.log('Server is rinning on port 5000');
});
