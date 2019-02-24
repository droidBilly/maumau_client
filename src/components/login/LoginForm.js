import React, { PureComponent } from "react";
import Button from "material-ui/Button";
import "../styles/SignupForm.css";

export default class LoginForm extends PureComponent {
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="align">
        <div className="grid align__item">
          <div className="register">
            <form className="form" onSubmit={this.handleSubmit}>
              <div className="form__field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={this.state.email || ""}
                  onChange={this.handleChange}
                />
              </div>

              <div className="form__field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={this.state.password || ""}
                  onChange={this.handleChange}
                />
              </div>

              <Button style={{backgroundColor: "#B22222"}} className="button" color="primary" variant="raised" type="submit">
                Log In
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
