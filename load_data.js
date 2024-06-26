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
