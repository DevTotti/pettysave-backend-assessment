/* eslint-disable no-shadow */
/* eslint-disable no-undef */
const expect = require('expect');
const request = require('supertest');
const { ObjectId } = require('mongodb');

const Task = require('../task/task.model');
const config = require('../configs/app');

// const demoTasks = [{
//   _id: new ObjectId(),
//   user_id: new ObjectId(),
//   title: 'Task title',
//   description: 'Task title',
//   status: 'pending',
// }, {
//   _id: new ObjectId(),
//   user_id: new ObjectId(),
//   title: 'Task title',
//   description: 'Task title',
//   status: 'pending',
// }];

const app = require('../app');

const url = '/api/v1';

describe('POST /tasks/new', () => {
  const task = {
    user_id: '605fe1a9cbd8651e5caf1c5f',
    title: 'Pray',
    description: 'Visit your YouVision app to pray.',
    status: 'pending',
  };

  it('should require authentication', (done) => {
    request(app)
      .post(`${url}/tasks/new`)
      .send(task)
      .expect(403);
    done();
  });

  it('should create a new task', (done) => {
    request(app)
      .post(`${url}/tasks/new`)
      .set('Authorization', `Bearer ${config.token}`)
      .send(task)
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        return Task.find(task)
          .then((tasks) => {
            expect(tasks[0].title).toBe(task.title);
            expect(tasks[0].description).toBe(task.description);
            expect(tasks[0].status).toBe(task.status);
            done();
          }).catch((err) => done(err));
      });
  });

  it('should not create task with invalid body data', (done) => {
    request(app)
      .post(`${url}/tasks/new`)
      .set('Authorization', `Bearer ${config.token}`)
      .send({})
      .expect(422)
      .end(done);
  });
});

describe('GET /tasks', () => {
  it('should get all tasks', (done) => {
    request(app)
      .get(`${url}/tasks`)
      .set('Authorization', `Bearer ${config.token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.data);
      })
      .end(done);
  });
});
