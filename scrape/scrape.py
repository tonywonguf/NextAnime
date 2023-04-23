import requests
import time
import json

# Here we define our query as a multi-line string
query ='''
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
            popularity
            type
            episodes
            seasonYear
            chapters
            coverImage{
                medium
                large
            }
            trending
            staff{
                nodes{
                    name{
                        full
                    }
                }
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
while (parseResponse['data']['Page']['pageInfo']['hasNextPage']):
    if x == 20:
        break
    variables = {
        'page': x
    }
    response = requests.post(url, json={'query': query, 'variables': variables})
    parseResponse = (response.json())

    if(not(parseResponse['data'] == None)):
        desiredMedia = parseResponse['data']['Page']['media']

        for k in range(len(desiredMedia)) :
            if(not(desiredMedia == None)):
                lis = []
                for keys in desiredMedia[k].keys():
                    lis.append(desiredMedia[k][keys])
                data.append(lis)
    print("Completed", len(data))
    time.sleep(60/90)
    x += 1

print("Successful!\nType any key to exit: ")
exit = input()
with open("animedata.json", "w+") as f:
   json.dump(data, f)
