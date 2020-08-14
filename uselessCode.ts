// let motorcycleId = "";
// await m_collection.insertOne(motorcycle)
//   .then(res => {
//     motorcycleId = res.insertedId.toString();
//   })
//   .catch(err => {
//     console.log("Error while adding a new motorcycle")
//   });

// const u_collection = this.getCollection("users");
// await u_collection.updateOne(
//   { "email": email },
//   { $push: { myMotorcycles_id: motorcycleId } });

//-----------------------------------------------------------------

        // await this.getCollection("users").updateOne(
        //   { _id: new ObjectId(userId) },
        //   { $pull: { favorites: motorcycleId } }
        // ).then(async (result) => {
        //   if (result.modifiedCount == 1) {
        //     res.status(200).json({ msg: false });
        //     console.log(`unfavorite ${motorcycleId}`);
        //   }
        //   else {
        //     await this.getCollection("users").updateOne(
        //       { _id: new ObjectId(userId) },
        //       { $push: { favorites: motorcycleId } }
        //     )
        //     res.status(200).json({ msg: true });
        //     console.log(`favorite ${motorcycleId}`);
        //   }
        // }).catch(err => { console.log(err) });

// ------------------------------------------------------

    // this.userService.fetchUser(this.router.url).then(() => {
    //   // this.isConnected = User.connected;
    //   // this.firstName = User.firstName;
    //   // this.user = User;
    // }).catch((err) => {
    //   console.log(err);
    // });

//     public async fetchUser(extension: string): Promise<any> {
//         return await this.restApiService.promisePost(extension, {})
//           .then(async (data: IUser) => {
//             if (data._id) {
//               this.setUser(data);
//               console.log(User);
//             }
//             else {
//               console.log(data.msg);
//             }
//           });
//       }

// ------------------------------------------------------
    