import requests
import time
import json

# Here we define our query as a multi-line string
query = '''
query ($page: Int) {
    Page(page: $page){ # Insert our variables into the query arguments (page) (type: ANIME is hard-coded in the query)
        pageInfo{
            hasNextPage
        }
        media{
            id
            title{
                english
                romaji
                native
            }
            genres
            type
            episodes
            seasonYear
            chapters
            coverImage{
                medium
                large
            }
            studios{
                nodes{
                    name
                }
            }
            isAdult
        }
    }
}
'''

variables = {
    'page': 1
}

url = 'https://graphql.anilist.co'

data = []
# Make the HTTP Api request
response = requests.post(url, json={'query': query, 'variables': variables})
parseResponse = (response.json())

x = 1
while parseResponse['data']['Page']['pageInfo']['hasNextPage']:

    variables = {
        'page': x
    }
    response = requests.post(url, json={'query': query, 'variables': variables})
    parseResponse = (response.json())

    if not(parseResponse['data'] is None):
        desiredMedia = parseResponse['data']['Page']['media']

        for k in range(len(desiredMedia)):
            if not(desiredMedia is None):
                lis = []
                for keys in desiredMedia[k].keys():
                    lis.append(desiredMedia[k][keys])
                data.append(lis)
    print("Completed", len(data))
    time.sleep(60/90)
    x += 1
print(data)
with open("animedata.json", "w+") as f:
    json.dump(data, f)
