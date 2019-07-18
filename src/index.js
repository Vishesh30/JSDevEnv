import './index.css'
import numeral from 'numeral';
import {getUsers} from './api/userApi';

const value = numeral(1000).format('$0, 0.00');
console.log("I would love to get" + value + "for this setup of DevEnv"); // eslint-disable-line no-console

getUsers().then(result => {
  let usersBody = "";

  result.forEach(user => {
    usersBody+= `<tr>
      <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
      <td>${user.id}</td>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
      </tr>`
  });

  global.document.getElementById('users').innerHTML = usersBody;
});
