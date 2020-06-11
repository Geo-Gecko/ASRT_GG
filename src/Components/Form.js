import React from "react";
import emailjs from "emailjs-com";
class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      reply_to: "",
      from_name: "",
      message_html: "",
      open: true,
    };
  }
  render() {
    return (
      <form
        id="contact-form"
        onSubmit={this.handleSubmit.bind(this)}
        method="POST"
      >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            name="from_name"
            value={this.state.from_name}
            onChange={this.onNameChange.bind(this)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            value={this.state.reply_to}
            onChange={this.onEmailChange.bind(this)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Feedback</label>
          <textarea
            className="form-control"
            rows="5"
            name="message_html"
            value={this.state.message_html}
            onChange={this.onMessageChange.bind(this)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }

  onNameChange(event) {
    this.setState({ from_name: event.target.value });
  }

  onEmailChange(event) {
    this.setState({ reply_to: event.target.value });
  }

  onMessageChange(event) {
    this.setState({ message_html: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let service_id = "default_service";
    let template_id = "tacofeedback";
    let user_id = "user_tDJDGDhY36xUilJYVFzi4";
   const mailformat= "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+[A-Za-z]{2,6}";
    if (
      this.state.reply_to.match(mailformat) &&
      this.state.message_html !== "" &&
      this.state.from_name !== ""
    ) {
      emailjs.send(service_id, template_id, this.state, user_id).then(
        (response) => {
          alert("Sent!");
          return true;
        },
        (err) => {
          alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
          return false;
        }
      );
      this.setState({
        reply_to: "",
        from_name: "",
        message_html: "",
        open: false,
      });
    } else {
      alert("Please provide your right credentials");
      return false;
    }
  }
}
export default Form;
