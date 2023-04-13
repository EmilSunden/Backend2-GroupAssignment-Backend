require('dotenv').config({ path: './src/.env' });
const request = require('supertest');
const { server } = require('../index');
const { database } = require('../index');
const mongoose = require('mongoose');
