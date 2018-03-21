import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {signup} from '../../actions/users'
import SignupForm from './SignupForm'
import {Redirect, Link} from 'react-router-dom'

class SignupPage extends PureComponent {
	handleSubmit = (data) => {
		this.props.postSignup(data.email, data.password)
	}

	render() {
		if (this.props.signup.success) return (
			<Redirect to="/" />
		)

		return (
			<div>
				<h1>Sign up</h1>

				<SignupForm onSubmit={this.handleSubmit} />
				<p style={{color:'red'}}>{ this.props.signup.error }</p>

				<div> <p>If you already have an account please login</p> <Link to="login"><button>Login</button></Link></div>
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		signup: state.signup
	}
}

export default connect(mapStateToProps, {postSignup: signup})(SignupPage)
