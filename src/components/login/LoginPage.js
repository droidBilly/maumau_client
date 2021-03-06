import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/users";
import LoginForm from "./LoginForm";
import { Redirect, Link } from "react-router-dom";
import Button from "material-ui/Button";

class LoginPage extends PureComponent {
  handleSubmit = data => {
    this.props.login(data.email, data.password);
  };

  render() {
    if (this.props.currentUser) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login</h1>

        <LoginForm onSubmit={this.handleSubmit} />

        {this.props.error && (
          <span style={{ color: "red" }}>{this.props.error}</span>
        )}
        <div> <p>If you are not register yet please SignUp</p> <Link to="signup"><Button style={{backgroundColor: "#B22222"}} color="primary"  variant="raised"  type="submit">Sign In</Button></Link></div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    currentUser: state.currentUser,
    error: state.login.error
  };
};

export default connect(mapStateToProps, { login })(LoginPage);
