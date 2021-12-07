import React from 'react'

const Repo = ({ repo }) => {
  console.log(repo)
  return (
    <tr>
      <td class='py-4 whitespace-no-wrap border-b border-gray-500 w-3/5'>
        <div class='font-semibold text-blue-800'>
          <p>{repo.name}</p>
        </div>
      </td>
      <td class='py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5 text-right'>
        <p>
          <span>
            {repo.stargazerCount} {repo.stargazerCount > 1 ? 'stars' : 'star'}
          </span>{' '}
          / <span>{repo.watchers.totalCount} watching</span>
        </p>
      </td>
    </tr>
  )
}

export default Repo
