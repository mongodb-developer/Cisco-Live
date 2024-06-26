# Assuming you have user ID
sample_user_id = "user123"
recommended_sessions = recommend_sessions(sample_user_id)
print("Recommended Sessions for User ID -", sample_user_id)
print(recommended_sessions[['title', 'speaker', 'description']])
