const ThingsSchema = `
  type Thing {
    id: Int!
    name: String
    info: String
    img : String
  }

  type Query {
    things: [Thing]
  }
  `;

export default ThingsSchema;
