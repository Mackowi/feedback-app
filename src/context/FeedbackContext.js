import { createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This item is feedback item 1',
      rating: 10,
    },
    {
      id: 2,
      text: 'This item is feedback item 2',
      rating: 5,
    },
    {
      id: 3,
      text: 'This item is feedback item 3',
      rating: 8,
    },
    {
      id: 4,
      text: 'This item is feedback item 4',
      rating: 2,
    },
    {
      id: 5,
      text: 'This item is feedback item 5',
      rating: 9,
    },
  ])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      const updatedFeedback = feedback.filter((item) => item.id !== id)
      setFeedback(updatedFeedback)
    }
  }

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  return (
    <FeedbackContext.Provider
      value={{ feedback, deleteFeedback, addFeedback, editFeedback }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
