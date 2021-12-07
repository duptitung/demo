import { useEffect, useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

import '../styles/App.css'

import User from './User'
import Repo from './Repo'

const GET_USERS = gql`
  query ($query: String!) {
    search(query: $query, type: USER, first: 10) {
      userCount
      edges {
        node {
          ... on User {
            id
            email
            bio
            name
            login
            avatarUrl
          }
        }
      }
    }
  }
`

const GET_USER = gql`
  query ($user: String!) {
    user(login: $user) {
      bio
      name
      repositories(first: 10) {
        totalCount
        nodes {
          id
          description
          name
          stargazerCount
          watchers {
            totalCount
          }
        }
      }
    }
  }
`

const App = () => {
  const [search, setSearch] = useState('')
  const [userInfo, setUserInfo] = useState(null)

  const [getUsers, { data }] = useLazyQuery(GET_USERS)
  const [getUser, { data: userData }] = useLazyQuery(GET_USER)

  useEffect(() => {
    setUserInfo(userData)
  }, [userData])

  const handleSearch = (e) => {
    e.preventDefault()
    getUsers({ variables: { query: search } })
    setUserInfo(null)
  }

  const getUserDetails = (userName) => {
    console.log(userName)
    getUser({ variables: { user: userName } })
  }

  return (
    <div className='App container mx-auto p-6'>
      <div className='flex justify-center'>
        <form onSubmit={handleSearch} className='flex'>
          <input
            className='w-full p-2 border border-blue-600'
            type='text'
            placeholder='Search github users'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type='submit' className='bg-blue-600 text-white px-4 py-2'>
            Search
          </button>
        </form>
      </div>
      <div className='mt-10'>
        {data ? (
          <>
            <h2 className='font-bold text-2xl mb-6'>
              Users{' '}
              <span className='text-sm font-normal'>
                (Result: {data.search.userCount} users)
              </span>{' '}
            </h2>
            <div className='flex flex-wrap gap-6'>
              {data.search.edges.map(({ node }) => (
                <User
                  key={node.id}
                  user={node}
                  getUserDetails={getUserDetails}
                />
              ))}
            </div>
          </>
        ) : (
          <p className='text-sm text-gray-400 text-center'>
            Use search form to look for users.
          </p>
        )}
      </div>

      <div className='mt-10'>
        {userInfo && userInfo ? (
          <>
            <h2 className='font-bold text-2xl mb-6'>
              Repository{' '}
              <span className='text-sm font-normal'>
                (Total: {userInfo.user.repositories.totalCount} repos)
              </span>
            </h2>
            <table class='min-w-full'>
              <tbody class='bg-white'>
                {userInfo &&
                  userInfo.user.repositories.nodes.map((repo) => (
                    <Repo key={repo.id} repo={repo} />
                  ))}
              </tbody>
            </table>
            <div>
              <ul class='flex justify-center pl-0 list-none rounded my-2'>
                <li class='relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-gray-200'>
                  <a class='page-link' href='#'>
                    Previous
                  </a>
                </li>
                <li class='relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 border-r-0 hover:bg-gray-200'>
                  <a class='page-link' href='#'>
                    1
                  </a>
                </li>
                <li class='relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 border-r-0 hover:bg-gray-200'>
                  <a class='page-link' href='#'>
                    2
                  </a>
                </li>
                <li class='relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 border-r-0 hover:bg-gray-200'>
                  <a class='page-link' href='#'>
                    3
                  </a>
                </li>
                <li class='relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 rounded-r hover:bg-gray-200'>
                  <a class='page-link' href='#'>
                    Next
                  </a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default App
