import { shallow } from "enzyme";
import "jest";
import * as React from "react";
import TagsCard from "./TagsCard";

import { Card, List, Input, Button } from "semantic-ui-react";


describe("TagsCard component", () => {
  let LinkStub: any;

  beforeEach(() => {
    LinkStub = (props: LinkProps) =>
      <div>{props.children}</div>;
  });

  it("should list all the tags", () => {
    const tags = [
      { fieldValue: "tag01", totalCount: 2 },
      { fieldValue: "tag02", totalCount: 4 },
      { fieldValue: "tag03", totalCount: 6 },
    ] as any[];

    const wrapper = shallow(<TagsCard
      tags={tags} tag={tags[0]}
      onTagAdded={() => console.log("")}
      onVideoRemoved={() => console.log("")} />);

    expect(wrapper.find(List.Item)).toHaveLength(3);
  });

  it("should have on tag active", () => {
    const tags = [
      { fieldValue: "tag01", totalCount: 2 },
      { fieldValue: "tag02", totalCount: 4 },
      { fieldValue: "tag03", totalCount: 6 },
    ] as any[];

    const wrapper = shallow(<TagsCard
      tags={tags} tag={tags[0]}
      onTagAdded={() => console.log("")}
      onVideoRemoved={() => console.log("")} />);

    expect(wrapper).toMatchSnapshot();
  });
});
