import { Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import ChatIcon from '@mui/icons-material/Chat';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

function Islamchatbot() {
  const [requestMessage, setRequestMessage] = useState(null);
  const [threadId, setThreadId] = useState(null)
  const [loading, setLoading] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('https://dl60m3uxxd.execute-api.us-east-2.amazonaws.com/dev/api/chat/createthread')
      .then((response) => {
        setThreadId(response.data.thread_id);
      })
  }, []);

  const handleChatSubmit = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, message: requestMessage, type: 'request' },
    ]);

    setLoading(true);
    const axiosPromise = axios.get('https://dl60m3uxxd.execute-api.us-east-2.amazonaws.com/dev/api/chat/sendrequest', {
      params: {
        'thread_id': threadId,
        'request': requestMessage
      }
    })
      .then((response) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: prevMessages.length + 1, message: response.data.response[0], type: 'response' },
        ]);
        setLoading(false);
      });

    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Request timed out'));
      }, 20000);
    });

    Promise.race([axiosPromise, timeoutPromise])
      .catch((error) => {
        console.error(error);
        axios.get('https://dl60m3uxxd.execute-api.us-east-2.amazonaws.com/dev/api/chat/createthread')
          .then((response) => {
            setThreadId(response.data.thread_id);
            setLoading(false);
          })
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: prevMessages.length + 1, message: 'Error: Request timed out. Don\'t worry it\'s not your fault. The LLMs being used are still in their beta development stages, so errors are expected. Next time, try asking more specific quest. ', type: 'error' },
        ]);
      });
  };

  function handleChatOpen() {
    if (showChatBox === false) {
      setShowChatBox(true);
    } else {
      setShowChatBox(false);
    }
  }

  function renderMessages() {
    const requestMessageBubbles = messages.map((req) =>
      <div className={`${req.type}Bubble`}>
        <h1 className={`${req.type}Text`}>{req.message}</h1>
      </div>
    );

    return (
      <>
        <div className='responseBubble'>
          <h1 className='responseText'>Assalamualaikum, I'm IslamGPT, your AI learning assistant. Ask me a question and I'll respond to the best of my knowledge using sources from Quran and Hadeeth.</h1>
        </div>

        {requestMessageBubbles}
        {loading ? (
          <div className='responseBubbleLoader'>
            <div className='messageLoader'></div>
          </div>
        ) : (
          <>
          </>
        )
        }
      </>
    );
  }

  function renderChat() {
    if (showChatBox === true) {
      return (
        <Paper elevation={10} sx={{
          backgroundColor: 'white', borderRadius: '1rem', maxWidth: { xs: '90%', sm: '75%', md: '60%', lg: '40%' }, maxHeight: '75%', position: 'fixed',
          bottom: '15%',
          right: { xs: '2.5%', md: '12.5%' },
          zIndex: '9999',
        }}>
          <div className='chat'>
            <div className='chatTitle'>
              <h1 className='chatTitleText'>Hello/Salaam!</h1>
            </div>
            <div className='chatBody'>
              {renderMessages()}
            </div>
            {!loading ? (
              <div className='chatRequest'>
                <TextField onChange={(e) => setRequestMessage(e.target.value)} label="Ask a question" variant="outlined" sx={{ width: '100%' }} />
                <Button variant="contained" sx={{
                  borderRadius: '50%', // Making the button a circle
                  width: '55px', // Set the width and height for the circle
                  height: '50px',
                  minWidth: 'auto', // Ensure the button doesn't expand beyond its content
                  paddingLeft: '5px',
                  marginLeft: '10px'
                }} endIcon={<SendIcon />}
                  onClick={handleChatSubmit}>
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </Paper>
      );
    } else {
      return
    }
  }

  return (
    <div class='chatButton'>
      <Fab color="primary" aria-label="add" onClick={handleChatOpen}>
        <ChatIcon />
      </Fab>
      {renderChat()}
    </div>
  );
}


export default Islamchatbot;  