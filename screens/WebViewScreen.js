import React, {Component} from 'react';
import { WebView, Alert } from 'react-native';

export default class WebViewScreen extends Component {

	constructor(props){
		super(props)
	}

	render(){
		return (
				<WebView
					source={{uri: this.props.navigation.state.params.url}}
					/>
			)
	}
}