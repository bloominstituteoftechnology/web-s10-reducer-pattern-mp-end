import React, { useReducer } from 'react'
import Quotes from './Quotes'
import QuoteForm from './QuoteForm'

const CREATE_NEW_QUOTE = 'CREATE_NEW_QUOTE'
const DELETE_QUOTE = 'DELETE_QUOTE'
const TOGGLE_QUOTE_APOCRYPHAL = 'TOGGLE_QUOTE_APOCRYPHAL'
const TOGGLE_QUOTE_HIGHLIGHTED = 'TOGGLE_QUOTE_HIGHLIGHTED'
const TOGGLE_HIDE_APOCRYPHAL = 'TOGGLE_HIDE_APOCRYPHAL'

let id = 1
const getNextId = () => id++
const initialState = {
  hideApocryphalQuotes: false,
  quotes: [
    {
      id: getNextId(),
      quoteText: "Don't cry because it's over, smile because it happened.",
      authorName: "Dr. Seuss",
      apocryphal: false,
      highlighted: false,
    },
    {
      id: getNextId(),
      quoteText: "So many books, so little time.",
      authorName: "Frank Zappa",
      apocryphal: false,
      highlighted: false,
    },
    {
      id: getNextId(),
      quoteText: "Be yourself; everyone else is already taken.",
      authorName: "Oscar Wilde",
      apocryphal: false,
      highlighted: false,
    },
  ],
}

const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_NEW_QUOTE:
      return { ...state, quotes: [...state.quotes, action.payload] }
    case DELETE_QUOTE:
      return { ...state, quotes: state.quotes.filter(qt => qt.id != action.payload) }
    case TOGGLE_QUOTE_APOCRYPHAL:
      return {
        ...state,
        quotes: state.quotes.map(qt => {
          if (qt.id != action.payload) return qt
          return { ...qt, apocryphal: !qt.apocryphal }
        })
      }
    case TOGGLE_QUOTE_HIGHLIGHTED:
      return {
        ...state,
        quotes: state.quotes.map(qt => {
          if (qt.id == action.payload && !qt.highlighted) return { ...qt, highlighted: true }
          return { ...qt, highlighted: false }
        })
      }
    case TOGGLE_HIDE_APOCRYPHAL:
      return { ...state, hideApocryphalQuotes: !state.hideApocryphalQuotes }
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const createNewQuote = ({ authorName, quoteText }) => {
    const newQuote = { id: getNextId(), authorName, quoteText }
    dispatch({ type: CREATE_NEW_QUOTE, payload: newQuote })
  }
  const deleteQuote = id => {
    dispatch({ type: DELETE_QUOTE, payload: id })
  }
  const toggleQuoteApocryphal = id => {
    dispatch({ type: TOGGLE_QUOTE_APOCRYPHAL, payload: id })
  }
  const toggleQuoteHighlighted = id => {
    dispatch({ type: TOGGLE_QUOTE_HIGHLIGHTED, payload: id })
  }
  const toggleHideApocryphal = () => {
    dispatch({ type: TOGGLE_HIDE_APOCRYPHAL })
  }

  return (
    <div id="mp">
      <h2>Module Project</h2>
      <Quotes
        quotes={state.quotes}
        hideApocryphalQuotes={state.hideApocryphalQuotes}
        toggleQuoteApocryphal={toggleQuoteApocryphal}
        toggleQuoteHighlighted={toggleQuoteHighlighted}
        toggleHideApocryphal={toggleHideApocryphal}
        deleteQuote={deleteQuote}
      />
      <QuoteForm
        createNewQuote={createNewQuote}
      />
    </div>
  )
}
