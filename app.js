const addHabits = document.querySelector(".add-habit");
const habitsList = document.querySelector(".habits");
const habits = JSON.parse(localStorage.getItem("habits")) || [];


// add a habit
function addHabit(e)
{
    e.preventDefault();
    const text = this.querySelector("[name=habit]").value;
    const totalCount = +this.querySelector("[name=reps]").value; //plus sign added to facilitate type cast from string to integer
    const timeFrame = this.querySelector("[name=timeframe]").value;
    
    const habit =
    {
        reps: 0,
        text: text,
        totalCount: totalCount,
        timeFrame: timeFrame,
        completed: false,
    };       
    
    // console.log(habit);
        
    habits.push(habit);
    listHabits(habits, habitsList);
    localStorage.setItem("habits", JSON.stringify(habits));
    this.reset();
}
// list habits
function listHabits(habit = [], habitsList)
{
    habitsList.innerHTML = habits.map((habit, i) =>
    {
        return `
        <li>
      <input type="checkbox" data-index=${i} id="habit${i}" ${
          habit.completed ? "checked" : ""
        } />
      <label for="habit${i}"><span>${habit.reps}/${habit.totalCount}&nbsp${
          habit.timeFrame
        }</span>&nbsp${habit.text}</label>
        <button class="delete" data-index=${i} id="delete${i}"><i class="far fa-trash-alt"></i></button>
    </li>
       `; 
    }).join('');
}
// toggle if complete
function toggleCompleted(e)
{
    if (!e.target.matches("input")) return;
    const el = e.target;
    const index = el.dataset.index;

    ++habits[index].reps;
    
    if (habits[index].reps === habits[index].totalCount)
    {
        habits[index].completed = true;
    }
    else if (habits[index].reps > habits[index].totalCount)
    {
        habits[index].reps = 0;
        habits[index].completed = false;
    }
    listHabits(habits, habitsList);
    localStorage.setItem("habits", JSON.stringify(habits));
}

// delete habit
function deleteHabit(e)
{
    if (!e.target.matches("i")) return;
    const el = e.target;
    const index = el.dataset.index;
    console.log(index);
    habits.splice(index, 1);
    listHabits(habits, habitsList);
    localStorage.setItem("habits", JSON.stringify(habits));
}



addHabits.addEventListener('submit', addHabit);
habitsList.addEventListener('click', toggleCompleted);
habitsList.addEventListener('click', deleteHabit);
listHabits(habits, habitsList);