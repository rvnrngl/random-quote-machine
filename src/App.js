import './App.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitterSquare, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

const App = () => {

  const fontColors = ['#614392','#B04B90','#E9617F','#1660B6','#007BCB','#9674C8','#4D8076','#00C9A8','#7B7484','#923324','#70A5B9','#008B75'];
  const [color, setColors] = useState('');

  const [quotes, setQuotes] = useState('');

  // fetch quotes
  const getQuotes = () => {
    fetch('https://type.fit/api/quotes')
    .then(res => res.json())
    .then(data => {
      // get a random index in the quotes api
      let index = Math.floor(Math.random() * data.length);
      setQuotes(data[index]);
    });

    let index = Math.floor(Math.random() * fontColors.length);
    setColors(fontColors[index]);
    console.log(index, fontColors[index], color);
  };
  
  // get new quote every time the page refresh
  useEffect(() => {
    getQuotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])  

  return (
    <div className="App">
      <div id="quote-box">
        <p id="text" style={{color: color}}>"{quotes.text}"</p>
        <p id="author" style={{color: color}}>~ {quotes.author}</p>
        <div className="button-wrapper">
          <button id="new-quote" onClick={getQuotes} style={{backgroundColor: color}} >New Quote</button>
          <div className="links">
            <a target='_top' id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${quotes.text} ~ ${quotes.author}`} rel="noopener noreferrer">
              <FontAwesomeIcon className="icons" icon={faTwitterSquare} style={{color: color}} />
            </a>
            <a id="fb-quote" href="https://fb.watch/l6VVh9owVb/" target='_blank' rel="noopener noreferrer">
            <FontAwesomeIcon className="icons" icon={faFacebookSquare} style={{color: color}} />
            </a>
          </div>
        </div>
      </div>
      <p className="developer">By Raven Ringel</p>
    </div>
  );
}

export default App;
