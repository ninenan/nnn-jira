import { Drawer, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  projecListActions,
  selectProjectModalVisible,
} from "@/views/projectList/store";

const ProjectModal = () => {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalVisible);

  return (
    <Drawer
      open={projectModalOpen}
      width={"100%"}
      onClose={() => dispatch(projecListActions.closeProjectModal())}
    >
      <h1>project modal</h1>
      <Button onClick={() => dispatch(projecListActions.closeProjectModal())}>
        close
      </Button>
    </Drawer>
  );
};

export default ProjectModal;
