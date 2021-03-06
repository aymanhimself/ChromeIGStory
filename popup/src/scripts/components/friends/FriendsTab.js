import React, {Component} from 'react';
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
// import RefreshIndicator from '@material-ui/core/RefreshIndicator';
import LiveFriendVideoReplaysList from './LiveFriendVideoReplaysList';
import LiveFriendVideosList from './LiveFriendVideosList';
import FriendStoriesList from './FriendStoriesList';
import $ from 'jquery';

import {TAB_CONTAINER_HEIGHT, TAB_BACKGROUND_COLOR_WHITE} from '../../../../../utils/Constants';

class FriendsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullPopup: false
    }
  }

  render() {
    const styles = {
      container: {
        background: TAB_BACKGROUND_COLOR_WHITE,
        minHeight: (this.props.isFullPopup) ?  $(window).height() - 112 : TAB_CONTAINER_HEIGHT + 'px',
        overflowX: 'hidden',
        overflowY: 'auto',
        height: (this.props.isFullPopup) ?  $(window).height() - 112 : TAB_CONTAINER_HEIGHT + 'px',
      },
      refreshIndicator: {
        position: 'relative',
        margin: '0 auto'
      },
    };
    
    if(this.props.isLoading && this.props.friendStories.tray.length == 0) {
      return (
        <div style={styles.container}>
          <CircularProgress className="center-div" size={60}/>
        </div>
      );
    }
    return (
      <div style={styles.container}>
        {/*this.props.isLoading && this.props.friendStories.tray.length > 0 && 
          <RefreshIndicator
            size={40}
            left={10}
            top={0}
            status="loading"
            style={styles.refreshIndicator}/>
        */}
        
        <LiveFriendVideosList friendStories={this.props.friendStories}/>

        {this.props.friendStories.post_live && 
          <LiveFriendVideoReplaysList friendStories={this.props.friendStories}/>
        }

        <FriendStoriesList friendStories={this.props.friendStories}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    friendStories: state.stories.friendStories,
    currentStoryItem: state.popup.currentStoryItem,
    isFullPopup: state.popup.isFullPopup
  };
};

export default connect(mapStateToProps)(FriendsTab);
