import json
import webbrowser
from datetime import datetime

import folium
import pandas as pd
from folium.plugins import MarkerCluster
from geopy.geocoders import GoogleV3
from graphqlclient import GraphQLClient


# helper function to open a file
def openFile(file):
    try:
        with open(file, 'r') as f:
            return f.read()
    except FileNotFoundError:
        print(f"{file} does not exist. Please try again\n")
        return False


authToken = openFile('authToken.txt').strip('\n')
apiVersion = 'alpha'
client = GraphQLClient('https://api.start.gg/gql/' + apiVersion)
client.inject_token('Bearer ' + authToken)

# start.gg code
getTournaments = client.execute('''
query TournamentsByCountry($cCode: String!, $perPage: Int!, $after: Timestamp!, $before: Timestamp) {
  tournaments(query: {
    perPage: $perPage
    filter: {
      countryCode: $cCode
      afterDate: $after
      beforeDate: $before
      videogameIds: [1, 1386]
      
    }
  }) {
    nodes {
      name
      venueAddress
      startAt
      primaryContact
    }
  }
} ''',
                                {
                                    "cCode": "CA",
                                    "perPage": 200,
                                    "after": 1676869200,
                                    "before": 1677131227
                                })
resData = json.loads(getTournaments)

# fixing the date format and getting the addresses
addresses = []
for i in resData['data']['tournaments']['nodes']:
    i['startAt'] = datetime.fromtimestamp(i['startAt']).strftime('%Y-%m-%d')
    print(i)

    addresses.append(i['venueAddress'])

geolocator = GoogleV3(api_key=open('googleMapsKey.txt', 'r').read().strip('\n'))

df = pd.DataFrame(resData['data']['tournaments']['nodes'])
df['venueAddress'] = df['venueAddress'].apply(geolocator.geocode)
df['point'] = df['venueAddress'].apply(lambda loc: tuple(loc.point) if loc else None)
df[['lat', 'lon', 'altitude']] = pd.DataFrame(df['point'].tolist(), index=df.index)

# Create a map object and center it to the avarage coordinates to m
m = folium.Map(location=df[["lat", "lon"]].mean().to_list(), zoom_start=2)
# if the points are too close to each other, cluster them, create a cluster overlay with MarkerCluster, add to m
marker_cluster = MarkerCluster().add_to(m)
# draw the markers and assign popup and hover texts
# add the markers the cluster layers so that they are automatically clustered
for i, r in df.iterrows():
    location = (r["lat"], r["lon"])
    iframe = folium.IFrame("<b>Name:</b> " + r['name'] + "<br><b>Date</b>: " + r['startAt'] +
                           "<br><b>Primary Contact:</b> " + r['primaryContact'] + "<br><b>Venue Address:</b> " +
                           str(r['venueAddress']))

    folium.Marker(location=location,
                  popup=folium.Popup(iframe, min_width=300, max_width=300),
                  tooltip=r['name']).add_to(marker_cluster)

# display the map
m.save('map.html')
webbrowser.open('map.html')
