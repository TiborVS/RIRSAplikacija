from datetime import datetime, timezone, timedelta
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from os import environ
from dotenv import load_dotenv
import bcrypt
import jwt

load_dotenv()

db_user = environ.get("DB_USER", False)
db_pass = environ.get("DB_PASS", False)
jwt_secret = environ.get("JWT_SECRET", False)
if not db_user:
    raise ValueError("DB_USER environment variable must be set.")
if not db_pass:
    raise ValueError("DB_PASS envrionment variable must be set.")
if not jwt_secret:
    raise ValueError("JWT_SECRET envrionment variable must be set.")
db_conn_string = f"mongodb+srv://{db_user}:{db_pass}@ligilegend.eh2nx.mongodb.net/?retryWrites=true&w=majority&appName=ligilegend"

app = FastAPI()
client = AsyncIOMotorClient(db_conn_string)
db = client.bazica

if (environ.get("TEST", "false") == "true"):
    db = client.test_tibor

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

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
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class User(BaseModel):
    username: str
    password: str
    isAdmin: bool | None = None
    email: str | None = None


    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# CRUD Operations for Request

# Create a Request
@app.post("/requests/")
async def create_request(request: Request):
    request_dict = request.model_dump(by_alias=True, exclude_unset=True)
    result = await db.request.insert_one(request_dict)
    return {"_id": str(result.inserted_id)}

# Get all Requests
@app.get("/requests/")
async def list_requests():
    requests = await db.request.find({}).to_list()
    if requests:
        for request in requests:
            request["_id"] = str(request["_id"])
        return requests
    else:
        raise HTTPException(status_code=500, detail="Cannot get requests")


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
    updated_request_dict = updated_request.model_dump(by_alias=True, exclude_unset=True)
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

# Get all Users
@app.get("/users/")
async def list_users():
    users = await db.users.find({}).to_list()
    if users:
        for user in users:
            user["_id"] = str(user["_id"])
        return users
    else:
        raise HTTPException(status_code=500, detail="Cannot get users")

# Create a User
@app.post("/users/")
async def create_user(user: User):
    user_dict = user.model_dump(by_alias=True, exclude_unset=True)
    user_dict["isAdmin"] = False
    plain_password = user_dict["password"]
    plain_password = plain_password.encode("utf-8")
    hashed_password = bcrypt.hashpw(plain_password, bcrypt.gensalt())
    user_dict["password"] = hashed_password.decode("utf-8")
    result = await db.users.insert_one(user_dict)
    if result.acknowledged:
        token = jwt.encode({
            "user_id": str(result.inserted_id),
            "username": user_dict["username"],
            "is_admin": False,
            "iat": datetime.now(tz=timezone.utc),
            "exp": datetime.now(tz=timezone.utc) + timedelta(weeks=1)
        }, jwt_secret)
        return {"_id": str(result.inserted_id), "token": token}
    else:
        raise HTTPException(status_code=500, detail="Error writing to database")
    

# Read a User
@app.get("/users/{user_id}")
async def read_user(user_id: str):
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if user:
        user["_id"] = str(user["_id"])
        return user
    else:
        raise HTTPException(status_code=404, detail="User not found")

# Update a User - CURRENTLY DOES NOT CHECK PRIVILEGES FOR UPDATE, I.E. ANYONE CAN CHANGE ADMIN STATUS OR EMAIL OF ANY USER BY ID
@app.put("/users/{user_id}")
async def update_user(user_id: str, updated_user: User):
    updated_user_dict = updated_user.model_dump(by_alias=True, exclude_unset=True)
    # make sure one of the editable fields is actually set
    if updated_user_dict["isAdmin"] == None and updated_user_dict["email"] == None:
        raise HTTPException(status_code=403, detail="Can only change email or admin status")
    else:
        # prevent user from updating username or password
        updated_user_dict.pop("username", None)
        updated_user_dict.pop("password", None)

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

# Login user
@app.post("/users/login/")
async def login_user(user: User):
    user_dict = user.model_dump(by_alias=True, exclude_unset=True)
    user_in_db = await db.users.find_one({"username": user_dict["username"]})
    if user_in_db:
        if bcrypt.checkpw(user_dict["password"].encode("utf-8"), user_in_db["password"].encode("utf-8")):
            token = jwt.encode({
            "user_id": str(user_in_db["_id"]),
            "username": user_dict["username"],
            "is_admin": user_in_db["isAdmin"],
            "iat": datetime.now(tz=timezone.utc),
            "exp": datetime.now(tz=timezone.utc) + timedelta(weeks=1)
            }, jwt_secret)
            return {"token": token}
        else:
            raise HTTPException(status_code=401, detail="Invalid password")
    else:
        raise HTTPException(status_code=404, detail="Username doesn't exist")
