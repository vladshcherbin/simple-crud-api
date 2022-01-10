import server from './server'

const port = process.env.PORT || 4000

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.info(`Server is running on port: ${port}`)
})
