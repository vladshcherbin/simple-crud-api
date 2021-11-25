import server from './server'

server.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.info(`Server is running on port: ${process.env.PORT}`)
})
