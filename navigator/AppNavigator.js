import { createStackNavigator } from 'react-navigation';
import SourceList from '../screens/SourceList';
import ChannelList from '../screens/ChannelList';
import WebViewScreen from '../screens/WebViewScreen';

const AppNavigator = createStackNavigator({
    SourceList: { screen: SourceList },
    ChannelList: { screen: ChannelList},
    WebView: { screen: WebViewScreen}
});

export default AppNavigator;