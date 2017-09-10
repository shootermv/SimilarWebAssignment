import * as React from 'react';
import { Card, List, Input, Button } from 'semantic-ui-react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import IVideo from "./interfaces";
import { Utils } from "./utils/utils";


interface VideosCardProps extends React.HTMLProps<HTMLDivElement> {
  videos: IVideo[];
  tag?: string;
  onTagAdded(e: IVideo): void;
  onVideoRemoved(e: any, idx: number): void;
  onSortEnded(e: IVideo[]): void;
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
    this.props.onSortEnded(this.state.videos);
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
  removeVideo(idx: number) {
    console.log('IDX', idx)
    this.props.onVideoRemoved({}, idx);
  }
  shouldCancelStart(e: any) {
    // Prevent sorting from being triggered if target is input or button
    if (e.target.tagName === 'I') {
      return true; // Return true to cancel sorting
    }
    return false;
  }
  renderSortableList(videos: IVideo[]) {
    const SortableItem = SortableElement(({ index, value, onRemove }: any) => {
      const isActive = value.fieldValue === this.props.tag;
      const activeStyle = {
        color: 'blue',
        fontWeight: '700',
      };
      return (
        <List.Item as="span" key={value.fieldValue}>
          <List.Icon name="remove" onClick={(e: any) => onRemove(index)} />
          <List.Content style={isActive ? activeStyle : null} >
            {value.title} {value.duration}
          </List.Content>
        </List.Item>);
    });
    const SortableList = SortableContainer(({ items, onSortEnd, onRemove }: any) => {
      return (
        <List>
          {items.map((value: any, index: number) => (
            <SortableItem key={`item-${index}`} index={index} value={value} onRemove={(idx: number) => onRemove(index)} />
          ))}
        </List>
      );
    });
    return (<SortableList items={videos} onSortEnd={this.onSortEnd} onRemove={(index: number) => this.removeVideo(index)} shouldCancelStart={this.shouldCancelStart} />)
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
          {this.renderSortableList(videos)}
        </Card.Content>
      </Card>
    );
  }
}
