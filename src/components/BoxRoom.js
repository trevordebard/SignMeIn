import React, { Component } from 'react';
import io from 'socket.io-client';
import {socket_url} from '../consts';
import {CSVLink} from 'react-csv';

const socketURL = socket_url;
let headers = [
  {label: 'First Name', key: 'firstname'},
  {label: 'Last name', key: 'lastname'},
];
const styles = {
  header: {
    backgroundColor: '#fff',
    padding: '5px',
    position: 'sticky',
    position: '-webkit-sticky',
    position: 'sticky',
    width: '100%',
    top: 0,
  },
  headerContent: {
    display: 'inline',
    fontSize: '1.8em',
  },
  headerRoomCode: {
    fontSize: '1.8em',
    fontWeight: 'bold',
  },
  boxRoom: {
    width: '100%',
    textAlign: 'center',
  }
}

export default class BoxRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      socket: null,
    };
  }
  
  componentWillMount() {
    this.initSocket();
  }

  initSocket = () => {
    const socket = io(socketURL);
    socket.on('connect', () => {
      console.log('connected');
      this.state.socket.emit('join-room', this.props.match.params.roomCode)
      this.state.socket.on('fill-page-with-users', (users) => {
        if(users) {
          headers = [
            {label: 'First Name', key: 'firstname'},
            {label: 'Last name', key: 'lastname'},
          ];
          for (let key in users[0]) {
            if (users[0].hasOwnProperty(key)) {
              if(key !== 'firstname' && key !== 'lastname') {
                headers.push({label: `${key}`, key: `${key.replace(/\s+/g, '')}`})
              }
            }
          }
          this.setState({
            users: users,
          })
          const boxNames = document.getElementById('room-names');
          if(boxNames){
            boxNames.scrollTop = boxNames.scrollHeight;
          }
        }
      })
    })
    this.setState({
      socket
    })
  }

  render() {
    const { users } = this.state;
    return (
        <div id="room-names" className="box" style={styles.boxRoom}>
        	<div style={styles.header}>
            <h2 style={styles.headerContent} >Your room code is:
              <span className='header-content header-room-code'> {this.props.match.params.roomCode}</span>
            </h2>
          </div>
          <hr />
          <div style={styles.content} className='content'>
            {this.state.users == null || !this.state.users.length ? 'There are currently no users' : (
              <div  className='room-names-grid box-room'>
                {this.state.users.map((element, i) => {
                    if(element.firstname !== null) {
                      return(<p className='box-room-names-cell'>{element.firstname} {element.lastname !== 'empty' && element.lastname}</p>)
                    }
                    else
                      return null;
                })}
              </div>
            )}
            <br/>
            {users.length > 0 &&
              <CSVLink data={this.state.users} style={{color: 'white'}} filename={"SignMeIn.csv"}  target="_self" headers={headers}>
                <button style={{width: '50%'}}>
                  Export
                </button>
              </CSVLink>
            }
          </div>
        </div>
    );
  }
}
