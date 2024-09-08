import * as mongo from 'mongodb'

export class MongoClient {
  private _client: mongo.MongoClient

  constructor() {
    let mongoURI = 'mongodb://root:password@localhost:27017'
    if (process.env.NODE_ENV === 'dev') {
      // TODO: 適切なURIを設定
      mongoURI = 'mongodb://root:password@localhost:27017'
    } else if (process.env.NODE_ENV === 'prd') {
      // TODO: 適切なURIを設定
      mongoURI = 'mongodb://root:password@localhost:27017'
    }

    this._client = new mongo.MongoClient(mongoURI)
  }

  /**
   * MongoDBとの接続（リトライ回数は５回、５秒間隔）
   */
  public async connect() {
    const maxRetry = 5
    for (let i = 0; i < maxRetry; i++) {
      try {
        await this._client.connect()
        console.log('MongoDB connected')
        break
      } catch(error) {
        console.error(error)
        if (i === maxRetry - 1) {
          console.error('MongoDB connection retry limit exceeded')
          process.exit(1)
        }
        // 5秒待ってリトライ
        await new Promise(resolve => setTimeout(resolve, 5000))
      }
    }
  }

  /**
   * MognoDBとの接続を切断
   */
  public async disconnect() {
    try {
      await this._client.close()
      console.log('MongoDB disconnected')
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * DBを返す
   * ex.) getDB('test') => testデータベースを返す
   */
  public getDb(dbName: string) {
    return this._client.db(dbName)
  }

  /**
   * クライアントを返す
   */
  public get client() {
    return this._client
  }
}
