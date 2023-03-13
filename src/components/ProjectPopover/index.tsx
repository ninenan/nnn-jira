import ButtonProject from "@components/Base/ButtonProject";
import { Popover, Typography, List } from "antd";
import { useProjects } from "@views/projectList/hooks/useProject";
import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { projecListActions } from "@views/projectList/store";

const ProjectPopver = () => {
  const dispatch = useDispatch();
  const { Paragraph } = Typography;
  const { data: projects } = useProjects();
  const pinnedProjects = projects?.filter((item) => item.pin);

  const content = (
    <div className={styles.listContainer}>
      <Typography>
        <Paragraph>收藏项目</Paragraph>
        {pinnedProjects?.length ? (
          <List
            size="small"
            dataSource={pinnedProjects}
            renderItem={(item) => (
              <List.Item style={{ marginLeft: 0 }}>{item.name}</List.Item>
            )}
          />
        ) : null}

        <ButtonProject
          onClick={() => dispatch(projecListActions.openProjectModal())}
        />
      </Typography>
    </div>
  );

  return (
    <Popover placement="bottom" content={content}>
      项目
    </Popover>
  );
};

export default ProjectPopver;
