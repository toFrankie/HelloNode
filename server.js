const http = require('http')
const fs = require('fs')
const { getNetWorkIP } = require('./ipaddress')

const localIPAddress = getNetWorkIP()
const port = 7701

const server = http.createServer((request, response) => {
  console.log('')
  console.log(`${request.method}; ${request.url}`)
  console.log(`http://${localIPAddress}:8080`)
  // console.log(request.headers.origin === `http://192.168.1.103:8081`)
  // console.log(request.headers.origin === `http://10.16.6.196:8081`)
  if (request.headers.origin === `http://${localIPAddress}:8080`) {
    // if (request.headers.origin === `http://192.168.1.103:8081`) {
    // if (request.headers.origin === `http://10.16.6.196:8081`) {
    // response.setHeader('Access-Control-Allow-Origin', request.headers.origin)
    // response.setHeader('Access-Control-Allow-Credentials', true)
    // response.setHeader('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With')
    // response.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  }
  if (request.url === '/') {
    fs.readFile('./index.html', (err, data) => {
      if (err) throw err
      response.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' })
      response.end(data)
    })
  } else if (request.url == '/data') {
    fs.readFile('./data.txt', (err, data) => {
      if (err) throw err
      response.writeHead(200, { 'Content-Type': 'text/plain' })
      console.log(response._header)
      response.end(data)
    })
  } else if (request.url == '/config') {
    fs.readFile('./config.json', (err, data) => {
      if (err) throw err
      // response.writeHead(200, { 'Content-Type': 'application/json;charset=UTF-8' })

      console.log(response._header)
      // end 只能传 string 或 Buffer
      // response.end(JSON.stringify(data))
      response.end(JSON.stringify({ name: 'Frankie', age: 20 }))
      // response.json(data)

    })
  }
  else {
    console.log('其他请求', request.url)
  }
})

server.listen(port)

console.log(`Server is running at http://${localIPAddress}:${port}/`)