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
