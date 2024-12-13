from fastapi.testclient import TestClient
from os import environ
import pytest
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from dotenv import load_dotenv

load_dotenv()

environ["TEST"] = "true"

from main import app

if __name__ == "__main__":
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

db_user = environ.get("DB_USER", False)
db_pass = environ.get("DB_PASS", False)
if not db_user:
    raise ValueError("DB_USER environment variable must be set.")
if not db_pass:
    raise ValueError("DB_PASS envrionment variable must be set.") 
db_conn_string = f"mongodb+srv://{db_user}:{db_pass}@ligilegend.eh2nx.mongodb.net/?retryWrites=true&w=majority&appName=ligilegend"

@pytest.fixture(scope="module")
def client():
    with TestClient(app) as test_client:
        yield test_client

class TestRequestFunctions:
    def test_get_requests(self, client):
        response = client.get("/requests")
        assert response.status_code == 200
        assert len(response.json()) == 3
        for doc in response.json():
            assert "_id" in doc
            assert "title" in doc
            assert "description" in doc
            assert "cost" in doc
            assert "status" in doc
            assert "user_id" in doc

            
    def test_get_request_by_id(self, client):
        response = client.get("/requests/674dddb40c58e88eedadfa20")
        assert response.status_code == 200
        doc = response.json()
        assert doc["_id"] == "674dddb40c58e88eedadfa20"
        assert doc["title"] == "Zahteva za obnovo"
        assert doc["description"] == "Obnova strehe stare zgradbe"
        assert doc["cost"] == 15000
        assert doc["status"] == "pending"
        assert doc["user_id"] == "1"

    @pytest.mark.asyncio
    async def test_post_request(self, client):
        doc = {
            "title": "Pytest Test Request",
            "description": "pytest test request",
            "cost": 5000,
            "status": "pending",
            "user_id": "1"
        }
        response = client.post("/requests/", json=doc)
        assert response.status_code == 200
        assert "_id" in response.json()

        cleanup_client = AsyncIOMotorClient(db_conn_string)
        db = cleanup_client.test_tibor
        db_response = await db.request.delete_one({"description": "pytest test request"})
        assert db_response.deleted_count == 1

    @pytest.mark.asyncio
    async def test_put_request(self, client):
        doc = {
            "title": "Zahteva za obnovo",
            "description": "edited",
            "cost": 15000,
            "status": "pending",
            "user_id": "1"
        }
        response = client.put("/requests/674dddb40c58e88eedadfa20", json=doc)
        assert response.status_code == 200
        assert response.json()["message"] == "Request updated successfully"

        cleanup_client = AsyncIOMotorClient(db_conn_string)
        db = cleanup_client.test_tibor
        db_response = await db.request.update_one({"_id": ObjectId("674dddb40c58e88eedadfa20")}, {"$set": {"description": "Obnova strehe stare zgradbe"}})
        assert db_response.modified_count == 1

    @pytest.mark.asyncio
    async def test_delete_request(self, client):
        setup_client = AsyncIOMotorClient(db_conn_string)
        db = setup_client.test_tibor
        db_response = await db.request.insert_one({"title": "Pytest Test Request", "description": "pytest test request", "cost": 100, "status": "pending", "user_id": "1"})
        assert db_response.acknowledged == True
        id = db_response.inserted_id

        response = client.delete(f"/requests/{id}")
        assert response.status_code == 200
        assert response.json()["message"] == "Request deleted successfully"

class TestUserFunctions:
    def test_get_users(self, client):
        response = client.get("/users/")
        assert response.status_code == 200
        assert len(response.json()) == 3
        for doc in response.json():
            assert "_id" in doc
            assert "username" in doc
            assert "password" in doc
            assert "isAdmin" in doc
            assert "email" in doc

    def test_get_users_by_id(self, client):
        response = client.get("/users/675c3c1fef3d368066c95052")
        assert response.status_code == 200
        doc = response.json()
        assert doc["_id"] == "675c3c1fef3d368066c95052"
        assert doc["username"] == "User 1"
        assert doc["password"] == "$2b$12$cKX8qUTuPPOZy9GBFfHFoOf.drOOccwKsYY/ce1s5L95p4J87eDhu"
        assert doc["isAdmin"] == True
        assert doc["email"] == "user1@site.org"

    @pytest.mark.asyncio
    async def test_post_user(self, client):
        doc = {
            "username": "Test user",
            "password": "test123",
            "isAdmin": False,
            "email": "test@blah.com"
        }
        response = client.post("/users/", json=doc)
        assert response.status_code == 200
        assert "_id" in response.json()
        assert "token" in response.json()

        cleanup_client = AsyncIOMotorClient(db_conn_string)
        db = cleanup_client.test_tibor
        db_response = await db.users.delete_one({"username": "Test user"})
        assert db_response.deleted_count == 1

    @pytest.mark.asyncio
    async def test_put_user(self, client):
        doc = {
            "username": "User 1",
            "password": "GoldenRetriever98",
            "isAdmin": True,
            "email": "edited@blah.com"
        }
        response = client.put("/users/675c3c1fef3d368066c95052", json=doc)
        assert response.status_code == 200
        assert response.json()["message"] == "User updated successfully"

        cleanup_client = AsyncIOMotorClient(db_conn_string)
        db = cleanup_client.test_tibor
        db_response = await db.users.update_one({"_id": ObjectId("675c3c1fef3d368066c95052")}, {"$set": {"email": "user1@site.org"}})
        assert db_response.modified_count == 1

    @pytest.mark.asyncio
    async def test_delete_user(self, client):
        setup_client = AsyncIOMotorClient(db_conn_string)
        db = setup_client.test_tibor
        db_response = await db.users.insert_one({
            "username": "Test user",
            "password": "test123",
            "isAdmin": False,
            "email": "test@blah.com"
        })
        assert db_response.acknowledged == True
        id = db_response.inserted_id

        response = client.delete(f"/users/{id}")
        assert response.status_code == 200
        assert response.json()["message"] == "User deleted successfully"

    @pytest.mark.asyncio
    async def test_login_user_successful(self, client):
        credentials = {
            "username": "User 1",
            "password": "GoldenRetriever98"
        }
        response = client.post("/users/login/", json=credentials)
        assert response.status_code == 200
        assert "token" in response.json()
    
    @pytest.mark.asyncio
    async def test_login_user_wrong_username(self, client):
        credentials = {
            "username": "John Doe",
            "password": "password123"
        }
        response = client.post("/users/login/", json=credentials)
        assert response.status_code == 404
        assert response.json()["detail"] == "Username doesn't exist"

    @pytest.mark.asyncio
    async def test_login_user_wrong_password(self, client):
        credentials = {
            "username": "User 1",
            "password": "password123"
        }
        response = client.post("/users/login/", json=credentials)
        assert response.status_code == 401
        assert response.json()["detail"] == "Invalid password"
