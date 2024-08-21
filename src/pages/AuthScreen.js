import React,{useState} from 'react'

const AuthScreen = () => {
	const [fullName,setFullName] = useState('')
	const [email,setEmail] = useState('')
	const [password,setPassword] = useState('')
	const [confirmPassword,setConfirmPassword] = useState('')

	return (
	<div class="auth-screen">

    <div class="main">  	
		<input type="checkbox" id="chk" aria-hidden="true"/>

			<div class="signup">
				<form>
					<label for="chk" aria-hidden="true">Register</label>
					<input type="text" name={fullName} value={fullName} placeholder="Full name" required=""/>
					<input type="email" name={email} value={email} placeholder="Email" required=""/>
                    <input type="password" name={password} value={password} placeholder="Password" required=""/>
					<input type="password" name={confirmPassword} value={confirmPassword} placeholder="Confirm Password" required=""/>
					<button class="auth-button">Sign up</button>
				</form>
			</div>

			<div class="login">
				<form>
					<label for="chk" aria-hidden="true">Login</label>
					<input type="email" name={email} value={email} placeholder="Email" required=""/>
					<input type="password" name={password} value={password} placeholder="Password" required=""/>
					<button class="auth-button">Login</button>
				</form>
			</div>
	</div>
	</div>

  )
}

export default AuthScreen