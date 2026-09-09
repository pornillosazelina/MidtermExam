import { useState } from "react";
import "./App.css";

function App() {
  // FORM STATES
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState(1);
  const [subTask, setSubTask] = useState("");
  const [subTasks, setSubTasks] = useState([]);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);

  // TASK LIST
  const [tasks, setTasks] = useState([]);

  // UPDATE STATES
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  // ADD SUB TASK
  const addSubTask = () => {
    if (subTask.trim() === "") {
      alert("Sub task should not be empty!");
      return;
    }

    setSubTasks([...subTasks, subTask]);
    setSubTask("");
  };

  // VALIDATION
  const validateForm = () => {
    if (taskName.length < 5) {
      alert("Task name must be at least 5 characters.");
      return false;
    }

    if (priority < 1 || priority > 10) {
      alert("Priority must be from 1 to 10.");
      return false;
    }

    if (subTasks.length < 1) {
      alert("You need at least 1 sub task.");
      return false;
    }

    if (description.length < 3) {
      alert("Task description must be at least 3 characters.");
      return false;
    }

    if (duration < 60) {
      alert("Task duration must be at least 1 hour (60 minutes).");
      return false;
    }

    return true;
  };

  // CREATE TASK
  const createTask = () => {
    if (!validateForm()) {
      return;
    }

    const newTask = {
      taskName: taskName,
      priority: priority,
      subTasks: subTasks,
      description: description,
      duration: duration,
    };

    setTasks([...tasks, newTask]);
    clearForm();
  };

  // DELETE TASK
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // EDIT TASK
  const editTask = (index) => {
    const taskToEdit = tasks[index];

    setTaskName(taskToEdit.taskName);
    setPriority(taskToEdit.priority);
    setSubTasks(taskToEdit.subTasks);
    setDescription(taskToEdit.description);
    setDuration(taskToEdit.duration);

    setIsEditing(true);
    setCurrentIndex(index);
  };

  // UPDATE TASK
  const updateTask = () => {
    if (!validateForm()) {
      return;
    }

    const updatedTask = {
      taskName: taskName,
      priority: priority,
      subTasks: subTasks,
      description: description,
      duration: duration,
    };

    const updatedTasks = tasks.map((task, index) =>
      index === currentIndex ? updatedTask : task
    );

    setTasks(updatedTasks);
    clearForm();
  };

  // CLEAR
  const clearForm = () => {
    setTaskName("");
    setPriority(1);
    setSubTask("");
    setSubTasks([]);
    setDescription("");
    setDuration(0);

    setIsEditing(false);
    setCurrentIndex(null);
  };

  // PRIORITY DISPLAY
  const getPriorityLabel = (priority) => {
    if (priority <= 3) {
      return "NOT IMPORTANT";
    }

    if (priority >= 4 && priority <= 7) {
      return "STANDARD";
    }

    return "IMPORTANT";
  };

  // DURATION DISPLAY
  const getDurationLabel = (duration) => {
    if (duration > 1440) {
      return "LONG TASK";
    }

    return "SHORT TASK";
  };

  // CONVERT MINUTES TO HOURS DISPLAY STRING
  const formatHours = (minutes) => {
    const hours = minutes / 60;
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  };

  return (
    <div className="container">
      <h2>MY SCHEDULED TASKS</h2>

      <hr />

      <h3>Create a Task</h3>

      <div className="form-container">
        {/* TASK NAME */}
        <div className="form-group">
          <label>Enter Task Name: </label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>

        {/* PRIORITY */}
        <div className="form-group">
          <label>Enter Priority Level: </label>
          <input
            type="range"
            min="1"
            max="10"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
          />
        </div>

        {/* SUB TASK */}
        <div className="form-group">
          <label>Enter Sub Task: </label>
          <input
            type="text"
            value={subTask}
            onChange={(e) => setSubTask(e.target.value)}
          />
          <button onClick={addSubTask}>Add SubTask</button>
        </div>

        {/* CURRENT SUB TASKS PREVIEW */}
        {subTasks.length > 0 && (
          <div className="subtask-preview">
            <p>Added Sub Tasks:</p>
            <ul>
              {subTasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          </div>
        )}

        {/* DESCRIPTION */}
        <div className="form-group">
          <label>Enter Task Description: </label>
          <textarea
            rows="2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* DURATION */}
        <div className="form-group">
          <label>Enter Task Duration in minutes: </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>

        {/* CREATE / UPDATE */}
        <div className="form-actions">
          {isEditing ? (
            <button onClick={updateTask}>UPDATE</button>
          ) : (
            <button onClick={createTask}>REGISTER</button>
          )}
        </div>
      </div>

      <hr />

      <h2>List of My Tasks</h2>

      <hr />

      {/* DISPLAY TASKS */}
      <div className="task-list">
        {tasks.map((task, index) => (
          <div className="task-card" key={index}>
            <p className="task-title">
              {index + 1}.{task.taskName}
            </p>

            <p className="task-priority">
              {getPriorityLabel(task.priority)}
            </p>

            <p className="subtasks-label">SUB TASKS:</p>

            <ul className="subtasks-list">
              {task.subTasks.map((sub, subIndex) => (
                <li key={subIndex}>{sub}</li>
              ))}
            </ul>

            <p className="task-desc">{task.description}</p>

            <p className="task-duration">
              {formatHours(task.duration)} : {getDurationLabel(task.duration)}
            </p>

            <div className="card-actions">
              <button onClick={() => deleteTask(index)}>DELETE</button>
              <button onClick={() => editTask(index)}>UPDATE</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;