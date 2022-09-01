import ToDoList from "../../components/ToDoList/ToDoList";

import styles from "./styles.module.scss";

const MainPage = () => {
  return (
    <div className={styles.mainPageWrapper}>
      <ToDoList />
    </div>
  );
};

export default MainPage;
