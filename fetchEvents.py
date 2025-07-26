from apify_client import ApifyClient
import dotenv
import json
import os

dotenv.load_dotenv()

apify_client = ApifyClient(os.environ["APIFY_KEY"])

def fetchRelatedEventsMeetup(city:str, country:str,  interests:list[str], output_file='output_json', state=None)->json:
    """
    Parameters
    -------------------
    city: the client's target city to search in
    country: the client's target country to search in
    interests: a list of interests the client has
    output_file: the name of the output file to save results
    state: optional : only required for USA / Canada
    

    Returns
    -------------------
    A json file of events containing (CASE SENSITIVE)
    eventId : the ID of the event
    eventName : the name of the event
    eventDescrption: A string containing the description for the event
    eventType : two possible values: PHYSICAL, and ONLINE. (physical = in-person event, online = online)
    address : The address (if physical event) of the event, if online, "Online event"
    eventUrl : the actual web address of the event (the event page)
    organizedByGroup : The group who organized the event
    maxAttendees : max amount of people going, if no max, null
    actualAttendees : the number of people going to the event currently
    """
    all_events = []

    for interest in interests:
        run_input = {
            "city": city,
            "country": country,
            "maxResults": int(15 / len(interests)),
            "scrapeActualAttendeesCount": True,
            "scrapeEventAddress": True,
            "scrapeEventDate": True,
            "scrapeEventDescription": True,
            "scrapeEventName": True,
            "scrapeEventType": True,
            "scrapeEventUrl": True,
            "scrapeHostedByGroup": True,
            "scrapeMaxAttendees": True,
            "searchKeyword": interest
        }

        if state:
            run_input["state"] = state

        actor_run = apify_client.actor('filip_cicvarek/meetup-scraper').call(run_input=run_input)

        # Fetch the dataset items
        dataset_items = apify_client.dataset(actor_run['defaultDatasetId']).list_items().items
        all_events.extend(dataset_items)

    with open(output_file, "w") as json_file:
        json.dump(all_events, json_file, indent=4) # indent for pretty printing

    return all_events