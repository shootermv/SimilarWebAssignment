import * as React from 'react';
import { Card, List, Input, Button } from 'semantic-ui-react';
import {/*SortableContainer, SortableElement,*/ arrayMove } from 'react-sortable-hoc';
import IVideo from "./interfaces";
import { Utils } from "./utils/utils";

interface VideosCardProps extends React.HTMLProps<HTMLDivElement> {
  videos: IVideo[];
  tag?: string;
  onTagAdded(e: any): void;
  onVideoRemoved(e: any, idx: number): void;
}
interface State {
  videos: IVideo[];
  textInput: string;
}
export default class VideosCard extends React.Component<VideosCardProps, State> {
  public state: any;
  public inpt: any;
  constructor(props: VideosCardProps) {
    super(props);
    this.state = { textInput: '', videos: props.videos };
  }
  componentWillReceiveProps(nextProps: any) {
    this.setState({ videos: nextProps.videos });
  }

  onSortEnd = ({ oldIndex, newIndex }: any) => {
    this.setState({
      videos: arrayMove(this.state.videos, oldIndex, newIndex),
    } as State);
  }

  handleKeyDown(e: any) {
    if (e.keyCode === 13) { // Enter key
      this.addVideo(null);
    }
  }
  handleChange(e: any) {
    const { value } = e.target;
    this.setState({ textInput: value });
  }
  addVideo(e: any) {
    if (!Utils.Validate(this.inpt.value, this.state.videos)) { return; }
    this.inpt.value = '';
    this.props.onTagAdded({ fieldValue: this.state.textInput, title: this.state.textInput });
  }
  removeVideo(e: any, idx: number) {
    this.props.onVideoRemoved(e, idx);
  }
  render() {
    const { videos } = this.state;

    return (
      <Card>
        <Card.Content>
          <Card.Header style={{ display: 'flex' }}>
            <Input placeholder="place here url of video..."
              name="textInput" onChange={(e) => this.handleChange(e)} onKeyDown={(e: any) => this.handleKeyDown(e)}>
              <input ref={(inpt) => this.inpt = inpt} />
            </Input>
            <Button icon="plus" onClick={(e) => this.addVideo(e)} style={{ margin: '0 0 0 5px' }} />
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <List>
            {videos.map((video: any, idx: number) => {
              const isActive = video.fieldValue === this.props.tag;
              const activeStyle = {
                color: 'blue',
                fontWeight: '700',
              };
              return (
                <List.Item as="span" key={video.fieldValue}>
                  <List.Icon name="remove" onClick={(e: any) => this.removeVideo(e, idx)} />
                  <List.Content style={isActive ? activeStyle : null} >
                    {video.title} {video.duration}
                  </List.Content>
                </List.Item>
              );
            })}
          </List>
        </Card.Content>
      </Card>
    );
  }
}
