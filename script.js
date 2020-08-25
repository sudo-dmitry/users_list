$(function(){
	$.getJSON('api/users.json', function(data){
		console.log('success');
		$.each(data.users, function(i, user){
			$('tbody').append(
				`
				<tr>
					<td>${user.lastName} ${user.firstName[0]}. ${user.middleName[0]}.</td>
					<td>${user.dob}</td>
					<td>${user.pob}</td>
					<td>${user.email}</td>
					<td>${user.phone}</td>
					<td>${user.registered}</td>
					<td>${user.visited}</td>
					<td><i class="small material-icons btn-edit">edit</i></td>
					<td><i class="small material-icons btn-delete">delete_forever</i></td>
				</tr>
				`
				);
		});
	}).error(function(){
		console.log('error');
	});
});
