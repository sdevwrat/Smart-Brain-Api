const handleRegister=(req,res,db,bcrypt) => {
	const { email,name,password }= req.body;
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password,salt);
	db.transaction(trx =>{
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(Email => {
			return trx('users')
			.returning('*')
			.insert({
				email: Email[0],
				name: name,
				joined: new Date()
			})
			.then(user => {
				res.json(user[0]);
			})		
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err =>res.status(400).json('Exist'))
}

module.exports = {
	handleRegister:handleRegister
} 