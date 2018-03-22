import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {getUsers} from '../../actions/users'




class UserInfo extends PureComponent {
  componentWillMount() {
   this.props.getUsers()
   }

  render() {
    return (
      <div>
      {console.log(this.props.users.firsName)}
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    user: state.currentUser,
    users: state.users
};
}


export default connect(mapStateToProps, {getUsers})(UserInfo);
