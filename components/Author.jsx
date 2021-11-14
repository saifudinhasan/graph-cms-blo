import React from 'react'
import Image from 'next/image'

const Author = ({ author }) => {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-white bg-opacity-70">

      <img
        src={author.photo.url}
        alt={author.name}
        height="100px"
        width="100px"
        className="align-middle rounded-full absolute -top-14"
        style={{ left: "50%", transform: "translateX(-50%)" }}
      />
      <h3 className="text-gray-800 my-2 text-xl font-bold">
        {author.name}
      </h3>
      <p className="text-lg">{author.bio}</p>

    </div>
  )
}

export default Author
