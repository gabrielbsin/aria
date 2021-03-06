import React from 'react';
import Axios from 'axios';
import Config from '../../Config';
import ReCAPTCHA from 'react-google-recaptcha';

class Join extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: []
        };
    }

    register(event) {
        event.preventDefault();
        var form = new FormData(this.refs.form);
        Axios.post('join', form).then((response) => {
            if (response.data.success) {
                this.props.openPopup("You're nearly there!", "If you wish to log in on " + Config.server_name +  " or the " + Config.server_name +  " Community Forums you must first verify your account. A verification link has been sent to your e-mail adress. Please note that in some cases the email may be marked as spam.");
                this.props.close();
            } else {
                this.setState({error: response.data.error});
				console.log(response.data.error);
            }
        }).catch(error => {
                this.props.openPopup("An unknown error has occured. Please refresh the page and try again.");
                this.props.close();
		});
    }

    recaptchaOnChange(value) {
        console.log("Captcha value:", value);
    }

    render() {
        if (!this.props.open) {
            this.state = {
                error: []
            };
            return null;
        }

        if (this.state.error.length) {
            var alert = (
                <div className="alert">{this.state.error}</div>
            );
        }

        return (
            <div className="join">
                <form onSubmit={this.register.bind(this)} ref="form">
                    <div className="prompt-close" onClick={this.props.close}>&#10006;</div>
                    <div className="prompt-title">Join {Config.server_name}</div>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input className="text" name="name" type="text" />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input className="text" name="email" type="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input className="password" name="password" type="password" />
                    </div>
                    <div>
                        <label htmlFor="confirm">Confirm Password</label>
                        <input className="confirm" name="password_confirmation" type="password" />
                    </div>
					<div>
                        <label htmlFor="birthday">Date of birth</label>
                        <input className="birthday" name="birthday" type="date" />
                    </div>
					<div>
                        <label htmlFor="gender">Sex</label>
                        <select className="gender" name="gender">
						  <option value="male">Male</option>
						  <option value="female">Female</option>
						  <option value="undefined">Special</option>
						</select>
                    </div>
                    <div className="repatcha-container">
                        <ReCAPTCHA className="recaptcha" ref="recaptcha" sitekey={Config.recaptcha_key} />
                    </div>
                    {alert}
                    <div>
                        <input className="button" type="submit" value="Join" />
                    </div>
                </form>
            </div>
        );
    }
}

export default Join;
