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
            popularity
            type
            episodes
            seasonYear
            chapters
            coverImage{
                medium
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
#print(parseResponse)

x = 1
while (parseResponse['data']['Page']['pageInfo']['hasNextPage']):
    variables = {
        'page': x
    }
    response = requests.post(url, json={'query': query, 'variables': variables})
    parseResponse = (response.json())
    #print(parseResponse)
    #print(parseResponse['data'])
    if(not(parseResponse['data'] == None)):
        desiredMedia = parseResponse['data']['Page']['media']
        #print((desiredMedia))
        #print(desiredMedia[1])
        #print(desiredMedia[1]['id'])
        for k in range(len(desiredMedia)) :
            if(not(desiredMedia == None)):
                lis = []
                for keys in desiredMedia[k].keys():
                    lis.append(desiredMedia[k][keys])
                    #data.append((desiredMedia[k]['id'], desiredMedia[k]['title'], desiredMedia[k]['genres'], desiredMedia[k]['popularity']))
                data.append(lis)
    #print(response.json())
    print("Completed", len(data))
    time.sleep(60/90)
    x += 1


with open("data.json", "w+") as f:
   json.dump(data, f)
