export default `
  type User {
    id: String
    name: String
    email: String
    role : String
  }

  type Query {
    me : User
  }
`

