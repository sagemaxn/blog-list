const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('create new user', async () => {
   let number = Math.floor(Math.random()*99999)
   let username = number.toString()
    await api
            .post('/api/users')
            .send({username: 'Jenboe',
            name: 'Jen Tomber',
        password: 'dqwe'})
            .expect(200)
            .expect('Content-Type', /application\/json/)
})
test('Login', () => {
    api.post('/api/login')
        .send({username: 'Jenboe', password: 'dqwe'})
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

// test('Post to blogs', async () => {
//     await api
//             .post('/api/login')
//             .send({username: 'Jenboe', password: "dqwe"})
            
//             .post('/api/blogs')
//             .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRyYWdvbnB1bmNoIiwiaWQiOiI2MGE5YmM5ZWUxMjhjNjA1ODg1YzhmNTMiLCJpYXQiOjE2MjE3Mzk4ODl9.SwWsAEzbwyARoQvHT5oMrpQJZ_NuDyd-ruwgKFHVgOQ')
//             .send({title: 'Jen writes a blog',
//             author: 'Jen Tomber',
//         url: 'dqwe'})
//             .expect(200)
//             .expect('Content-Type', /application\/json/)
// })

// test('fails', async () => {
//     await api
//             .post('/api/users')
//             .send({username: 'fdsafds', password: 'we'})
//             .expect(400)
//             //.expect('Content-Type', /application\/json/)
// })


afterAll(() => {
    mongoose.connection.close()
})