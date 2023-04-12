import { FC, PropsWithChildren, ReactNode, useMemo } from "react";
import { Popover, Typography, List } from "antd";
import { useProjects, useProjectsSearchParams } from "@hooks/useProject";
// import { cleanObj } from "@helpers/utils";
import styles from "./index.module.scss";

interface IProps {
  projectButton: ReactNode;
}

const ProjectPopver: FC<PropsWithChildren<IProps>> = ({ projectButton }) => {
  // const [param] = useProjectsSearchParams();
  const { Paragraph } = Typography;
  // const { data: projects, refetch } = useProjects(
  //   useMemo(() => cleanObj(param), [param])
  // );
  const { data: projects, refetch } = useProjects();
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
        {projectButton}
      </Typography>
    </div>
  );

  return (
    <Popover
      placement="bottom"
      content={content}
      onOpenChange={() => refetch()}
    >
      项目
    </Popover>
  );
};

export default ProjectPopver;
