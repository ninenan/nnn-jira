import { Popover, Typography, List } from "antd";
import styles from "./index.module.scss";
import useUsers from "@/hooks/useUsers";

const UsersPopver = () => {
  const { Paragraph } = Typography;
  const { data: users, refetch } = useUsers();

  const content = (
    <div className={styles.listContainer}>
      <Typography>
        <Paragraph>组员列表</Paragraph>
        {users?.length ? (
          <List
            size="small"
            dataSource={users}
            renderItem={(user) => (
              <List.Item style={{ marginLeft: 0 }}>{user.name}</List.Item>
            )}
          />
        ) : null}
      </Typography>
    </div>
  );

  return (
    <Popover
      placement="bottom"
      content={content}
      onOpenChange={() => refetch()}
    >
      用户
    </Popover>
  );
};

export default UsersPopver;
