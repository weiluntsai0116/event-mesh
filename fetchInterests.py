from google import genai
import dotenv
import json
import os
dotenv.load_dotenv()
# The client gets the API key from the environment variable `GEMINI_API_KEY`.

client = genai.Client(api_key="AIzaSyCS0t43OCAAWRJTcv84kgceFiA6WzFxMXk")

def fetch_interests(eventsAccepted:list[str], eventsRejected:list[str], client):
    """
    Parameters
    -------------------
    eventsAccepted: a list of events the user has accepted
    eventsRejected: a list of events the user has rejected
    client: an instance of the genai.Client to interact with the Gemini API
    
    Returns
    -------------------
    A list of interests extracted from the events.
    """
    interests = []

    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=f"Here are the events the user has accepted: {str(eventsAccepted)[1:len(str(eventsAccepted))-2]}. Here are the events the user has rejected: {str(eventsRejected)[1:len(str(eventsRejected))-2]}. Please extract a list of common interests from the events that were accepted, and return them as a comma-separated string. DO NOT INCLUDE STRING QUOTATIONS, DO NOT INCLUDE ' , AND []. OUTPUT THEM LIKE THIS: Cooking, Performances, Music",
    )
    
    return response.text.split(",")

print(type(fetch_interests(["AI Conference", "Tech Meetup"], ["Cooking Class", "Art Exhibition"], client)))