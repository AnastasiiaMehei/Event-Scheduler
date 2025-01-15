import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3001;

// Синтаксис для ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Додаємо рядки для дозволу CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

const eventsFilePath = path.join(__dirname, 'data', 'events.json');
app.get('/events', (req, res) => {
  fs.readFile(eventsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read events file:', err);
      return res.status(500).send('Failed to read events');
    }
    res.json(JSON.parse(data));
  });
});

app.post('/events', (req, res) => {
  fs.readFile(eventsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read events file:', err);
      return res.status(500).send('Failed to read events');
    }
    const events = JSON.parse(data);
    const newEvent = { ...req.body, id: events.length + 1 };
    events.push(newEvent);
    fs.writeFile(eventsFilePath, JSON.stringify(events, null, 2), (err) => {
      if (err) {
        console.error('Failed to write events file:', err);
        return res.status(500).send('Failed to write events');
      }
      res.json(newEvent);
    });
  });
});

app.put('/events/:id', (req, res) => {
  fs.readFile(eventsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read events file:', err);
      return res.status(500).send('Failed to read events');
    }
    const events = JSON.parse(data);
    const index = events.findIndex(event => event.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).send('Event not found');
    }
    events[index] = { ...events[index], ...req.body };
    fs.writeFile(eventsFilePath, JSON.stringify(events, null, 2), (err) => {
      if (err) {
        console.error('Failed to write events file:', err);
        return res.status(500).send('Failed to write events');
      }
      res.json(events[index]);
    });
  });
});

app.delete('/events/:id', (req, res) => {
  fs.readFile(eventsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read events file:', err);
      return res.status(500).send('Failed to read events');
    }
    let events = JSON.parse(data);
    const index = events.findIndex(event => event.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).send('Event not found');
    }
    events = events.filter(event => event.id !== parseInt(req.params.id));
    fs.writeFile(eventsFilePath, JSON.stringify(events, null, 2), (err) => {
      if (err) {
        console.error('Failed to write events file:', err);
        return res.status(500).send('Failed to write events');
      }
      res.sendStatus(204);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
