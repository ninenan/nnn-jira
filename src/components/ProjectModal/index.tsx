import { Drawer, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListActions,
  selectProjectModalVisible,
} from "@/views/projectList/store";

const ProjectModal = () => {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalVisible);

  return (
    <Drawer
      open={projectModalOpen}
      width={"100%"}
      onClose={() => dispatch(projectListActions.closeProjectModal())}
    >
      <h1>project modal</h1>
      <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>
        close
      </Button>
    </Drawer>
  );
};

export default ProjectModal;
