
query ($page: Int) {
    Page(page: $page){ # Insert our variables into the query arguments (page) (type: ANIME is hard-coded in the query)
        pageInfo{
            hasNextPage
        }
        media(type: ANIME){
            id
            title{
                english
                romaji
                native
            }
            genres
            episodes
            seasonYear
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
