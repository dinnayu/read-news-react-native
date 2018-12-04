import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';

/**
  This class will render all of news source list
  User will navigate to channel list page if user press on one of the news source
*/
export default class SourceList extends Component {
  /**
    This static value is used for set the header title
  */
  static navigationOptions = ({ navigation }) => {
    return {
      title: "SOURCE LIST",
    };
  };

  constructor() {
    super();
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

  render() {
    if (this.state.data !== null) {
      return (
        <View style={styles.container}>
        <Text style={styles.selectChannel}>Please select your channel:</Text>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.data.sources}
            renderItem={({item}) => this.flatListRenderedComponent(item) }
          />
        </View>
      );
    } else {
      return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator/>
      </View>
      )
    }
  }

  /**
    This method returns an object that represents each rows of list
  */
  flatListRenderedComponent(item){
    return (<TouchableOpacity
    style={styles.sourceList}
      onPress={() =>
        this.goToChannelList(item)}
    >
        <Text>{item.name}</Text>
    </TouchableOpacity>)
  }

  /**
    To call webservice and set response to state object
  */
  getData() {
    fetch("https://newsapi.org/v2/sources?apiKey=52f671ebb90b4a6eb497074b36053698")
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
    This method is used to reset data and will reload page to get new data
  */
  reloadData(){
    this.setState({data: null})
    this.getData()
  }

  /**
    Will navigate to Channel List page
  */
  goToChannelList(item){
    this.props.navigation.navigate('ChannelList', {data: item})
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
  sourceList: {
    justifyContent: 'center'
  },
  selectChannel: {
    fontWeight: 'bold',
    fontSize: 14
  }
});