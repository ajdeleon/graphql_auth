import React, { Component } from 'react'
import AuthForm from './AuthForm'
import mutation from '../mutations/Signup'
import { graphql } from 'react-apollo'
import query from '../queries/CurrentUser'
import { hashHistory } from 'react-router'

class SignupForm extends Component {
  constructor(props) {
    super()

    this.state = { errors: []}
  }

  componentWillUpdate(nextProps) {
    console.log(this.props, nextProps)
    if (!this.props.data.user && nextProps.data.user) {
      //if user was null and now it is not null, redirect to dashboard
      hashHistory.push('/dashboard')
    }
  }

  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query }]
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message)
      this.setState({ errors })
    })
  }

  render() {
    return (
      <div>
        <h3>Signup</h3>
        <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)}/>
      </div>
    )
  }
}

export default graphql(query)(graphql(mutation)(SignupForm))