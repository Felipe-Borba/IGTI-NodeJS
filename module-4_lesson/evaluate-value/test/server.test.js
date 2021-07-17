const supertest = require('supertest')

const request = supertest('http://localhost:8080')

test('should get on port 8080', async () => {
  const response = await request.get('/')

  expect(response.status).toBe(200)
})
