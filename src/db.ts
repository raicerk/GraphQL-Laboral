// import { MongoClient, Db } from 'mongodb';
// import { mongo } from './config';

// export class MongoHelper {
//   public client: MongoClient;

//   constructor() {
//       this.client = new MongoClient(`${mongo.PROTOCOL}://${mongo.HOST}:${mongo.PORT}`, { useNewUrlParser: true, useUnifiedTopology: true });
//   }

//   public static connect(url: string): Promise<any> {
//     return new Promise<any>((resolve, reject) => {
//     //   mongo.MongoClient.connect(
//     //     url,
//     //     { useNewUrlParser: true },
//     //     (err, client: mongo.MongoClient) => {
//     //       if (err) {
//     //         reject(err);
//     //       } else {
//     //         MongoHelper.client = client;
//     //         resolve(client);
//     //       }
//     //     }
//     //   );
//     client.connect((err: Error) => {
//         console.log("MONGOdb connected");
//         resolve(this.)
//         db = client.db("users");
//         if(err){
//             console.log(err);
//         }
//     });
//     });
//   }

//   public disconnect(): void {
//     MongoHelper.client.close();
//   }

//   public static getCollection(nameCollection: string){

//   }
// }




// const client = 
// let db: Db;

