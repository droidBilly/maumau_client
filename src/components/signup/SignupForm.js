import React, { PureComponent } from "react";
import Button from 'material-ui/Button'
import "../styles/SignupForm.css"

export default class SignupForm extends PureComponent {
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
            placeholder="example@example.com"
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
            placeholder="••••••••••••"
            value={this.state.password || ""}
            onChange={this.handleChange}
          />
        </div>

        <div className="form__field">

          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="••••••••••••"
            value={this.state.confirmPassword || ""}
            onChange={this.handleChange}
          />
        </div>

        {this.state.password &&
          this.state.confirmPassword &&
          this.state.password !== this.state.confirmPassword && (
            <p style={{ color: "red" }}>The passwords do not match!</p>
          )}

        <Button className="button" color="primary"  variant="raised"  type="submit">Sign up</Button>
      </form>
      </div>
      </div>
      </div>
    );
  }
}
