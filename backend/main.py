from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from typing import Optional

# Initialize FastAPI and MongoDB client
app = FastAPI()
client = AsyncIOMotorClient("mongodb+srv://admin:admin@ligilegend.eh2nx.mongodb.net/?retryWrites=true&w=majority&appName=ligilegend")
db = client.bazica

# Define a custom ObjectId type for Pydantic
class PydanticObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

# Define data models
class Request(BaseModel):
    title: str
    description: str
    cost: int
    status: str
    user_id: str


    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class User(BaseModel):
    username: str
    password: str
    isAdmin: bool
    email: str


    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# CRUD Operations for Request

# Create a Request
@app.post("/requests/")
async def create_request(request: Request):
    request_dict = request.dict(by_alias=True, exclude_unset=True)
    result = await db.request.insert_one(request_dict)
    return {"_id": str(result.inserted_id)}

# Read a Request
@app.get("/requests/{request_id}")
async def read_request(request_id: str):
    request = await db.request.find_one({"_id": ObjectId(request_id)})
    if request:
        request["_id"] = str(request["_id"])
        return request
    else:
        raise HTTPException(status_code=404, detail="Request not found")

# Update a Request
@app.put("/requests/{request_id}")
async def update_request(request_id: str, updated_request: Request):
    updated_request_dict = updated_request.dict(by_alias=True, exclude_unset=True)
    result = await db.request.update_one({"_id": ObjectId(request_id)}, {"$set": updated_request_dict})
    if result.modified_count == 1:
        return {"message": "Request updated successfully"}
    else:
        raise HTTPException(status_code=404, detail="Request not found")

# Delete a Request
@app.delete("/requests/{request_id}")
async def delete_request(request_id: str):
    result = await db.request.delete_one({"_id": ObjectId(request_id)})
    if result.deleted_count == 1:
        return {"message": "Request deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Request not found")

# CRUD Operations for User

# Create a User
@app.post("/users/")
async def create_user(user: User):
    user_dict = user.dict(by_alias=True, exclude_unset=True)
    result = await db.users.insert_one(user_dict)
    return {"_id": str(result.inserted_id)}

# Read a User
@app.get("/users/{user_id}")
async def read_user(user_id: str):
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if user:
        user["_id"] = str(user["_id"])
        return user
    else:
        raise HTTPException(status_code=404, detail="User not found")

# Update a User
@app.put("/users/{user_id}")
async def update_user(user_id: str, updated_user: User):
    updated_user_dict = updated_user.dict(by_alias=True, exclude_unset=True)
    result = await db.users.update_one({"_id": ObjectId(user_id)}, {"$set": updated_user_dict})
    if result.modified_count == 1:
        return {"message": "User updated successfully"}
    else:
        raise HTTPException(status_code=404, detail="User not found")

# Delete a User
@app.delete("/users/{user_id}")
async def delete_user(user_id: str):
    result = await db.users.delete_one({"_id": ObjectId(user_id)})
    if result.deleted_count == 1:
        return {"message": "User deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="User not found")
