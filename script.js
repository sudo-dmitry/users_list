const profile = {
		firstName: 'Игнат',
		middleName: 'Вазелинович',
		lastName: 'Разрабов',
		dob: '21/03/1976',
		pob: 'Сыктывкар',
		email: 'ignat.razrabov@gmail.com',
		phone: '+7 (777) 777-77-77',
		registered: '17/08/2020',
		visited: '17/08/2020'
};

const showProfile = document.getElementById('profileDisplay').innerHTML = `
	<td>${profile.lastName} ${profile.firstName[0]}.${profile.middleName[0]}.</td>
	<td>${profile.dob}</td>
	<td>${profile.pob}</td>
	<td>${profile.email}</td>
	<td>${profile.phone}</td>
	<td>${profile.registered}</td>
	<td>${profile.visited}</td>
	<td><i class="small material-icons btn-edit">edit</i></td>
	<td><i class="small material-icons btn-delete">delete_forever</i></td>
`;