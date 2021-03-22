import app from '../src/Server'; 
const supertest = require('supertest');
const request = supertest(app);
import mongoose from "mongoose"

import User from '../src/entities/User/User.schema';
import IUser from '../src/entities/User/User.interface';
const { setupDB } = require("./test-setup");

setupDB('endpoint-testing', true);

export const users: IUser[] = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'test1',
    email: 'testowymail748test1638@gmail.com',
    password: 'test1'
  }
]; 

describe("POST / ", () => {

  it('Should save user to database', async done => {
    const res = await request.post('/api/users/')
      .send({
        name: "test4",
        email: 'testowymail7486test439@gmail.com',
        password: "test4"
      });

    // Ensures response contains name and email
    expect(res.body.name).toBeTruthy();
    expect(res.body.email).toBeTruthy();
    // Ensures response status
    expect(res.statusCode).toBe(201);

    // Searches the user in the database
    const user = await User.findOne({ email: users[0].email });
    if(user) {
      expect(user.name).toBeTruthy();
      expect(user.email).toBeTruthy();
    }

    done();
  });

  it('Should throw error - Email already registered', async done => {
    const res = await request.post('/api/users/')
      .send({
        name: "test5",
        email: users[0].email,
        password: "test5"
      });
      
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe("Email already registered");

    // Searches the user in the database
    const user = await User.findOne({ name: "test5" });
    expect(user).toBe(null);

    done();
  });

  it('Should throw error - Name already registered', async done => {
    const res = await request.post('/api/users/')
      .send({
        name: "test1",
        email: "testowymail7486test539@gmail.com",
        password: "test1"
      });
      
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe("Name already registered");

    // Searches the user in the database
    const user = await User.findOne({ email: "testowymail7486test539@gmail.com" });
    expect(user).toBe(null);

    done();
  });

});

describe("GET /", () => {
  it('Should get users from db', async done => {
    
    let res = await request.get("/api/users/");
  
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined;
    expect(res.body[0].name).toBeTruthy;

    done();
  });   

  it('Should get one user from db', async done => {
    
    const user = await User.findOne({ name: users[0].name });
    if(user) { 
      const res = await request.get(`/api/users/${user._id}`);

      expect(res.status).toBe(200);
      expect(res.body).toBeDefined;
      expect(res.body.name).toBeTruthy();
      expect(res.body.email).toBeTruthy();
    }

    done();
  });   

  it('Should throw error - user not found', async done => {

    const res = await request.get(`/api/users/6017daf7bbbbbbbbbbbbbbbb`);
    
    expect(res.status).toBe(404); 
    expect(res.body).toBeNull;
    expect(res.text).toBe("User not found");

    done();
  });   

  it('Should get users books from db', async done => {
    const user = await User.findOne({ name: users[0].name });
    if(user) { 
      const res = await request.get(`/api/users/${user._id}/books`);
      
      expect(res.status).toBe(200);
      expect(res.body).toBeDefined;
      expect(res.body).toEqual([]); // returns empty array cuz no books 
      //expect(res.body[0].name).toBeTruthy; // if some book(s)
    }
    
    done();
  });   

})