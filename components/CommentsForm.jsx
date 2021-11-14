import React, { useState, useEffect, useRef } from 'react'
import { submitComment } from '../services'

const CommentsForm = ({ slug }) => {

  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const commentRef = useRef()
  const nameRef = useRef()
  const emailRef = useRef()
  const storeDataRef = useRef()

  useEffect(() => {
    nameRef.current.value = window.localStorage.getItem("name")
    emailRef.current.value = window.localStorage.getItem("email")
  }, [])

  const handleCommentSubmission = () => {
    setError(false)

    const { value: comment } = commentRef.current
    const { value: name } = nameRef.current
    const { value: email } = emailRef.current
    const { checked: storeData } = storeDataRef.current

    if (!comment || !name || !email) { setError(true); return }

    const commentObj = { name, email, comment, slug }

    if (storeData) {
      window.localStorage.setItem("name", name)
      window.localStorage.setItem("email", email)
    } else {
      window.localStorage.removeItem("name", name)
      window.localStorage.removeItem("email", email)
    }

    submitComment(commentObj)
      .then((res) => {
        setShowSuccessMessage(true)
        setTimeout(() => {
          setShowSuccessMessage(false)
        }, 3000);
      })

  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave a Reply ...
      </h3>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          name="comment"
          ref={commentRef}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Comment"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
        <input
          type="text"
          name="name"
          ref={nameRef}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Name"
        />
        <input
          type="text"
          name="email"
          ref={emailRef}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Email "
        />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="">
          <input type="checkbox" ref={storeDataRef} id="storeData" name="storeData" defaultValue="true" />
          <label htmlFor="storeData" className="text-gray-500 cursor-pointer ml-2">Save my email and name for the next time I comment</label>
        </div>
      </div>

      {error && <p className="text-xs text-red-500">All fields are required.</p>}

      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="transition duration-500 ease hover:bg-green-500 inline-block bg-gray-400 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Post Comment
        </button>
        {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted for review</span>}
      </div>

    </div>
  )
}

export default CommentsForm
