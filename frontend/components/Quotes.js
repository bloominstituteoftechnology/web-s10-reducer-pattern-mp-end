import React from 'react'

export default function Quotes({
  quotes,
  hideApocryphalQuotes,
  toggleQuoteApocryphal,
  toggleQuoteHighlighted,
  toggleHideApocryphal,
  deleteQuote,
}) {

  return (
    <div id="quotes">
      <h3>Quotes</h3>
      <div>
        {
          quotes
            ?.filter(qt => {
              return !hideApocryphalQuotes || !qt.apocryphal
            })
            .map(qt => (
              <div
                key={qt.id}
                className={`quote${qt.apocryphal ? " fake" : ''}${qt.highlighted ? " highlight" : ''}`}
              >
                <div>{qt.quoteText}</div>
                <div>{qt.authorName}</div>
                <div className="quote-buttons">
                  <button onClick={() => deleteQuote(qt.id)}>delete</button>
                  <button onClick={() => toggleQuoteHighlighted(qt.id)}>highlight</button>
                  <button onClick={() => toggleQuoteApocryphal(qt.id)}>fake!</button>
                </div>
              </div>
            ))
        }
        {
          !quotes?.length && "No quotes here! Go and write some."
        }
      </div>
      {!!quotes?.length && <button onClick={toggleHideApocryphal}>
        {hideApocryphalQuotes ? 'show' : 'hide'} fake quotes
      </button>}
    </div>
  )
}
