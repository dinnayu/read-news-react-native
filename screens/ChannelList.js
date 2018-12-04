import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, FlatList,Alert, ActivityIndicator, TouchableOpacity, WebView} from 'react-native';

/**
  This class will render all of news channel list
  User will open the webview if user press on one of the news source
*/
export default class ChannelList extends Component {

	/**
	    This static value is used for set the header title
	  */
	static navigationOptions = ({ navigation }) => {
    return {
      title: "CHANNEL LIST: " + navigation.state.params.data.name,
    };
  };

	constructor(props){
		super(props)
		this.state = {
      		data: null
    	};
	}

	/**
    This methode is invoked before mounting occurs
  */
	componentWillMount(){
		this.getData()
	}

	render(){
		if (this.state.data === null){
			return(<View style={styles.spinnerContainer}>
			        <ActivityIndicator/>
			      </View>)
		} else {
			return (
			<View style={styles.container}>
		        <FlatList
		        style={{paddingLeft: 10, paddingRight: 10}}
		          keyExtractor={(item, index) => index.toString()}
		          data={this.state.data.articles}
		          renderItem={({item}) => this.flatListRenderedComponent(item) }
        		/>
        	</View>
      );
		}
	}

	/**
	    This method returns an object that represents each rows of list
	  */
	flatListRenderedComponent(item){
	    return (<TouchableOpacity
	    style={styles.channelList}
	    onPress={() => this.onPressChannel(item)}
	    >
	    	<View style={styles.channelRow}>
	    		{this.getImage(item.urlToImage)}
		        <View style={styles.channelTextWrapper}>
		        	<Text style={styles.channelTextTitle}>{item.title}</Text>
		        	<Text style={styles.channelTextDesc} numberOfLines={4}>{item.description}</Text>
		        </View>
	    	</View>
	    </TouchableOpacity>)
	}
	
	/**
	 * Return image from url
	 * @param {image url} url 
	 */
	getImage(url){
		if (url){
			return 	<Image
								style={styles.channelImage}
								resizeMode='center'
								source={{uri: url}}/>
		} else {
			return <Image
								style={styles.channelImage}
								resizeMode='center'
								source={require('../assets/images/picture.png')}/>
		}
	}

  /**
    To call webservice and set response to state object
  */
  getData() {
	fetch("https://newsapi.org/v2/everything?q=" + this.props.navigation.state.params.data.id +"&apiKey=52f671ebb90b4a6eb497074b36053698")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({data:responseJson})
      })
      .catch((error) =>{
        Alert.alert(
          'Sorry there is a problem with your request. Please try again',
          '',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => this.reloadData()},
          ],
          { cancelable: false }
        )
      })
  }

  /**
  	Triggered when user press one of channel list
  */
  onPressChannel(item){
  	this.props.navigation.navigate('WebView', {url: item.url})
  }

  /**
  	This method is used to reset data and reload
  */
  reloadData(){
    this.setState({data: null})
    this.getData()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 10
  },
  spinnerContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  channelList: {
  	paddingLeft: 8,
  	paddingTop: 3,
  	paddingBottom: 3,
  	flex:1
  },
  channelRow:{
  	flex: 1,
  	flexDirection: 'row',
  	flexWrap: 'wrap'
  },
  channelImage: {
  	flex: 0.2,
  	width: 60,
  	height: 60,
  	alignSelf: 'center'
  },
  channelTextWrapper:{
  	flex: 0.8,
  	marginLeft: 8,
  	flexDirection: 'column'
  },
  channelTextTitle: {
  	fontSize: 12,
  	fontWeight: 'bold'
  },
  channelTextDesc: {
  	fontSize: 10
  }
});