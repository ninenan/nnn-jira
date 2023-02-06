import styles from "./index.module.scss";

type Props = {};

/**
 * grid 和 flex 的应用场景
 * 1. 考虑是一维布局还是二维布局
 * 一维布局使用 flex，二维布局使用 grid
 */
const GridDemo = (props: Props) => {
  console.log(props);

  return (
    <div className={styles.container}>
      <header className={styles.header}>header</header>
      <div className={styles.nav}>nav</div>
      <div className={styles.main}>main</div>
      <div className={styles.aside}>aside</div>
      <footer className={styles.footer}>footer</footer>
    </div>
  );
};

export default GridDemo;
