import { Todo } from "../App";
import { iconCheck, iconCross } from "../assets";

type TodoCardProps = {
  toggleCheck: (id: string) => void;
  deleteTodo: (id: string) => void;
} & Todo;

const TodoCard = ({
  id,
  isCompleted,
  title,
  deleteTodo,
  toggleCheck,
}: TodoCardProps) => {
  return (
    <div className="flex gap-4 p-5 items-center justify-between text-darkGrayishBlue border-b dark:border-b-veryDarkGrayishBlue2">
      <button className="basis-5 h-5" onClick={() => toggleCheck(id)}>
        <div
          className={`${
            isCompleted
              ? "bg-gradient-to-br from-checkBgFrom to-checkBgTo"
              : "bg-transparent"
          } border dark:border-veryDarkGrayishBlue2 rounded-full w-full h-full  flex justify-center items-center`}
        >
          {isCompleted && <img src={iconCheck} className=" w-2 h-2" />}
        </div>
      </button>
      <p
        className={`${
          isCompleted
            ? "line-through text-lightGrayishBlue dark:text-darkGrayishBlue"
            : "text-veryDarkBlue dark:text-lightGrayishBlue"
        } flex-1`}
      >
        {title}
      </p>
      <button onClick={() => deleteTodo(id)}>
        <img src={iconCross} alt="cross-icon" className="w-3 h-3" />
      </button>
    </div>
  );
};

export default TodoCard;
