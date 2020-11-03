import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'
import './chat.css'

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('')
    const [message, setMessage] = useState(''); //single message
    const [messages, setMessages] = useState([]); //array of messages
    const ENDPOINT = 'localhost:5000'

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {

        });

        return () => { //happens on unmount
            socket.emit('disconnect');

            socket.off(); //turns instance of client off so no duplicates
        }

    }, [ENDPOINT, location.search])


    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, [messages]);

    //function for sending messages
    const sendMessage = (ev) => {
        ev.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message, messages);



    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    )
}

export default Chat;