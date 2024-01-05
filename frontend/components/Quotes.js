import React from 'react'
import styled from 'styled-components'

const StyledQuote = styled.li`
  text-decoration: ${pr => pr.$complete ? 'line-through' : 'initial'};
  cursor: pointer;
`

export default function Quotes({
  quotes,
  hideApocryphalQuotes,
  markQuoteApocryphal,
  markQuoteHighlighted,
  toggleHideApocryphal,
  deleteTodo,
}) {

  return (
    <div id="quotes">
      <h3>Quotes</h3>
      <ul>
        {
          quotes
            ?.filter(qt => {
              return !hideApocryphalQuotes || !qt.apocryphal
            })
            .map(qt => (
              <StyledQuote key={qt.id}>
                <div>{qt.quoteText}</div>
                <div>{qt.authorName}</div>
              </StyledQuote>
            ))
        }
      </ul>
      <button onClick={toggleHideApocryphal}>
        {hideApocryphalQuotes ? 'Show' : 'Hide'} apocryphal todos
      </button>
    </div>
  )
}
