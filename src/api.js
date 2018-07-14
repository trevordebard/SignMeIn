import {api_url} from './consts';

const fetch = require('node-fetch');
const url = api_url;

export function createRoom(roomId, uuid, phone, email) {
  return fetch(`${url}/createRoom/${roomId}/${uuid}/true/${phone}/${email}`)
    .then(res => res.json())
    .then(data => (data))
    .catch(error => ('There was a problem processing your request'));
}

export function didCreateRoom(roomId, uuid) {
  return fetch(`${url}/didCreateRoom/${roomId}/${uuid}`)
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(error => ('There was a problem processing your request'));
}
export function doesRoomExist(roomId) {
  return fetch(`${url}/doesRoomExist/${roomId}`)
    .then(res => res.json())
    .then(data => (data))
    .catch(error => ('There was a problem processing your request'));
}

export function addUser(roomId, name) {
  return fetch(`${url}/addUser/${roomId}/${name}`)
    .then(res => res.json())
    .then(data => data)
    .catch(error => error);
}

export function getUsers(roomId) {
  return fetch(`${url}/getUsers/${roomId}`)
    .then(res => res.json())
    .then(data => data)
    .catch(error => error);
}
