require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./users.model");
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("DB Connected"))
	.catch((err) => console.error(err));

const app = express();

const dataRaw = {
	data: [
		{ id: 1, name: "User 1" },
		{ id: 2, name: "User 2" },
		{ id: 3, name: "User 3" },
		{ id: 4, name: "User 4" },
		{ id: 5, name: "User 5" },
		{ id: 6, name: "User 6" },
		{ id: 7, name: "User 7" },
		{ id: 8, name: "User 8" },
		{ id: 9, name: "User 9" },
		{ id: 10, name: "User 10" },
		{ id: 11, name: "User 11" },
		{ id: 12, name: "User 12" },
		{ id: 13, name: "User 13" },
		{ id: 14, name: "User 14" },
		{ id: 15, name: "User 15" },
		{ id: 16, name: "User 16" },
		{ id: 17, name: "User 17" },
		{ id: 18, name: "User 18" },
	],
};

app.post("/users/uploadData",async(req,res)=>{
  await UserModel.deleteMany();
  const uploadedData = await UserModel.create(dataRaw.data)
  res.json(uploadedData)
})

const paginatedResult = (model) => {
	return async(req, res, next) => {
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const resultedUser = {};

		resultedUser.result = await model.find({}).sort({_id:1}).limit(limit).skip(startIndex);

		if (endIndex < await model.find({}).length) {
			resultedUser.next = {
				page: page + 1,
				limit: limit,
			};
		}
		if (startIndex > 0) {
			resultedUser.previous = {
				page: page - 1,
				limit: limit,
			};
		}
		res.paginatedResult = resultedUser;
		next();
	};
};

app.get("/users", paginatedResult(UserModel), (req, res) => {
	res.json(res.paginatedResult);
});

app.listen(8000, () => {
	console.log(`Server Running!`);
});
