# Cisco-Live
Personalized Event Recommendation System

Jupyter Notebook Outline for Session Recommendation System
1. Import Necessary Libraries

```
import pymongo
from pymongo import MongoClient
import numpy as np
from sentence_transformers import SentenceTransformer
import pandas as pd
```

2. Connect to MongoDB Atlas

```
client = MongoClient("your_atlas_connection_string")
db = client.your_database
sessions_collection = db.sessions
users_collection = db.users
```
3. Load and Preview Data
```
# Assuming sessions and users data are already in collections
# Fetch a sample to understand what the data looks like
sample_sessions = sessions_collection.find().limit(5)
print("Sample Sessions:")
for session in sample_sessions:
    print(session)

sample_users = users_collection.find().limit(5)
print("\nSample Users:")
for user in sample_users:
    print(user)
```
4. Generate and Store Vector Embeddings for Sessions
```
model = SentenceTransformer('all-MiniLM-L6-v2')

# Function to generate embeddings
def generate_embeddings(text):
    return model.encode(text)

# Update session documents with embeddings
for session in sessions_collection.find():
    embedding = generate_embeddings(session['description'])
    sessions_collection.update_one({'_id': session['_id']}, {'$set': {'embedding': embedding.tolist()}})
```
5. Setup Vector Search Index in MongoDB
This step will be done through the MongoDB Atlas interface, so you can describe how to set up the index here.

6. Define a Function to Recommend Sessions
```
def recommend_sessions(user_id):
    user = users_collection.find_one({'_id': user_id})
    user_embedding = user['profile_embedding']

    query = {
        "$searchBeta": {
            "vector": {
                "path": "embedding",
                "query": user_embedding,
                "cosine": {
                    "radius": 0.5,
                    "origin": user_embedding
                }
            }
        }
    }

    recommended_sessions = sessions_collection.find(query)
    return pd.DataFrame(recommended_sessions)

# Example usage
user_id = some_user_id  # Substitute with an actual user ID
recommendations = recommend_sessions(user_id)
print(recommendations)
```

7. Display Recommendations for a Sample User
```
# Assuming you have user ID
sample_user_id = "user123"
recommended_sessions = recommend_sessions(sample_user_id)
print("Recommended Sessions for User ID -", sample_user_id)
print(recommended_sessions[['title', 'speaker', 'description']])
```
