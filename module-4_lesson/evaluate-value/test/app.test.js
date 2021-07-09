const request = require('supertest')
const app = require('../src/app')

describe(('Integration test'), () => {
  test('should response http 200 on root path', () => {
    return request(app).get('/')
      .then(res => expect(res.status).toBe(200))
  })

  test('should response http 200 on root path', async () => {
    const res = await request(app).get('/')

    expect(res.status).toBe(200)
  })
})
