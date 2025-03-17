const express = require("express");
const database = require('./connectDB');
const ObjectId = require('mongodb').ObjectId;

const PostRoutes = express.Router();

// Retrieving all students from the database
PostRoutes.route("/registered-students").get(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection('registered-students').find({}).toArray();
        if (data.length > 0) {
            response.json(data);
        } else {
            response.status(404).json({ message: "Items not found" });
        }
    } catch (error) {
        response.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Retrieving unique elements
PostRoutes.route("/registered-students/:id").get(async (request, response) => {
    try {
        let db = await database.getDb();
        let id = new ObjectId(request.params.id); // Correctly create ObjectId instance
        let data = await db.collection('registered-students').findOne({ _id: id });
        
        if (data) { // Check if data is found
            response.json(data);
        } else {
            response.status(404).json({ message: "Item not found" });
        }
    } catch (error) {
        response.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Creating a new student
PostRoutes.route("/registered-students").post(async (request, response) => {
    let db = await database.getDb();
    try {
        let MongoObject = {
            name: request.body.name,
            email: request.body.email,
            department: request.body.department,
            password: request.body.password
        };

        let result = await db.collection('registered-students').insertOne(MongoObject);

        response.status(201).json(result); // Return the result of the insert operation with a 201 status code
    } catch (error) {
        response.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});
// Updating a student's information
PostRoutes.route("/registered-students/:id").put(async (request, response) => {
    let db = await database.getDb();
    try {
        let MongoObject = {
            $set: {
                name: request.body.name,
                email: request.body.email,
                department: request.body.department,
                password: request.body.password
            }
        };
        let id = new ObjectId(request.params.id);
        let result = await db.collection('registered-students').updateOne({ _id: id }, MongoObject); // Correctly structured update query
        
        if (result.modifiedCount > 0) {
            response.status(200).json({ message: "Update successful", result: result });
        } else {
            response.status(404).json({ message: "Item not found" });
        }
    } catch (error) {
        response.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});
//deleting
PostRoutes.route("/registered-students/:id").delete(async (request, response) => {
    let db = await database.getDb();
    try {
        let id = new ObjectId(request.params.id);
        let result = await db.collection('registered-students').deleteOne({ _id: id });
        
        if (result.deletedCount > 0) {
            response.status(200).json({ message: "Deletion successful", result: result });
        } else {
            response.status(404).json({ message: "Item not found" });
        }
    } catch (error) {
        response.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});
module.exports = PostRoutes;
