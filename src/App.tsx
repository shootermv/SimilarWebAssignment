import * as React from 'react';
import './App.css';

import YouTube from "react-youtube";
import { Utils } from "./utils/utils";
import PlayerTitle from "./PlayerTitle";
import VideosCard from "./VideosCard";
import { Grid, Container, Segment, Card } from "semantic-ui-react";
import IVideo from "./interfaces";

interface State {
  videos: IVideo[];
  player: any;
  currentVideo?: IVideo;
}
class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentVideo: undefined,
      player: null,
      videos: [],
    };
  }
  addTag(e: IVideo) {
    Utils.getVidInfo(e).then((vid) => {
      this.setState({ videos: this.state.videos.concat(vid) });
      if (!this.state.currentVideo) {
        this.setState({ currentVideo: vid });
      }
    });
  }

  removeVideo(idx: number) {
    if (this.state.currentVideo && this.state.videos.indexOf(this.state.currentVideo) === idx) {
      this.state.videos.splice(idx, 1);
      this.setState({ currentVideo: undefined, videos: this.state.videos });
    } else {
      this.state.videos.splice(idx, 1);
      this.setState({ videos: this.state.videos });
    }

  }
  onEnd(event: any) {
    const vids = this.state.videos.slice(1); // remove the first(the upper) one
    const curr = vids[0];

    this.setState({
      currentVideo: curr,
      videos: vids,
    });
    if (!vids.length) { return; }
    setTimeout(() => this.state.player.playVideo(), 100);
  }
  onSortEnded(vids: IVideo[]) {
    this.setState({
      currentVideo: vids[0],
      videos: vids,
    });
  }
  onReady(event: any) {
    this.setState({
      player: event.target,
    });
  }

  renderPlayer(currentVideo?: IVideo) {
    const opts = {
      height: "390",
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
      width: "570",
    };
    if (!currentVideo) {
      return "No videos yet";
    }

    return (
      <YouTube
        videoId={currentVideo.fieldValue.split("=")[1]}
        opts={opts}
        onEnd={(e: any) => this.onEnd(e)}
        onReady={(e: any) => this.onReady(e)}
      />
    );
  }

  render() {
    const videos = this.state.videos;
    return (
      <Container>
        <PlayerTitle />
        {/* Content */}
        <Segment vertical>
          <Grid padded style={{ justifyContent: "space-around" }}>
            <div>
              <VideosCard
                videos={videos}
                tag={this.state.currentVideo && this.state.currentVideo.fieldValue}
                onTagAdded={(e) => this.addTag(e)}
                onSortEnded={(e) => this.onSortEnded(e)}
                onVideoRemoved={(e, idx) => this.removeVideo(idx)} />
            </div>
            <div style={{ width: 600 }}>
              <Card fluid style={{ width: 600 }}>
                <Card.Content>
                  <Card.Header>
                    {this.state.currentVideo && this.state.currentVideo.title}
                  </Card.Header>
                  <Card.Description>
                    {this.renderPlayer(this.state.currentVideo)}
                  </Card.Description>
                </Card.Content>
              </Card>
            </div>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

export default App;
