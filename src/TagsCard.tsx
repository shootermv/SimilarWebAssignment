import * as React from "react";
import { Card, List, Input, Button } from "semantic-ui-react";


interface TagsCardProps extends React.HTMLProps<HTMLDivElement> {
  tags: any[];
  tag?: string;
  onTagAdded(e: any): void;
  onVideoRemoved(e: any, idx: number): void;
}

export default class TagsCard extends React.Component<TagsCardProps, any> {
  public state: any;
  public inpt: any;
  constructor(props: TagsCardProps) {
    super(props);
    this.state = { textInput: "" };
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
    if (this.inpt.value.indexOf("www.youtube.com/watch?v=") === -1) {
      return;
    } // not valid string
    if (this.props.tags.filter((t) => this.inpt.value === t.fieldValue).length) {
      return;
    } // same video again    
    this.inpt.value = "";
    this.props.onTagAdded({ fieldValue: this.state.textInput, title: this.state.textInput });
  }
  removeVideo(e: any, idx: number) {
    this.props.onVideoRemoved(e, idx);
  }
  render() {
    const tags = this.props.tags;

    return (
      <Card>
        <Card.Content>
          <Card.Header style={{ display: "flex" }}>
            <Input placeholder="place here url of video..."
              name="textInput" onChange={(e) => this.handleChange(e)} onKeyDown={(e: any) => this.handleKeyDown(e)}>
              <input ref={(inpt) => this.inpt = inpt} />
            </Input>
            <Button icon="plus" onClick={(e) => this.addVideo(e)} style={{ margin: '0 0 0 5px' }} />
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <List>
            {tags.map((tag, idx) => {
              const isActive = tag.fieldValue === this.props.tag;
              const activeStyle = {
                color: "blue",
                fontWeight: "700",
              };
              return (
                <List.Item as="span" key={tag.fieldValue}>
                  <List.Icon name="remove" onClick={(e: any) => this.removeVideo(e, idx)} />
                  <List.Content style={isActive ? activeStyle : null} >
                    {tag.title} {tag.duration}
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
