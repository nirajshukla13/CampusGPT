from motor.motor_asyncio import AsyncIOMotorClient
from config import settings

class Database:
    client: AsyncIOMotorClient = None
    
db = Database()

async def get_database():
    return db.client[settings.DB_NAME]

async def connect_to_mongo():
    db.client = AsyncIOMotorClient(settings.MONGO_URL)
    print(f"Connected to MongoDB at {settings.MONGO_URL}")

async def close_mongo_connection():
    db.client.close()
    print("Closed MongoDB connection")
