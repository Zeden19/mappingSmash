import json

import os
import pandas as pd
from geopy.geocoders import GoogleV3
from graphqlclient import GraphQLClient
from flask import Flask, jsonify, send_from_directory, request
from datetime import datetime
import time
from dotenv import load_dotenv
import os

load_dotenv()
GOOGLE_MAPS_API_KEY = os.environ.get('GOOGLE_MAPS_API_KEY')
SMASH_GG_API_KEY = os.environ.get('SMASH_GG_API_KEY')

# GOOGLE_MAPS_API_KEY = os.environ['GOOGLE_MAPS_API_KEY']
# SMASH_GG_API_KEY = os.environ['SMASH_GG_API_KEY']
geolocator = GoogleV3(GOOGLE_MAPS_API_KEY)
app = Flask(__name__)


def geocode_address(address):
    try:
        return geolocator.geocode(address)
    except Exception:
        print(f"Error geocoding address: {address}")
        return None


# Path for the main Svelte page: index.html
@app.route('/')
def root():
    return send_from_directory('../client/public', 'index.html')


# Path for the rest of the static files (JS/CSS)
@app.route('/<path:path>')
def assets(path):
    return send_from_directory('../client/public', path)


@app.route('/update-map', methods=['POST'])
def update_map():
    # Call the updateMap function or perform the desired logic
    data = request.get_json()
    start_date = data.get('startDate')
    end_date = data.get('endDate')
    country = data.get('country')
    attendees = data.get('minAttendees')
    state = data.get('state')
    game = data.get('game')
    if attendees is None: attendees = 0
    start_date = datetime(int(start_date[:4]), int(start_date[5:7]), int(start_date[8:10]))
    end_date = datetime(int(end_date[:4]), int(end_date[5:7]), int(end_date[8:10]))
    result = jsonify(
        updateMap(int(time.mktime(start_date.timetuple())), int(time.mktime(end_date.timetuple())), country, attendees,
                  game, state))
    return result


def updateMap(startTime, endTime, country, numAttendees, game, state=None):
    authToken = SMASH_GG_API_KEY
    apiVersion = 'alpha'
    client = GraphQLClient('https://api.start.gg/gql/' + apiVersion)
    client.inject_token('Bearer ' + authToken)
    game = game.split(' ')

    # start.gg code
    query = '''
    query TournamentsByCountry($cCode: String!, $perPage: Int!, $after: Timestamp!, $before: Timestamp, $state: String
    $game: [ID]) {
      tournaments(query: {
        perPage: $perPage
        filter: {
          countryCode: $cCode
          afterDate: $after
          beforeDate: $before
          videogameIds: $game
          regOpen: true
          addrState: $state
        }
      }) {
        nodes {
          name
          venueAddress
          startAt
          primaryContact
          url
          numAttendees
        }
      }
    } '''

    variables = {
        "cCode": country,
        "perPage": 200,
        "after": startTime,
        "before": endTime,
        "state": state,
        "game": game
    }

    if state is None:
        variables.pop("state")
        query.strip("addrState: $state").strip(", $state: String!")

    getTournaments = client.execute(query, variables)
    resData = json.loads(getTournaments)

    # fixing the date format and getting the addresses
    print(resData)
    for i in resData['data']['tournaments']['nodes']:
        i['startAt'] = datetime.fromtimestamp(i['startAt']).strftime('%A, %B %d, %Y')

    # geolocating the addresses
    df = pd.DataFrame(resData['data']['tournaments']['nodes'])
    if df.empty:
        return []

    df.drop(df[df['numAttendees'] < numAttendees].index, inplace=True)
    if numAttendees != 0:
        df = df.dropna(subset=['numAttendees'])
    else:
        df['numAttendees'] = df['numAttendees'].fillna("unknown")

    df['venueAddress'] = df['venueAddress'].apply(geocode_address)
    df = df.dropna(subset=['venueAddress'])
    df = df.reset_index(drop=True)
    df['point'] = df['venueAddress'].apply(lambda loc: tuple(loc.point) if loc else None)
    df[['lat', 'lon', 'altitude']] = pd.DataFrame(df['point'].tolist(), index=df.index)

    # creating the locations list
    locations = []

    for i, r in df.iterrows():
        if r['lat'] is None or r['lon'] is None:
            continue

        url = "https://start.gg" + r['url']
        location = [r['name'], r['lat'], r['lon'], r['primaryContact'], str(r['venueAddress']), url, r['startAt'],
                    r['numAttendees']]

        locations.append(location)

    print(locations)
    return locations


app.run(debug=True)
