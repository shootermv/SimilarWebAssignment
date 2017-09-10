import { shallow } from "enzyme";
import "jest";
import * as React from "react";
import VideosCard from "./VideosCard";
import IVideo from "./interfaces";
import { List } from "semantic-ui-react";


describe("VideosCard component", () => {


  it("should list all the tags", () => {
    const tags = [
      { fieldValue: 'tag01', title: 'Curse Of Black Pearl', duration: 1 },
      { fieldValue: 'tag02', title: 'Sleepy Hollow', duration: 2 },
      { fieldValue: 'tag03', title: 'Eduward Scissorhands', duration: 16 },
    ] as IVideo[];

    const wrapper = shallow(<VideosCard
      videos={tags} tag={tags[0].fieldValue}
      onTagAdded={() => console.log("")}
      onVideoRemoved={() => console.log("")}
      onSortEnded={() => console.log("")} />);

    expect(wrapper.find(List.Item)).toHaveLength(3);
  });

  it("should have on tag active", () => {
    const tags = [
      { fieldValue: 'tag01', title: 'Curse Of Black Pearl', duration: 1 },
      { fieldValue: 'tag02', title: 'Sleepy Hollow', duration: 2 },
      { fieldValue: 'tag03', title: 'Eduward Scissorhands', duration: 16 },
    ] as IVideo[];

    const wrapper = shallow(<VideosCard
      videos={tags} tag={tags[0].fieldValue}
      onTagAdded={() => console.log("")}
      onVideoRemoved={() => console.log("")}
      onSortEnded={() => console.log("")} />);

    expect(wrapper).toMatchSnapshot();
  });
});
