import React, {Component} from 'react';
import { WebView, ActivityIndicator, View } from 'react-native';

export default class WebViewScreen extends Component {

	constructor(props){
		super(props)
		this.state = {isLoading : true}
	}

	render(){
		return ( <View>
			{this.state.isLoading ? <ActivityIndicator /> : null}
					<WebView
						onLoadEnd={this._onLoadEnd.bind(this)}
				  		source={{uri: this.props.navigation.state.params.url}}/>
				</View>
			)
	}

	_onLoadEnd() {
		this.setState({ isLoading: false });
	}
}