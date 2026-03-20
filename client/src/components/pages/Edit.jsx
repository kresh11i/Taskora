import React from 'react'
const [editTask,setEdittask] = useState(null)
const Edit = () => {
     const handleEditTask = async (tasks)=>{
    setEdittask(tasks);
    setTitle(tasks.title);
    setDescription(tasks.description);
  

  }
  return (
    <div>
      <form onClick={handleEditTask}>
        <button onClick={()=>handleEditTask(tasks)}>Edit</button>
      </form>
    </div>
  )
}

export default Edit
