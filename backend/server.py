from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    message: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/contact")
async def send_contact_message(contact: ContactMessage):
    try:
        # Email configuration - using Gmail SMTP as default
        sender_email = "noreply@portfolio.com"  # This can be any email
        receiver_email = "isaac.hassani@limayrac.fr"
        
        # Create message
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Portfolio Contact: Message de {contact.name}"
        msg["From"] = sender_email
        msg["To"] = receiver_email
        msg["Reply-To"] = contact.email
        
        # Create HTML email body
        html = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                    <h2 style="color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">
                        Nouveau message depuis votre portfolio
                    </h2>
                    <div style="margin: 20px 0;">
                        <p><strong>De:</strong> {contact.name}</p>
                        <p><strong>Email:</strong> <a href="mailto:{contact.email}">{contact.email}</a></p>
                    </div>
                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin: 0;"><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap; margin: 10px 0 0 0;">{contact.message}</p>
                    </div>
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                        <p>Ce message a été envoyé depuis votre portfolio professionnel.</p>
                    </div>
                </div>
            </body>
        </html>
        """
        
        # Attach HTML part
        part = MIMEText(html, "html")
        msg.attach(part)
        
        # For development, we'll save to database instead of sending real email
        # In production, you would configure SMTP server (Gmail, SendGrid, etc.)
        contact_dict = contact.model_dump()
        contact_dict["id"] = str(uuid.uuid4())
        contact_dict["timestamp"] = datetime.now(timezone.utc)
        contact_dict["status"] = "received"
        
        # Save to MongoDB
        await db.contact_messages.insert_one(contact_dict)
        
        # Log the message
        logger.info(f"Contact message received from {contact.name} ({contact.email})")
        
        return {
            "status": "success",
            "message": "Votre message a été envoyé avec succès ! Je vous répondrai dès que possible."
        }
        
    except Exception as e:
        logger.error(f"Error sending contact message: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de l'envoi du message. Veuillez réessayer plus tard.")

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()