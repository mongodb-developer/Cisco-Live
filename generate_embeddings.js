model = SentenceTransformer('all-MiniLM-L6-v2')

# Function to generate embeddings
def generate_embeddings(text):
    return model.encode(text)

# Update session documents with embeddings
for session in sessions_collection.find():
    embedding = generate_embeddings(session['description'])
    sessions_collection.update_one({'_id': session['_id']}, {'$set': {'embedding': embedding.tolist()}})
