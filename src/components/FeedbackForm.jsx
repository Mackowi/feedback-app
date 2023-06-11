import { useState, useContext, useEffect } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')
  const [cancel, setCancel] = useState(false)

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext)

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
      setCancel(true)
    }
  }, [feedbackEdit])

  const handleTextChange = (e) => {
    // empty message
    if (text === '') {
      setBtnDisabled(true)
      setMessage(null)
      // message too short (less than 10)
    } else if (text !== '' && text.trim().length <= 10) {
      setBtnDisabled(true)
      setMessage('Text must be at least 10 characters')
      // correct message
    } else {
      setBtnDisabled(false)
      setMessage(null)
    }
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      }
      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
        feedbackEdit.edit = false
      } else {
        addFeedback(newFeedback)
      }
      setText('')
    }
  }

  const handleCancel = () => {
    setCancel(false)
    setText('')
    feedbackEdit.edit = false
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className='input-group'>
          <input
            onChange={handleTextChange}
            type='text'
            placeholder='Write a review'
            value={text}
          />
          <Button type='submit' isDisabled={btnDisabled}>
            {feedbackEdit.edit === true ? 'Edit' : 'Send'}
          </Button>
        </div>
        {message && <div className='message'>{message}</div>}
        {cancel && (
          <div className='edit-group'>
            <button
              onClick={handleCancel}
              className='cancel-edit btn btn-primary'
            >
              {'Cancel Edit'}
            </button>
          </div>
        )}
      </form>
    </Card>
  )
}
export default FeedbackForm
