const boringavatars = require('boring-avatars');
const express = require('express');
const react = require('react');
const server = require('react-dom/server');
const uuid = require('uuid');

const app = express();

app.get('/api/:name?', (req, res) => {
  if (req.params.name) {
    res.setHeader('Cache-Control', 'no-cache');
  } else {
    res.setHeader('Cache-Control', 'no-cache, max-age=0');
  }
  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
  res.end(server.renderToString(react.createElement(boringavatars.default, {
    name: req.params.name || uuid.v4(),
    size: req.query.s || process.env.DEFAULT_SIZE,
  })));
});

module.exports = app;
