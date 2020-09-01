$(function(){
	$.getJSON('api/users.json', function(data){
		$.each(data.users, function(i, user){
			$('tbody').append(
				`
				<tr id="user-${user.id}">
					<td>${user.lastName} ${user.firstName[0]}. ${user.middleName[0]}.</td>
					<td>${user.dob}</td>
					<td>${user.pob}</td>
					<td>${user.email}</td>
					<td>${user.phone}</td>
					<td>${user.registered}</td>
					<td>${user.visited}</td>
					<td><a href="#edit" class="modal-trigger" id="${user.id}"><i class="small material-icons btn-edit">edit</i></a></td>
					<td><a href="#delete" class="modal-trigger" data-id="${user.id}"><i class="small material-icons btn-delete">delete_forever</i></a></td>
				</tr>
				`
				);

			// Prefilled inputs when click (нужно как-то id обозначить)
			document.getElementById('editLastName').value = `${user.lastName}`;


		});
	}).error(function(){
		console.log('error');
	});
});

// Modal Call

$(document).ready(function(){
	$('.modal').modal();
	$('#delete').modal({
    onOpenStart: function(modal, trigger) {
        let userID = trigger.dataset.id;
        let deleteButton = document.getElementById('delete-user');
        deleteButton.addEventListener('click', function() {
        	const UI = new UI();
        	UI.deleteUser(userID);
        });
    }
	});
});

////////////////////////////////////////////////////////////////////////



class User {
	constructor(lastName, firstName, middleName, dob, pob, email, phone, registered, visited, id) {
		this.lastName = lastName;
		this.firstName = firstName;
		this.middleName = middleName;
		this.dob = dob;
		this.pob = pob;
		this.email = email;
		this.phone = phone;
		this.registered = registered;
		this.visited = visited;
		this.id = id;
	}
}

class UI {
	
	addUserToList(user) {
		const list = document.getElementById('user-list');
		const row = document.createElement('tr');
		row.setAttribute('id', `user-${user.id}`);
		row.innerHTML = `
			<td>${user.lastName} ${user.firstName[0]}. ${user.middleName[0]}.</td>
			<td>${user.dob}</td>
			<td>${user.pob}</td>
			<td>${user.email}</td>
			<td>${user.phone}</td>
			<td>${user.registered}</td>
			<td>${user.visited}</td>
			<td><a href="#edit" class="modal-trigger" id="${user.id}"><i class="small material-icons btn-edit">edit</i></a></td>
			<td><a href="#delete" class="modal-trigger" data-id="${user.id}"><i class="small material-icons btn-delete">delete_forever</i></a></td>
		`;

		list.appendChild(row);
	}

	clearFields() {
		document.getElementById('lastName').value = '';
		document.getElementById('firstName').value = '';
		document.getElementById('middleName').value = '';
		document.getElementById('dob').value = '';
		document.getElementById('pob').value = '';
		document.getElementById('email').value = '';
		document.getElementById('phone').value = '';
	}

	deleteUser(userID) {
		let userRow = document.getElementById(`user-${user.id}`);
		console.log(userRow);
	// 	if (userRow) {
	// 		userRow.remove();
	// 	}
	// 	let users = storage.getItem('users');
	 }
}

//Local Storage Class
class Store {
	static getUsers() {
		let users;
		if(localStorage.getItem('users') === null) {
			users = [];
		} else {
			users = JSON.parse(localStorage.getItem('users'));
		}

		return users;
	}

	static displayUsers() {
		const users = Store.getUsers();

		users.forEach(function(user){
			const ui = new UI();

			// Add user to UI
			ui.addUserToList(user);
		});
	}

	static addUser(user) {
		const users = Store.getUsers();

		users.push(user);

		localStorage.setItem('users', JSON.stringify(users));
	}
}


// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayUsers);


// Event Listener for add user
document.getElementById('add').addEventListener('submit', function(e){
	
	// Date шаманство
	const date = new Date();
	const dd = String(date.getDate()).padStart(2, '0');
	const mm = String(date.getMonth() + 1).padStart(2, '0');
	const yyyy = date.getFullYear();
	const today = dd + '/' + mm + '/' + yyyy;

	// Get form values
	const lastName = document.getElementById('lastName').value,
				firstName = document.getElementById('firstName').value,
				middleName = document.getElementById('middleName').value,
				dob = document.getElementById('dob').value,
				pob = document.getElementById('pob').value,
				email = document.getElementById('email').value,
				phone = document.getElementById('phone').value,
				registered = today,
				visited = 'нужно сделать';
				id = Math.floor(Math.random() * 10000);

	// Instantiate user
	const user = new User(lastName, firstName, middleName, dob, pob, email, phone, registered, visited, id);

	// Instantiate UI
	const ui = new UI();

	console.log(ui);

	// Validate
	if(lastName === '' || firstName === '' || middleName === '' || dob === '' || pob === '' || email === '' || phone === '') {
		// Error alert
		M.toast({html: 'Заполните ВСЕ поля!', classes: 'red'});
		$('.add').modal('open');

	} else {
		// Success alert
		M.toast({html: 'Пользователь добавлен', classes: 'green'});

		// Add user to list
		ui.addUserToList(user);

		// Add to LS
		Store.addUser(user);

		// Clear fields
		ui.clearFields();
	}

	e.preventDefault();
});