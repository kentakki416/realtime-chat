import * as mongo from 'mongodb'

export class MongoClient {
  private _client: mongo.MongoClient

  constructor() {
    let mongoURI = 'mongodb://root:password@localhost:27017'

    if (process.env.NODE_ENV === 'dev') {
      // TODO: 開発環境のアドレスに置き換え
      mongoURI = 'mongodb://root:password@mongo:27017'
    } else if (process.env.NODE_ENV === 'prd') {
      mongoURI = 'mongodb://root:password@192.003.03.222:27017'
    }

    this._client = new mongo.MongoClient(mongoURI)
  }

  /**
   * MongoDBとの接続を確立する(リトライ回数は5回。5秒間隔)
   */
  public async connect() {
    const maxRetries = 5
    for (let i = 0; i < maxRetries; i++) {
      try {
        await this._client.connect()
        console.log('Connected successfully to Mongo Server')
        break // 接続成功したらループを抜ける
      } catch (error) {
        console.error('Failed to connect to Mongo Server')
        console.error(error)
        if (i === maxRetries -1) {
          console.error('MongoDB connection retry limit exceeded')
          process.exit(1)
        }
        // 5秒待ってリトライ
        await new Promise(resolve => setTimeout(resolve, 5000))
      }
    }
  }

  /**
   * MongoDBとの接続を切断する
   */
  public async disconnect() {
    try {
      await this._client.close()
      console.log('Disconnected successfully from Mongo Server')
    } catch (error) {
      console.error('Failed to disconnect from Mongo Server')
      console.error(error)
    }
  }

  public  getDb(dbName: string): mongo.Db {
    return this._client.db(dbName)

  }
}
