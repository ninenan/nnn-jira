import { Drawer, Button } from "antd";
import { useProjectModal } from "@/views/projectList/hooks/useProject";

const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();

  return (
    <Drawer open={projectModalOpen} width={"100%"} onClose={close}>
      <h1>project modal</h1>
      <Button onClick={close}>close</Button>
    </Drawer>
  );
};

export default ProjectModal;
