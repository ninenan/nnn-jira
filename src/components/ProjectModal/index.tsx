import React, { PropsWithChildren, FC } from "react";
import { Drawer, Button } from "antd";

interface IProps {
  isShowProjectModal: boolean;
  onClose: () => void;
}

const ProjectModal: FC<IProps> = (props) => {
  const { isShowProjectModal, onClose } = props;

  return (
    <Drawer open={isShowProjectModal} width={"100%"} onClose={onClose}>
      <h1>project modal</h1>
      <Button onClick={onClose}>close</Button>
    </Drawer>
  );
};

export default ProjectModal;
