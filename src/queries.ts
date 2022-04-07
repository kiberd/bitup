import {gql} from "@apollo/client";

export const REPOSITORY_INFO = gql`
    query repository($keyword: String!, $length: Int!
        $name: Boolean!, $owner: Boolean!, $homepageUrl: Boolean!, $description: Boolean!
        $createdAt: Boolean!, $diskUsage: Boolean!, $forkCount: Boolean!, $issues: Boolean!, $assignableUsers: Boolean! ) {
        search(query: $keyword, type: REPOSITORY, first: $length) {
            edges {
                node {
                    ... on Repository {
                        name @include(if: $name)
                        owner @include(if: $owner){
                            login
                        }
                        homepageUrl @include(if: $homepageUrl)
                        description @include(if: $description)
                        createdAt @include(if: $createdAt)
                        diskUsage @include(if: $diskUsage)
                        forkCount @include(if: $forkCount)
                        issues(first:10) @include(if: $issues){
                            edges{
                                node{
                                    number
                                    author{
                                        login
                                    }
                                    body
                                    bodyUrl
                                    closed
                                    closedAt
                                }
                            }
                        }
                        assignableUsers(first:10) @include(if: $assignableUsers){
                            edges{
                                node{
                                    login
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const USER_INFO = gql`
    {
        search(query: "javascript", type:REPOSITORY, first: 50) {
            edges {
                node {
                    ... on User {
                        login
                        email
                        location
                        avatarUrl
                        createdAt
                        issues(first:10){
                            edges{
                                node{
                                    number
                                    url
                                }
                            }
                        }
                    }
                }
            }
        }
    }

`;

export const GET_MOVIE = gql`
    query GetMovie($id: Int!) {
        movie(id: $id){
            id
            title
            year
            rating
            genres
            runtime
            description_full
            language
            small_cover_image
            medium_cover_image
            large_cover_image
        }
    }
`


export const GET_MOVIES = gql`
    query GetMovies($limit: Int!, $rating: Float) {
        movies(limit: $limit, rating: $rating){
            id
            title
            year
            rating
            genres
            runtime
            description_full
            language
            small_cover_image
            medium_cover_image
            large_cover_image
        }
    }
`

export const GET_SUGGESTION_MOVIES = gql`
    query GetSuggestionMovies($id: Int!) {
        suggestions(id: $id){
            id
            title
            year
            rating
            genres
            runtime
            description_full
            language
            small_cover_image
        }
    }
`
